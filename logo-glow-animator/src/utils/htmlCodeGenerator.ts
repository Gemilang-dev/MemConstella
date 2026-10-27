import { LogoStudioConfig } from '../types/logoStudio';

/**
 * Generates standalone, self-contained HTML files and embed snippets for the animated logo.
 */

export function generateSvgCssHtml(config: LogoStudioConfig, width = 900, height = 360): string {
  const [c0, c1, c2, c3] = config.gradientColors;
  const loopDuration = config.loopDurationSec || 3;

  // Star elements in SVG
  const starElements = config.stars
    .map((s, idx) => {
      const cx = (s.x * width).toFixed(1);
      const cy = (s.y * height).toFixed(1);
      const rNum = 12 * s.magnitude;
      const r = rNum.toFixed(1);
      const spikeDist = (rNum * 2.8 * config.spikeLength).toFixed(1);
      const delay = (-((s.phase / (Math.PI * 2)) * loopDuration)).toFixed(2);
      const animDur = (loopDuration / (s.cycles || 1)).toFixed(2);

      return `      <!-- Star ${idx + 1}: ${s.name} -->
      <g class="star star-anim" style="animation-duration: ${animDur}s; animation-delay: ${delay}s;" transform="translate(${cx}, ${cy})">
        <!-- Corona Glow -->
        <circle r="${r}" fill="url(#star-glow-grad)" opacity="0.85" />
        <!-- Core -->
        <circle r="${(s.magnitude * 3).toFixed(1)}" fill="#FFFFFF" />
        ${
          s.hasSpikes
            ? `<!-- 4-Point Optical Diffraction Spikes -->
        <path d="M 0,-${spikeDist} Q 1,-2 ${spikeDist},0 Q 1,2 0,${spikeDist} Q -1,2 -${spikeDist},0 Q -1,-2 0,-${spikeDist} Z" fill="#FFFFFF" opacity="0.9" />`
            : ''
        }
      </g>`;
    })
    .join('\n');

  // Constellation connecting lines
  const lineElements = config.edges
    .map((e) => {
      const sA = config.stars[e.from];
      const sB = config.stars[e.to];
      if (!sA || !sB) return '';
      const x1 = (sA.x * width).toFixed(1);
      const y1 = (sA.y * height).toFixed(1);
      const x2 = (sB.x * width).toFixed(1);
      const y2 = (sB.y * height).toFixed(1);
      return `      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${config.starTint}" stroke-width="1.6" stroke-opacity="${config.lineOpacity.toFixed(2)}" stroke-linecap="round" />`;
    })
    .filter(Boolean)
    .join('\n');

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script>
    (function() {
      try {
        var _origFetch = window.fetch;
        var _currentFetch = _origFetch;
        Object.defineProperty(window, 'fetch', {
          get: function() { return _currentFetch; },
          set: function(fn) { _currentFetch = fn; },
          configurable: true,
          enumerable: true
        });
      } catch (e) {}
    })();
  </script>
  <title>${config.titleText || 'MemConstella'} — Animated Logo</title>
  <style>
    /* Reset & Deep Space Background */
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: ${config.backgroundColor};
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: '${config.fontFamily}', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      overflow: hidden;
    }

    .logo-container {
      width: 100%;
      max-width: ${width}px;
      padding: 1.5rem;
      margin: auto;
    }

    svg {
      width: 100%;
      height: auto;
      display: block;
      overflow: visible;
    }

    /* Moving Gradient Animation */
    @keyframes gradientShift {
      0% {
        stop-color: ${c0};
      }
      25% {
        stop-color: ${c1};
      }
      50% {
        stop-color: ${c2};
      }
      75% {
        stop-color: ${c3};
      }
      100% {
        stop-color: ${c0};
      }
    }

    .stop-1 { animation: gradientShift ${loopDuration}s infinite ease-in-out; }
    .stop-2 { animation: gradientShift ${loopDuration}s infinite ease-in-out; animation-delay: -${(loopDuration * 0.25).toFixed(2)}s; }
    .stop-3 { animation: gradientShift ${loopDuration}s infinite ease-in-out; animation-delay: -${(loopDuration * 0.50).toFixed(2)}s; }
    .stop-4 { animation: gradientShift ${loopDuration}s infinite ease-in-out; animation-delay: -${(loopDuration * 0.75).toFixed(2)}s; }

    /* Twinkling Star Animation */
    @keyframes starTwinkle {
      0%, 100% {
        transform: scale(0.75);
        opacity: ${(1 - config.twinkleIntensity * 0.55).toFixed(2)};
      }
      50% {
        transform: scale(1.35);
        opacity: 1;
        filter: drop-shadow(0 0 10px #FFFFFF);
      }
    }

    .star-anim {
      transform-box: fill-box;
      transform-origin: center;
      animation-name: starTwinkle;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
    }

    /* Pulsing Outer Nebula Glow */
    @keyframes nebulaPulse {
      0%, 100% { opacity: ${(0.35 * config.nebulaIntensity).toFixed(2)}; transform: scale(1); }
      50% { opacity: ${(0.75 * config.nebulaIntensity).toFixed(2)}; transform: scale(1.08); }
    }

    .nebula-glow {
      transform-origin: center;
      animation: nebulaPulse ${loopDuration}s infinite ease-in-out;
    }

    /* Logo Text Glow */
    .brand-title {
      font-family: '${config.fontFamily}', sans-serif;
      font-weight: 700;
      font-size: ${(48 * config.titleScale).toFixed(1)}px;
      letter-spacing: -0.5px;
      filter: drop-shadow(0 0 ${(14 * config.textGlowIntensity).toFixed(1)}px ${config.glowColor});
    }

    .brand-subtitle {
      font-family: '${config.fontFamily}', sans-serif;
      font-weight: 400;
      font-size: ${(14.5 * config.subtitleScale).toFixed(1)}px;
      fill: ${config.subtitleColor};
      letter-spacing: 0.3px;
    }
  </style>
</head>
<body>

  <div class="logo-container">
    <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Flowing Linear Gradient for Title Text -->
        <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" class="stop-1" stop-color="${c0}" />
          <stop offset="35%" class="stop-2" stop-color="${c1}" />
          <stop offset="70%" class="stop-3" stop-color="${c2}" />
          <stop offset="100%" class="stop-4" stop-color="${c3}" />
        </linearGradient>

        <!-- Star Glow Radial Gradient -->
        <radialGradient id="star-glow-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1" />
          <stop offset="35%" stop-color="${config.starTint}" stop-opacity="0.75" />
          <stop offset="100%" stop-color="${c1}" stop-opacity="0" />
        </radialGradient>

        <!-- Nebula Cloud Radial Gradients -->
        <radialGradient id="nebula-1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${c0}" stop-opacity="0.32" />
          <stop offset="60%" stop-color="${c1}" stop-opacity="0.12" />
          <stop offset="100%" stop-color="${config.backgroundColor}" stop-opacity="0" />
        </radialGradient>

        <radialGradient id="nebula-2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${c1}" stop-opacity="0.35" />
          <stop offset="70%" stop-color="${c2}" stop-opacity="0.1" />
          <stop offset="100%" stop-color="${config.backgroundColor}" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- Atmospheric Nebula Background -->
      <g class="nebula-glow">
        <ellipse cx="${(width * 0.38).toFixed(1)}" cy="${(height * 0.54).toFixed(1)}" rx="${(width * 0.32).toFixed(1)}" ry="${(height * 0.42).toFixed(1)}" fill="url(#nebula-1)" />
        <ellipse cx="${(width * 0.82).toFixed(1)}" cy="${(height * 0.32).toFixed(1)}" rx="${(width * 0.28).toFixed(1)}" ry="${(height * 0.38).toFixed(1)}" fill="url(#nebula-2)" />
      </g>

      <!-- Constellation Connecting Lines -->
      <g class="constellation-lines">
${lineElements}
      </g>

      <!-- Constellation Stars -->
      <g class="constellation-stars">
${starElements}
      </g>

      <!-- Brand Typography -->
      <g text-anchor="middle">
        <text x="${(width * 0.475).toFixed(1)}" y="${(height * 0.55).toFixed(1)}" fill="url(#flow-gradient)" class="brand-title">
          ${config.titleText || 'MemConstella'}
        </text>
        ${
          config.subtitleText
            ? `<text x="${(width * 0.475).toFixed(1)}" y="${(height * 0.77).toFixed(1)}" class="brand-subtitle">
          ${config.subtitleText}
        </text>`
            : ''
        }
      </g>
    </svg>
  </div>

</body>
</html>`;
}

export function generateCanvasJsHtml(config: LogoStudioConfig, width = 900, height = 360): string {
  const [c0, c1, c2, c3] = config.gradientColors;
  const starsJson = JSON.stringify(config.stars, null, 2);
  const edgesJson = JSON.stringify(config.edges, null, 2);

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script>
    (function() {
      try {
        var _origFetch = window.fetch;
        var _currentFetch = _origFetch;
        Object.defineProperty(window, 'fetch', {
          get: function() { return _currentFetch; },
          set: function(fn) { _currentFetch = fn; },
          configurable: true,
          enumerable: true
        });
      } catch (e) {}
    })();
  </script>
  <title>${config.titleText || 'MemConstella'} — High Performance Canvas Animation</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: ${config.backgroundColor};
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: '${config.fontFamily}', -apple-system, sans-serif;
      overflow: hidden;
    }
    .wrapper {
      width: 100%;
      max-width: ${width}px;
      padding: 1rem;
    }
    canvas {
      width: 100%;
      height: auto;
      display: block;
      border-radius: 12px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.6);
    }
  </style>
</head>
<body>

  <div class="wrapper">
    <canvas id="logoCanvas" width="${width}" height="${height}"></canvas>
  </div>

  <script>
    (function() {
      const canvas = document.getElementById('logoCanvas');
      const ctx = canvas.getContext('2d');
      const W = ${width};
      const H = ${height};
      const durationSec = ${config.loopDurationSec};
      const colors = ['${c0}', '${c1}', '${c2}', '${c3}'];
      const glowColor = '${config.glowColor}';
      const starTint = '${config.starTint}';
      const bgColor = '${config.backgroundColor}';
      const titleText = ${JSON.stringify(config.titleText || 'MemConstella')};
      const subtitleText = ${JSON.stringify(config.subtitleText || '')};

      const stars = ${starsJson};
      const edges = ${edgesJson};

      // Ambient background stars
      const ambientStars = Array.from({ length: ${config.ambientStarCount} }, (_, i) => ({
        x: (Math.sin(i * 12.9898 + 78.233) * 43758.5453 % 1 + 1) % 1,
        y: (Math.sin(i * 93.9898 + 12.456) * 23421.6312 % 1 + 1) % 1,
        size: 0.6 + ((i * 17) % 10) * 0.12,
        phase: (i * 0.8) % (Math.PI * 2),
        speed: (i % 2) + 1
      }));

      function hexToRgb(hex) {
        const c = hex.replace('#', '');
        const num = parseInt(c.length === 3 ? c.split('').map(x=>x+x).join('') : c, 16);
        return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
      }

      function rgba(hex, a) {
        const { r, g, b } = hexToRgb(hex);
        return 'rgba(' + r + ',' + g + ',' + b + ',' + Math.max(0, Math.min(1, a)) + ')';
      }

      function drawStar(cx, cy, radius, twinkle, hasSpikes, spikeScale) {
        ctx.save();
        const r = radius * (0.75 + 0.45 * twinkle);
        const glowR = r * (hasSpikes ? 6.5 : 4.2) * (0.7 + 0.5 * twinkle);

        const outerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
        outerGlow.addColorStop(0, '#FFFFFF');
        outerGlow.addColorStop(0.25, rgba(starTint, 0.65 * twinkle));
        outerGlow.addColorStop(0.6, rgba(colors[1], 0.2 * twinkle));
        outerGlow.addColorStop(1, rgba(colors[1], 0));
        ctx.fillStyle = outerGlow;
        ctx.beginPath();
        ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
        ctx.fill();

        if (hasSpikes || twinkle > 1.05) {
          const sMult = hasSpikes ? 1.0 : 0.48;
          const hLen = r * 7.5 * spikeScale * sMult * (0.65 + 0.55 * twinkle);
          const vLen = r * 7.0 * spikeScale * sMult * (0.65 + 0.55 * twinkle);
          const thick = Math.max(1.1, r * 0.55);

          ctx.fillStyle = rgba('#FFFFFF', Math.min(1, 0.72 + 0.28 * twinkle));
          ctx.beginPath();
          ctx.moveTo(cx, cy - vLen);
          ctx.quadraticCurveTo(cx + thick * 0.4, cy - thick * 0.4, cx + hLen, cy);
          ctx.quadraticCurveTo(cx + thick * 0.4, cy + thick * 0.4, cx, cy + vLen);
          ctx.quadraticCurveTo(cx - thick * 0.4, cy + thick * 0.4, cx - hLen, cy);
          ctx.quadraticCurveTo(cx - thick * 0.4, cy - thick * 0.4, cx, cy - vLen);
          ctx.closePath();
          ctx.fill();
        }

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(cx, cy, Math.max(1.2, r * 0.85), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      let startTime = null;

      function frame(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = (timestamp - startTime) / 1000;
        const progress = (elapsed / durationSec) % 1;
        const twoPi = Math.PI * 2;

        // Background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, W, H);

        // Breathing Nebula
        const breath = 0.85 + 0.15 * Math.sin(progress * twoPi);
        const neb1 = ctx.createRadialGradient(W * 0.36, H * 0.54, 0, W * 0.36, H * 0.54, W * 0.42);
        neb1.addColorStop(0, rgba(colors[0], 0.15 * ${config.nebulaIntensity} * breath));
        neb1.addColorStop(0.6, rgba(colors[1], 0.05 * ${config.nebulaIntensity} * breath));
        neb1.addColorStop(1, rgba(bgColor, 0));
        ctx.fillStyle = neb1;
        ctx.fillRect(0, 0, W, H);

        const neb2 = ctx.createRadialGradient(W * 0.82, H * 0.32, 0, W * 0.82, H * 0.32, W * 0.38);
        neb2.addColorStop(0, rgba(colors[1], 0.18 * ${config.nebulaIntensity} * breath));
        neb2.addColorStop(0.6, rgba(colors[2], 0.06 * ${config.nebulaIntensity} * breath));
        neb2.addColorStop(1, rgba(bgColor, 0));
        ctx.fillStyle = neb2;
        ctx.fillRect(0, 0, W, H);

        // Ambient Twinkling Stars
        ambientStars.forEach(st => {
          const wave = Math.sin(progress * twoPi * st.speed + st.phase);
          const alpha = 0.15 + 0.75 * (0.5 + 0.5 * wave) * ${config.twinkleIntensity};
          ctx.fillStyle = rgba('#FFFFFF', alpha);
          ctx.beginPath();
          ctx.arc(st.x * W, st.y * H, st.size, 0, twoPi);
          ctx.fill();
        });

        // Typography
        const cx = W * 0.475;
        const mainY = H * 0.545;
        const subY = H * 0.775;
        const fontPx = Math.min(W * 0.118, H * 0.295) * ${config.titleScale};

        ctx.font = '700 ' + fontPx.toFixed(1) + 'px "${config.fontFamily}", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const metrics = ctx.measureText(titleText);
        const textW = Math.max(200, metrics.width);
        const shift = (progress * ${config.gradientCycles}) % 1;
        const periodW = textW * ${config.gradientSpread};
        const offset = shift * periodW;

        const x0 = (cx - textW / 2) - periodW + offset;
        const grad = ctx.createLinearGradient(x0, mainY - 15, x0 + periodW * 2, mainY + 15);
        grad.addColorStop(0.0, colors[0]);
        grad.addColorStop(0.25, colors[1]);
        grad.addColorStop(0.5, colors[2]);
        grad.addColorStop(0.75, colors[3]);
        grad.addColorStop(1.0, colors[0]);

        // Neon Glow
        ctx.save();
        ctx.shadowColor = rgba(glowColor, 0.75 * ${config.textGlowIntensity});
        ctx.shadowBlur = 24 * ${config.textGlowIntensity};
        ctx.fillStyle = grad;
        ctx.fillText(titleText, cx, mainY);
        ctx.restore();

        // Subtitle
        if (subtitleText) {
          ctx.save();
          const subPx = Math.min(W * 0.0325, H * 0.082) * ${config.subtitleScale};
          ctx.font = '400 ' + subPx.toFixed(1) + 'px "${config.fontFamily}", sans-serif';
          ctx.fillStyle = rgba('${config.subtitleColor}', 0.88);
          ctx.fillText(subtitleText, cx, subY);
          ctx.restore();
        }

        // Constellation Lines
        if (edges.length > 0) {
          ctx.save();
          ctx.strokeStyle = rgba(starTint, 0.45 * ${config.lineOpacity});
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          edges.forEach(e => {
            const sA = stars[e.from];
            const sB = stars[e.to];
            if (sA && sB) {
              ctx.moveTo(sA.x * W, sA.y * H);
              ctx.lineTo(sB.x * W, sB.y * H);
            }
          });
          ctx.stroke();
          ctx.restore();
        }

        // Constellation Stars
        stars.forEach((st, i) => {
          const cycles = Math.max(1, Math.round(st.cycles * ${config.twinkleSpeedMultiplier}));
          const wave = Math.sin(progress * twoPi * cycles + st.phase);
          const twinkle = 1.0 - ${config.twinkleIntensity} * 0.5 + ${config.twinkleIntensity} * 0.85 * (0.5 + 0.5 * wave);
          drawStar(st.x * W, st.y * H, 4.2 * st.magnitude, twinkle, st.hasSpikes, ${config.spikeLength});
        });

        requestAnimationFrame(frame);
      }

      requestAnimationFrame(frame);
    })();
  </script>
</body>
</html>`;
}
