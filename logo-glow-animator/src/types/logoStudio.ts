export interface StarNode {
  id: string;
  name: string;
  /** Normalized X coordinate (0.0 to 1.0) */
  x: number;
  /** Normalized Y coordinate (0.0 to 1.0) */
  y: number;
  /** Base star radius multiplier (0.6 to 2.2) */
  magnitude: number;
  /** Whether this star has prominent 4-point optical diffraction spikes */
  hasSpikes: boolean;
  /** Twinkle phase offset in radians (0 to 2π) */
  phase: number;
  /** Twinkle harmonic cycles per loop (integer 1, 2, or 3 for seamless looping) */
  cycles: number;
}

export interface ConstellationEdge {
  from: number;
  to: number;
}

export interface GradientPreset {
  id: string;
  name: string;
  description: string;
  colors: [string, string, string, string];
  glowColor: string;
  subtitleColor: string;
  starTint: string;
}

export interface ConstellationPreset {
  id: string;
  name: string;
  scientificName: string;
  stars: StarNode[];
  edges: ConstellationEdge[];
}

export type GradientWaveMode = 'linear-flow' | 'bi-aurora' | 'radial-pulse' | 'prism-shimmer';

export type ResolutionPresetId = 'banner-hd' | 'banner-std' | 'widescreen-720p' | 'square-social';

export interface ResolutionPreset {
  id: ResolutionPresetId;
  label: string;
  width: number;
  height: number;
  aspectLabel: string;
}

export type HtmlExportMode = 'svg-css' | 'canvas-js';

export interface LogoStudioConfig {
  // Brand Text
  titleText: string;
  subtitleText: string;
  fontFamily: 'Plus Jakarta Sans' | 'Outfit' | 'Syne';
  titleScale: number; // 0.7 to 1.4
  subtitleScale: number; // 0.7 to 1.4

  // Color Gradient (Gradasi Warna)
  gradientPresetId: string;
  gradientColors: [string, string, string, string];
  glowColor: string;
  subtitleColor: string;
  starTint: string;
  gradientMode: GradientWaveMode;
  gradientCycles: number; // integer 1, 2, 3 for seamless loop
  gradientAngle: number; // degrees
  gradientSpread: number; // 0.6 to 2.5
  textGlowIntensity: number; // 0 to 1
  shimmerSweep: boolean;

  // Constellation & Twinkling Stars (Bintang Berkelap-Kelip)
  constellationPresetId: string;
  stars: StarNode[];
  edges: ConstellationEdge[];
  twinkleIntensity: number; // 0 to 1
  twinkleSpeedMultiplier: number; // 1, 2, 3
  spikeLength: number; // 0.4 to 2.2
  lineOpacity: number; // 0 to 1
  linePulse: boolean; // Energy pulse traveling along constellation lines
  ambientStarCount: number; // 0 to 80
  shootingStars: boolean;

  // Background & Canvas
  backgroundColor: string;
  nebulaIntensity: number; // 0 to 1
  resolutionId: ResolutionPresetId;
  fps: 20 | 24 | 30;
  loopDurationSec: 2 | 3 | 4 | 5;

  // Source mode
  sourceMode: 'vector-master' | 'custom-image-hybrid';
  customImageTintStrength: number; // 0 to 1

  // HTML Export preference
  htmlExportMode: HtmlExportMode;
}

export interface ExportRecord {
  id: string;
  format: 'GIF' | 'WEBM' | 'HTML';
  url: string;
  filename: string;
  width: number;
  height: number;
  fps: number;
  durationSec: number;
  sizeBytes: number;
  createdAt: string;
}

export const RESOLUTION_PRESETS: ResolutionPreset[] = [
  {
    id: 'banner-hd',
    label: 'Logo Banner HD',
    width: 900,
    height: 360,
    aspectLabel: '5:2 Original Ratio',
  },
  {
    id: 'banner-std',
    label: 'Logo Banner Compact',
    width: 700,
    height: 280,
    aspectLabel: '5:2 Fast GIF',
  },
  {
    id: 'widescreen-720p',
    label: 'Widescreen Intro',
    width: 1024,
    height: 576,
    aspectLabel: '16:9 Video',
  },
  {
    id: 'square-social',
    label: 'Social Emblem',
    width: 640,
    height: 640,
    aspectLabel: '1:1 Square',
  },
];

