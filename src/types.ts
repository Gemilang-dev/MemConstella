export type CPURegister = 'PC' | 'IR' | 'MAR' | 'MDR' | 'ACC';

export type RoomId = 'A' | 'B' | 'C' | 'D';
export type RoomNumber = 1 | 2 | 3 | 4;

export const ROOM_MAPPING: Record<RoomNumber, RoomId> = {
  1: 'A',
  2: 'B',
  3: 'C',
  4: 'D'
};

export const ROOM_NUMBERS: Record<RoomId, RoomNumber> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4
};

export interface RegisterInfo {
  code: CPURegister;
  name: string;
  colorName: string;
  hex: string;
  glowHex: string;
  badgeClass: string;
  shortDesc: string;
  fullDesc: string;
  roleInCycle: string;
}

export interface StarPoint {
  id: number;
  labelNumber: number; // The number displayed in quiz
  x: number; // 0 to 100 percentage
  y: number; // 0 to 100 percentage
  size?: number; // 1 to 3
  // Dedicated CPU Register color that illuminates in the video:
  assignedRegister?: CPURegister;
}

export interface ConstellationConnection {
  from: number;
  to: number;
}

export interface Constellation {
  id: string;
  name: string;
  latinName: string;
  subtitle: string;
  description: string;
  lore: string;
  stars: StarPoint[];
  lines: ConstellationConnection[];
  accentColor: string;
}

export interface MemoryQuestion {
  id: string;
  roomNumber: RoomNumber;
  roomId: RoomId;
  constellationId: string;
  title: string;
  storyScenario: string;
  questionText: string;
  targetRegister: CPURegister;
  targetStarNumber: number; // The numbered star on this constellation that has this register color
  hint: string;
  explanation: string;
}

export type RoomStatus = 'available' | 'locked_out' | 'completed';

export interface StudentRoomAttempt {
  roomNumber: RoomNumber;
  roomId: RoomId;
  status: RoomStatus;
  selectedStarNumber?: number;
  correctStarNumber?: number;
  assignedConstellationId?: string;
  timestamp: number;
}

export interface StudentRecord {
  id: string;
  name: string;
  attempts: Record<RoomNumber, StudentRoomAttempt>; // key is roomNumber 1,2,3,4 (Room A, B, C, D)
  successfulRooms: RoomNumber[]; // e.g. [1, 3] -> 2 completed!
  isFullPoint: boolean; // achieved 2 of 4 rooms
  registeredAt: number;
}

export type AppArea = 'home' | 'setup' | 'room_a' | 'room_b' | 'room_c' | 'room_d' | 'teacher_dashboard' | 'custom_builder' | 'play_custom';
