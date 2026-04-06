'use client';

import { useState, useEffect } from 'react';
import { cheerPlan, CheerDayTemplate, CheerPhase } from '@/lib/cheer-plan';

const typeColors: Record<string, string> = {
  bwo: 'border-coral bg-red-50',
  fwo: 'border-purple-400 bg-purple-50',
  combo: 'border-amber bg-amber-50',
  rest: 'border-gray-300 bg-gray-50',
  gym: 'border-emerald-400 bg-emerald-50',
  fun: 'border-sky-400 bg-sky-50',
};

const typeIcons: Record<string, string> = {
  bwo: '🔥', fwo: '⚡', combo: '🏆', rest: '💤', gym: '🏟️', fun: '🎉',
};

const DRILL_KEY = 'cheer_mastery_';
const MILESTONE_KEY = 'cheer_milestone_';

function DayCard({ day, phaseNum }: { day: CheerDayTemplate; phaseNum: number }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [expanded, setExpanded] = useState(false);
  const storagePrefix = `${DRILL_KEY}p${phaseNum}_${day.dayOfWeek}_`;

  useEffect(() => {
    const loaded: Record<number, boolean> = {};
    day.drills.forEach((_, i) => {
      if (localStorage.getItem(storagePrefix + i) === 'true') loaded[i] = true;
    });
    setChecked(loaded);
  }, [day.drills.length, storagePrefix]);

  const toggle = (i: number) => {
    const next = { ...checked, [i]: !checked[i] };
    setChecked(next);
    localStorage.setItem(storagePrefix + i, String(next[i]));
  };

  const done = Object.values(checked).filter(Boolean).length;
  const total = day.drills.length;

  return (
    <div className={`rounded-xl border-l-4 overflow-hidden ${typeColors[day.type]}`}>
      <button onClick={() => setExpanded(!expanded)} className="w-full p-3 text-left flex items-center gap-2">
        <span className="text-lg">{typeIcons[day.type]}</span>
        <div className="flex-1 min-w-0">
          <span className="font-body font-bold text-xs text-navy">{day.dayOfWeek}</span>
          <span className="font-body text-xs text-gray-500 ml-2">{day.label} · {day.duration}</span>
        </div>
        <span className="text-[10px] font-body text-gray-400">{done}/{total}</span>
        <svg className={`w-4 h-4 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {expanded && (
        <div className="px-3 pb-3 space-y-1.5">
          {day.drills.map((drill, i) => (
            <label key={i} className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" checked={!!checked[i]} onChange={() => toggle(i)}
                className="mt-0.5 rounded border-gray-300 text-coral focus:ring-coral" />
              <span className={`font-body text-xs ${checked[i] ? 'line-through text-gray-400' : 'text-navy'}`}>
                {drill.isMilestone && <span className="text-amber-500 mr-1">🎯</span>}
                {drill.text}
                {drill.surface && <span className="text-[10px] text-gray-400 ml-1">({drill.surface})</span>}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function MilestoneTracker() {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const loaded: Record<number, boolean> = {};
    cheerPlan.milestones.forEach((_, i) => {
      if (localStorage.getItem(MILESTONE_KEY + i) === 'true') loaded[i] = true;
    });
    setChecked(loaded);
  }, []);

  const toggle = (i: number) => {
    const next = { ...checked, [i]: !checked[i] };
    setChecked(next);
    localStorage.setItem(MILESTONE_KEY + i, String(next[i]));
  };

  const totalDone = Object.values(checked).filter(Boolean).length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="font-heading text-sm font-bold text-navy">Progress Tracker</h3>
        <span className="text-xs font-body text-gray-400">{totalDone}/{cheerPlan.milestones.length}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="bg-coral h-2 rounded-full transition-all" style={{ width: `${(totalDone / cheerPlan.milestones.length) * 100}%` }} />
      </div>
      {[1, 2, 3, 4, 5].map((phase) => {
        const items = cheerPlan.milestones.filter((m) => m.phase === phase);
        const phaseDone = items.filter((_, i) => {
          const globalIdx = cheerPlan.milestones.findIndex((m) => m === items[0]) + items.indexOf(_);
          return checked[cheerPlan.milestones.indexOf(_)];
        }).length;
        return (
          <div key={phase} className="bg-white rounded-xl p-3 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="font-body font-bold text-xs text-navy">
                Phase {phase}: {cheerPlan.phases[phase - 1]?.title}
              </p>
              <span className="text-[10px] font-body text-gray-400">{phaseDone}/{items.length}</span>
            </div>
            <div className="space-y-1">
              {items.map((m) => {
                const idx = cheerPlan.milestones.indexOf(m);
                return (
                  <label key={idx} className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" checked={!!checked[idx]} onChange={() => toggle(idx)}
                      className="mt-0.5 rounded border-gray-300 text-coral focus:ring-coral" />
                    <span className={`font-body text-xs ${checked[idx] ? 'line-through text-gray-400' : 'text-navy'}`}>
                      {m.text}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}
      <p className="text-center font-body text-xs text-gray-400 italic px-4">
        Every checked box is proof she&apos;s getting stronger, braver, and better. Celebrate every single one.
      </p>
    </div>
  );
}

export default function CheerTab() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [view, setView] = useState<'drills' | 'milestones' | 'schedule'>('drills');

  const phase = cheerPlan.phases[currentPhase];

  return (
    <div className="space-y-3">
      <div className="px-1">
        <h2 className="font-heading text-lg font-bold text-navy">{cheerPlan.name}</h2>
        <p className="font-body text-xs text-gray-400 mt-0.5">{cheerPlan.subtitle}</p>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 px-1">
        <button onClick={() => setView('drills')}
          className={`text-xs font-body font-medium px-3 py-1.5 rounded-full transition-colors ${view === 'drills' ? 'bg-coral text-white' : 'bg-gray-100 text-gray-500'}`}>
          Drills
        </button>
        <button onClick={() => setView('milestones')}
          className={`text-xs font-body font-medium px-3 py-1.5 rounded-full transition-colors ${view === 'milestones' ? 'bg-coral text-white' : 'bg-gray-100 text-gray-500'}`}>
          Progress
        </button>
        <button onClick={() => setView('schedule')}
          className={`text-xs font-body font-medium px-3 py-1.5 rounded-full transition-colors ${view === 'schedule' ? 'bg-coral text-white' : 'bg-gray-100 text-gray-500'}`}>
          Schedule
        </button>
      </div>

      {view === 'schedule' && (
        <div className="space-y-2">
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <p className="font-body font-bold text-sm text-navy mb-2">Weekly Structure</p>
            <div className="space-y-1.5">
              {cheerPlan.weeklyStructure.map((d) => (
                <div key={d.day} className="flex gap-2">
                  <span className="font-body font-bold text-xs text-navy w-20 flex-shrink-0">{d.day}</span>
                  <span className="font-body text-xs text-gray-600">{d.desc}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <p className="font-body font-bold text-sm text-navy mb-2">Equipment</p>
            <div className="flex flex-wrap gap-2">
              {cheerPlan.equipment.map((e) => (
                <span key={e} className="text-xs font-body px-2 py-1 rounded-full bg-gray-100 text-gray-600">{e}</span>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <p className="font-body font-bold text-sm text-navy mb-2">The 6 Skills in Order</p>
            <div className="space-y-1">
              {cheerPlan.skills.map((s, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <span className="font-body font-bold text-xs text-coral w-5 flex-shrink-0">{i + 1}.</span>
                  <span className="font-body text-xs text-gray-700">{s}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-amber-50 rounded-xl p-3 border border-amber-200">
            <p className="font-body text-xs text-amber-800">
              <span className="font-bold">How this plan works:</span> This is NOT a calendar. It&apos;s a mastery roadmap.
              She moves to the next phase when she&apos;s READY, not when a date says so. Some phases take 2 weeks, some take 6. That&apos;s fine.
            </p>
          </div>
          <div className="bg-sky-50 rounded-xl p-3 border border-sky-200">
            <p className="font-body text-xs text-sky-800">
              <span className="font-bold">15-20 minutes</span> is the sweet spot for a 7-year-old. If she wants to keep going, great. If she&apos;s done at 15, let her stop. Forced reps build resentment, not skills.
            </p>
          </div>
        </div>
      )}

      {view === 'milestones' && <MilestoneTracker />}

      {view === 'drills' && (
        <>
          {/* Phase Selector */}
          <div className="flex overflow-x-auto hide-scrollbar gap-1.5 px-1">
            {cheerPlan.phases.map((p, i) => (
              <button key={i} onClick={() => setCurrentPhase(i)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-body font-medium transition-colors ${
                  currentPhase === i ? 'bg-coral text-white' : 'bg-white text-gray-500 border border-gray-200'
                }`}>
                P{p.phaseNumber}
              </button>
            ))}
          </div>

          {/* Phase Header */}
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <p className="font-body font-bold text-sm text-navy">Phase {phase.phaseNumber}: {phase.title}</p>
            <p className="font-body text-xs text-gray-600 mt-1">{phase.skill}</p>
            <div className="mt-2 bg-emerald-50 rounded-lg p-2 border border-emerald-200">
              <p className="font-body text-xs text-emerald-800">
                <span className="font-bold">Move on when:</span> {phase.moveOnWhen}
              </p>
            </div>
          </div>

          {/* Phase Notes */}
          {phase.notes && phase.notes.map((note, i) => (
            <div key={i} className="bg-amber-50 rounded-xl p-3 border border-amber-200">
              <p className="font-body text-xs text-amber-800">{note}</p>
            </div>
          ))}

          {/* Day Cards */}
          <div className="space-y-2">
            {phase.days.map((day) => (
              <DayCard key={`${phase.phaseNumber}-${day.dayOfWeek}`} day={day} phaseNum={phase.phaseNumber} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
