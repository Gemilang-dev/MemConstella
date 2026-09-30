import React, { useState } from 'react';
import { useGameData } from '../contexts/GameDataContext';
import { AppArea } from '../types';
import { Cpu, Edit3, Rocket, Star, Sparkles, Monitor, SplitSquareHorizontal } from 'lucide-react';

type TabView = 'home' | 'how-to-play' | 'how-to-setup' | 'about';

interface HomeProps {
  onStart: (area: AppArea) => void;
}

export const Home: React.FC<HomeProps> = ({ onStart }) => {
  const { resetToDefault } = useGameData();
  const [activeTab, setActiveTab] = useState<TabView>('home');
  const [howToPlayMode, setHowToPlayMode] = useState<'separate' | 'split'>('separate');

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
      <header className="relative z-10 w-full bg-black border-b border-white/10 shadow-lg">
        <div className="flex flex-col sm:flex-row items-center justify-between px-8 py-4 max-w-7xl mx-auto gap-4">
          <div className="flex items-center gap-3">
            <Star className="w-8 h-8 text-[#C084FC] fill-[#C084FC] animate-pulse" />
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#C084FC] to-[#3B82F6] bg-clip-text text-transparent">
                MemConstella
              </h1>
              <p className="text-[10px] md:text-xs text-[#9CA3AF] tracking-widest uppercase mt-1">The Educational Constellation Game</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button 
              onClick={() => setActiveTab('home')}
              className={`pb-1 transition-colors ${activeTab === 'home' ? 'text-white border-b-2 border-[#C084FC]' : 'text-[#9CA3AF] hover:text-[#C084FC]'}`}>
              Home
            </button>
            <button 
              onClick={() => setActiveTab('how-to-play')}
              className={`pb-1 transition-colors ${activeTab === 'how-to-play' ? 'text-white border-b-2 border-[#C084FC]' : 'text-[#9CA3AF] hover:text-[#C084FC]'}`}>
              How to play
            </button>
            <button 
              onClick={() => setActiveTab('how-to-setup')}
              className={`pb-1 transition-colors ${activeTab === 'how-to-setup' ? 'text-white border-b-2 border-[#C084FC]' : 'text-[#9CA3AF] hover:text-[#C084FC]'}`}>
              How to setup
            </button>
            <button 
              onClick={() => setActiveTab('about')}
              className={`pb-1 transition-colors ${activeTab === 'about' ? 'text-white border-b-2 border-[#C084FC]' : 'text-[#9CA3AF] hover:text-[#C084FC]'}`}>
              About
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-6 pb-20">
        
        {/* ========================================================================
            HOME TAB
            ======================================================================== */}
        {activeTab === 'home' && (
          <div className="max-w-5xl w-full bg-[#111128]/60 backdrop-blur-xl p-10 md:p-14 rounded-[2.5rem] border border-white/5 shadow-[0_0_50px_rgba(59,130,246,0.1)] flex flex-col items-center gap-12 animate-in fade-in zoom-in-95 duration-500">
            {/* Animated Banner */}
            <div className="w-full max-w-[900px] mx-auto mb-2">
              <img 
                src="/memconstella-animated-900x360.gif" 
                alt="MemConstella Banner" 
                className="w-full h-auto rounded-[1.5rem] border border-white/10 shadow-2xl"
              />
            </div>

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
        )}

        {/* ========================================================================
            HOW TO PLAY TAB
            ======================================================================== */}
        {activeTab === 'how-to-play' && (
          <div className="max-w-4xl w-full bg-[#111128]/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-[0_0_50px_rgba(192,132,252,0.1)] flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-extrabold text-white">How to Play in Class</h2>
              <p className="text-[#9CA3AF]">
                Terdapat dua opsi atau cara bermain bersama siswa menggunakan animasi rasi bintang. Silakan pilih mode yang sesuai dengan kondisi kelas Anda.
              </p>
            </div>

            {/* Mode Selection Toggle */}
            <div className="flex p-1.5 bg-[#0B0B1A] rounded-2xl border border-white/10 w-full max-w-md mx-auto">
              <button
                onClick={() => setHowToPlayMode('separate')}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  howToPlayMode === 'separate' 
                    ? 'bg-[#3B82F6]/20 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                    : 'text-[#9CA3AF] hover:text-white hover:bg-white/5'
                }`}
              >
                <Monitor className="w-4 h-4" />
                Layar Terpisah
              </button>
              <button
                onClick={() => setHowToPlayMode('split')}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  howToPlayMode === 'split' 
                    ? 'bg-[#C084FC]/20 text-white shadow-[0_0_15px_rgba(192,132,252,0.3)]' 
                    : 'text-[#9CA3AF] hover:text-white hover:bg-white/5'
                }`}
              >
                <SplitSquareHorizontal className="w-4 h-4" />
                Tidak Terpisah
              </button>
            </div>

            {/* Content for Separate Screen (Proyektor) */}
            {howToPlayMode === 'separate' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-in fade-in duration-500">
                <div className="order-2 md:order-1 space-y-6">
                  <h3 className="text-xl font-bold text-[#3B82F6]">1. Layar Terpisah (Proyektor Kelas)</h3>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed">
                    Opsi ini sangat ideal untuk permainan interaktif terpusat di dalam kelas. Guru memutar animasi rasi bintang di proyektor besar, sementara siswa mengerjakan soal di layar mereka masing-masing.
                  </p>
                  <ul className="space-y-4 text-sm text-slate-300">
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#3B82F6]/20 text-[#3B82F6] flex items-center justify-center shrink-0 font-bold">1</div>
                      <p><strong>Persiapan Guru:</strong> Guru membuka menu <em>Teacher Dashboard</em> dan mengatur Video Password, lalu memutar animasi Video Constellation <em>fullscreen</em> di proyektor.</p>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#3B82F6]/20 text-[#3B82F6] flex items-center justify-center shrink-0 font-bold">2</div>
                      <p><strong>Aktivitas Siswa:</strong> Siswa langsung membuka soal-soal di perangkat mereka masing-masing (HP, Laptop, Tablet).</p>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#3B82F6]/20 text-[#3B82F6] flex items-center justify-center shrink-0 font-bold">3</div>
                      <p><strong>Cara Bermain:</strong> Siswa menjawab pertanyaan di perangkat mereka sambil terus memperhatikan proyektor di depan kelas sebagai petunjuk visual (animasi rasi bintang).</p>
                    </li>
                  </ul>
                </div>
                <div className="order-1 md:order-2 rounded-2xl overflow-hidden border border-[#3B82F6]/30 shadow-[0_0_30px_rgba(59,130,246,0.15)] relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <img src="/assets/class.jpg" alt="Classroom with Projector" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
            )}

            {/* Content for Split Screen / Same Screen */}
            {howToPlayMode === 'split' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-in fade-in duration-500">
                <div className="order-2 md:order-1 space-y-6">
                  <h3 className="text-xl font-bold text-[#C084FC]">2. Tidak Terpisah (Split-Screen Individu)</h3>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed">
                    Opsi ini cocok jika siswa belajar secara mandiri, pembelajaran jarak jauh (online), atau jika kelas tidak memiliki fasilitas proyektor.
                  </p>
                  <ul className="space-y-4 text-sm text-slate-300">
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#C084FC]/20 text-[#C084FC] flex items-center justify-center shrink-0 font-bold">1</div>
                      <p><strong>Persiapan Guru:</strong> Guru membagikan Video Password kepada semua siswa dan instruksi untuk mengunduh videonya terlebih dahulu.</p>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#C084FC]/20 text-[#C084FC] flex items-center justify-center shrink-0 font-bold">2</div>
                      <p><strong>Aktivitas Siswa:</strong> Siswa memasukkan Video Password, kemudian menekan tombol <strong>Download Video</strong> untuk menyimpan animasi rasi bintang.</p>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#C084FC]/20 text-[#C084FC] flex items-center justify-center shrink-0 font-bold">3</div>
                      <p><strong>Cara Bermain:</strong> Siswa memutar video tersebut dan membaginya (*split-screen*) dengan browser yang menampilkan soal. Siswa menganalisis video di satu sisi layar sambil menjawab pertanyaan di sisi layar lainnya.</p>
                    </li>
                  </ul>
                </div>
                <div className="order-1 md:order-2 rounded-2xl overflow-hidden border border-[#C084FC]/30 shadow-[0_0_30px_rgba(192,132,252,0.15)] relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <img src="/assets/split.jpg" alt="Student using Split Screen" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Placeholder for other tabs (How to Setup & About) */}
        {(activeTab === 'how-to-setup' || activeTab === 'about') && (
          <div className="max-w-3xl w-full bg-[#111128]/80 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/5 flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in-95 duration-500 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              {activeTab === 'how-to-setup' ? 'How to Setup' : 'About MemConstella'}
            </h2>
            <p className="text-[#9CA3AF]">
              Konten untuk bagian ini sedang dalam tahap pengembangan.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};
