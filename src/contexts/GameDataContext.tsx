import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CPU_REGISTERS } from '../data/registers';
import { ROOM_TEMPLATES, getStudentQuestionForRoom as defaultGetStudentQuestionForRoom, getStudentConstellation as defaultGetStudentConstellation } from '../data/questions';
import { CONSTELLATIONS } from '../data/constellations';

export interface GameData {
  registers: any;
  roomTemplates: any;
  constellations: any;
  getQuestion: (studentName: string, roomNumber: number) => any;
  getConstellation: (studentName: string, roomNumber: number) => any;
}

const defaultGameData: GameData = {
  registers: CPU_REGISTERS,
  roomTemplates: ROOM_TEMPLATES,
  constellations: CONSTELLATIONS,
  getQuestion: defaultGetStudentQuestionForRoom,
  getConstellation: defaultGetStudentConstellation
};

interface GameDataContextType {
  gameData: GameData;
  setCustomGameData: (data: any) => void;
  resetToDefault: () => void;
  isCustom: boolean;
}

const GameDataContext = createContext<GameDataContextType | undefined>(undefined);

export const GameDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameData, setGameData] = useState<GameData>(defaultGameData);
  const [isCustom, setIsCustom] = useState(false);

  const setCustomGameData = (customData: any) => {
    // Basic wrapper to adapt custom JSON into our expected functions
    const customGetConstellation = (studentName: string, roomNumber: number) => {
      // simplified logic: just return first or matching constellation from customData.constellations
      return customData.constellations[(roomNumber - 1) % customData.constellations.length];
    };

    const customGetQuestion = (studentName: string, roomNumber: number) => {
      let template = customData.roomTemplates[roomNumber];
      if (Array.isArray(template)) {
        let hash = 0;
        for (let i = 0; i < studentName.length; i++) {
          hash = studentName.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % template.length;
        template = template[index];
      }
      const constellation = customGetConstellation(studentName, roomNumber);
      const regInfo = customData.registers[template.targetRegister];
      const targetStar = constellation.stars.find((s: any) => s.assignedRegister === template.targetRegister);
      const targetStarNumber = targetStar ? targetStar.labelNumber : 1;

      return {
        question: {
          id: `q-custom-${roomNumber}-${studentName}`,
          roomNumber,
          roomId: template.roomId || 'Custom',
          constellationId: constellation.id,
          title: template.title,
          storyScenario: template.storyScenario,
          questionText: template.questionText.replace('{name}', constellation.name).replace('{latin}', constellation.latinName),
          targetRegister: template.targetRegister,
          targetStarNumber,
          hint: template.roleHint,
          explanation: `The component is ${regInfo.name}, which corresponds to Star #${targetStarNumber} in ${regInfo.colorName} phase.`
        },
        constellation
      };
    };

    setGameData({
      registers: customData.registers,
      roomTemplates: customData.roomTemplates,
      constellations: customData.constellations,
      getQuestion: customGetQuestion,
      getConstellation: customGetConstellation
    });
    setIsCustom(true);
  };

  const resetToDefault = () => {
    setGameData(defaultGameData);
    setIsCustom(false);
  };

  return (
    <GameDataContext.Provider value={{ gameData, setCustomGameData, resetToDefault, isCustom }}>
      {children}
    </GameDataContext.Provider>
  );
};

export const useGameData = () => {
  const context = useContext(GameDataContext);
  if (context === undefined) {
    throw new Error('useGameData must be used within a GameDataProvider');
  }
  return context;
};
