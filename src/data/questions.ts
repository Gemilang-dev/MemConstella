import { MemoryQuestion, RoomNumber, RoomId, CPURegister, Constellation, ROOM_MAPPING } from '../types';
import { CONSTELLATIONS } from './constellations';
import { CPU_REGISTERS } from './registers';

export const STUDENT_ROSTER = [
  'Amish Mohamed',
  'Šarić Hanan',
  'Ibrulj Hana',
  'Mešić Emina',
  'Delić Ahmed',
  'Đuderija Hamza'
];

interface RoomTemplate {
  targetRegister: CPURegister;
  title: string;
  storyScenario: string;
  isDirectNamed: boolean; // Only Room C is direct/easy; Room A, B, D are functional challenge
  getQuestionText: (constellationName: string, latinName: string) => string;
  roleHint: string;
}

export const ROOM_TEMPLATES: Record<RoomNumber, RoomTemplate> = {
  1: {
    targetRegister: 'PC',
    title: 'Instruction Sequencing Pointer',
    storyScenario: 'A deep-space exploration vessel is running an automated orbital trajectory program. As the processor completes execution of the current instruction, a vital internal hardware component is automatically incremented or updated to store the memory address of the NEXT instruction waiting to be fetched and executed from RAM.',
    isDirectNamed: false,
    getQuestionText: (name: string, latin: string) =>
      `Based on the functional scenario above, deduce which CPU register is responsible for holding the memory address of the next instruction to be fetched and executed. Then, select the star number on constellation ${name} (${latin}) that illuminated with that register's assigned color in the observation video!`,
    roleHint: 'Recall which register acts as the address pointer for sequential instruction execution, and identify which color illuminated during that register\'s phase.'
  },
  2: {
    targetRegister: 'ACC',
    title: 'ALU Computational Working Register',
    storyScenario: 'An atmospheric climate satellite is computing matrix equations in real time. The Arithmetic Logic Unit (ALU) has just completed a fast addition cycle on sensor telemetry. Instead of transmitting this immediate numerical output across system buses directly to RAM, the processor latches it into its primary working register for subsequent mathematical operations.',
    isDirectNamed: false,
    getQuestionText: (name: string, latin: string) =>
      `Based on the functional scenario above, deduce which CPU register is directly coupled to the ALU to store immediate arithmetic and logical calculation results. Then, select the star number on constellation ${name} (${latin}) that illuminated with that register's assigned color in the observation video!`,
    roleHint: 'Think of the primary accumulator register directly linked to the ALU output that holds intermediate calculation results, and identify its video color.'
  },
  3: {
    targetRegister: 'MDR',
    title: 'Memory Data Register (MDR) Buffer',
    storyScenario: 'The CPU issues an explicit READ pulse to the main memory (RAM) chip. High-speed binary words flow through the bidirectional system Data Bus. Before the processor cores can safely process this raw incoming payload, it must be held in a specialized two-way buffer register.',
    isDirectNamed: true, // Easy/direct room per user request
    getQuestionText: (name: string, latin: string) =>
      `Based on your observation of the video, select the star number on constellation ${name} (${latin}) that illuminated with the color of the Memory Data Register (MDR / MBR)!`,
    roleHint: 'The Memory Data Register (MDR) is color-coded in ORANGE in the observation video.'
  },
  4: {
    targetRegister: 'IR',
    title: 'Instruction Decode Stage Register',
    storyScenario: 'The fetch phase has just concluded, and the CPU transitions into the Instruction Decode stage of the Von Neumann cycle. Before the Control Unit can interpret the binary operation code (Opcode) and dispatch micro-operations across internal data paths, the retrieved machine instruction must be held securely locked inside a dedicated register.',
    isDirectNamed: false,
    getQuestionText: (name: string, latin: string) =>
      `Based on the functional scenario above, deduce which CPU register is responsible for holding the current binary machine instruction while the Control Unit decodes its Opcode. Then, select the star number on constellation ${name} (${latin}) that illuminated with that register's assigned color in the observation video!`,
    roleHint: 'Recall which register holds the instruction currently undergoing decoding by the Control Unit, and identify which color illuminated during that phase.'
  }
};

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Returns a unique, deterministic constellation for this student in this room.
 * In Room A: Amish -> Orion, Hanan -> Ursa Major, Hana -> Cassiopeia, Emina -> Scorpius, Ahmed -> Cygnus, Hamza -> Crux.
 */
export function getStudentConstellation(studentName: string, roomNumber: RoomNumber): Constellation {
  const trimmed = studentName.trim();
  const rosterIdx = STUDENT_ROSTER.findIndex(
    (name) => name.toLowerCase() === trimmed.toLowerCase()
  );

  const baseIndex = rosterIdx >= 0 ? rosterIdx : simpleHash(trimmed);
  // Stagger each room by roomNumber so students get different constellations across rooms as well
  const constellationIndex = (baseIndex + (roomNumber - 1)) % CONSTELLATIONS.length;
  return CONSTELLATIONS[constellationIndex];
}

/**
 * Builds a dynamic MemoryQuestion tailored to the student's assigned constellation for this room.
 * - Room C: Direct/easy (explicitly names Memory Data Register / MDR).
 * - Room A, B, D: Analytical/functional challenge (describes CPU register function, student must deduce register & select star).
 */
export function getStudentQuestionForRoom(
  studentName: string,
  roomNumber: RoomNumber
): { question: MemoryQuestion; constellation: Constellation } {
  const roomId: RoomId = ROOM_MAPPING[roomNumber];
  const template = ROOM_TEMPLATES[roomNumber];
  const constellation = getStudentConstellation(studentName, roomNumber);

  // Find the star in this constellation that is assigned this register
  const targetStar = constellation.stars.find(
    (s) => s.assignedRegister === template.targetRegister
  );

  const targetStarNumber = targetStar ? targetStar.labelNumber : 1;
  const regInfo = CPU_REGISTERS[template.targetRegister];

  const question: MemoryQuestion = {
    id: `q-room-${roomId.toLowerCase()}-${studentName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    roomNumber,
    roomId,
    constellationId: constellation.id,
    title: `Room ${roomId}: ${template.title}`,
    storyScenario: template.storyScenario,
    questionText: template.getQuestionText(constellation.name, constellation.latinName),
    targetRegister: template.targetRegister,
    targetStarNumber,
    hint: template.roleHint,
    explanation: `The component described by this function is the ${regInfo.name} (${regInfo.code}), which illuminated in ${regInfo.colorName.toUpperCase()} in the observation video. On constellation ${constellation.name}, Star #${targetStarNumber} illuminated in ${regInfo.colorName.toUpperCase()}.`
  };

  return { question, constellation };
}
