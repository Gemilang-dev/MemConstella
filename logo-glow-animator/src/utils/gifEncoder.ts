export interface GifEncodeOptions {
  width: number;
  height: number;
  fps: number;
  totalFrames: number;
  renderFrame: (ctx: CanvasRenderingContext2D, frameIndex: number, progress: number) => void;
  onProgress?: (fraction: number, frameIndex: number) => void;
}

class ByteStream {
  private data: number[] = [];

  writeByte(b: number): void {
    this.data.push(b & 0xff);
  }

  writeShort(v: number): void {
    this.data.push(v & 0xff);
    this.data.push((v >> 8) & 0xff);
  }

  writeBytes(bytes: number[] | Uint8Array): void {
    for (let i = 0; i < bytes.length; i++) {
      this.data.push(bytes[i] & 0xff);
    }
  }

  writeASCII(str: string): void {
    for (let i = 0; i < str.length; i++) {
      this.data.push(str.charCodeAt(i) & 0xff);
    }
  }

  toUint8Array(): Uint8Array {
    return new Uint8Array(this.data);
  }
}

function buildAdaptivePalette(rgba: Uint8ClampedArray): {
  palette: Uint8Array;
  lookupCube: Uint8Array;
} {
  const hist = new Uint32Array(32768);
  const rSum = new Float64Array(32768);
  const gSum = new Float64Array(32768);
  const bSum = new Float64Array(32768);

  const pixelCount = rgba.length >> 2;
  const stride = pixelCount > 400000 ? 2 : 1;

  for (let i = 0; i < pixelCount; i += stride) {
    const idx = i << 2;
    const r = rgba[idx];
    const g = rgba[idx + 1];
    const b = rgba[idx + 2];
    const key = ((r >> 3) << 10) | ((g >> 3) << 5) | (b >> 3);
    hist[key]++;
    rSum[key] += r;
    gSum[key] += g;
    bSum[key] += b;
  }

  const occupied: { key: number; count: number; r: number; g: number; b: number }[] = [];
  for (let k = 0; k < 32768; k++) {
    const count = hist[k];
    if (count > 0) {
      occupied.push({
        key: k,
        count,
        r: Math.round(rSum[k] / count),
        g: Math.round(gSum[k] / count),
        b: Math.round(bSum[k] / count),
      });
    }
  }

  occupied.sort((a, b) => b.count - a.count);

  const palette = new Uint8Array(256 * 3);
  const chosen: { r: number; g: number; b: number }[] = [];

  const minDistSqPasses = [144, 64, 25, 9, 0];
  const usedFlags = new Uint8Array(occupied.length);

  for (const minDistSq of minDistSqPasses) {
    if (chosen.length >= 256) break;
    for (let i = 0; i < occupied.length; i++) {
      if (usedFlags[i]) continue;
      const cand = occupied[i];
      let tooClose = false;
      if (minDistSq > 0) {
        for (let j = 0; j < chosen.length; j++) {
          const dr = cand.r - chosen[j].r;
          const dg = cand.g - chosen[j].g;
          const db = cand.b - chosen[j].b;
          if (dr * dr + dg * dg + db * db < minDistSq) {
            tooClose = true;
            break;
          }
        }
      }
      if (!tooClose) {
        usedFlags[i] = 1;
        chosen.push({ r: cand.r, g: cand.g, b: cand.b });
        if (chosen.length >= 256) break;
      }
    }
  }

  for (let i = 0; i < 256; i++) {
    const c = chosen[i] || chosen[0] || { r: 8, g: 11, b: 20 };
    palette[i * 3] = c.r;
    palette[i * 3 + 1] = c.g;
    palette[i * 3 + 2] = c.b;
  }

  const lookupCube = new Uint8Array(32768);

  for (let i = 0; i < occupied.length; i++) {
    const k = occupied[i].key;
    const cr = occupied[i].r;
    const cg = occupied[i].g;
    const cb = occupied[i].b;
    let bestIdx = 0;
    let bestDist = 0x7fffffff;
    for (let p = 0; p < chosen.length; p++) {
      const dr = cr - chosen[p].r;
      const dg = cg - chosen[p].g;
      const db = cb - chosen[p].b;
      const dist = dr * dr + dg * dg + db * db;
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = p;
        if (dist === 0) break;
      }
    }
    lookupCube[k] = bestIdx;
  }

  return { palette, lookupCube };
}

