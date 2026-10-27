export interface VideoExportOptions {
  width: number;
  height: number;
  fps: number;
  durationSec: number;
  renderFrame: (ctx: CanvasRenderingContext2D, frameIndex: number, progress: number) => void;
  onProgress?: (fraction: number, frameIndex: number) => void;
}

export async function recordCanvasVideo(options: VideoExportOptions): Promise<{
  blob: Blob;
  extension: 'webm' | 'mp4';
}> {
  const { width, height, fps, durationSec, renderFrame, onProgress } = options;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not initialize 2D context for video export.');
  }

  const mimeCandidates: { mime: string; ext: 'webm' | 'mp4' }[] = [
    { mime: 'video/webm;codecs=vp9', ext: 'webm' },
    { mime: 'video/webm;codecs=vp8', ext: 'webm' },
    { mime: 'video/webm', ext: 'webm' },
    { mime: 'video/mp4', ext: 'mp4' },
  ];

  let selectedMime = 'video/webm';
  let selectedExt: 'webm' | 'mp4' = 'webm';

  if (typeof MediaRecorder !== 'undefined') {
    for (const cand of mimeCandidates) {
      if (MediaRecorder.isTypeSupported(cand.mime)) {
        selectedMime = cand.mime;
        selectedExt = cand.ext;
        break;
      }
    }
  }

  const stream = canvas.captureStream(fps);
  const recorder = new MediaRecorder(stream, {
    mimeType: selectedMime,
    videoBitsPerSecond: 8_000_000,
  });

  const chunks: BlobPart[] = [];
  recorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) {
      chunks.push(e.data);
    }
  };

  const totalFrames = Math.round(fps * durationSec);
  const frameIntervalMs = 1000 / fps;

  return new Promise((resolve, reject) => {
    recorder.onerror = (err) => reject(err);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: selectedMime });
      resolve({ blob, extension: selectedExt });
    };

    renderFrame(ctx, 0, 0);
    recorder.start(100);

    let currentFrame = 0;
    const step = () => {
      if (currentFrame >= totalFrames) {
        recorder.stop();
        stream.getTracks().forEach((t) => t.stop());
        return;
      }

      const progress = currentFrame / totalFrames;
      renderFrame(ctx, currentFrame, progress);
      currentFrame++;

      if (onProgress) {
        onProgress(currentFrame / totalFrames, currentFrame);
      }

      setTimeout(step, frameIntervalMs);
    };

    step();
  });
}
