import { Constellation } from '../types';

export const CONSTELLATIONS: Constellation[] = [
  {
    id: 'orion',
    name: 'Orion',
    latinName: 'Orion the Hunter',
    subtitle: 'Prominent winter constellation with bright navigational guides',
    description: 'One of the most recognizable constellations in the night sky, featuring the brilliant giant Betelgeuse and Rigel.',
    lore: 'Historically used across world cultures for celestial navigation and tracking the arrival of seasonal cycles.',
    accentColor: '#60A5FA',
    stars: [
      // 0-2s: Red (PC) - Betelgeuse
      { id: 1, labelNumber: 1, x: 28, y: 22, size: 2.9, assignedRegister: 'PC' },
      // 2-4s: Yellow (IR) - Bellatrix
      { id: 2, labelNumber: 2, x: 72, y: 24, size: 2.3, assignedRegister: 'IR' },
      // 4-6s: Green (MAR) - Alnitak
      { id: 3, labelNumber: 3, x: 42, y: 50, size: 2.0, assignedRegister: 'MAR' },
      // 6-8s: Orange (MDR) - Alnilam
      { id: 4, labelNumber: 4, x: 50, y: 50, size: 2.0, assignedRegister: 'MDR' },
      // 8-10s: Blue (ACC) - Mintaka
      { id: 5, labelNumber: 5, x: 58, y: 50, size: 2.0, assignedRegister: 'ACC' },
      { id: 6, labelNumber: 6, x: 32, y: 78, size: 2.2 }, // Saiph (neutral guide star)
      { id: 7, labelNumber: 7, x: 70, y: 76, size: 2.8 }, // Rigel (neutral guide star)
    ],
    lines: [
      { from: 1, to: 3 },
      { from: 2, to: 5 },
      { from: 3, to: 4 },
      { from: 4, to: 5 },
      { from: 3, to: 6 },
      { from: 5, to: 7 },
      { from: 1, to: 2 },
      { from: 6, to: 7 }
    ]
  },
  {
    id: 'ursa_major',
    name: 'Ursa Major',
    latinName: 'The Great Bear / Big Dipper',
    subtitle: 'Northern circumpolar asterism pointing directly to the North Star',
    description: 'Legendary ladle-shaped stellar cluster used by ancient navigators to orient themselves true north.',
    lore: 'Two outer pointer stars (Merak and Dubhe) align directly with Polaris, the celestial north pole anchor.',
    accentColor: '#34D399',
    stars: [
      // 0-2s: Red (PC) - Phecda
      { id: 5, labelNumber: 5, x: 54, y: 66, size: 2.2, assignedRegister: 'PC' },
      // 2-4s: Yellow (IR) - Megrez
      { id: 4, labelNumber: 4, x: 56, y: 46, size: 2.1, assignedRegister: 'IR' },
      // 4-6s: Green (MAR) - Merak
      { id: 6, labelNumber: 6, x: 74, y: 64, size: 2.4, assignedRegister: 'MAR' },
      // 6-8s: Orange (MDR) - Alkaid
      { id: 1, labelNumber: 1, x: 22, y: 32, size: 2.3, assignedRegister: 'MDR' },
      // 8-10s: Blue (ACC) - Dubhe
      { id: 7, labelNumber: 7, x: 76, y: 42, size: 2.7, assignedRegister: 'ACC' },
      { id: 2, labelNumber: 2, x: 34, y: 36, size: 2.1 }, // Mizar
      { id: 3, labelNumber: 3, x: 44, y: 44, size: 2.0 }, // Alioth
    ],
    lines: [
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 4 },
      { from: 4, to: 5 },
      { from: 5, to: 6 },
      { from: 6, to: 7 },
      { from: 7, to: 4 }
    ]
  },
  {
    id: 'cassiopeia',
    name: 'Cassiopeia',
    latinName: 'Cassiopeia the Queen',
    subtitle: 'Prominent W-shaped northern circumpolar constellation',
    description: 'A striking royal crown and throne composed of five brilliantly shining primary navigation stars.',
    lore: 'In mythology, represents Queen Cassiopeia seated high in the heavens rotating endlessly around Polaris.',
    accentColor: '#F472B6',
    stars: [
      // 0-2s: Red (PC) - Gamma Cas
      { id: 3, labelNumber: 3, x: 50, y: 55, size: 2.6, assignedRegister: 'PC' },
      // 2-4s: Yellow (IR) - Caph
      { id: 1, labelNumber: 1, x: 20, y: 65, size: 2.4, assignedRegister: 'IR' },
      // 4-6s: Green (MAR) - Schedar
      { id: 2, labelNumber: 2, x: 35, y: 34, size: 2.8, assignedRegister: 'MAR' },
      // 6-8s: Orange (MDR) - Ruchbah
      { id: 4, labelNumber: 4, x: 68, y: 30, size: 2.3, assignedRegister: 'MDR' },
      // 8-10s: Blue (ACC) - Segin
      { id: 5, labelNumber: 5, x: 80, y: 58, size: 2.2, assignedRegister: 'ACC' },
    ],
    lines: [
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 4 },
      { from: 4, to: 5 }
    ]
  },
  {
    id: 'scorpius',
    name: 'Scorpius',
    latinName: 'Scorpius the Scorpion',
    subtitle: 'Majestic southern zodiac constellation with curved stinger tail',
    description: 'Dominating the southern skies with bright star Antares glowing fiercely like the heart of a cosmic scorpion.',
    lore: 'One of the most distinctive constellations in human astronomical folklore, heralding dry season nights.',
    accentColor: '#F87171',
    stars: [
      // 0-2s: Red (PC) - Antares
      { id: 3, labelNumber: 3, x: 38, y: 44, size: 3.2, assignedRegister: 'PC' },
      // 2-4s: Yellow (IR) - Graffias
      { id: 1, labelNumber: 1, x: 24, y: 22, size: 2.3, assignedRegister: 'IR' },
      // 4-6s: Green (MAR) - Shaula
      { id: 6, labelNumber: 6, x: 72, y: 76, size: 2.4, assignedRegister: 'MAR' },
      // 6-8s: Orange (MDR) - Larawag
      { id: 4, labelNumber: 4, x: 48, y: 58, size: 2.2, assignedRegister: 'MDR' },
      // 8-10s: Blue (ACC) - Sargas
      { id: 5, labelNumber: 5, x: 56, y: 72, size: 2.1, assignedRegister: 'ACC' },
      { id: 2, labelNumber: 2, x: 26, y: 34, size: 2.2 }, // Dschubba
      { id: 7, labelNumber: 7, x: 78, y: 64, size: 2.2 }, // Lesath
    ],
    lines: [
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 4 },
      { from: 4, to: 5 },
      { from: 5, to: 6 },
      { from: 6, to: 7 }
    ]
  },
  {
    id: 'cygnus',
    name: 'Cygnus',
    latinName: 'Cygnus the Cosmic Swan',
    subtitle: 'The Northern Cross soaring gracefully through the plane of the Milky Way',
    description: 'Spanning across the Milky Way with beacon star Deneb forming the tail of the celestial swan.',
    lore: 'Forms the famous Summer Triangle with Vega and Altair, symbolizing the majestic swan in flight.',
    accentColor: '#A78BFA',
    stars: [
      // 0-2s: Red (PC) - Albireo
      { id: 5, labelNumber: 5, x: 50, y: 78, size: 2.4, assignedRegister: 'PC' },
      // 2-4s: Yellow (IR) - Rukh
      { id: 4, labelNumber: 4, x: 78, y: 46, size: 2.2, assignedRegister: 'IR' },
      // 4-6s: Green (MAR) - Gienah
      { id: 3, labelNumber: 3, x: 22, y: 46, size: 2.2, assignedRegister: 'MAR' },
      // 6-8s: Orange (MDR) - Sadr
      { id: 2, labelNumber: 2, x: 50, y: 46, size: 2.4, assignedRegister: 'MDR' },
      // 8-10s: Blue (ACC) - Deneb
      { id: 1, labelNumber: 1, x: 50, y: 20, size: 3.0, assignedRegister: 'ACC' },
    ],
    lines: [
      { from: 1, to: 2 },
      { from: 2, to: 5 },
      { from: 3, to: 2 },
      { from: 2, to: 4 }
    ]
  },
  {
    id: 'crux',
    name: 'Crux',
    latinName: 'Crux / The Southern Cross',
    subtitle: 'The jewel of the southern hemisphere night sky',
    description: 'The smallest yet most famous southern constellation, an essential beacon pointing true south.',
    lore: 'Navigational compass for centuries of maritime explorers across the oceans of the southern hemisphere.',
    accentColor: '#38BDF8',
    stars: [
      // 0-2s: Red (PC) - Acrux
      { id: 1, labelNumber: 1, x: 50, y: 82, size: 2.9, assignedRegister: 'PC' },
      // 2-4s: Yellow (IR) - Gacrux
      { id: 2, labelNumber: 2, x: 50, y: 22, size: 2.6, assignedRegister: 'IR' },
      // 4-6s: Green (MAR) - Mimosa
      { id: 3, labelNumber: 3, x: 30, y: 52, size: 2.7, assignedRegister: 'MAR' },
      // 6-8s: Orange (MDR) - Imai
      { id: 4, labelNumber: 4, x: 72, y: 52, size: 2.3, assignedRegister: 'MDR' },
      // 8-10s: Blue (ACC) - Ginan
      { id: 5, labelNumber: 5, x: 62, y: 64, size: 1.8, assignedRegister: 'ACC' },
    ],
    lines: [
      { from: 1, to: 2 },
      { from: 3, to: 4 }
    ]
  }
];
