import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Save, Upload, Plus, Trash2, Building } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { CustomGamePackage, saveCustomGame } from '../utils/storage';
import { ROOM_MAPPING } from '../types';

interface CustomGameBuilderProps {
  onCancel: () => void;
  onFinish: () => void;
}

export const CustomGameBuilder: React.FC<CustomGameBuilderProps> = ({ onCancel, onFinish }) => {
  const location = useLocation();
  const pkg = location.state?.packageToEdit as CustomGamePackage | undefined;

  const [step, setStep] = useState(1);
  const [title, setTitle] = useState(pkg ? pkg.title : '');
  
  // Enforce EXACTLY 5 terms. Initialize from pkg or default to 5 empty.
  const initialTerms = pkg ? pkg.terms.map((t, i) => ({ id: i.toString(), name: t.name })) : 
    Array.from({ length: 5 }).map((_, i) => ({ id: i.toString(), name: '' }));
  
  const [terms, setTerms] = useState<{ id: string; name: string }[]>(initialTerms);
  const [rooms, setRooms] = useState<CustomGamePackage['rooms']>(pkg ? pkg.rooms : {});
  const [selectedRoom, setSelectedRoom] = useState<number>(1);
  const [selectedQuestionIdx, setSelectedQuestionIdx] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNext = () => setStep(s => s + 1);
  const handlePrev = () => setStep(s => s - 1);

  const handleUpdateTerm = (id: string, val: string) => {
    setTerms(terms.map(t => t.id === id ? { ...t, name: val } : t));
  };

  const currentRoomQuestions = rooms[selectedRoom] || [{
    targetTerm: '',
    title: '',
    storyScenario: '',
    questionText: '',
    roleHint: ''
  }];

  const handleAddQuestion = () => {
    const newRooms = { ...rooms };
    newRooms[selectedRoom] = [...currentRoomQuestions, {
      targetTerm: '',
      title: '',
      storyScenario: '',
      questionText: '',
      roleHint: ''
    }];
    setRooms(newRooms);
    setSelectedQuestionIdx(currentRoomQuestions.length);
  };

  const handleRemoveQuestion = (idx: number) => {
    if (currentRoomQuestions.length <= 1) return;
    const newRooms = { ...rooms };
    newRooms[selectedRoom] = currentRoomQuestions.filter((_, i) => i !== idx);
    setRooms(newRooms);
    setSelectedQuestionIdx(Math.max(0, idx - 1));
  };

  const updateRoomData = (key: string, value: string) => {
    const newRooms = { ...rooms };
    const questions = [...currentRoomQuestions];
    if (!questions[selectedQuestionIdx]) {
      questions[selectedQuestionIdx] = { targetTerm: '', title: '', storyScenario: '', questionText: '', roleHint: '' };
    }
    questions[selectedQuestionIdx] = { ...questions[selectedQuestionIdx], [key]: value };
    newRooms[selectedRoom] = questions;
    setRooms(newRooms);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target?.result as string);
          // Allow uploading either an array of questions or a single question
          const questionsToAppend = Array.isArray(json) ? json : [json];
          
          const validQuestions = questionsToAppend.map(q => ({
            targetTerm: q.targetTerm || '',
            title: q.title || '',
            storyScenario: q.storyScenario || '',
            questionText: q.questionText || '',
            roleHint: q.roleHint || ''
          }));

          const newRooms = { ...rooms };
          newRooms[selectedRoom] = [...currentRoomQuestions, ...validQuestions];
          setRooms(newRooms);
          setSelectedQuestionIdx(currentRoomQuestions.length);
          alert(`Successfully loaded ${validQuestions.length} question(s).`);
        } catch {
          alert('Invalid JSON file format for room data. Ensure it is an array of questions or a single question object.');
        }
      };
      reader.readAsText(file);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSave = () => {
    const validTerms = terms.filter(t => t.name.trim() !== '');
    if (validTerms.length !== 5) {
      alert("Please provide exactly 5 items. The game requires 5 items to match the 5 stars in the constellations.");
      return;
    }
    if (!title.trim()) {
      alert("Please provide a title.");
      return;
    }

    const newGame: CustomGamePackage = {
      id: pkg ? pkg.id : `game_${Date.now()}`,
      title,
      terms: validTerms.map(t => ({ code: t.name.toUpperCase().replace(/\s/g, '_'), name: t.name })),
      rooms
    };

    saveCustomGame(newGame);
    onFinish();
  };

  const currentQuestionData = currentRoomQuestions[selectedQuestionIdx] || { targetTerm: '', title: '', storyScenario: '', questionText: '', roleHint: '' };

  return (
    <div className="flex-1 flex flex-col items-center p-6 bg-[#020617] text-white overflow-y-auto">
      <div className="max-w-3xl w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-4">
            <button onClick={onCancel} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition text-slate-300">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-2xl font-bold">Custom Package Builder</h2>
              <p className="text-sm text-slate-400">Step {step} of 3</p>
            </div>
          </div>
          {step === 3 && (
            <button
              onClick={handleSave}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(5,150,105,0.3)]"
            >
              <Save className="w-4 h-4" /> Save Package
            </button>
          )}
        </div>

        {/* Step 1: Title */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
            <h3 className="text-xl font-semibold">1. Package Title</h3>
            <p className="text-sm text-slate-400">Give your learning material a name.</p>
            <input
              type="text"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-lg focus:border-blue-500 outline-none"
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
            <p className="text-sm text-slate-400">List exactly 5 concepts, names, or items students need to find. These will map to the 5 stars in the constellations (e.g., Mitochondria, Nucleus).</p>
            
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
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Questions/Rooms */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div>
              <h3 className="text-xl font-semibold">3. Configure Rooms (Questions)</h3>
              <p className="text-sm text-slate-400">Set up the challenge for each room. A room can have a pool of multiple questions!</p>
            </div>

            {/* Room Tabs */}
            <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {([1, 2, 3, 4] as const).map(num => (
                <button
                  key={num}
                  onClick={() => {
                    setSelectedRoom(num);
                    setSelectedQuestionIdx(0);
                  }}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition ${selectedRoom === num ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                >
                  <Building className="w-3.5 h-3.5" /> Room {ROOM_MAPPING[num]}
                </button>
              ))}
            </div>

            {/* Room Form */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-blue-400">Room {ROOM_MAPPING[selectedRoom as 1|2|3|4]} Question Pool ({currentRoomQuestions.length})</h4>
                <div className="flex gap-2">
                  <button onClick={handleAddQuestion} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-semibold transition">
                    <Plus className="w-3.5 h-3.5" /> Add Q
                  </button>
                  <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-semibold transition">
                    <Upload className="w-3.5 h-3.5" /> JSON
                  </button>
                  <input type="file" accept=".json" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
                </div>
              </div>

              {/* Question Pagination */}
              {currentRoomQuestions.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {currentRoomQuestions.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedQuestionIdx(idx)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition ${selectedQuestionIdx === idx ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                    >
                      Question {idx + 1}
                    </button>
                  ))}
                </div>
              )}

              {/* Question Editor */}
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/80 space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Editing Question {selectedQuestionIdx + 1}</h5>
                  {currentRoomQuestions.length > 1 && (
                    <button onClick={() => handleRemoveQuestion(selectedQuestionIdx)} className="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1">
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-semibold">Correct Answer (Target Item)</label>
                    <select
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm focus:border-blue-500 outline-none"
                      value={currentQuestionData.targetTerm}
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
                      value={currentQuestionData.title}
                      onChange={(e) => updateRoomData('title', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-semibold">Story / Scenario</label>
                  <textarea
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm focus:border-blue-500 outline-none min-h-[80px]"
                    placeholder="Set the scene or provide context..."
                    value={currentQuestionData.storyScenario}
                    onChange={(e) => updateRoomData('storyScenario', e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-semibold">Question Text</label>
                  <input
                    type="text"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm focus:border-blue-500 outline-none"
                    placeholder="e.g., Which item is the powerhouse?"
                    value={currentQuestionData.questionText}
                    onChange={(e) => updateRoomData('questionText', e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-semibold">Hint (Optional)</label>
                  <input
                    type="text"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm focus:border-blue-500 outline-none"
                    placeholder="Provide a clue..."
                    value={currentQuestionData.roleHint}
                    onChange={(e) => updateRoomData('roleHint', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="pt-4 border-t border-slate-800 flex justify-end gap-3 mt-auto">
          {step > 1 && (
            <button
              onClick={handlePrev}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl font-semibold transition"
            >
              Back
            </button>
          )}
          {step < 3 && (
            <button
              onClick={handleNext}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center gap-2 transition shadow-lg"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
