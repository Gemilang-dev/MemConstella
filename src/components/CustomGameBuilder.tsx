import React, { useState, useRef } from 'react';
import { ArrowRight, ArrowLeft, Save, Upload, Plus, Trash2, Building } from 'lucide-react';
import { CustomGamePackage, saveCustomGame } from '../utils/storage';
import { ROOM_MAPPING } from '../types';

interface CustomGameBuilderProps {
  onCancel: () => void;
  onFinish: () => void;
}

export const CustomGameBuilder: React.FC<CustomGameBuilderProps> = ({ onCancel, onFinish }) => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [terms, setTerms] = useState<{ id: string; name: string }[]>([{ id: '1', name: '' }]);
  const [rooms, setRooms] = useState<CustomGamePackage['rooms']>({});
  const [selectedRoom, setSelectedRoom] = useState<number>(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNext = () => setStep(s => s + 1);
  const handlePrev = () => setStep(s => s - 1);

  const handleAddTerm = () => setTerms([...terms, { id: Date.now().toString(), name: '' }]);
  const handleUpdateTerm = (id: string, val: string) => {
    setTerms(terms.map(t => t.id === id ? { ...t, name: val } : t));
  };
  const handleRemoveTerm = (id: string) => {
    if (terms.length > 1) {
      setTerms(terms.filter(t => t.id !== id));
    }
  };

  const currentRoomData = rooms[selectedRoom] || {
    targetTerm: '',
    title: '',
    storyScenario: '',
    questionText: '',
    roleHint: ''
  };

  const updateRoomData = (key: string, value: string) => {
    setRooms({
      ...rooms,
      [selectedRoom]: {
        ...currentRoomData,
        [key]: value
      }
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target?.result as string);
          // Assuming JSON structure matches currentRoomData
          setRooms({
            ...rooms,
            [selectedRoom]: {
              targetTerm: json.targetTerm || '',
              title: json.title || '',
              storyScenario: json.storyScenario || '',
              questionText: json.questionText || '',
              roleHint: json.roleHint || ''
            }
          });
        } catch {
          alert('Invalid JSON file format for room data.');
        }
      };
      reader.readAsText(file);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSave = () => {
    const validTerms = terms.filter(t => t.name.trim() !== '');
    if (validTerms.length === 0) {
      alert("Please provide at least one term.");
      return;
    }
    if (!title.trim()) {
      alert("Please provide a title.");
      return;
    }

    const newGame: CustomGamePackage = {
      id: `game_${Date.now()}`,
      title,
      terms: validTerms.map(t => ({ code: t.name.toUpperCase().replace(/\s/g, '_'), name: t.name })),
      rooms
    };

    saveCustomGame(newGame);
    onFinish();
  };

  return (
    <div className="flex-1 flex flex-col items-center p-6 bg-[#020617] text-white overflow-y-auto">
      <div className="max-w-3xl w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl flex flex-col gap-6">
        
        {/* Header Steps */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold">Game Builder</h2>
            <p className="text-sm text-slate-400">Step {step} of 3</p>
          </div>
          <button onClick={onCancel} className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-semibold transition">
            Cancel
          </button>
        </div>

        {/* Step 1: Title */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
            <h3 className="text-xl font-semibold">1. Name Your Material</h3>
            <p className="text-sm text-slate-400">Give your game a clear, descriptive title.</p>
            <input
              type="text"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white focus:border-blue-500 outline-none"
              placeholder="e.g., Biology: Cell Structures"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        )}

        {/* Step 2: Terms */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
            <h3 className="text-xl font-semibold">2. Items to Memorize</h3>
            <p className="text-sm text-slate-400">List the concepts, names, or items students need to find in the stars (e.g., Mitochondria, Nucleus).</p>
            
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {terms.map((t, idx) => (
                <div key={t.id} className="flex items-center gap-3">
                  <span className="text-slate-500 font-mono w-6">{idx + 1}.</span>
                  <input
                    type="text"
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:border-blue-500 outline-none"
                    placeholder={`Item ${idx + 1}`}
                    value={t.name}
                    onChange={(e) => handleUpdateTerm(t.id, e.target.value)}
                  />
                  <button onClick={() => handleRemoveTerm(t.id)} className="p-2 bg-slate-800 text-rose-400 rounded-xl hover:bg-rose-900/40 transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            
            <button onClick={handleAddTerm} className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 font-semibold px-2 py-1">
              <Plus className="w-4 h-4" /> Add Item
            </button>
          </div>
        )}

        {/* Step 3: Questions/Rooms */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div>
              <h3 className="text-xl font-semibold">3. Configure Rooms (Questions)</h3>
              <p className="text-sm text-slate-400">Set up the challenge for each room.</p>
            </div>

            {/* Room Tabs */}
            <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {([1, 2, 3, 4] as const).map(num => (
                <button
                  key={num}
                  onClick={() => setSelectedRoom(num)}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition ${selectedRoom === num ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                >
                  <Building className="w-3.5 h-3.5" /> Room {ROOM_MAPPING[num]}
                </button>
              ))}
            </div>

            {/* Room Form */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-blue-400">Room {ROOM_MAPPING[selectedRoom as 1|2|3|4]} Setup</h4>
                <div>
                  <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-semibold transition">
                    <Upload className="w-3.5 h-3.5" /> Upload JSON
                  </button>
                  <input type="file" accept=".json" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-semibold">Correct Answer (Target Item)</label>
                  <select
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm focus:border-blue-500 outline-none"
                    value={currentRoomData.targetTerm}
                    onChange={(e) => updateRoomData('targetTerm', e.target.value)}
                  >
                    <option value="">-- Select Target Item --</option>
                    {terms.filter(t => t.name.trim() !== '').map(t => {
                      const code = t.name.toUpperCase().replace(/\s/g, '_');
                      return <option key={t.id} value={code}>{t.name}</option>;
                    })}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-semibold">Question Title</label>
                  <input
                    type="text"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm focus:border-blue-500 outline-none"
                    placeholder="e.g., The Powerhouse"
                    value={currentRoomData.title}
                    onChange={(e) => updateRoomData('title', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-semibold">Story / Scenario</label>
                <textarea
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm focus:border-blue-500 outline-none min-h-[80px]"
                  placeholder="Set the scene or provide context..."
                  value={currentRoomData.storyScenario}
                  onChange={(e) => updateRoomData('storyScenario', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-semibold">Question Text</label>
                <input
                  type="text"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm focus:border-blue-500 outline-none"
                  placeholder="e.g., Which item is the powerhouse?"
                  value={currentRoomData.questionText}
                  onChange={(e) => updateRoomData('questionText', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-semibold">Hint (Optional)</label>
                <input
                  type="text"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm focus:border-blue-500 outline-none"
                  placeholder="Provide a clue..."
                  value={currentRoomData.roleHint}
                  onChange={(e) => updateRoomData('roleHint', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={handlePrev}
            disabled={step === 1}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-800 disabled:opacity-30 hover:bg-slate-700 font-semibold transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          {step < 3 ? (
            <button
              onClick={handleNext}
              disabled={(step === 1 && !title.trim()) || (step === 2 && terms.filter(t => t.name.trim()).length === 0)}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-semibold transition"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-lg shadow-emerald-600/20"
            >
              <Save className="w-4 h-4" /> Save Package
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
