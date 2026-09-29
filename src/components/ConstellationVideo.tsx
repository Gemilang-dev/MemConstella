import React, { useState, useEffect } from 'react';
import { Constellation } from '../types';
import { useGameData } from '../contexts/GameDataContext';
import { X, Play, Pause, RotateCcw, Compass } from 'lucide-react';

interface ConstellationVideoProps {
  onClose: () => void;
}

export const ConstellationVideo: React.FC<ConstellationVideoProps> = ({ onClose }) => {
  const { gameData } = useGameData();
  const constellations = gameData.constellations;
  const totalDuration = constellations.length * 10; // 10 seconds per constellation
  
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setCurrentTime(t => {
          if (t >= totalDuration) {
            return 0;
          }
          return t + 0.1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalDuration]);


  const activeConstellationIndex = Math.min(
    Math.floor(currentTime / 10),
    constellations.length - 1
  );
  
  const activeConstellation = constellations[activeConstellationIndex];
  const localTime = currentTime % 10;
  
  // Each color blinks for 2 seconds (5 colors = 10s total)
  const activeStarIndex = Math.floor(localTime / 2);
  const activeStar = activeConstellation.stars[activeStarIndex];

  return (
    <div className="fixed inset-0 z-[100] bg-black text-white flex flex-col overflow-hidden">
      {/* Top Header */}
      <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-between p-4 md:p-6 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
            <Compass className="w-7 h-7 animate-[spin_10s_linear_infinite]" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Global Observation Mode</h2>
            <p className="text-xs md:text-sm text-indigo-300">
              Constellation {activeConstellationIndex + 1} of {constellations.length}: {activeConstellation.name} ({activeConstellation.latinName})
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-3 bg-rose-600/20 text-rose-300 hover:bg-rose-600 hover:text-white rounded-full transition-all border border-rose-500/30"
          title="Close Video"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Video Area */}
      <div className="relative flex-1 w-full h-full bg-[#030712]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-[#030712] to-black" />
        
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="led-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" result="blur1" />
              <feGaussianBlur stdDeviation="3" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Constellation Lines */}
          {activeConstellation.lines.map((line, idx) => {
            const s1 = activeConstellation.stars.find((s) => s.id === line.from);
            const s2 = activeConstellation.stars.find((s) => s.id === line.to);
            if (!s1 || !s2) return null;
            return (
              <line
                key={`line-${idx}`}
                x1={`${s1.x}%`}
                y1={`${s1.y}%`}
                x2={`${s2.x}%`}
                y2={`${s2.y}%`}
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="0.15"
                strokeDasharray="0.5, 0.5"
              />
            );
          })}

          {/* Stars */}
          {activeConstellation.stars.map((star) => {
            // Check if this star is the active one in the sequence (blinking for 2s)
            const isActive = isPlaying && activeStar?.id === star.id && star.assignedRegister;
            const regData = star.assignedRegister ? gameData.registers[star.assignedRegister] : null;
            const regColor = regData ? regData.hex : '#ffffff';
            const regName = regData ? regData.name : star.assignedRegister;

            return (
              <g key={star.id} className="transition-all duration-300">
                {isActive && (
                  <circle
                    cx={`${star.x}%`}
                    cy={`${star.y}%`}
                    r="2"
                    fill={regColor}
                    filter="url(#led-glow)"
                    className="animate-[pulse_0.4s_ease-in-out_infinite]"
                  />
                )}
                <circle
                  cx={`${star.x}%`}
                  cy={`${star.y}%`}
                  r={isActive ? "1" : "0.5"}
                  fill={isActive ? "#ffffff" : "rgba(255, 255, 255, 0.25)"}
                  stroke={isActive ? regColor : "transparent"}
                  strokeWidth="0.2"
                />
                {isActive && (
                  <text
                    x={`${star.x}%`}
                    y={`${star.y - 4}%`}
                    textAnchor="middle"
                    fill={regColor}
                    fontSize="3"
                    fontWeight="800"
                    className="animate-[pulse_1s_ease-in-out_infinite]"
                    style={{ textShadow: `0 0 2px ${regColor}, 0 0 5px ${regColor}` }}
                  >
                    {regName}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>


    </div>
  );
};