export const GRADIENT_PRESETS: GradientPreset[] = [
  {
    id: 'memconstella-original',
    name: 'MemConstella Original',
    description: 'Lavender mist, celestial sky cyan & soft periwinkle (sesuai logo asli)',
    colors: ['#D6B4FC', '#7DD3FC', '#A5B4FC', '#E0B0FF'],
    glowColor: '#818CF8',
    subtitleColor: '#7E88A4',
    starTint: '#E0F2FE',
  },
  {
    id: 'celestial-aurora',
    name: 'Celestial Aurora',
    description: 'Deep violet, electric cyan, northern emerald & starlight lilac',
    colors: ['#C084FC', '#38BDF8', '#6EE7B7', '#A5B4FC'],
    glowColor: '#38BDF8',
    subtitleColor: '#8492B4',
    starTint: '#CCFBF1',
  },
  {
    id: 'supernova-prism',
    name: 'Supernova Prism',
    description: 'Warm astral gold, nebula rose, cosmic lavender & ice blue',
    colors: ['#FDE68A', '#F9A8D4', '#C4B5FD', '#7DD3FC'],
    glowColor: '#C084FC',
    subtitleColor: '#8B95B0',
    starTint: '#FEF3C7',
  },
  {
    id: 'deep-nebula',
    name: 'Andromeda Rose & Cyan',
    description: 'Magenta nebula, amethyst purple, sapphire blue & icy aqua',
    colors: ['#F472B6', '#C084FC', '#60A5FA', '#67E8F9'],
    glowColor: '#A855F7',
    subtitleColor: '#858FA8',
    starTint: '#F5D0FE',
  },
  {
    id: 'quantum-sapphire',
    name: 'Quantum Sapphire',
    description: 'Pure diamond white, laser cyan, cobalt blue & indigo glow',
    colors: ['#F8FAFC', '#67E8F9', '#38BDF8', '#818CF8'],
    glowColor: '#06B6D4',
    subtitleColor: '#7F8EA8',
    starTint: '#E0F2FE',
  },
];

