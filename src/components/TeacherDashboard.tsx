import React, { useState, useEffect } from 'react';
import { StudentRecord, RoomNumber, ROOM_MAPPING } from '../types';
import { useGameData } from '../contexts/GameDataContext';
import {
  loadAllStudentRecords,
  resetStudentProgress,
  resetAllGameData,
  listenToSync,
  getVideoPassword,
  setVideoPassword
} from '../utils/storage';
import {
  Users,
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Search,
  Building,
  Trash2,
  ShieldCheck,
  Filter,
  Compass
} from 'lucide-react';

interface TeacherDashboardProps {
  onGoToRoom: (roomNum: RoomNumber) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  onGoToRoom
}) => {
  const { gameData } = useGameData();
  const [records, setRecords] = useState<Record<string, StudentRecord>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'full_points' | 'in_progress'>('all');
  const [passInput, setPassInput] = useState(getVideoPassword() || '');

  const refresh = () => {
    setRecords(loadAllStudentRecords());
  };

  useEffect(() => {
    refresh();
    const unsubscribe = listenToSync(() => {
      refresh();
    });
    return unsubscribe;
  }, []);

  const handleResetSingle = (name: string) => {
    if (confirm(`Reset all room progress for student: ${name}?`)) {
      resetStudentProgress(name);
      refresh();
    }
  };

  const handleResetAll = () => {
    if (confirm('CAUTION: Are you sure you want to reset ALL student progress across all 4 rooms?')) {
      resetAllGameData();
      refresh();
    }
  };

  const studentList = (Object.values(records) as StudentRecord[]).filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStudents = studentList.filter((s) => {
    if (filterMode === 'full_points') return s.isFullPoint;
    if (filterMode === 'in_progress') return !s.isFullPoint;
    return true;
  });

  const fullPointCount = studentList.filter((s) => s.isFullPoint).length;

  return (
    <div id="teacher-dashboard-container" className="min-h-full bg-slate-950 text-slate-100 p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                TEACHER DASHBOARD
              </span>
              <span className="text-xs text-slate-400">Live Multi-Room Session Monitor</span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              MemConstella - Class Progress Monitor
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 mr-4 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            <input
              type="password"
              placeholder="Video Password..."
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 outline-none"
              value={passInput}
              onChange={(e) => {
                setPassInput(e.target.value);
                setVideoPassword(e.target.value);
              }}
            />
            <span className="text-[10px] text-slate-400">Set Video Pass</span>
          </div>

          <button
            id="btn-download-template"
            onClick={() => {
              const template = {
                registers: {
                  "TERM1": {
                    "code": "TERM1",
                    "name": "First Important Term",
                    "colorName": "Red",
                    "hex": "#EF4444",
                    "glowHex": "rgba(239, 68, 68, 0.85)"
                  }
                },
                roomTemplates: {
                  "1": {
                    "targetRegister": "TERM1",
                    "title": "First Subject Concept",
                    "storyScenario": "Describe the scenario here.",
                    "questionText": "Based on the scenario, which concept is described here?",
                    "roleHint": "Hint goes here."
                  }
                },
                constellations: [
                  {
                    "id": "custom-constellation-1",
                    "name": "Custom Constellation",
                    "latinName": "Constellatio Customis",
                    "stars": [
                      { "id": 1, "labelNumber": 1, "x": 50, "y": 50, "assignedRegister": "TERM1" }
                    ],
                    "lines": []
                  }
                ]
              };
              const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'custom_material_template.json';
              a.click();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-950/60 hover:bg-blue-900/80 text-blue-300 border border-blue-800/80 text-xs font-semibold transition-colors"
          >
            <span>Download Custom Template</span>
          </button>

          <button
            id="btn-teacher-reset-all"
            onClick={handleResetAll}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/80 text-xs font-semibold transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Reset All Class Data</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Enrolled Students</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{studentList.length}</div>
          <div className="text-[11px] text-slate-500">Registered across Room A, B, C, D</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Full Points Achieved</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400">{fullPointCount}</div>
          <div className="text-[11px] text-slate-500">Passed $\ge$ 2 out of 4 rooms</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>In Progress</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-cyan-400">{studentList.length - fullPointCount}</div>
          <div className="text-[11px] text-slate-500">Still solving room missions</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Passing Threshold</span>
            <Building className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold text-indigo-400">2 / 4 Rooms</div>
          <div className="text-[11px] text-slate-500">50% clearance needed</div>
        </div>
      </div>

      {/* Quick Launch Room Stations */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Quick Launch Student Terminals:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {([1, 2, 3, 4] as const).map((rNum) => {
            const letter = ROOM_MAPPING[rNum];
            return (
              <button
                key={rNum}
                id={`btn-dashboard-open-room-${letter.toLowerCase()}`}
                onClick={() => onGoToRoom(rNum)}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-500/50 transition-all group text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Room {letter}</div>
                    <div className="text-[10px] text-slate-400 font-mono">Terminal {rNum}</div>
                  </div>
                </div>
                <span className="text-xs text-blue-400 group-hover:translate-x-0.5 transition-transform">→</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Student Matrix Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4">
        {/* Table Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="input-search-student-dashboard"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student name..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                id="btn-filter-all"
                onClick={() => setFilterMode('all')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  filterMode === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({studentList.length})
              </button>
              <button
                id="btn-filter-full-points"
                onClick={() => setFilterMode('full_points')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  filterMode === 'full_points'
                    ? 'bg-amber-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Full Points ({fullPointCount})
              </button>
              <button
                id="btn-filter-progress"
                onClick={() => setFilterMode('in_progress')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  filterMode === 'in_progress'
                    ? 'bg-cyan-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                In Progress ({studentList.length - fullPointCount})
              </button>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Student Name</th>
                <th className="p-3.5 text-center">Room A (PC)</th>
                <th className="p-3.5 text-center">Room B (ACC)</th>
                <th className="p-3.5 text-center">Room C (MDR)</th>
                <th className="p-3.5 text-center">Room D (IR)</th>
                <th className="p-3.5 text-center">Rooms Cleared</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-center">Reset</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500">
                    No student records match your search filter.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  const pts = student.successfulRooms.length;

                  return (
                    <tr key={student.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 font-semibold text-slate-200">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-xs">
                            {student.name.charAt(0)}
                          </div>
                          <span>{student.name}</span>
                        </div>
                      </td>

                      {/* Rooms A, B, C, D */}
                      {([1, 2, 3, 4] as const).map((rNum) => {
                        const att = student.attempts[rNum];
                        const isDone = att?.status === 'completed';
                        const isLocked = att?.status === 'locked_out';
                        const constellation = gameData.getConstellation(student.name, rNum);

                        return (
                          <td key={rNum} className="p-3 text-center">
                            <div className="space-y-1">
                              {isDone && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-[10px]">
                                  <CheckCircle2 className="w-3 h-3" /> Cleared
                                </span>
                              )}
                              {isLocked && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold text-[10px]">
                                  <XCircle className="w-3 h-3" /> Locked
                                </span>
                              )}
                              {!isDone && !isLocked && (
                                <span className="text-slate-500 font-mono text-[10px]">Available</span>
                              )}
                              <div className="text-[10px] text-cyan-400/80 font-mono">
                                {constellation.name}
                              </div>
                            </div>
                          </td>
                        );
                      })}

                      {/* Score */}
                      <td className="p-3 text-center font-mono font-bold text-slate-200">
                        <span className={pts >= 2 ? 'text-amber-400' : 'text-slate-400'}>
                          {pts} / 2 Target
                        </span>
                      </td>

                      {/* Full Points Status */}
                      <td className="p-3 text-center">
                        {student.isFullPoint ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold text-[10px]">
                            <Award className="w-3 h-3" /> FULL POINT
                          </span>
                        ) : (
                          <span className="text-slate-500 text-[11px]">
                            {pts === 1 ? '1 Room Left' : '0 Cleared'}
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="p-3 text-center">
                        <button
                          id={`btn-reset-student-${student.id}`}
                          onClick={() => handleResetSingle(student.name)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                          title={`Reset progress for ${student.name}`}
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Guidance */}
        <div className="text-[11px] text-slate-500 flex flex-wrap items-center justify-between pt-2 gap-2">
          <span>Rule: Students achieve Full Points once they clear at least 2 out of the 4 Rooms.</span>
          <span>Different constellation assigned to each student per room. Auto-synced in real time.</span>
        </div>
      </div>
    </div>
  );
};
