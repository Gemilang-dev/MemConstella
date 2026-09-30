import React from 'react';
import { useGameData } from '../contexts/GameDataContext';
import { AppArea } from '../types';
import { Cpu, Edit3, Rocket, Star, Sparkles } from 'lucide-react';

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
    <div className="relative flex-1 flex flex-col min-h-screen bg-[#0B0B1A] overflow-y-auto font-sans">
      {/* Background Nebula & Stars */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#C084FC]/10 via-[#0B0B1A] to-[#0B0B1A] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#3B82F6]/10 via-transparent to-transparent pointer-events-none" />
      
      {/* Dynamic Star background simulation */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen" 
           style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Header Navigation */}
      <header className="relative z-10 flex flex-col sm:flex-row items-center justify-between px-8 py-6 w-full max-w-7xl mx-auto gap-4">
        <div className="flex items-center gap-3">
          <Star className="w-8 h-8 text-[#C084FC] fill-[#C084FC] animate-pulse" />
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#C084FC] to-[#3B82F6] bg-clip-text text-transparent">
              MemConstella
            </h1>
            <p className="text-xs text-[#9CA3AF] tracking-widest uppercase mt-1">The Educational Constellation Game</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button className="text-white border-b-2 border-[#C084FC] pb-1 hover:text-[#C084FC] transition-colors">MemeConstella</button>
          <button className="text-[#9CA3AF] hover:text-white transition-colors">Explore</button>
          <button className="text-[#9CA3AF] hover:text-white transition-colors">Leaderboard</button>
          <button className="text-[#9CA3AF] hover:text-white transition-colors">Profile</button>
          <button className="text-[#9CA3AF] hover:text-white transition-colors">Settings</button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-6 pb-20">
        <div className="max-w-5xl w-full bg-[#111128]/60 backdrop-blur-xl p-10 md:p-14 rounded-[2.5rem] border border-white/5 shadow-[0_0_50px_rgba(59,130,246,0.1)] flex flex-col items-center gap-12">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {/* Card 1: Register CPU */}
            <button
              onClick={startDefault}
              className="relative p-8 rounded-[2rem] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 hover:border-[#3B82F6]/50 hover:bg-[#3B82F6]/5 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] transition-all duration-300 flex flex-col items-center text-center gap-6 group"
            >
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-[#3B82F6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#3B82F6]/20 to-[#C084FC]/10 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6] group-hover:scale-110 group-hover:text-white group-hover:shadow-[0_0_30px_#3B82F6] transition-all duration-500 relative">
                <Cpu className="w-12 h-12 relative z-10" />
                <Sparkles className="w-5 h-5 absolute top-3 right-3 text-[#3B82F6] opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity" />
              </div>
              <div className="space-y-2 relative z-10">
                <h3 className="font-bold text-xl text-white">Register CPU</h3>
                <p className="text-sm text-[#9CA3AF] leading-relaxed">Configure Game Settings</p>
              </div>
            </button>

            {/* Card 2: Create Custom */}
            <button
              onClick={() => onStart('custom_builder')}
              className="relative p-8 rounded-[2rem] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 hover:border-[#C084FC]/50 hover:bg-[#C084FC]/5 hover:shadow-[0_0_40px_rgba(192,132,252,0.2)] transition-all duration-300 flex flex-col items-center text-center gap-6 group"
            >
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-[#C084FC]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#C084FC]/20 to-[#3B82F6]/10 border border-[#C084FC]/30 flex items-center justify-center text-[#C084FC] group-hover:scale-110 group-hover:text-white group-hover:shadow-[0_0_30px_#C084FC] transition-all duration-500 relative overflow-hidden">
                <Edit3 className="w-12 h-12 relative z-10" />
                {/* Connecting nodes simulation */}
                <div className="absolute inset-0 bg-[radial-gradient(circle,_#C084FC_2px,_transparent_2px)] bg-[size:16px_16px] opacity-20 group-hover:opacity-40 transition-opacity" />
              </div>
              <div className="space-y-2 relative z-10">
                <h3 className="font-bold text-xl text-white">Create Custom</h3>
                <p className="text-sm text-[#9CA3AF] leading-relaxed">Build Your Own Memory Decks</p>
              </div>
            </button>

            {/* Card 3: Play Games */}
            <button
              onClick={() => onStart('play_custom')}
              className="relative p-8 rounded-[2rem] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 hover:border-violet-400/50 hover:bg-violet-500/5 hover:shadow-[0_0_40px_rgba(139,92,246,0.2)] transition-all duration-300 flex flex-col items-center text-center gap-6 group"
            >
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-500/20 to-[#3B82F6]/10 border border-violet-400/30 flex items-center justify-center text-violet-400 group-hover:scale-110 group-hover:text-white group-hover:shadow-[0_0_30px_#8B5CF6] transition-all duration-500 relative">
                <Rocket className="w-12 h-12 relative z-10" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-t from-violet-500/40 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="space-y-2 relative z-10">
                <h3 className="font-bold text-xl text-white">Play Games</h3>
                <p className="text-sm text-[#9CA3AF] leading-relaxed">Start Your Galactic Memory Adventure</p>
              </div>
            </button>
          </div>

          <p className="text-[#9CA3AF] font-medium tracking-wide text-center">
            Select an option to begin your celestial learning journey!
          </p>
        </div>
      </main>
    </div>
  );
};
