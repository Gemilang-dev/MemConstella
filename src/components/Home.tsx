import React from 'react';
import { useGameData } from '../contexts/GameDataContext';
import { AppArea } from '../types';
import { Rocket, Edit3, Library } from 'lucide-react';

interface HomeProps {
  onStart: (area: AppArea) => void;
}

export const Home: React.FC<HomeProps> = ({ onStart }) => {
  const { resetToDefault } = useGameData();

  const startDefault = () => {
    resetToDefault();
    onStart('setup');
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#020617] text-white overflow-y-auto">
      <div className="max-w-2xl w-full bg-slate-900/80 p-8 rounded-3xl border border-slate-800 text-center space-y-8 shadow-2xl">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight">MemConstella</h1>
          <p className="text-slate-400">Choose your learning material below to start the session.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={startDefault}
            className="p-6 rounded-2xl bg-blue-950/40 border border-blue-900/60 hover:bg-blue-900/60 hover:border-blue-700/80 transition-all flex flex-col items-center justify-center gap-3 group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Rocket className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-md text-slate-200">Register CPU</h3>
              <p className="text-xs text-slate-500">Built-in IT architecture material</p>
            </div>
          </button>

          <button
            onClick={() => onStart('custom_builder')}
            className="p-6 rounded-2xl bg-purple-950/40 border border-purple-900/60 hover:bg-purple-900/60 hover:border-purple-700/80 transition-all flex flex-col items-center justify-center gap-3 group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Edit3 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-md text-slate-200">Create Custom</h3>
              <p className="text-xs text-slate-500">Build your own game package</p>
            </div>
          </button>

          <button
            onClick={() => onStart('play_custom')}
            className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-900/60 hover:bg-emerald-900/60 hover:border-emerald-700/80 transition-all flex flex-col items-center justify-center gap-3 group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Library className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-md text-slate-200">Play Games</h3>
              <p className="text-xs text-slate-500">Load saved custom packages</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
