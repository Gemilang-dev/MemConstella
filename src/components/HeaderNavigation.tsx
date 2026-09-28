import React from 'react';
import { AppArea } from '../types';
import {
  Building,
  ShieldCheck,
  Volume2,
  VolumeX,
  Compass,
  Lock
} from 'lucide-react';

interface HeaderNavigationProps {
  currentArea: AppArea;
  onSelectArea: (area: AppArea) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isQuizActive?: boolean;
}

export const HeaderNavigation: React.FC<HeaderNavigationProps> = ({
  currentArea,
  onSelectArea,
  isMuted,
  onToggleMute,
  isQuizActive = false
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 shadow-lg">
      {/* Brand Title */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
          <Compass className="w-5 h-5 animate-[spin_12s_linear_infinite]" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-extrabold tracking-tight text-white">
              MemConstella
            </span>
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
              v2.1
            </span>
          </div>
          <div className="text-[10px] text-slate-400 hidden sm:block">
            Constellation Memory & CPU Register Missions
          </div>
        </div>
      </div>

      {/* Main Room Navigation */}
      <div className="flex items-center gap-2">
        {isQuizActive && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold animate-pulse">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Station Locked: Select & Lock Answer to Proceed</span>
            <span className="md:hidden">Locked</span>
          </div>
        )}

        <nav className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-2xl border border-slate-800 overflow-x-auto max-w-full">
          {/* Room A */}
          <button
            id="nav-btn-room-a"
            disabled={isQuizActive}
            onClick={() => onSelectArea('room_a')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
              isQuizActive
                ? 'opacity-40 cursor-not-allowed text-slate-500'
                : currentArea === 'room_a'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
            title={isQuizActive ? 'Station locked during active quiz' : 'Open Room A'}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Room A</span>
          </button>

          {/* Room B */}
          <button
            id="nav-btn-room-b"
            disabled={isQuizActive}
            onClick={() => onSelectArea('room_b')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
              isQuizActive
                ? 'opacity-40 cursor-not-allowed text-slate-500'
                : currentArea === 'room_b'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
            title={isQuizActive ? 'Station locked during active quiz' : 'Open Room B'}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Room B</span>
          </button>

          {/* Room C */}
          <button
            id="nav-btn-room-c"
            disabled={isQuizActive}
            onClick={() => onSelectArea('room_c')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
              isQuizActive
                ? 'opacity-40 cursor-not-allowed text-slate-500'
                : currentArea === 'room_c'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
            title={isQuizActive ? 'Station locked during active quiz' : 'Open Room C'}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Room C</span>
          </button>

          {/* Room D */}
          <button
            id="nav-btn-room-d"
            disabled={isQuizActive}
            onClick={() => onSelectArea('room_d')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
              isQuizActive
                ? 'opacity-40 cursor-not-allowed text-slate-500'
                : currentArea === 'room_d'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
            title={isQuizActive ? 'Station locked during active quiz' : 'Open Room D'}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Room D</span>
          </button>

          <div className="h-4 w-px bg-slate-800 mx-0.5" />

          {/* Teacher Dashboard */}
          <button
            id="nav-btn-teacher"
            disabled={isQuizActive}
            onClick={() => onSelectArea('teacher_dashboard')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
              isQuizActive
                ? 'opacity-40 cursor-not-allowed text-slate-500'
                : currentArea === 'teacher_dashboard'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-amber-400/80 hover:text-amber-300 hover:bg-slate-800/60'
            }`}
            title={isQuizActive ? 'Station locked during active quiz' : 'Open Teacher Monitor Dashboard'}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>
        </nav>
      </div>

      {/* Utility Audio Mute */}
      <div className="flex items-center gap-1.5">
        <button
          id="nav-btn-audio-mute"
          onClick={onToggleMute}
          className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
        </button>
      </div>
    </header>
  );
};