const BAYER_4X4 = [
  [-3.5, 0.5, -2.5, 1.5],
  [2.5, -1.5, 3.5, -0.5],
  [-1.5, 2.5, -2.5, 1.5],
  [3.5, -0.5, 2.5, -1.5],
];

function mapPixelsToPalette(
  rgba: Uint8ClampedArray,
  width: number,
  height: number,
  palette: Uint8Array,
  lookupCube: Uint8Array
): Uint8Array {
  const indexed = new Uint8Array(width * height);
  const cacheVisited = new Uint8Array(32768);

  const findNearest = (r5: number, g5: number, b5: number): number => {
    const key = (r5 << 10) | (g5 << 5) | b5;
    if (cacheVisited[key]) return lookupCube[key];
    const r = (r5 << 3) | 4;
    const g = (g5 << 3) | 4;
    const b = (b5 << 3) | 4;
    let bestIdx = 0;
    let bestDist = 0x7fffffff;
    for (let p = 0; p < 256; p++) {
      const p3 = p * 3;
      const dr = r - palette[p3];
      const dg = g - palette[p3 + 1];
      const db = b - palette[p3 + 2];
      const dist = dr * dr + dg * dg + db * db;
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = p;
        if (dist <= 4) break;
      }
    }
    lookupCube[key] = bestIdx;
    cacheVisited[key] = 1;
    return bestIdx;
  };

  let pIdx = 0;
  for (let y = 0; y < height; y++) {
    const bayerRow = BAYER_4X4[y & 3];
    for (let x = 0; x < width; x++) {
      const rgbaIdx = pIdx << 2;
      const dither = bayerRow[x & 3];
      const r = Math.max(0, Math.min(255, Math.round(rgba[rgbaIdx] + dither)));
      const g = Math.max(0, Math.min(255, Math.round(rgba[rgbaIdx + 1] + dither)));
      const b = Math.max(0, Math.min(255, Math.round(rgba[rgbaIdx + 2] + dither)));
      indexed[pIdx] = findNearest(r >> 3, g >> 3, b >> 3);
      pIdx++;
    }
  }

  return indexed;
}

function lzwEncode(indexedPixels: Uint8Array, minCodeSize = 8): Uint8Array {
  const out: number[] = [];
  out.push(minCodeSize);

  const clearCode = 1 << minCodeSize;
  const endOfInfoCode = clearCode + 1;

  let codeSize = minCodeSize + 1;
  let nextCode = endOfInfoCode + 1;

  const tableSize = 4096 * 256;
  const codeTable = new Int32Array(tableSize);
  codeTable.fill(-1);

  const blockBuffer = new Uint8Array(255);
  let blockLength = 0;
  let bitBuffer = 0;
  let bitCount = 0;

  const flushBlock = () => {
    if (blockLength > 0) {
      out.push(blockLength);
      for (let i = 0; i < blockLength; i++) {
        out.push(blockBuffer[i]);
      }
      blockLength = 0;
    }
  };

  const writeCode = (code: number) => {
    bitBuffer |= code << bitCount;
    bitCount += codeSize;
    while (bitCount >= 8) {
      blockBuffer[blockLength++] = bitBuffer & 0xff;
      if (blockLength === 255) {
        flushBlock();
      }
      bitBuffer >>= 8;
      bitCount -= 8;
    }
  };

  const resetTable = () => {
    codeTable.fill(-1);
    codeSize = minCodeSize + 1;
    nextCode = endOfInfoCode + 1;
  };

  writeCode(clearCode);

  if (indexedPixels.length === 0) {
    writeCode(endOfInfoCode);
    if (bitCount > 0) {
      blockBuffer[blockLength++] = bitBuffer & 0xff;
    }
    flushBlock();
    out.push(0);
    return new Uint8Array(out);
  }

  let prefix = indexedPixels[0];

  for (let i = 1; i < indexedPixels.length; i++) {
    const k = indexedPixels[i];
    const tableKey = (prefix << 8) | k;
    const found = codeTable[tableKey];

    if (found !== -1) {
      prefix = found;
    } else {
      writeCode(prefix);
      if (nextCode < 4096) {
        codeTable[tableKey] = nextCode;
        if (nextCode === 1 << codeSize && codeSize < 12) {
          codeSize++;
        }
        nextCode++;
      } else {
        writeCode(clearCode);
        resetTable();
      }
      prefix = k;
    }
  }

  writeCode(prefix);
  writeCode(endOfInfoCode);

  if (bitCount > 0) {
    blockBuffer[blockLength++] = bitBuffer & 0xff;
  }
  flushBlock();

  out.push(0);
  return new Uint8Array(out);
}

