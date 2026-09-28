import React, { useState, useEffect } from 'react';
import { StudentRecord, Constellation, RoomNumber, ROOM_MAPPING } from '../types';
import {
  getOrCreateStudentRecord,
  submitAttempt,
  loadAllStudentRecords,
  getVideoPassword
} from '../utils/storage';
import { sound } from '../utils/audio';
import { ConstellationVideo } from './ConstellationVideo';
import { useGameData } from '../contexts/GameDataContext';
import {
  User,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  LogOut,
  Building,
  Lock,
  Compass,
  Award
} from 'lucide-react';

interface RoomStationProps {
  roomNumber: RoomNumber;
  onChangeRoom: (roomNum: RoomNumber) => void;
  onQuizActiveChange?: (isActive: boolean) => void;
}

export const RoomStation: React.FC<RoomStationProps> = ({
  roomNumber,
  onChangeRoom,
  onQuizActiveChange
}) => {
  const { gameData } = useGameData();
  const roomId = ROOM_MAPPING[roomNumber];
  const defaultTemplate = gameData.roomTemplates[roomNumber];

  const [allRecords, setAllRecords] = useState<Record<string, StudentRecord>>({});
  const [selectedStudentName, setSelectedStudentName] = useState<string>('');
  const [customNameInput, setCustomNameInput] = useState<string>('');
  const [currentRecord, setCurrentRecord] = useState<StudentRecord | null>(null);

  // Video state
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [passwordPromptActive, setPasswordPromptActive] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  // Quiz state
  const [selectedStarNumber, setSelectedStarNumber] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const handleVideoUnlock = () => {
    const correctPassword = getVideoPassword();
    if (!correctPassword) {
      alert("Teacher has not set a video password yet. Please ask the teacher to set it in the Dashboard.");
      return;
    }
    if (passwordInput === correctPassword) {
      setIsVideoVisible(true);
      setPasswordPromptActive(false);
      setPasswordInput('');
    } else {
      alert("Incorrect password!");
    }
  };

  const refreshRecords = () => {
    const records = loadAllStudentRecords();
    setAllRecords(records);
    if (selectedStudentName && records[selectedStudentName]) {
      setCurrentRecord(records[selectedStudentName]);
    }
  };

  useEffect(() => {
    refreshRecords();
    setSelectedStarNumber(null);
    setHasSubmitted(false);
  }, [roomNumber]);

  // Derive student-specific question and constellation
  const studentQuizData = selectedStudentName
    ? gameData.getQuestion(selectedStudentName, roomNumber)
    : null;

  const question = studentQuizData?.question;
  const constellation: Constellation | null = studentQuizData?.constellation || null;

  const attempt = currentRecord?.attempts[roomNumber];
  const isLockedOut = attempt?.status === 'locked_out';
  const isCompleted = attempt?.status === 'completed';
  const successfulCount = currentRecord?.successfulRooms.length || 0;
  const isFullPoint = currentRecord?.isFullPoint || false;

  // Active quiz mode: student selected name and has NOT yet finished this room
  const isQuizActive = Boolean(selectedStudentName && !isLockedOut && !isCompleted);

  // Notify parent of quiz active state to lock external header navigation
  useEffect(() => {
    onQuizActiveChange?.(isQuizActive);
  }, [isQuizActive, onQuizActiveChange]);

  const handleSelectStudent = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    sound.playSelect();
    setSelectedStudentName(trimmed);
    const rec = getOrCreateStudentRecord(trimmed);
    setCurrentRecord(rec);
    setSelectedStarNumber(null);
    setHasSubmitted(false);
  };

  const handleLogoutStudent = () => {
    if (isQuizActive) return; // Prevent logout during active quiz
    setSelectedStudentName('');
    setCurrentRecord(null);
    setSelectedStarNumber(null);
    setHasSubmitted(false);
  };

  const handleSubmitAnswer = () => {
    if (!currentRecord || selectedStarNumber === null || hasSubmitted || !question || !constellation) return;

    const { record, isCorrect, isNowFullPoint } = submitAttempt(
      currentRecord.name,
      roomNumber,
      selectedStarNumber,
      question.targetStarNumber,
      constellation.id
    );

    setCurrentRecord(record);
    setHasSubmitted(true);

    if (isCorrect) {
      if (isNowFullPoint) {
        sound.playFullPoints();
      } else {
        sound.playSuccess();
      }
    } else {
      sound.playError();
    }
  };

  const targetReg = question ? gameData.registers[question.targetRegister] : null;

  return (
    <div id={`room-station-${roomId.toLowerCase()}`} className="min-h-full flex flex-col bg-slate-950 text-slate-100">
      {/* Top Station Status Header */}
      <div className="border-b border-slate-800 bg-slate-900/90 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs tracking-wider uppercase px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                ROOM {roomId}
              </span>
              <span className="text-xs text-slate-400">Mission Terminal</span>
            </div>
            <h1 className="text-lg font-bold text-white tracking-tight">
              Room {roomId}: {defaultTemplate.title}
            </h1>
          </div>
        </div>

        {/* Quick Room Switcher (LOCKED if quiz is active) */}
        <div className="flex items-center gap-2">
          {isQuizActive ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Room switching locked until answer is locked in</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400 hidden sm:inline">Switch Room:</span>
              <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
                {([1, 2, 3, 4] as const).map((rNum) => {
                  const rLetter = ROOM_MAPPING[rNum];
                  return (
                    <button
                      key={rNum}
                      id={`btn-switch-to-room-${rLetter.toLowerCase()}`}
                      onClick={() => {
                        onChangeRoom(rNum);
                        setIsVideoVisible(false);
                      }}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                        roomNumber === rNum && !isVideoVisible
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white hover:bg-slate-700/60'
                      }`}
                    >
                      Room {rLetter}
                    </button>
                  );
                })}
                
                <div className="w-px h-4 bg-slate-700 mx-1" />
                
                {passwordPromptActive ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="password"
                      className="px-2 py-1 text-xs bg-slate-900 border border-slate-700 rounded outline-none focus:border-indigo-500 w-20 text-white"
                      placeholder="Password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleVideoUnlock();
                      }}
                    />
                    <button onClick={handleVideoUnlock} className="px-2 py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-500">Unlock</button>
                    <button onClick={() => { setPasswordPromptActive(false); setPasswordInput(''); }} className="px-2 py-1 text-xs bg-slate-700 text-slate-300 rounded hover:bg-slate-600">X</button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      if (isVideoVisible) setIsVideoVisible(false);
                      else setPasswordPromptActive(true);
                    }}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                      isVideoVisible
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-indigo-300 hover:text-white hover:bg-slate-700/60'
                    }`}
                  >
                    {!isVideoVisible && <Lock className="w-3 h-3" />}
                    Observation Video
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 md:p-6 max-w-7xl w-full mx-auto flex flex-col justify-start">
        {isVideoVisible ? (
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between p-4 bg-indigo-950/40 border border-indigo-500/30 rounded-2xl mb-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
                  <Compass className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight">Observation Mode</h2>
                  <p className="text-xs text-indigo-300">Watch the sequence carefully to memorize the patterns.</p>
                </div>
              </div>
            </div>
            <ConstellationVideo constellation={constellation} />
          </div>
        ) : !selectedStudentName ? (
          /* STEP 1: HOME SCREEN - SELECT OR ENTER STUDENT NAME */
          <div className="max-w-3xl mx-auto w-full my-auto py-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                  <User className="w-3.5 h-3.5" />
                  <span>Participant Station: Room {roomId}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                  Welcome to Room {roomId}
                </h2>
                <p className="text-sm text-slate-400 max-w-lg mx-auto">
                  Select your name below. Each student is assigned a unique constellation mission in this room!
                </p>
              </div>

              {/* Student Roster List */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Select Your Name to Begin:
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {Object.keys(allRecords).length} Students Enrolled
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                  {(Object.values(allRecords) as StudentRecord[]).map((rec) => {
                    const roomAttempt = rec.attempts[roomNumber];
                    const isRecLocked = roomAttempt?.status === 'locked_out';
                    const isRecDone = roomAttempt?.status === 'completed';
                    const points = rec.successfulRooms.length;

                    // Preview the unique constellation assigned to this student in this room
                    const studentData = gameData.getQuestion(rec.name, roomNumber);

                    return (
                      <button
                        key={rec.id}
                        id={`btn-student-${rec.id}`}
                        onClick={() => handleSelectStudent(rec.name)}
                        className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 text-left transition-all group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-slate-800 text-slate-300 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center font-bold text-xs transition-colors shrink-0">
                            {rec.name.charAt(0)}
                          </div>
                          <div className="truncate">
                            <div className="text-sm font-semibold text-slate-200 group-hover:text-white truncate">
                              {rec.name}
                            </div>

                            <div className="text-[10px] text-slate-500">
                              {points}/2 Rooms Cleared {rec.isFullPoint ? '🏆' : ''}
                            </div>
                          </div>
                        </div>

                        <div className="shrink-0 pl-2">
                          {isRecDone && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              Cleared
                            </span>
                          )}
                          {isRecLocked && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                              Locked
                            </span>
                          )}
                          {!isRecDone && !isRecLocked && (
                            <span className="text-[10px] text-slate-500 group-hover:text-slate-300 font-medium">
                              Start →
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Input Custom Student Name */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="text-xs font-semibold text-slate-300 block">
                  Or Enter a New Participant Name:
                </label>
                <div className="flex gap-2">
                  <input
                    id="input-student-name"
                    type="text"
                    value={customNameInput}
                    onChange={(e) => setCustomNameInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && customNameInput.trim()) {
                        handleSelectStudent(customNameInput);
                      }
                    }}
                    placeholder="Enter student full name..."
                    className="flex-1 bg-slate-950 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-2 text-sm text-white placeholder-slate-500 outline-none transition-all"
                  />
                  <button
                    id="btn-confirm-custom-name"
                    onClick={() => handleSelectStudent(customNameInput)}
                    disabled={!customNameInput.trim()}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5"
                  >
                    <span>Proceed</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Mission Protocol */}
              <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 text-xs text-slate-400 space-y-1.5">
                <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Room Mission Protocol:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  <li>Each student is assigned a specific constellation in this room.</li>
                  <li>Once you select your name, all navigation is locked until you submit your answer.</li>
                  <li>
                    If your answer is <span className="text-rose-400 font-semibold">INCORRECT</span>, Room {roomId} is permanently <span className="text-rose-400 font-semibold">LOCKED OUT (HANGUS)</span> for you.
                  </li>
                  <li>
                    To achieve <span className="text-emerald-400 font-semibold">Full Points</span>, clear at least <span className="text-emerald-400 font-semibold">2 out of the 4 Rooms</span>!
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          /* STEP 2: ACTIVE QUIZ OR RESULT SCREEN */
          <div className="space-y-6">
            {/* Student Info Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-300 flex items-center justify-center font-bold text-base">
                  {selectedStudentName.charAt(0)}
                </div>
                <div>
                  <div className="text-xs text-slate-400">Current Participant:</div>
                  <div className="text-base font-bold text-white flex items-center gap-2">
                    <span>{selectedStudentName}</span>
                    {isFullPoint && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" /> Full Points Achieved!
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Rooms cleared badge */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-400">Rooms Cleared:</span>
                  <span className="font-mono text-sm font-bold text-amber-400">
                    {successfulCount} / 2 Target
                  </span>
                  {successfulCount >= 2 ? (
                    <span className="text-xs text-emerald-400 font-bold">(Passed)</span>
                  ) : (
                    <span className="text-xs text-slate-400">({2 - successfulCount} needed)</span>
                  )}
                </div>

                {/* Switch student button (DISABLED during active quiz) */}
                {isQuizActive ? (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400 text-xs font-medium cursor-not-allowed">
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Locked during answer</span>
                  </div>
                ) : (
                  <button
                    id="btn-logout-student"
                    onClick={handleLogoutStudent}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Switch Student</span>
                  </button>
                )}
              </div>
            </div>

            {/* If Locked Out (Hangus) */}
            {isLockedOut && question && (
              <div className="p-6 rounded-2xl bg-rose-950/40 border border-rose-800/80 text-rose-200 space-y-4 shadow-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
                    <AlertTriangle className="w-7 h-7 animate-bounce" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-extrabold text-rose-300">
                      ROOM {roomId} IS LOCKED OUT (HANGUS)!
                    </h3>
                    <p className="text-sm text-rose-200 leading-relaxed">
                      You selected Star #{attempt?.selectedStarNumber}, which was incorrect. Room {roomId} is now permanently burned and locked out for your session.
                    </p>
                    <p className="text-xs text-rose-300 font-medium pt-1">
                      💡 Move to another room (Room A, Room B, Room C, or Room D) to earn qualifying points!
                    </p>
                  </div>
                </div>

                {/* Explanation */}
                <div className="p-3.5 rounded-xl bg-rose-900/30 border border-rose-700/50 text-xs text-rose-200">
                  <span className="font-semibold text-white">Debrief & Explanation: </span>
                  {question.explanation}
                </div>

                {/* Switch to other available rooms */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-xs font-semibold text-slate-300">Move to Room:</span>
                  {([1, 2, 3, 4] as const)
                    .filter((r) => r !== roomNumber)
                    .map((r) => {
                      const otherAttempt = currentRecord?.attempts[r];
                      const isOtherDone = otherAttempt?.status === 'completed';
                      const isOtherLocked = otherAttempt?.status === 'locked_out';
                      const otherLetter = ROOM_MAPPING[r];

                      return (
                        <button
                          key={r}
                          id={`btn-goto-other-room-${otherLetter.toLowerCase()}`}
                          onClick={() => onChangeRoom(r)}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                            isOtherDone
                              ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
                              : isOtherLocked
                              ? 'bg-rose-950/60 text-rose-400 border border-rose-800 opacity-60'
                              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg'
                          }`}
                        >
                          <Building className="w-3.5 h-3.5" />
                          <span>Room {otherLetter}</span>
                          {isOtherDone && ' (Cleared)'}
                          {isOtherLocked && ' (Locked)'}
                          {!isOtherDone && !isOtherLocked && ' (Available)'}
                        </button>
                      );
                    })}
                </div>
              </div>
            )}

            {/* If Already Completed */}
            {isCompleted && question && targetReg && (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-800/80 text-emerald-200 space-y-4 shadow-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-extrabold text-emerald-300">
                      ROOM {roomId} MISSION COMPLETED!
                    </h3>
                    <p className="text-sm text-emerald-200 leading-relaxed">
                      You correctly identified Star #{question.targetStarNumber} on constellation {constellation?.name} ({targetReg.name} - {targetReg.colorName})!
                    </p>
                    {isFullPoint ? (
                      <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs font-bold flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-400" />
                        <span>CONGRATULATIONS! FULL POINTS ACHIEVED (AT LEAST 2 ROOMS COMPLETED)!</span>
                      </div>
                    ) : (
                      <p className="text-xs text-emerald-300 font-medium">
                        You have earned 1 point! Clear 1 more room to achieve Full Points!
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-xs font-semibold text-slate-300">Continue to another Room:</span>
                  {([1, 2, 3, 4] as const)
                    .filter((r) => r !== roomNumber)
                    .map((r) => {
                      const otherAttempt = currentRecord?.attempts[r];
                      const isOtherDone = otherAttempt?.status === 'completed';
                      const otherLetter = ROOM_MAPPING[r];

                      return (
                        <button
                          key={r}
                          id={`btn-next-room-${otherLetter.toLowerCase()}`}
                          onClick={() => onChangeRoom(r)}
                          disabled={isOtherDone}
                          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                            isOtherDone
                              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-500 text-white'
                          }`}
                        >
                          <Building className="w-3.5 h-3.5" />
                          <span>Room {otherLetter}</span>
                          {isOtherDone && ' (Cleared)'}
                        </button>
                      );
                    })}
                </div>
              </div>
            )}

            {/* ACTIVE QUIZ MODE: ONLY STAR BUTTONS & LOCK IN ANSWER BUTTON ARE CLICKABLE */}
            {isQuizActive && question && constellation && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Story Question & Submission (5 cols) */}
                <div className="lg:col-span-5 space-y-4 flex flex-col">
                  {/* Scenario Card */}
                  <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        Assigned Constellation Mission
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {constellation.name}
                      </span>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      {question.storyScenario}
                    </p>

                    <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-800/40 space-y-1.5">
                      <div className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Mission Challenge for {selectedStudentName}:</span>
                      </div>
                      <p className="text-xs md:text-sm font-medium text-slate-200 leading-normal">
                        {question.questionText}
                      </p>
                    </div>
                  </div>

                  {/* Star Selection Card */}
                  <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                          Choose Star on {constellation.name}:
                        </label>
                        {selectedStarNumber !== null && (
                          <span className="text-xs text-cyan-400 font-semibold animate-pulse">
                            Star #{selectedStarNumber} Selected
                          </span>
                        )}
                      </div>

                      {/* Clickable Star Buttons */}
                      <div className="grid grid-cols-5 gap-2">
                        {constellation.stars.map((star) => {
                          const isSelected = selectedStarNumber === star.labelNumber;
                          return (
                            <button
                              key={star.id}
                              id={`btn-pick-star-${star.labelNumber}`}
                              onClick={() => {
                                sound.playSelect();
                                setSelectedStarNumber(star.labelNumber);
                              }}
                              className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                                isSelected
                                  ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/40 ring-2 ring-blue-400/60 scale-105'
                                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/70 active:scale-95'
                              }`}
                            >
                              <span className="text-[10px] text-slate-400">Star</span>
                              <span className="font-mono text-base font-extrabold">
                                #{star.labelNumber}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="text-[11px] text-slate-400 flex items-start gap-1.5 p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                        <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>
                          <strong>Strict Examination Mode:</strong> All navigation is locked until you submit. An incorrect answer will lock out Room {roomId}!
                        </span>
                      </div>

                      {/* Lock In Answer Button */}
                      <button
                        id="btn-submit-answer"
                        onClick={handleSubmitAnswer}
                        disabled={selectedStarNumber === null}
                        className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>
                          {selectedStarNumber !== null
                            ? `Lock In Star #${selectedStarNumber}`
                            : 'Select a Star to Lock In'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column: Interactive Constellation Map (7 cols) */}
                <div className="lg:col-span-7 flex flex-col">
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex-1 flex flex-col">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                      <div className="flex items-center gap-2">
                        <Compass className="w-4 h-4 text-cyan-400" />
                        <span className="font-bold text-slate-200">
                          Constellation Map: {constellation.name} ({constellation.latinName})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 hidden sm:inline">
                          Click on any star node to select
                        </span>
                      </div>
                    </div>

                    <div className="relative flex-1 min-h-[380px] w-full rounded-xl bg-[#030712] border border-slate-800/80 overflow-hidden my-3">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/25 via-[#030712] to-black" />

                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {/* Constellation Connector Lines */}
                        {constellation.lines.map((line, idx) => {
                          const s1 = constellation.stars.find((s) => s.id === line.from);
                          const s2 = constellation.stars.find((s) => s.id === line.to);
                          if (!s1 || !s2) return null;
                          return (
                            <line
                              key={`line-${idx}`}
                              x1={`${s1.x}%`}
                              y1={`${s1.y}%`}
                              x2={`${s2.x}%`}
                              y2={`${s2.y}%`}
                              stroke="rgba(148, 163, 184, 0.4)"
                              strokeWidth="0.6"
                              strokeDasharray="1.5, 1.5"
                            />
                          );
                        })}

                        {/* Interactive Star Nodes */}
                        {constellation.stars.map((star) => {
                          const isSelected = selectedStarNumber === star.labelNumber;

                          return (
                            <g
                              key={star.id}
                              id={`svg-star-node-${star.labelNumber}`}
                              onClick={() => {
                                sound.playSelect();
                                setSelectedStarNumber(star.labelNumber);
                              }}
                              className="cursor-pointer group"
                            >
                              {/* Selection pulse ring */}
                              {isSelected && (
                                <circle
                                  cx={`${star.x}%`}
                                  cy={`${star.y}%`}
                                  r="4.5"
                                  fill="rgba(59, 130, 246, 0.35)"
                                  stroke="#60A5FA"
                                  strokeWidth="0.6"
                                  className="animate-ping origin-center"
                                />
                              )}

                              {/* Hover / Glow circle */}
                              <circle
                                cx={`${star.x}%`}
                                cy={`${star.y}%`}
                                r={isSelected ? '3.8' : '2.8'}
                                fill={isSelected ? '#3B82F6' : 'rgba(255, 255, 255, 0.2)'}
                                stroke={isSelected ? '#93C5FD' : 'rgba(255, 255, 255, 0.6)'}
                                strokeWidth={isSelected ? '0.8' : '0.4'}
                                className="transition-all group-hover:fill-blue-500 group-hover:scale-125 origin-center"
                              />

                              {/* Star Center Core */}
                              <circle
                                cx={`${star.x}%`}
                                cy={`${star.y}%`}
                                r="1.2"
                                fill="#ffffff"
                              />

                              {/* Star Label Number Text */}
                              <text
                                x={`${star.x}%`}
                                y={`${star.y - 3.8}%`}
                                textAnchor="middle"
                                dominantBaseline="central"
                                fill={isSelected ? '#93C5FD' : '#ffffff'}
                                fontSize="3"
                                fontWeight="bold"
                                fontFamily="'JetBrains Mono', monospace"
                                className="select-none pointer-events-none drop-shadow-md"
                              >
                                #{star.labelNumber}
                              </text>
                            </g>
                          );
                        })}
                      </svg>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                      <span>💡 Assigned to {selectedStudentName} in Room {roomId}</span>
                      <span className="font-semibold text-slate-300">Room {roomId}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
