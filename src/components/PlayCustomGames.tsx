import React, { useEffect, useState } from 'react';
import { ArrowLeft, Play, Trash2, Library } from 'lucide-react';
import { CustomGamePackage, loadCustomGames, deleteCustomGame } from '../utils/storage';
import { AppArea } from '../types';
import { useGameData } from '../contexts/GameDataContext';

interface PlayCustomGamesProps {
  onBack: () => void;
  onStartGame: (area: AppArea) => void;
}

export const PlayCustomGames: React.FC<PlayCustomGamesProps> = ({ onBack, onStartGame }) => {
  const [games, setGames] = useState<CustomGamePackage[]>([]);
  const { setCustomGameData } = useGameData();

  useEffect(() => {
    setGames(loadCustomGames());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this custom game?")) {
      deleteCustomGame(id);
      setGames(loadCustomGames());
    }
  };

  const handlePlay = (game: CustomGamePackage) => {
    // Transform custom game format into GameData format
    const customRegisters: Record<string, any> = {};
    const customRoomTemplates: Record<number, any> = {};
    
    // Create random colors/glows for the terms
    const colors = [
      { name: 'Red', hex: '#EF4444', glow: 'rgba(239, 68, 68, 0.85)' },
      { name: 'Yellow', hex: '#FACC15', glow: 'rgba(250, 204, 21, 0.85)' },
      { name: 'Green', hex: '#22C55E', glow: 'rgba(34, 197, 94, 0.85)' },
      { name: 'Orange', hex: '#F97316', glow: 'rgba(249, 115, 22, 0.85)' },
      { name: 'Blue', hex: '#3B82F6', glow: 'rgba(59, 130, 246, 0.85)' },
    ];

    game.terms.forEach((term, idx) => {
      const color = colors[idx % colors.length];
      customRegisters[term.code] = {
        code: term.code,
        name: term.name,
        colorName: color.name,
        hex: color.hex,
        glowHex: color.glow
      };
    });

    [1, 2, 3, 4].forEach((rNum) => {
      const roomDataArr = game.rooms[rNum];
      const roomQuestions = (roomDataArr && roomDataArr.length > 0) ? roomDataArr : [{
        targetTerm: game.terms[0]?.code || '',
        title: 'Unconfigured Room',
        storyScenario: 'No scenario provided.',
        questionText: 'No question provided.',
        roleHint: ''
      }];
      
      customRoomTemplates[rNum] = roomQuestions.map(rq => ({
        targetRegister: rq.targetTerm || game.terms[0]?.code,
        title: rq.title,
        storyScenario: rq.storyScenario,
        questionText: rq.questionText,
        roleHint: rq.roleHint,
        roomId: ['A','B','C','D'][rNum - 1]
      }));
    });

    // Reuse default constellations but adapt their assigned registers
    import('../data/constellations').then(module => {
      const defaultConstellations = module.CONSTELLATIONS;
      const customConstellations = defaultConstellations.map((c, idx) => {
        // Just assign random terms to stars for the custom game
        const updatedStars = c.stars.map((s, sIdx) => {
          return { ...s, assignedRegister: game.terms[sIdx % game.terms.length].code };
        });
        // Override one star to specifically have the targetTerm for the rooms that use this constellation
        // This is handled dynamically by `getQuestion` in context, but we ensure the stars have the registers.
        return { ...c, stars: updatedStars };
      });

      setCustomGameData({
        registers: customRegisters,
        roomTemplates: customRoomTemplates,
        constellations: customConstellations
      });
      onStartGame('setup');
    });
  };

  return (
    <div className="flex-1 flex flex-col items-center p-6 bg-[#020617] text-white overflow-y-auto">
      <div className="max-w-3xl w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
          <button onClick={onBack} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Library className="w-6 h-6 text-indigo-400" />
              Your Custom Games
            </h2>
            <p className="text-sm text-slate-400">Select a saved package to launch the session.</p>
          </div>
        </div>

        {games.length === 0 ? (
          <div className="py-12 text-center text-slate-500 space-y-3">
            <Library className="w-12 h-12 mx-auto opacity-20" />
            <p>You haven't created any custom games yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {games.map(game => (
              <div key={game.id} className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-2xl group">
                <div>
                  <h3 className="font-bold text-lg text-slate-200">{game.title}</h3>
                  <p className="text-xs text-slate-500">{game.terms.length} concepts • {Object.keys(game.rooms).length} rooms configured</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleDelete(game.id)} className="p-2 rounded-xl text-slate-500 hover:bg-rose-900/30 hover:text-rose-400 transition">
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button onClick={() => handlePlay(game)} className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition">
                    <Play className="w-4 h-4" /> Play
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