export async function encodeAnimatedGif(options: GifEncodeOptions): Promise<Blob> {
  const { width, height, fps, totalFrames, renderFrame, onProgress } = options;
  const stream = new ByteStream();

  // GIF89a Header
  stream.writeASCII('GIF89a');

  // Logical Screen Descriptor
  stream.writeShort(width);
  stream.writeShort(height);
  stream.writeByte(0x70);
  stream.writeByte(0);
  stream.writeByte(0);

  // NETSCAPE2.0 Extension
  stream.writeByte(0x21);
  stream.writeByte(0xff);
  stream.writeByte(11);
  stream.writeASCII('NETSCAPE2.0');
  stream.writeByte(3);
  stream.writeByte(1);
  stream.writeShort(0);
  stream.writeByte(0);

  const offscreen = document.createElement('canvas');
  offscreen.width = width;
  offscreen.height = height;
  const ctx = offscreen.getContext('2d', { willReadFrequently: true });
  if (!ctx) {
    throw new Error('Could not initialize 2D canvas context for GIF encoding.');
  }

  const delayCentisec = Math.max(2, Math.round(100 / fps));

  for (let frameIdx = 0; frameIdx < totalFrames; frameIdx++) {
    const progress = frameIdx / totalFrames;
    renderFrame(ctx, frameIdx, progress);

    const imageData = ctx.getImageData(0, 0, width, height);
    const { palette, lookupCube } = buildAdaptivePalette(imageData.data);
    const indexedPixels = mapPixelsToPalette(imageData.data, width, height, palette, lookupCube);
    const compressedLzw = lzwEncode(indexedPixels, 8);

    // Graphic Control Extension
    stream.writeByte(0x21);
    stream.writeByte(0xf9);
    stream.writeByte(4);
    stream.writeByte(0x04);
    stream.writeShort(delayCentisec);
    stream.writeByte(0);
    stream.writeByte(0);

    // Image Descriptor
    stream.writeByte(0x2c);
    stream.writeShort(0);
    stream.writeShort(0);
    stream.writeShort(width);
    stream.writeShort(height);
    stream.writeByte(0x87);

    // Local Color Table
    stream.writeBytes(palette);

    // LZW Data
    stream.writeBytes(compressedLzw);

    if (onProgress) {
      onProgress((frameIdx + 1) / totalFrames, frameIdx + 1);
    }

    if (frameIdx % 2 === 1) {
      await new Promise((r) => setTimeout(r, 0));
    }
  }

  // Trailer
  stream.writeByte(0x3b);

  return new Blob([stream.toUint8Array() as unknown as BlobPart], { type: 'image/gif' });
}