export const CONSTELLATION_PRESETS: ConstellationPreset[] = [
  {
    id: 'ursa-major-original',
    name: 'Ursa Major (Logo Asli)',
    scientificName: 'Ursa Major · Big Dipper Asterism',
    stars: [
      { id: 's1', name: 'Alkaid', x: 0.778, y: 0.195, magnitude: 1.25, hasSpikes: true, phase: 0.0, cycles: 2 },
      { id: 's2', name: 'Mizar', x: 0.822, y: 0.180, magnitude: 1.15, hasSpikes: false, phase: 1.1, cycles: 2 },
      { id: 's3', name: 'Alioth', x: 0.855, y: 0.228, magnitude: 1.10, hasSpikes: false, phase: 2.3, cycles: 3 },
      { id: 's4', name: 'Megrez', x: 0.884, y: 0.278, magnitude: 1.18, hasSpikes: false, phase: 3.4, cycles: 2 },
      { id: 's5', name: 'Phecda', x: 0.892, y: 0.352, magnitude: 1.15, hasSpikes: false, phase: 4.2, cycles: 2 },
      { id: 's6', name: 'Merak', x: 0.946, y: 0.382, magnitude: 1.55, hasSpikes: true, phase: 0.8, cycles: 2 },
      { id: 's7', name: 'Dubhe', x: 0.960, y: 0.292, magnitude: 1.75, hasSpikes: true, phase: 2.7, cycles: 3 },
    ],
    edges: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 4 },
      { from: 4, to: 5 },
      { from: 5, to: 6 },
      { from: 6, to: 3 },
    ],
  },
  {
    id: 'ursa-cassiopeia-crown',
    name: 'Ursa Major + Cassiopeia',
    scientificName: 'Dual Northern Sky Asterism',
    stars: [
      { id: 's1', name: 'Alkaid', x: 0.778, y: 0.195, magnitude: 1.25, hasSpikes: true, phase: 0.0, cycles: 2 },
      { id: 's2', name: 'Mizar', x: 0.822, y: 0.180, magnitude: 1.15, hasSpikes: false, phase: 1.1, cycles: 2 },
      { id: 's3', name: 'Alioth', x: 0.855, y: 0.228, magnitude: 1.10, hasSpikes: false, phase: 2.3, cycles: 3 },
      { id: 's4', name: 'Megrez', x: 0.884, y: 0.278, magnitude: 1.18, hasSpikes: false, phase: 3.4, cycles: 2 },
      { id: 's5', name: 'Phecda', x: 0.892, y: 0.352, magnitude: 1.15, hasSpikes: false, phase: 4.2, cycles: 2 },
      { id: 's6', name: 'Merak', x: 0.946, y: 0.382, magnitude: 1.55, hasSpikes: true, phase: 0.8, cycles: 2 },
      { id: 's7', name: 'Dubhe', x: 0.960, y: 0.292, magnitude: 1.75, hasSpikes: true, phase: 2.7, cycles: 3 },
      { id: 'c1', name: 'Caph', x: 0.065, y: 0.260, magnitude: 1.35, hasSpikes: true, phase: 1.5, cycles: 2 },
      { id: 'c2', name: 'Schedar', x: 0.105, y: 0.330, magnitude: 1.50, hasSpikes: true, phase: 3.1, cycles: 2 },
      { id: 'c3', name: 'Gamma Cas', x: 0.142, y: 0.245, magnitude: 1.25, hasSpikes: false, phase: 0.4, cycles: 3 },
      { id: 'c4', name: 'Ruchbah', x: 0.182, y: 0.315, magnitude: 1.20, hasSpikes: false, phase: 2.0, cycles: 2 },
      { id: 'c5', name: 'Segin', x: 0.220, y: 0.210, magnitude: 1.40, hasSpikes: true, phase: 4.8, cycles: 2 },
    ],
    edges: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 4 },
      { from: 4, to: 5 },
      { from: 5, to: 6 },
      { from: 6, to: 3 },
      { from: 7, to: 8 },
      { from: 8, to: 9 },
      { from: 9, to: 10 },
      { from: 10, to: 11 },
    ],
  },
  {
    id: 'celestial-arc',
    name: 'Celestial Crown Arc',
    scientificName: 'Corona Borealis & Ursa Major',
    stars: [
      { id: 's1', name: 'Alkaid', x: 0.745, y: 0.175, magnitude: 1.30, hasSpikes: true, phase: 0.0, cycles: 2 },
      { id: 's2', name: 'Mizar', x: 0.798, y: 0.162, magnitude: 1.20, hasSpikes: false, phase: 1.1, cycles: 2 },
      { id: 's3', name: 'Alioth', x: 0.838, y: 0.210, magnitude: 1.20, hasSpikes: true, phase: 2.3, cycles: 3 },
      { id: 's4', name: 'Megrez', x: 0.875, y: 0.268, magnitude: 1.25, hasSpikes: false, phase: 3.4, cycles: 2 },
      { id: 's5', name: 'Phecda', x: 0.886, y: 0.352, magnitude: 1.20, hasSpikes: false, phase: 4.2, cycles: 2 },
      { id: 's6', name: 'Merak', x: 0.944, y: 0.382, magnitude: 1.65, hasSpikes: true, phase: 0.8, cycles: 2 },
      { id: 's7', name: 'Dubhe', x: 0.962, y: 0.285, magnitude: 1.85, hasSpikes: true, phase: 2.7, cycles: 3 },
      { id: 'a1', name: 'Alphecca', x: 0.485, y: 0.165, magnitude: 1.60, hasSpikes: true, phase: 1.9, cycles: 2 },
      { id: 'a2', name: 'Nusakan', x: 0.545, y: 0.135, magnitude: 1.15, hasSpikes: false, phase: 3.8, cycles: 2 },
      { id: 'a3', name: 'Theta CrB', x: 0.610, y: 0.150, magnitude: 1.25, hasSpikes: true, phase: 0.6, cycles: 3 },
    ],
    edges: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 4 },
      { from: 4, to: 5 },
      { from: 5, to: 6 },
      { from: 6, to: 3 },
      { from: 7, to: 8 },
      { from: 8, to: 9 },
    ],
  },
];

export const DEFAULT_STUDIO_CONFIG: LogoStudioConfig = {
  titleText: 'MemConstella',
  subtitleText: 'The Educational Constellation Game',
  fontFamily: 'Plus Jakarta Sans',
  titleScale: 1.0,
  subtitleScale: 1.0,

  gradientPresetId: 'memconstella-original',
  gradientColors: ['#D6B4FC', '#7DD3FC', '#A5B4FC', '#E0B0FF'],
  glowColor: '#818CF8',
  subtitleColor: '#7E88A4',
  starTint: '#E0F2FE',
  gradientMode: 'linear-flow',
  gradientCycles: 1,
  gradientAngle: 12,
  gradientSpread: 1.2,
  textGlowIntensity: 0.68,
  shimmerSweep: true,

  constellationPresetId: 'ursa-major-original',
  stars: CONSTELLATION_PRESETS[0].stars.map((s) => ({ ...s })),
  edges: CONSTELLATION_PRESETS[0].edges.map((e) => ({ ...e })),
  twinkleIntensity: 0.88,
  twinkleSpeedMultiplier: 1,
  spikeLength: 1.25,
  lineOpacity: 0.75,
  linePulse: true,
  ambientStarCount: 28,
  shootingStars: true,

  backgroundColor: '#0B0B1A',
  nebulaIntensity: 0.45,
  resolutionId: 'banner-hd',
  fps: 24,
  loopDurationSec: 3,

  sourceMode: 'vector-master',
  customImageTintStrength: 0.75,

  htmlExportMode: 'svg-css',
};
