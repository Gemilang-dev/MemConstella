import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AppArea, RoomNumber } from './types';
import { HeaderNavigation } from './components/HeaderNavigation';
import { RoomStation } from './components/RoomStation';
import { TeacherDashboard } from './components/TeacherDashboard';
import { Home } from './components/Home';
import { CustomGameBuilder } from './components/CustomGameBuilder';
import { PlayCustomGames } from './components/PlayCustomGames';
import { listenToSync } from './utils/storage';
import { sound } from './utils/audio';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMuted, setIsMuted] = useState(false);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [, setSyncTick] = useState(0);

  // Derive currentArea from location pathname
  let currentArea: AppArea = 'home';
  if (location.pathname.includes('/room/a')) currentArea = 'room_a';
  else if (location.pathname.includes('/room/b')) currentArea = 'room_b';
  else if (location.pathname.includes('/room/c')) currentArea = 'room_c';
  else if (location.pathname.includes('/room/d')) currentArea = 'room_d';
  else if (location.pathname.includes('/dashboard')) currentArea = 'teacher_dashboard';
  else if (location.pathname.includes('/builder')) currentArea = 'custom_builder';
  else if (location.pathname.includes('/play-custom')) currentArea = 'play_custom';

  // Listen to multi-tab sync
  useEffect(() => {
    const unsubscribe = listenToSync(() => {
      setSyncTick((t) => t + 1);
    });
    return unsubscribe;
  }, []);

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.isMuted = next;
  };

  const handleSelectArea = (area: AppArea) => {
    if (isQuizActive) return;
    
    // Map AppArea to routes
    if (area === 'home') navigate('/');
    else if (area === 'room_a') navigate('/room/a');
    else if (area === 'room_b') navigate('/room/b');
    else if (area === 'room_c') navigate('/room/c');
    else if (area === 'room_d') navigate('/room/d');
    else if (area === 'teacher_dashboard') navigate('/dashboard');
    else if (area === 'custom_builder') navigate('/builder');
    else if (area === 'play_custom') navigate('/play-custom');
  };

  const handleGoToRoom = (num: RoomNumber) => {
    if (isQuizActive) return;
    if (num === 1) navigate('/room/a');
    else if (num === 2) navigate('/room/b');
    else if (num === 3) navigate('/room/c');
    else if (num === 4) navigate('/room/d');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-500 selection:text-white">
      {/* Top Navigation Bar */}
      {currentArea !== 'home' && (
        <HeaderNavigation
          currentArea={currentArea}
          onSelectArea={handleSelectArea}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          isQuizActive={isQuizActive}
        />
      )}

      {/* Main Viewport */}
      <main className="flex-1 flex flex-col relative w-full overflow-hidden">
        <Routes>
          <Route path="/" element={<Home onStart={handleSelectArea} />} />
          
          <Route path="/room/a" element={
            <RoomStation roomNumber={1} onChangeRoom={handleGoToRoom} onQuizActiveChange={setIsQuizActive} />
          } />
          
          <Route path="/room/b" element={
            <RoomStation roomNumber={2} onChangeRoom={handleGoToRoom} onQuizActiveChange={setIsQuizActive} />
          } />
          
          <Route path="/room/c" element={
            <RoomStation roomNumber={3} onChangeRoom={handleGoToRoom} onQuizActiveChange={setIsQuizActive} />
          } />
          
          <Route path="/room/d" element={
            <RoomStation roomNumber={4} onChangeRoom={handleGoToRoom} onQuizActiveChange={setIsQuizActive} />
          } />

          <Route path="/builder" element={
            <CustomGameBuilder onCancel={() => handleSelectArea('home')} onFinish={() => handleSelectArea('play_custom')} />
          } />

          <Route path="/play-custom" element={
            <PlayCustomGames onBack={() => handleSelectArea('home')} onStartGame={handleSelectArea} />
          } />

          <Route path="/dashboard" element={
            <TeacherDashboard onGoToRoom={handleGoToRoom} />
          } />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
