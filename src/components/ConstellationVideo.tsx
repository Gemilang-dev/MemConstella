import React, { useState, useEffect } from 'react';
import { Constellation } from '../types';
import { useGameData } from '../contexts/GameDataContext';

interface ConstellationVideoProps {
  constellation: Constellation;
  onComplete?: () => void;
}

export const ConstellationVideo: React.FC<ConstellationVideoProps> = ({ constellation, onComplete }) => {
  const { gameData } = useGameData();
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setCurrentTime(t => {
          if (t >= 10) {
            setIsPlaying(false);
            if (onComplete) onComplete();
            return 10;
          }
          return t + 0.1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, onComplete]);

  const handlePlayPause = () => {
    if (currentTime >= 10) setCurrentTime(0);
    setIsPlaying(!isPlaying);
  };

  const activeStarIndex = Math.floor(currentTime / 2);
  const activeStar = constellation.stars[activeStarIndex];

  return (
    <div className="relative flex-1 min-h-[380px] w-full rounded-xl bg-[#030712] border border-slate-800/80 overflow-hidden my-3">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/25 via-[#030712] to-black" />
      
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <button
          onClick={handlePlayPause}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold"
        >
          {isPlaying ? 'Pause' : currentTime >= 10 ? 'Replay' : 'Play Observation Video'}
        </button>
        <div className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs font-mono">
          {currentTime.toFixed(1)}s / 10.0s
        </div>
      </div>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {constellation.lines.map((line, idx) => {
          const s1 = constellation.stars.find((s) => s.id === line.from);
          const s2 = constellation.stars.find((s) => s.id === line.to);
          if (!s1 || !s2) return null;
          return (
            <line
              key={`line-${idx}`}
              x1={`${s1.x}%`}
              y1={`${s1.y}%`}
              x2={`${s2.x}%`}
              y2={`${s2.y}%`}
              stroke="rgba(148, 163, 184, 0.4)"
              strokeWidth="0.6"
              strokeDasharray="1.5, 1.5"
            />
          );
        })}

        {constellation.stars.map((star) => {
          // If this star is the active one in the sequence and has an assigned register, light it up
          const isActive = isPlaying && activeStar?.id === star.id && star.assignedRegister;
          const regData = star.assignedRegister ? gameData.registers[star.assignedRegister] : null;
          const regColor = regData ? regData.hex : '#ffffff';
          const regGlow = regData ? regData.glowHex : 'rgba(255,255,255,0.8)';
          const regName = regData ? regData.name : star.assignedRegister;

          return (
            <g key={star.id} className="transition-all duration-300">
              {isActive && (
                <circle
                  cx={`${star.x}%`}
                  cy={`${star.y}%`}
                  r="6"
                  fill={regGlow}
                  className="animate-pulse origin-center"
                />
              )}
              <circle
                cx={`${star.x}%`}
                cy={`${star.y}%`}
                r="3"
                fill={isActive ? regColor : 'rgba(255, 255, 255, 0.2)'}
                stroke={isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.6)'}
                strokeWidth="0.8"
              />
              {isActive && (
                <text
                  x={`${star.x}%`}
                  y={`${star.y - 6}%`}
                  textAnchor="middle"
                  fill={regColor}
                  fontSize="4"
                  fontWeight="bold"
                  className="animate-bounce"
                >
                  {regName} Phase
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
