import { LogoStudioConfig, StarNode } from '../types/logoStudio';

interface AmbientStar {
  x: number;
  y: number;
  size: number;
  phase: number;
  cycles: number;
  colorIndex: number;
}

// Deterministic ambient starfield
const AMBIENT_STARS: AmbientStar[] = Array.from({ length: 80 }, (_, i) => {
  const s1 = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  const s2 = Math.sin(i * 93.9898 + 12.456) * 23421.6312;
  const s3 = Math.sin(i * 45.164 + 39.112) * 19283.441;
  const rx = s1 - Math.floor(s1);
  const ry = s2 - Math.floor(s2);
  const rz = s3 - Math.floor(s3);

  return {
    x: 0.03 + rx * 0.94,
    y: 0.04 + ry * 0.92,
    size: 0.6 + rz * 1.35,
    phase: (i * 0.83) % (Math.PI * 2),
    cycles: (i % 2) + 1,
    colorIndex: i % 4,
  };
});

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '').trim();
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean.padEnd(6, '0');
  const num = parseInt(full.slice(0, 6), 16) || 0;
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbaString(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, alpha)).toFixed(3)})`;
}

function drawOpticalStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  baseRadius: number,
  twinkleFactor: number,
  hasSpikes: boolean,
  spikeScale: number,
  tintHex: string,
  accentHex: string,
  isSelectedOrHovered: boolean
) {
  ctx.save();

  const radius = baseRadius * (0.75 + 0.45 * twinkleFactor);
  const glowRadius = radius * (hasSpikes ? 6.5 : 4.2) * (0.7 + 0.5 * twinkleFactor);

  // Outer celestial halo
  const outerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowRadius);
  outerGlow.addColorStop(0, rgbaString('#FFFFFF', 0.95));
  outerGlow.addColorStop(0.22, rgbaString(tintHex, 0.65 * twinkleFactor));
  outerGlow.addColorStop(0.55, rgbaString(accentHex, 0.22 * twinkleFactor));
  outerGlow.addColorStop(1, rgbaString(accentHex, 0));

  ctx.fillStyle = outerGlow;
  ctx.beginPath();
  ctx.arc(cx, cy, glowRadius, 0, Math.PI * 2);
  ctx.fill();

  // 4-point tapered diffraction spikes
  if (hasSpikes || twinkleFactor > 1.05) {
    const spikeMult = hasSpikes ? 1.0 : 0.48;
    const hLen = radius * 7.8 * spikeScale * spikeMult * (0.65 + 0.55 * twinkleFactor);
    const vLen = radius * 7.2 * spikeScale * spikeMult * (0.65 + 0.55 * twinkleFactor);
    const thickness = Math.max(1.1, radius * 0.58);

    ctx.fillStyle = rgbaString('#FFFFFF', Math.min(1, 0.72 + 0.28 * twinkleFactor));

    ctx.beginPath();
    ctx.moveTo(cx, cy - vLen);
    ctx.quadraticCurveTo(cx + thickness * 0.45, cy - thickness * 0.45, cx + hLen, cy);
    ctx.quadraticCurveTo(cx + thickness * 0.45, cy + thickness * 0.45, cx, cy + vLen);
    ctx.quadraticCurveTo(cx - thickness * 0.45, cy + thickness * 0.45, cx - hLen, cy);
    ctx.quadraticCurveTo(cx - thickness * 0.45, cy - thickness * 0.45, cx, cy - vLen);
    ctx.closePath();
    ctx.fill();

    // 45-degree micro-spikes on peak twinkle
    if (hasSpikes && twinkleFactor > 0.75) {
      const dLen = hLen * 0.38;
      const dThick = thickness * 0.45;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(Math.PI / 4);
      ctx.fillStyle = rgbaString(tintHex, 0.48 * twinkleFactor);
      ctx.beginPath();
      ctx.moveTo(0, -dLen);
      ctx.quadraticCurveTo(dThick * 0.3, -dThick * 0.3, dLen, 0);
      ctx.quadraticCurveTo(dThick * 0.3, dThick * 0.3, 0, dLen);
      ctx.quadraticCurveTo(-dThick * 0.3, dThick * 0.3, -dLen, 0);
      ctx.quadraticCurveTo(-dThick * 0.3, -dThick * 0.3, 0, -dLen);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  // Core
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(cx, cy, Math.max(1.3, radius * 0.85), 0, Math.PI * 2);
  ctx.fill();

  // Selection ring
  if (isSelectedOrHovered) {
    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.arc(cx, cy, Math.max(12, radius * 4), 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  ctx.restore();
}

export function renderLogoFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number,
  config: LogoStudioConfig,
  customImage?: HTMLImageElement | null,
  activeStarId?: string | null
): void {
  ctx.save();

  const twoPi = Math.PI * 2;
  const [c0, c1, c2, c3] = config.gradientColors;
  const minDim = Math.min(width, height);
  const scaleRef = width / 900;

  // 1. Background
  ctx.fillStyle = config.backgroundColor;
  ctx.fillRect(0, 0, width, height);

  if (config.nebulaIntensity > 0.01) {
    const breathA = 0.85 + 0.15 * Math.sin(progress * twoPi);
    const breathB = 0.85 + 0.15 * Math.cos(progress * twoPi);

    // Left-center nebula
    const nebX1 = width * (0.35 + 0.04 * Math.sin(progress * twoPi));
    const nebY1 = height * (0.54 + 0.03 * Math.cos(progress * twoPi));
    const nebR1 = Math.max(width, height) * 0.48;
    const grad1 = ctx.createRadialGradient(nebX1, nebY1, 0, nebX1, nebY1, nebR1);
    grad1.addColorStop(0, rgbaString(c0, 0.16 * config.nebulaIntensity * breathA));
    grad1.addColorStop(0.5, rgbaString(c1, 0.07 * config.nebulaIntensity * breathA));
    grad1.addColorStop(1, rgbaString(config.backgroundColor, 0));
    ctx.fillStyle = grad1;
    ctx.fillRect(0, 0, width, height);

    // Right-top nebula
    const nebX2 = width * (0.82 + 0.03 * Math.cos(progress * twoPi));
    const nebY2 = height * (0.32 + 0.03 * Math.sin(progress * twoPi));
    const nebR2 = Math.max(width, height) * 0.42;
    const grad2 = ctx.createRadialGradient(nebX2, nebY2, 0, nebX2, nebY2, nebR2);
    grad2.addColorStop(0, rgbaString(c1, 0.18 * config.nebulaIntensity * breathB));
    grad2.addColorStop(0.55, rgbaString(c2, 0.08 * config.nebulaIntensity * breathB));
    grad2.addColorStop(1, rgbaString(config.backgroundColor, 0));
    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, width, height);
  }

  // 2. Ambient starfield
  const starCount = Math.min(AMBIENT_STARS.length, Math.max(0, config.ambientStarCount));
  for (let i = 0; i < starCount; i++) {
    const st = AMBIENT_STARS[i];
    const wave = Math.sin(progress * twoPi * st.cycles * config.twinkleSpeedMultiplier + st.phase);
    const alpha = 0.15 + 0.75 * (0.5 + 0.5 * wave) * (0.4 + 0.6 * config.twinkleIntensity);
    const sx = st.x * width;
    const sy = st.y * height;
    const sr = st.size * Math.max(0.75, scaleRef);

    const starColor = config.gradientColors[st.colorIndex] || '#E0F2FE';
    ctx.fillStyle = rgbaString(starColor, alpha * 0.85);
    ctx.beginPath();
    ctx.arc(sx, sy, sr * 1.4, 0, twoPi);
    ctx.fill();

    ctx.fillStyle = rgbaString('#FFFFFF', alpha);
    ctx.beginPath();
    ctx.arc(sx, sy, sr * 0.7, 0, twoPi);
    ctx.fill();
  }

  // 3. Shooting star
  if (config.shootingStars) {
    const windowStart = 0.18;
    const windowEnd = 0.46;
    if (progress >= windowStart && progress <= windowEnd) {
      const t = (progress - windowStart) / (windowEnd - windowStart);
      const fade = Math.sin(t * Math.PI);
      const startX = width * 0.18;
      const startY = height * 0.12;
      const endX = width * 0.62;
      const endY = height * 0.28;

      const headX = startX + (endX - startX) * t;
      const headY = startY + (endY - startY) * t;
      const tailLen = 0.16;
      const tailT = Math.max(0, t - tailLen);
      const tailX = startX + (endX - startX) * tailT;
      const tailY = startY + (endY - startY) * tailT;

      const meteorGrad = ctx.createLinearGradient(tailX, tailY, headX, headY);
      meteorGrad.addColorStop(0, rgbaString(c1, 0));
      meteorGrad.addColorStop(0.6, rgbaString(c1, 0.45 * fade));
      meteorGrad.addColorStop(1, rgbaString('#FFFFFF', 0.95 * fade));

      ctx.strokeStyle = meteorGrad;
      ctx.lineWidth = Math.max(1.2, 2.0 * scaleRef);
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(headX, headY);
      ctx.stroke();

      ctx.fillStyle = rgbaString('#FFFFFF', 0.9 * fade);
      ctx.beginPath();
      ctx.arc(headX, headY, 2.0 * scaleRef, 0, twoPi);
      ctx.fill();
    }
  }

  // 4. Custom image overlay mode
  if (config.sourceMode === 'custom-image-hybrid' && customImage) {
    const off = document.createElement('canvas');
    off.width = width;
    off.height = height;
    const octx = off.getContext('2d');
    if (octx) {
      const imgAspect = customImage.width / Math.max(1, customImage.height);
      const canvasAspect = width / height;
      let drawW = width;
      let drawH = height;
      if (imgAspect > canvasAspect) {
        drawH = width / imgAspect;
      } else {
        drawW = height * imgAspect;
      }
      const drawX = (width - drawW) / 2;
      const drawY = (height - drawH) / 2;

      octx.drawImage(customImage, drawX, drawY, drawW, drawH);

      if (config.customImageTintStrength > 0.01) {
        octx.globalCompositeOperation = 'color';
        const shift = progress * config.gradientCycles;
        const gSpan = width * config.gradientSpread;
        const gx0 = -gSpan + (shift % 1) * gSpan;
        const grad = octx.createLinearGradient(gx0, 0, gx0 + gSpan * 2, height * 0.4);
        grad.addColorStop(0.0, rgbaString(c0, config.customImageTintStrength));
        grad.addColorStop(0.25, rgbaString(c1, config.customImageTintStrength));
        grad.addColorStop(0.5, rgbaString(c2, config.customImageTintStrength));
        grad.addColorStop(0.75, rgbaString(c3, config.customImageTintStrength));
        grad.addColorStop(1.0, rgbaString(c0, config.customImageTintStrength));
        octx.fillStyle = grad;
        octx.fillRect(drawX, drawY, drawW, drawH);
      }

      ctx.drawImage(off, 0, 0);
    }
  }

  // 5. Typography Vector Mode
  if (config.sourceMode === 'vector-master') {
    const centerX = width * 0.475;
    const mainTextY = height * 0.545;
    const subTextY = height * 0.775;

    const baseTitlePx = Math.min(width * 0.118, height * 0.295) * config.titleScale;
    const baseSubPx = Math.min(width * 0.0325, height * 0.082) * config.subtitleScale;

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const titleFont = `700 ${baseTitlePx.toFixed(1)}px "${config.fontFamily}", sans-serif`;
    ctx.font = titleFont;
    const textMetrics = ctx.measureText(config.titleText || 'MemConstella');
    const textW = Math.max(200, textMetrics.width);
    const textLeft = centerX - textW / 2;

    const cycleProgress = (progress * config.gradientCycles) % 1;
    let fillStyle: CanvasGradient;

    if (config.gradientMode === 'radial-pulse') {
      const pulseOffset = Math.sin(progress * twoPi * config.gradientCycles);
      const rCenterX = centerX + pulseOffset * (textW * 0.28);
      const rCenterY = mainTextY;
      const maxR = textW * 0.75 * config.gradientSpread;
      const rGrad = ctx.createRadialGradient(rCenterX, rCenterY, maxR * 0.05, rCenterX, rCenterY, maxR);
      const stops = [c0, c1, c2, c3, c0, c1];
      for (let s = 0; s <= 5; s++) {
        const pos = Math.max(0, Math.min(1, s / 5));
        const idx = Math.floor((s + cycleProgress * 4) % 4);
        rGrad.addColorStop(pos, stops[idx]);
      }
      fillStyle = rGrad;
    } else {
      const periodW = textW * config.gradientSpread;
      const angleRad = (config.gradientAngle * Math.PI) / 180;
      const offsetPx = cycleProgress * periodW;

      const x0 = textLeft - periodW + offsetPx;
      const y0 = mainTextY - Math.sin(angleRad) * (periodW * 0.5);
      const x1 = x0 + periodW * 2;
      const y1 = mainTextY + Math.sin(angleRad) * (periodW * 0.5);

      const lGrad = ctx.createLinearGradient(x0, y0, x1, y1);
      lGrad.addColorStop(0.0, c0);
      lGrad.addColorStop(0.125, c1);
      lGrad.addColorStop(0.25, c2);
      lGrad.addColorStop(0.375, c3);
      lGrad.addColorStop(0.5, c0);
      lGrad.addColorStop(0.625, c1);
      lGrad.addColorStop(0.75, c2);
      lGrad.addColorStop(0.875, c3);
      lGrad.addColorStop(1.0, c0);
      fillStyle = lGrad;
    }

    // Outer glow
    if (config.textGlowIntensity > 0.02) {
      ctx.save();
      const glowPulse = 0.82 + 0.18 * Math.sin(progress * twoPi * config.gradientCycles);
      ctx.shadowColor = rgbaString(
        config.glowColor,
        0.75 * config.textGlowIntensity * glowPulse
      );
      ctx.shadowBlur = Math.max(10, 26 * scaleRef * config.textGlowIntensity * glowPulse);
      ctx.fillStyle = fillStyle;
      ctx.globalAlpha = 0.65 * config.textGlowIntensity;
      ctx.fillText(config.titleText || 'MemConstella', centerX, mainTextY);
      ctx.restore();
    }

    // Primary gradient
    ctx.save();
    ctx.shadowColor = rgbaString(c1, 0.35 * config.textGlowIntensity);
    ctx.shadowBlur = Math.max(4, 10 * scaleRef * config.textGlowIntensity);
    ctx.fillStyle = fillStyle;
    ctx.fillText(config.titleText || 'MemConstella', centerX, mainTextY);
    ctx.restore();

    // Shimmer sweep
    if (config.shimmerSweep) {
      const shimmerPos = (progress * config.gradientCycles + 0.15) % 1;
      const shimmerAlpha = Math.sin(shimmerPos * Math.PI) * 0.55;
      if (shimmerAlpha > 0.02) {
        const sweepX = textLeft - textW * 0.15 + shimmerPos * (textW * 1.3);
        const bandW = textW * 0.16;
        const sGrad = ctx.createLinearGradient(sweepX - bandW, mainTextY - 30, sweepX + bandW, mainTextY + 30);
        sGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        sGrad.addColorStop(0.5, `rgba(255, 255, 255, ${shimmerAlpha.toFixed(3)})`);
        sGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.save();
        ctx.fillStyle = sGrad;
        ctx.fillText(config.titleText || 'MemConstella', centerX, mainTextY);
        ctx.restore();
      }
    }

    // Subtitle
    if (config.subtitleText.trim().length > 0) {
      ctx.save();
      ctx.font = `400 ${baseSubPx.toFixed(1)}px "${config.fontFamily}", sans-serif`;
      const subBreath = 0.86 + 0.14 * Math.sin(progress * twoPi);
      ctx.fillStyle = rgbaString(config.subtitleColor, subBreath);
      ctx.shadowColor = rgbaString(c1, 0.18 * config.textGlowIntensity);
      ctx.shadowBlur = 6 * scaleRef;
      ctx.fillText(config.subtitleText, centerX, subTextY);
      ctx.restore();
    }
  }

  // 6. Constellation lines
  const stars: StarNode[] = config.stars;
  const edges = config.edges;

  if (edges.length > 0 && config.lineOpacity > 0.01) {
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const baseLineAlpha = 0.42 * config.lineOpacity * (0.85 + 0.15 * Math.sin(progress * twoPi));
    ctx.strokeStyle = rgbaString(config.starTint, baseLineAlpha);
    ctx.shadowColor = rgbaString(c1, 0.55 * config.lineOpacity);
    ctx.shadowBlur = 8 * scaleRef;
    ctx.lineWidth = Math.max(1.0, 1.45 * scaleRef);

    ctx.beginPath();
    for (const edge of edges) {
      const sA = stars[edge.from];
      const sB = stars[edge.to];
      if (!sA || !sB) continue;
      ctx.moveTo(sA.x * width, sA.y * height);
      ctx.lineTo(sB.x * width, sB.y * height);
    }
    ctx.stroke();

    // Traveling energy pulse
    if (config.linePulse) {
      const totalEdges = edges.length;
      const pulseEdgeFloat = ((progress * config.gradientCycles * 2) % 1) * totalEdges;
      const activeEdgeIdx = Math.floor(pulseEdgeFloat);
      const edgeFrac = pulseEdgeFloat - activeEdgeIdx;
      const activeEdge = edges[activeEdgeIdx];

      if (activeEdge) {
        const sA = stars[activeEdge.from];
        const sB = stars[activeEdge.to];
        if (sA && sB) {
          const ax = sA.x * width;
          const ay = sA.y * height;
          const bx = sB.x * width;
          const by = sB.y * height;

          const px = ax + (bx - ax) * edgeFrac;
          const py = ay + (by - ay) * edgeFrac;
          const pulseRadius = Math.max(18, 38 * scaleRef);

          const pulseGrad = ctx.createRadialGradient(px, py, 0, px, py, pulseRadius);
          pulseGrad.addColorStop(0, rgbaString('#FFFFFF', 0.9 * config.lineOpacity));
          pulseGrad.addColorStop(0.4, rgbaString(c1, 0.55 * config.lineOpacity));
          pulseGrad.addColorStop(1, rgbaString(c1, 0));

          ctx.strokeStyle = pulseGrad;
          ctx.lineWidth = Math.max(1.8, 2.8 * scaleRef);
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.stroke();
        }
      }
    }

    ctx.restore();
  }

  // 7. Twinkling constellation stars
  const baseStarRadius = Math.max(2.0, minDim * 0.0082);

  for (let i = 0; i < stars.length; i++) {
    const star = stars[i];
    const sx = star.x * width;
    const sy = star.y * height;

    const harmonicCycles = Math.max(1, Math.round(star.cycles * config.twinkleSpeedMultiplier));
    const primaryWave = Math.sin(progress * twoPi * harmonicCycles + star.phase);
    const secondaryWave = Math.cos(progress * twoPi * (harmonicCycles + 1) + star.phase * 1.7);
    const combinedWave = 0.7 * primaryWave + 0.3 * secondaryWave;

    const twinkleFactor =
      1.0 - config.twinkleIntensity * 0.55 + config.twinkleIntensity * 0.85 * (0.5 + 0.5 * combinedWave);

    const starColor = config.gradientColors[i % 4] || config.starTint;

    drawOpticalStar(
      ctx,
      sx,
      sy,
      baseStarRadius * star.magnitude,
      twinkleFactor,
      star.hasSpikes,
      config.spikeLength,
      config.starTint,
      starColor,
      activeStarId === star.id
    );
  }

  ctx.restore();
}
