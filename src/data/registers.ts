import { CPURegister, RegisterInfo } from '../types';

export const CPU_REGISTERS: Record<CPURegister, RegisterInfo> = {
  PC: {
    code: 'PC',
    name: 'Program Counter',
    colorName: 'Red',
    hex: '#EF4444',
    glowHex: 'rgba(239, 68, 68, 0.85)',
    badgeClass: 'bg-red-500/20 text-red-300 border-red-500/40',
    shortDesc: 'Holds the memory address of the next instruction to be fetched and executed',
    fullDesc: 'The Program Counter (PC) stores the memory address of the next instruction to be fetched from RAM. As each instruction is fetched, the PC is automatically incremented or updated to jump to a target address in branch/jump instructions.',
    roleInCycle: 'Fetch Cycle Start: The address inside PC is copied to MAR to locate the next instruction in RAM.'
  },
  IR: {
    code: 'IR',
    name: 'Instruction Register',
    colorName: 'Yellow',
    hex: '#FACC15',
    glowHex: 'rgba(250, 204, 21, 0.85)',
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    shortDesc: 'Holds the current binary instruction while it is being decoded and executed',
    fullDesc: 'The Instruction Register (IR) latches the binary machine instruction (Opcode and Operands) retrieved from memory. The Control Unit reads and decodes the opcode inside the IR to generate the appropriate control signals.',
    roleInCycle: 'Decode Stage: The Control Unit decodes the opcode held inside IR to orchestrate CPU data paths.'
  },
  MAR: {
    code: 'MAR',
    name: 'Memory Address Register',
    colorName: 'Green',
    hex: '#22C55E',
    glowHex: 'rgba(34, 197, 94, 0.85)',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    shortDesc: 'Holds the physical memory address in RAM currently being accessed for Read or Write',
    fullDesc: 'The Memory Address Register (MAR) is connected directly to the Address Bus. It holds the exact physical RAM location where data or instructions need to be read from or written to by the processor.',
    roleInCycle: 'Memory Access: Driven onto the Address Bus right before initiating a memory read or write cycle.'
  },
  MDR: {
    code: 'MDR',
    name: 'Memory Data Register (MBR)',
    colorName: 'Orange',
    hex: '#F97316',
    glowHex: 'rgba(249, 115, 22, 0.85)',
    badgeClass: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    shortDesc: 'Acts as a two-way buffer holding data/instructions just read from or about to be written to RAM',
    fullDesc: 'The Memory Data Register (MDR), also known as Memory Buffer Register (MBR), connects directly to the Data Bus. It serves as a temporary bidirectional holding area for information travelling between the CPU and main memory.',
    roleInCycle: 'Data Bus Buffer: Holds binary words received from RAM during Fetch, or holds store values before writing.'
  },
  ACC: {
    code: 'ACC',
    name: 'Accumulator',
    colorName: 'Blue',
    hex: '#3B82F6',
    glowHex: 'rgba(59, 130, 246, 0.85)',
    badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    shortDesc: 'Stores immediate arithmetic and logical results computed by the ALU',
    fullDesc: 'The Accumulator (ACC) is the primary general working register coupled directly to the Arithmetic Logic Unit (ALU). Whenever mathematical operations (addition, subtraction, logic) finish, the outcome is placed directly into the ACC.',
    roleInCycle: 'Execute Stage: Holds the first arithmetic operand and collects the immediate computation output from the ALU.'
  }
};

export const REGISTER_SEQUENCE: CPURegister[] = ['PC', 'IR', 'MAR', 'MDR', 'ACC'];
