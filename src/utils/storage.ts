import { StudentRecord, StudentRoomAttempt, RoomNumber, ROOM_MAPPING } from '../types';
import { STUDENT_ROSTER } from '../data/questions';

const STORAGE_KEY = 'astro_register_roster_v3';
const CHANNEL_NAME = 'astro_register_sync_channel';

let channel: BroadcastChannel | null = null;

try {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    channel = new BroadcastChannel(CHANNEL_NAME);
  }
} catch {
  channel = null;
}

export function loadAllStudentRecords(): Record<string, StudentRecord> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial: Record<string, StudentRecord> = {};
      STUDENT_ROSTER.forEach((name) => {
        initial[name] = {
          id: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          name,
          attempts: {} as Record<RoomNumber, StudentRoomAttempt>,
          successfulRooms: [],
          isFullPoint: false,
          registeredAt: Date.now()
        };
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function saveAllStudentRecords(records: Record<string, StudentRecord>) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    if (channel) {
      channel.postMessage({ type: 'UPDATE_RECORDS', payload: records });
    }
  } catch {
    // Ignore quota errors
  }
}

export function getOrCreateStudentRecord(studentName: string): StudentRecord {
  const records = loadAllStudentRecords();
  const trimmed = studentName.trim();
  if (records[trimmed]) {
    return records[trimmed];
  }
  const newRecord: StudentRecord = {
    id: trimmed.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    name: trimmed,
    attempts: {} as Record<RoomNumber, StudentRoomAttempt>,
    successfulRooms: [],
    isFullPoint: false,
    registeredAt: Date.now()
  };
  records[trimmed] = newRecord;
  saveAllStudentRecords(records);
  return newRecord;
}

export function submitAttempt(
  studentName: string,
  roomNumber: RoomNumber,
  selectedStarNumber: number,
  correctStarNumber: number,
  assignedConstellationId?: string
): { record: StudentRecord; isCorrect: boolean; isNowFullPoint: boolean } {
  const records = loadAllStudentRecords();
  const record = records[studentName.trim()] || getOrCreateStudentRecord(studentName);

  const isCorrect = selectedStarNumber === correctStarNumber;

  const attempt: StudentRoomAttempt = {
    roomNumber,
    roomId: ROOM_MAPPING[roomNumber],
    status: isCorrect ? 'completed' : 'locked_out',
    selectedStarNumber,
    correctStarNumber,
    assignedConstellationId,
    timestamp: Date.now()
  };

  record.attempts[roomNumber] = attempt;

  if (isCorrect) {
    if (!record.successfulRooms.includes(roomNumber)) {
      record.successfulRooms.push(roomNumber);
    }
  }

  const prevFullPoint = record.isFullPoint;
  record.isFullPoint = record.successfulRooms.length >= 2;
  const isNowFullPoint = !prevFullPoint && record.isFullPoint;

  records[record.name] = record;
  saveAllStudentRecords(records);

  return { record, isCorrect, isNowFullPoint };
}

export function resetStudentProgress(studentName: string) {
  const records = loadAllStudentRecords();
  if (records[studentName]) {
    records[studentName].attempts = {} as Record<RoomNumber, StudentRoomAttempt>;
    records[studentName].successfulRooms = [];
    records[studentName].isFullPoint = false;
    saveAllStudentRecords(records);
  }
}

export function resetAllGameData() {
  localStorage.removeItem(STORAGE_KEY);
  loadAllStudentRecords(); // Re-seeds
  if (channel) {
    channel.postMessage({ type: 'RESET_ALL' });
  }
}

export function listenToSync(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handleMessage = () => {
    callback();
  };

  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      callback();
    }
  };

  if (channel) {
    channel.addEventListener('message', handleMessage);
  }
  window.addEventListener('storage', handleStorage);

  return () => {
    if (channel) {
      channel.removeEventListener('message', handleMessage);
    }
    window.removeEventListener('storage', handleStorage);
  };
}

const VIDEO_PASSWORD_KEY = 'astro_video_password';

export function getVideoPassword(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(VIDEO_PASSWORD_KEY);
}

export function setVideoPassword(password: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(VIDEO_PASSWORD_KEY, password);
}

const CUSTOM_GAMES_KEY = 'astro_custom_games';

export interface CustomGamePackage {
  id: string;
  title: string;
  terms: Array<{ code: string; name: string }>;
  rooms: Record<number, {
    targetTerm: string;
    title: string;
    storyScenario: string;
    questionText: string;
    roleHint: string;
  }>;
}

export function loadCustomGames(): CustomGamePackage[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CUSTOM_GAMES_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCustomGame(game: CustomGamePackage) {
  if (typeof window === 'undefined') return;
  const games = loadCustomGames();
  const index = games.findIndex(g => g.id === game.id);
  if (index >= 0) {
    games[index] = game;
  } else {
    games.push(game);
  }
  localStorage.setItem(CUSTOM_GAMES_KEY, JSON.stringify(games));
}

export function deleteCustomGame(id: string) {
  if (typeof window === 'undefined') return;
  const games = loadCustomGames();
  const filtered = games.filter(g => g.id !== id);
  localStorage.setItem(CUSTOM_GAMES_KEY, JSON.stringify(filtered));
}
