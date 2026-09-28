import React, { useState } from 'react';
import { Users, Play, Trash2, ArrowLeft } from 'lucide-react';
import { saveStudentRoster, resetGameRecords } from '../utils/storage';
import { AppArea } from '../types';

interface GameSetupProps {
  onBack: () => void;
  onStart: (area: AppArea) => void;
}

export const GameSetup: React.FC<GameSetupProps> = ({ onBack, onStart }) => {
  const [namesText, setNamesText] = useState('');
  
  const handleStart = () => {
    // Parse names by comma or newline
    const namesList = namesText
      .split(/[\n,]+/)
      .map(n => n.trim())
      .filter(n => n.length > 0);
      
    if (namesList.length === 0) {
      alert("Please enter at least one student name to begin.");
      return;
    }

    // Overwrite the existing roster and reset progress
    saveStudentRoster(namesList);
    resetGameRecords();
    
    onStart('teacher_dashboard');
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#020617] text-white overflow-y-auto">
      <div className="max-w-2xl w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-8">
        <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
          <button onClick={onBack} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-400" />
              Class Roster Setup
            </h2>
            <p className="text-sm text-slate-400">Enter the names of the students who will play this session.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">Student Names</label>
            <p className="text-xs text-slate-500">You can separate names with commas or press Enter for a new line.</p>
            <textarea
              className="w-full h-48 bg-slate-950 border border-slate-700 rounded-xl p-4 text-sm focus:border-blue-500 outline-none resize-none leading-relaxed"
              placeholder="e.g. John Doe, Jane Smith&#10;Alice&#10;Bob"
              value={namesText}
              onChange={(e) => setNamesText(e.target.value)}
            />
          </div>
          
          <div className="bg-amber-950/30 border border-amber-900/50 p-4 rounded-xl flex items-start gap-3">
            <Trash2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-200/70">
              <strong className="text-amber-400 block mb-1">Warning: Progress will be reset.</strong>
              Starting a new session will clear all previous attempts, points, and lockouts for the previous roster.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={handleStart}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)]"
          >
            Start Mission <Play className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
