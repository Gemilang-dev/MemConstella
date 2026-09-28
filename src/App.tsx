import React, { useState, useEffect } from 'react';
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
  const [currentArea, setCurrentArea] = useState<AppArea>('home');
  const [isMuted, setIsMuted] = useState(false);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [, setSyncTick] = useState(0);

  // Check URL query parameters for initial room: e.g. ?room=a, ?room=b, ?room=c, ?room=d, or ?screen=dashboard
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const roomParam = params.get('room') || params.get('screen') || params.get('area');
      if (roomParam) {
        const lower = roomParam.toLowerCase();
        if (lower === 'a' || lower === 'room_a' || lower === '1') setCurrentArea('room_a');
        else if (lower === 'b' || lower === 'room_b' || lower === '2') setCurrentArea('room_b');
        else if (lower === 'c' || lower === 'room_c' || lower === '3') setCurrentArea('room_c');
        else if (lower === 'd' || lower === 'room_d' || lower === '4') setCurrentArea('room_d');
        else if (lower === 'teacher' || lower === 'dashboard') setCurrentArea('teacher_dashboard');
      }
    }
  }, []);

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

  const handleGoToRoom = (num: RoomNumber) => {
    if (isQuizActive) return; // Prevent switching when student is actively answering
    if (num === 1) setCurrentArea('room_a');
    else if (num === 2) setCurrentArea('room_b');
    else if (num === 3) setCurrentArea('room_c');
    else if (num === 4) setCurrentArea('room_d');
  };

  const handleSelectArea = (area: AppArea) => {
    if (isQuizActive) return;
    setCurrentArea(area);
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
        {currentArea === 'home' && (
          <Home onStart={handleSelectArea} />
        )}
        {currentArea === 'room_a' && (
          <RoomStation
            roomNumber={1}
            onChangeRoom={handleGoToRoom}
            onQuizActiveChange={setIsQuizActive}
          />
        )}

        {currentArea === 'room_b' && (
          <RoomStation
            roomNumber={2}
            onChangeRoom={handleGoToRoom}
            onQuizActiveChange={setIsQuizActive}
          />
        )}

        {currentArea === 'room_c' && (
          <RoomStation
            roomNumber={3}
            onChangeRoom={handleGoToRoom}
            onQuizActiveChange={setIsQuizActive}
          />
        )}

        {currentArea === 'room_d' && (
          <RoomStation
            roomNumber={4}
            onChangeRoom={handleGoToRoom}
            onQuizActiveChange={setIsQuizActive}
          />
        )}

        {currentArea === 'custom_builder' && (
          <CustomGameBuilder 
            onCancel={() => handleSelectArea('home')}
            onFinish={() => handleSelectArea('play_custom')}
          />
        )}
        
        {currentArea === 'play_custom' && (
          <PlayCustomGames
            onBack={() => handleSelectArea('home')}
            onStartGame={handleSelectArea}
          />
        )}

        {currentArea === 'teacher_dashboard' && (
          <TeacherDashboard onGoToRoom={handleGoToRoom} />
        )}
      </main>
    </div>
  );
}
