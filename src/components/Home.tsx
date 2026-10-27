import React, { useState } from 'react';
import { useGameData } from '../contexts/GameDataContext';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { NodeJsLogo, GitLogo, BrowserLogo } from './TechLogos';
import { AppArea } from '../types';
import { 
  Cpu, 
  Edit3, 
  Rocket, 
  Star, 
  Sparkles, 
  Monitor, 
  SplitSquareHorizontal,
  Tv,
  CheckCircle2,
  Info,
  Layers,
  Settings2,
  BookOpen,
  Building2,
  ShieldCheck,
  Scale,
  TrendingUp,
  BarChart3,
  ExternalLink,
  Globe,
  Award,
  FileText,
  Trophy,
  GraduationCap,
  Gamepad2,
  Heart,
  Terminal,
  Download,
  Copy,
  Check,
  Code2
} from 'lucide-react';

type TabView = 'home' | 'how-to-play' | 'how-to-setup' | 'about';

interface HomeProps {
  onStart: (area: AppArea) => void;
}

export const Home: React.FC<HomeProps> = ({ onStart }) => {
  const { resetToDefault } = useGameData();
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabView>('home');
  const [howToPlayMode, setHowToPlayMode] = useState<'separate' | 'split'>('separate');
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedCommand(text);
      setTimeout(() => setCopiedCommand(null), 2000);
    }
  };

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
      <header className="relative z-10 w-full bg-black/90 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 md:px-8 py-3.5 max-w-7xl mx-auto gap-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <Star className="w-8 h-8 text-[#C084FC] fill-[#C084FC] animate-pulse" />
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#C084FC] to-[#3B82F6] bg-clip-text text-transparent">
                MemConstella
              </h1>
              <p className="text-[10px] md:text-xs text-[#9CA3AF] tracking-widest uppercase mt-0.5">
                {t.home.headerSubtitle}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <nav className="flex items-center gap-4 sm:gap-6 text-sm font-medium">
              <button 
                onClick={() => setActiveTab('home')}
                className={`pb-1 transition-colors ${activeTab === 'home' ? 'text-white border-b-2 border-[#C084FC]' : 'text-[#9CA3AF] hover:text-[#C084FC]'}`}>
                {t.nav.home}
              </button>
              <button 
                onClick={() => setActiveTab('how-to-play')}
                className={`pb-1 transition-colors ${activeTab === 'how-to-play' ? 'text-white border-b-2 border-[#C084FC]' : 'text-[#9CA3AF] hover:text-[#C084FC]'}`}>
                {t.nav.howToPlay}
              </button>
              <button 
                onClick={() => setActiveTab('how-to-setup')}
                className={`pb-1 transition-colors ${activeTab === 'how-to-setup' ? 'text-white border-b-2 border-[#C084FC]' : 'text-[#9CA3AF] hover:text-[#C084FC]'}`}>
                {t.nav.howToSetup}
              </button>
              <button 
                onClick={() => setActiveTab('about')}
                className={`pb-1 transition-colors ${activeTab === 'about' ? 'text-white border-b-2 border-[#C084FC]' : 'text-[#9CA3AF] hover:text-[#C084FC]'}`}>
                {t.nav.about}
              </button>
            </nav>

            {/* Language Switcher */}
            <div className="border-l border-white/10 pl-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 md:p-6 pb-20">
        
        {/* ========================================================================
            HOME TAB
            ======================================================================== */}
        {activeTab === 'home' && (
          <div className="max-w-5xl w-full bg-[#111128]/60 backdrop-blur-xl p-8 md:p-14 rounded-[2.5rem] border border-white/5 shadow-[0_0_50px_rgba(59,130,246,0.1)] flex flex-col items-center gap-10 animate-in fade-in zoom-in-95 duration-500">
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
                  <h3 className="font-bold text-xl text-white">{t.home.card1Title}</h3>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed">{t.home.card1Desc}</p>
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
                  <div className="absolute inset-0 bg-[radial-gradient(circle,_#C084FC_2px,_transparent_2px)] bg-[size:16px_16px] opacity-20 group-hover:opacity-40 transition-opacity" />
                </div>
                <div className="space-y-2 relative z-10">
                  <h3 className="font-bold text-xl text-white">{t.home.card2Title}</h3>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed">{t.home.card2Desc}</p>
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
                  <h3 className="font-bold text-xl text-white">{t.home.card3Title}</h3>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed">{t.home.card3Desc}</p>
                </div>
              </button>
            </div>

            <p className="text-[#9CA3AF] font-medium tracking-wide text-center text-sm md:text-base">
              {t.home.promptText}
            </p>
          </div>
        )}

        {/* ========================================================================
            HOW TO PLAY TAB
            ======================================================================== */}
        {activeTab === 'how-to-play' && (
          <div className="max-w-4xl w-full bg-[#111128]/85 backdrop-blur-xl p-6 md:p-10 rounded-[2.5rem] border border-white/10 shadow-[0_0_60px_rgba(192,132,252,0.15)] flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
            {/* Header */}
            <div className="text-center space-y-3">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                {t.howToPlay.title}
              </h2>
              <p className="text-sm md:text-base text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
                {t.howToPlay.subtitle}
              </p>
            </div>

            {/* Mode Selection Toggle */}
            <div className="flex p-1.5 bg-[#0B0B1A] rounded-2xl border border-white/10 w-full max-w-md mx-auto shadow-inner">
              <button
                onClick={() => setHowToPlayMode('separate')}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  howToPlayMode === 'separate' 
                    ? 'bg-[#3B82F6]/25 text-white border border-[#3B82F6]/40 shadow-[0_0_20px_rgba(59,130,246,0.3)]' 
                    : 'text-[#9CA3AF] hover:text-white hover:bg-white/5'
                }`}
              >
                <Monitor className="w-4 h-4 text-[#3B82F6]" />
                {t.howToPlay.tabSeparate}
              </button>
              <button
                onClick={() => setHowToPlayMode('split')}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  howToPlayMode === 'split' 
                    ? 'bg-[#C084FC]/25 text-white border border-[#C084FC]/40 shadow-[0_0_20px_rgba(192,132,252,0.3)]' 
                    : 'text-[#9CA3AF] hover:text-white hover:bg-white/5'
                }`}
              >
                <SplitSquareHorizontal className="w-4 h-4 text-[#C084FC]" />
                {t.howToPlay.tabSplit}
              </button>
            </div>

            {/* ====================================================================
                MODE 1: LAYAR TERPISAH (DUAL SCREEN SETUP)
                ==================================================================== */}
            {howToPlayMode === 'separate' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                
                {/* PREPARATION BOX: BEFORE STARTING (USER REQUIREMENT) */}
                <div className="bg-gradient-to-br from-[#1E1B4B]/80 via-[#0F172A]/90 to-[#111128]/90 border-2 border-[#3B82F6]/40 rounded-3xl p-6 md:p-8 shadow-[0_0_35px_rgba(59,130,246,0.15)] space-y-6">
                  
                  {/* Title & Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                          {t.howToPlay.separatePrepTitle}
                        </h3>
                        <p className="text-xs md:text-sm text-blue-200/80">
                          {t.howToPlay.separatePrepDesc}
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30 shrink-0">
                      {t.howToPlay.separatePrepBadge}
                    </span>
                  </div>

                  {/* 2 Screens Visual Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Screen 1: Primary Screen */}
                    <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden group hover:border-blue-400/60 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                          <Monitor className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                            {language === 'id' ? 'Layar 1 (Monitor Utama)' : 'Screen 1 (Main Monitor)'}
                          </div>
                          <h4 className="font-bold text-white text-base">
                            {t.howToPlay.screen1Title}
                          </h4>
                        </div>
                      </div>

                      <div className="bg-blue-950/40 border border-blue-800/40 rounded-xl p-2.5 text-xs font-bold text-blue-300">
                        🎯 {t.howToPlay.screen1Role}
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {t.howToPlay.screen1Desc}
                      </p>
                    </div>

                    {/* Screen 2: External Screen / Projector */}
                    <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden group hover:border-purple-400/60 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                          <Tv className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                            {language === 'id' ? 'Layar 2 (Eksternal / Proyektor)' : 'Screen 2 (External / Projector)'}
                          </div>
                          <h4 className="font-bold text-white text-base">
                            {t.howToPlay.screen2Title}
                          </h4>
                        </div>
                      </div>

                      <div className="bg-purple-950/40 border border-purple-800/40 rounded-xl p-2.5 text-xs font-bold text-purple-300">
                        ✨ {t.howToPlay.screen2Role}
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {t.howToPlay.screen2Desc}
                      </p>
                    </div>

                  </div>

                  {/* Display Setting Tip */}
                  <div className="bg-blue-950/30 border border-blue-500/20 rounded-2xl p-4 flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <div className="text-xs space-y-1">
                      <strong className="text-blue-300 block">{t.howToPlay.connectionNoteTitle}</strong>
                      <p className="text-slate-300 leading-relaxed">
                        {t.howToPlay.connectionNoteDesc}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Steps Breakdown & Classroom Image */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-2">
                  <div className="space-y-5 order-2 md:order-1">
                    <h4 className="text-base font-bold text-white uppercase tracking-wider text-slate-400">
                      {t.howToPlay.stepsTitle}
                    </h4>

                    <div className="space-y-4 text-sm text-slate-300">
                      <div className="flex gap-3 bg-white/[0.02] p-3.5 rounded-2xl border border-white/5">
                        <div className="w-7 h-7 rounded-xl bg-[#3B82F6]/20 border border-[#3B82F6]/40 text-[#3B82F6] flex items-center justify-center shrink-0 font-bold text-xs">
                          1
                        </div>
                        <div className="space-y-1">
                          <strong className="text-white block">{t.howToPlay.step1Title}</strong>
                          <p className="text-xs text-slate-300 leading-relaxed">{t.howToPlay.step1Desc}</p>
                        </div>
                      </div>

                      <div className="flex gap-3 bg-white/[0.02] p-3.5 rounded-2xl border border-white/5">
                        <div className="w-7 h-7 rounded-xl bg-[#3B82F6]/20 border border-[#3B82F6]/40 text-[#3B82F6] flex items-center justify-center shrink-0 font-bold text-xs">
                          2
                        </div>
                        <div className="space-y-1">
                          <strong className="text-white block">{t.howToPlay.step2Title}</strong>
                          <p className="text-xs text-slate-300 leading-relaxed">{t.howToPlay.step2Desc}</p>
                        </div>
                      </div>

                      <div className="flex gap-3 bg-white/[0.02] p-3.5 rounded-2xl border border-white/5">
                        <div className="w-7 h-7 rounded-xl bg-[#3B82F6]/20 border border-[#3B82F6]/40 text-[#3B82F6] flex items-center justify-center shrink-0 font-bold text-xs">
                          3
                        </div>
                        <div className="space-y-1">
                          <strong className="text-white block">{t.howToPlay.step3Title}</strong>
                          <p className="text-xs text-slate-300 leading-relaxed">{t.howToPlay.step3Desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="order-1 md:order-2 rounded-2xl overflow-hidden border border-[#3B82F6]/30 shadow-[0_0_30px_rgba(59,130,246,0.15)] relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
                    <img 
                      src="/assets/class.jpg" 
                      alt="Classroom with Projector" 
                      className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute bottom-3 left-4 right-4 z-20 text-xs text-white/90 font-medium">
                      📸 {language === 'id' ? 'Ilustrasi Kelas: Proyektor di depan kelas untuk rasi bintang, layar monitor untuk siswa.' : 'Classroom Setup: Projector for constellation video, monitor screen for students.'}
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ====================================================================
                MODE 2: TIDAK TERPISAH (SPLIT SCREEN / SINGLE DEVICE)
                ==================================================================== */}
            {howToPlayMode === 'split' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="order-2 md:order-1 space-y-5">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-[#C084FC]">
                        {t.howToPlay.splitTitle}
                      </h3>
                      <p className="text-sm text-[#9CA3AF] leading-relaxed">
                        {t.howToPlay.splitDesc}
                      </p>
                    </div>

                    <div className="bg-purple-950/20 border border-purple-500/20 rounded-2xl p-4 text-xs text-purple-200">
                      📱 <strong>{t.howToPlay.splitPrepTitle}</strong>
                    </div>

                    <ul className="space-y-4 text-sm text-slate-300">
                      <li className="flex gap-3 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                        <div className="w-6 h-6 rounded-full bg-[#C084FC]/20 text-[#C084FC] flex items-center justify-center shrink-0 font-bold text-xs">1</div>
                        <div className="space-y-0.5">
                          <strong className="text-white block">{t.howToPlay.splitStep1Title}</strong>
                          <p className="text-xs text-slate-300">{t.howToPlay.splitStep1Desc}</p>
                        </div>
                      </li>
                      <li className="flex gap-3 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                        <div className="w-6 h-6 rounded-full bg-[#C084FC]/20 text-[#C084FC] flex items-center justify-center shrink-0 font-bold text-xs">2</div>
                        <div className="space-y-0.5">
                          <strong className="text-white block">{t.howToPlay.splitStep2Title}</strong>
                          <p className="text-xs text-slate-300">{t.howToPlay.splitStep2Desc}</p>
                        </div>
                      </li>
                      <li className="flex gap-3 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                        <div className="w-6 h-6 rounded-full bg-[#C084FC]/20 text-[#C084FC] flex items-center justify-center shrink-0 font-bold text-xs">3</div>
                        <div className="space-y-0.5">
                          <strong className="text-white block">{t.howToPlay.splitStep3Title}</strong>
                          <p className="text-xs text-slate-300">{t.howToPlay.splitStep3Desc}</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="order-1 md:order-2 rounded-2xl overflow-hidden border border-[#C084FC]/30 shadow-[0_0_30px_rgba(192,132,252,0.15)] relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <img 
                      src="/assets/split.jpg" 
                      alt="Student using Split Screen" 
                      className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute bottom-3 left-4 right-4 z-20 text-xs text-white/90 font-medium">
                      📸 {language === 'id' ? 'Ilustrasi Split-Screen: Video di sisi kiri, soal di sisi kanan.' : 'Split-Screen Illustration: Video on one side, questions on the other.'}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================================
            HOW TO SETUP TAB (TECH STACK & PREREQUISITES INSTALLATION GUIDE)
            ======================================================================== */}
        {activeTab === 'how-to-setup' && (
          <div className="max-w-5xl w-full bg-[#111128]/90 backdrop-blur-2xl p-6 md:p-12 rounded-[2.5rem] border border-white/10 shadow-[0_0_60px_rgba(59,130,246,0.15)] flex flex-col gap-10 animate-in fade-in zoom-in-95 duration-500">
            
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-500/30">
                <Code2 className="w-4 h-4" />
                <span>{t.howToSetup.badge}</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
                {t.howToSetup.title}
              </h2>
              <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                {t.howToSetup.subtitle}
              </p>
            </div>

            {/* Part 1: Prerequisites Cards with Official Logos & Download Links */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-wider">
                <Download className="w-4 h-4" />
                <span>{t.howToSetup.prereqHeading}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* 1. Node.js */}
                <div className="bg-slate-900/80 border border-slate-700/80 hover:border-emerald-500/50 rounded-2xl p-6 flex flex-col justify-between gap-5 transition-all group hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30">
                        <NodeJsLogo className="w-10 h-10" />
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        LTS v18+
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-bold text-white text-lg group-hover:text-emerald-300 transition-colors">
                        {t.howToSetup.nodeTitle}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {t.howToSetup.nodeDesc}
                      </p>
                    </div>

                    <div className="text-[11px] text-emerald-400 font-mono bg-emerald-950/30 p-2 rounded-xl border border-emerald-900/50">
                      ✓ {t.howToSetup.nodeVersion}
                    </div>
                  </div>

                  <a 
                    href={t.howToSetup.nodeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all group-hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                  >
                    <span>{t.howToSetup.nodeDownloadBtn}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* 2. Git */}
                <div className="bg-slate-900/80 border border-slate-700/80 hover:border-orange-500/50 rounded-2xl p-6 flex flex-col justify-between gap-5 transition-all group hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-2xl bg-orange-950/40 border border-orange-500/30">
                        <GitLogo className="w-10 h-10" />
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-orange-500/20 text-orange-300 border border-orange-500/30">
                        v2.30+
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-bold text-white text-lg group-hover:text-orange-300 transition-colors">
                        {t.howToSetup.gitTitle}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {t.howToSetup.gitDesc}
                      </p>
                    </div>

                    <div className="text-[11px] text-orange-400 font-mono bg-orange-950/30 p-2 rounded-xl border border-orange-900/50">
                      ✓ {t.howToSetup.gitVersion}
                    </div>
                  </div>

                  <a 
                    href={t.howToSetup.gitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md transition-all group-hover:shadow-[0_0_15px_rgba(249,115,22,0.4)]"
                  >
                    <span>{t.howToSetup.gitDownloadBtn}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* 3. Browser */}
                <div className="bg-slate-900/80 border border-slate-700/80 hover:border-blue-500/50 rounded-2xl p-6 flex flex-col justify-between gap-5 transition-all group hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-2xl bg-blue-950/40 border border-blue-500/30">
                        <BrowserLogo className="w-10 h-10" />
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        HTML5 / Canvas
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-bold text-white text-lg group-hover:text-blue-300 transition-colors">
                        {t.howToSetup.browserTitle}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {t.howToSetup.browserDesc}
                      </p>
                    </div>

                    <div className="text-[11px] text-blue-400 font-mono bg-blue-950/30 p-2 rounded-xl border border-blue-900/50">
                      ✓ {t.howToSetup.browserVersion}
                    </div>
                  </div>

                  <a 
                    href={t.howToSetup.browserUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all group-hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                  >
                    <span>{t.howToSetup.browserDownloadBtn}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            </div>

            {/* Part 2: Step-by-Step Terminal Execution */}
            <div className="space-y-5 pt-2">
              <div className="flex items-center gap-2 text-sm font-bold text-purple-400 uppercase tracking-wider">
                <Terminal className="w-4 h-4" />
                <span>{t.howToSetup.stepsHeading}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Step 1 */}
                <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-lg bg-blue-500/20 text-blue-300 text-xs font-bold">
                      1
                    </span>
                    <button
                      onClick={() => handleCopy('git clone https://github.com/username/memconstella.git && cd memconstella')}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition"
                    >
                      {copiedCommand === 'git clone https://github.com/username/memconstella.git && cd memconstella' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">{t.howToSetup.copiedCode}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>{t.howToSetup.copyCode}</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{t.howToSetup.step1Title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{t.howToSetup.step1Desc}</p>
                  </div>
                  <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
                    <code>$ git clone https://github.com/username/memconstella.git<br/>$ cd memconstella</code>
                  </pre>
                </div>

                {/* Step 2 */}
                <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold">
                      2
                    </span>
                    <button
                      onClick={() => handleCopy('npm install')}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition"
                    >
                      {copiedCommand === 'npm install' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">{t.howToSetup.copiedCode}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>{t.howToSetup.copyCode}</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{t.howToSetup.step2Title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{t.howToSetup.step2Desc}</p>
                  </div>
                  <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
                    <code>$ npm install</code>
                  </pre>
                </div>

                {/* Step 3 */}
                <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-bold">
                      3
                    </span>
                    <button
                      onClick={() => handleCopy('npm run dev')}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition"
                    >
                      {copiedCommand === 'npm run dev' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">{t.howToSetup.copiedCode}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>{t.howToSetup.copyCode}</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{t.howToSetup.step3Title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{t.howToSetup.step3Desc}</p>
                  </div>
                  <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
                    <code>$ npm run dev</code>
                  </pre>
                </div>

                {/* Step 4 */}
                <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                      4
                    </span>
                    <span className="text-[11px] text-emerald-400 font-bold">Ready 🚀</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{t.howToSetup.step4Title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{t.howToSetup.step4Desc}</p>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span className="font-mono text-xs text-cyan-300">http://localhost:3000</span>
                    <a 
                      href="http://localhost:3000" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      <span>Open</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Part 3: Quick Terminal Verification Tip */}
            <div className="bg-slate-950/60 border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  {t.howToSetup.verifyHeading}
                </h4>
                <p className="text-xs text-slate-400">
                  {t.howToSetup.verifyTip}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-slate-300">
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">node -v</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">npm -v</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">git --version</span>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================
            ABOUT TAB (CASUAL PRODUCT HOMEPAGE - WHITE THEME)
            ======================================================================== */}
        {activeTab === 'about' && (
          <div className="max-w-5xl w-full bg-white text-slate-900 p-6 sm:p-10 md:p-14 rounded-[2.5rem] shadow-[0_25px_70px_rgba(0,0,0,0.5)] border border-slate-100 flex flex-col gap-10 animate-in fade-in zoom-in-95 duration-500">
            
            {/* Product Hero Header */}
            <div className="space-y-4 border-b border-slate-100 pb-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{t.about.productBadge}</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs text-amber-800 font-semibold">
                  <Scale className="w-3.5 h-3.5 text-amber-600" />
                  <span>{t.about.licenseTag}</span>
                </div>
              </div>

              <div className="space-y-3 pt-1">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  {t.about.heroHeadline}
                </h2>
                <p className="text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed">
                  {t.about.heroSubheadline}
                </p>
              </div>
            </div>

            {/* Special Highlight: Inspired by Galactic Trace in Clash of Champions Ruangguru S2 */}
            <div className="bg-gradient-to-br from-indigo-50/90 via-purple-50/50 to-blue-50/80 border-2 border-indigo-200/90 rounded-3xl p-6 md:p-8 space-y-4 shadow-sm relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/30 shrink-0">
                    <Trophy className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                      {t.about.inspirationBadge}
                    </span>
                    <h3 className="text-lg md:text-2xl font-black text-slate-900 mt-0.5">
                      {t.about.inspirationTitle}
                    </h3>
                  </div>
                </div>
              </div>

              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                {t.about.inspirationDesc}
              </p>

              <div className="bg-white/90 backdrop-blur-sm border border-indigo-100 rounded-2xl p-4 flex items-center gap-3 text-xs md:text-sm text-indigo-950 font-medium">
                <Star className="w-5 h-5 text-indigo-600 shrink-0" />
                <p>{t.about.inspirationSub}</p>
              </div>
            </div>

            {/* Section: What is MemConstella? ("Ini Apa Sih?") */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {t.about.whatIsTitle}
                </h3>
                <p className="text-sm md:text-base text-slate-500">
                  {t.about.whatIsSubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Feature 1 */}
                <div className="bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-blue-300 rounded-2xl p-6 space-y-3 transition-all hover:shadow-lg">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-lg">
                    {t.about.card1Title}
                  </h4>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                    {t.about.card1Desc}
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-purple-300 rounded-2xl p-6 space-y-3 transition-all hover:shadow-lg">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                    <Gamepad2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-lg">
                    {t.about.card2Title}
                  </h4>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                    {t.about.card2Desc}
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-emerald-300 rounded-2xl p-6 space-y-3 transition-all hover:shadow-lg">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-lg">
                    {t.about.card3Title}
                  </h4>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                    {t.about.card3Desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Section: Who is This For? */}
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
                {t.about.audienceTitle}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">{t.about.audience1Title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{t.about.audience1Desc}</p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">{t.about.audience2Title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{t.about.audience2Desc}</p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Heart className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">{t.about.audience3Title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{t.about.audience3Desc}</p>
                </div>
              </div>
            </div>

            {/* Official Open Source & GNU Licensing Statement Box */}
            <div className="bg-amber-50/80 border border-amber-200/90 rounded-3xl p-6 md:p-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm shrink-0">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                      Open Source Standard
                    </span>
                    <h4 className="text-base md:text-lg font-bold text-slate-900">
                      {t.about.openSourceTitle}
                    </h4>
                  </div>
                </div>

                <a 
                  href="https://www.gnu.org/licenses/gpl-3.0.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-sm"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{t.about.viewLicenseBtn}</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>

              <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                {t.about.openSourceDesc}
              </p>
            </div>

            {/* Product Footer Bar */}
            <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <div>{t.about.copyright}</div>
              <div className="flex items-center gap-3 font-medium">
                <span>Inspirasi dari Clash of Champions (Galactic Trace)</span>
                <span>•</span>
                <span>GNU GPL v3</span>
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
};
