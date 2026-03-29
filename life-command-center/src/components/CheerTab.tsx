'use client';

import { useState, useEffect } from 'react';
import { cheerPlan, CheerDay } from '@/lib/cheer-plan';

const typeColors: Record<string, string> = {
  bwo: 'border-coral bg-red-50',
  ro: 'border-purple-400 bg-purple-50',
  full: 'border-amber bg-amber-50',
  rest: 'border-gray-300 bg-gray-50',
  gym: 'border-emerald-400 bg-emerald-50',
};

const typeIcons: Record<string, string> = {
  bwo: '🔥',
  ro: '⚡',
  full: '🏆',
  rest: '💤',
  gym: '🏟️',
};

function getStorageKey(date: string, drillIndex: number) {
  return `cheer_${date}_${drillIndex}`;
}

function DayCard({ day }: { day: CheerDay }) {
  const [checkedDrills, setCheckedDrills] = useState<Record<number, boolean>>({});
  const [expanded, setExpanded] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dayDate = new Date(day.date + 'T00:00:00');
  const isToday = dayDate.toDateString() === today.toDateString();
  const isFuture = dayDate > today;

  useEffect(() => {
    const loaded: Record<number, boolean> = {};
    day.drills.forEach((_, i) => {
      const val = localStorage.getItem(getStorageKey(day.date, i));
      if (val === 'true') loaded[i] = true;
    });
    setCheckedDrills(loaded);
    if (isToday) setExpanded(true);
  }, [day.date, day.drills.length, isToday]);

  const toggleDrill = (index: number) => {
    const newChecked = { ...checkedDrills, [index]: !checkedDrills[index] };
    setCheckedDrills(newChecked);
    localStorage.setItem(getStorageKey(day.date, index), String(newChecked[index]));
  };

  const completedCount = Object.values(checkedDrills).filter(Boolean).length;
  const totalDrills = day.drills.length;
  const allDone = completedCount === totalDrills && totalDrills > 0;

  return (
    <div className={`rounded-xl border-l-4 overflow-hidden ${typeColors[day.type]} ${isFuture ? 'opacity-60' : ''}`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-3 text-left flex items-center gap-2"
      >
        <span className="text-lg">{typeIcons[day.type]}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-body font-bold text-xs text-navy">
              {day.dayOfWeek} {day.date.split('-')[1]}/{day.date.split('-')[2]}
            </span>
            {isToday && <span className="text-[10px] bg-coral text-white px-1.5 py-0.5 rounded-full font-body font-medium">TODAY</span>}
            {allDone && <span className="text-[10px] bg-sage text-white px-1.5 py-0.5 rounded-full font-body font-medium">DONE</span>}
          </div>
          <p className="font-body text-xs text-gray-600 mt-0.5">{day.title} · {day.duration}</p>
        </div>
        {totalDrills > 0 && (
          <span className="text-[10px] font-body text-gray-400">{completedCount}/{totalDrills}</span>
        )}
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {expanded && (
        <div className="px-3 pb-3 space-y-1.5">
          {day.drills.map((drill, i) => (
            <label key={i} className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={!!checkedDrills[i]}
                onChange={() => toggleDrill(i)}
                className="mt-0.5 rounded border-gray-300 text-coral focus:ring-coral"
              />
              <span className={`font-body text-xs ${checkedDrills[i] ? 'line-through text-gray-400' : 'text-navy'}`}>
                {drill.text}
                {drill.surface && (
                  <span className="text-[10px] text-gray-400 ml-1">({drill.surface})</span>
                )}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CheerTab() {
  const [currentWeek, setCurrentWeek] = useState(0);

  useEffect(() => {
    const today = new Date();
    const weekIndex = cheerPlan.weeks.findIndex((week) => {
      const days = week.days;
      if (days.length === 0) return false;
      const start = new Date(days[0].date + 'T00:00:00');
      const end = new Date(days[days.length - 1].date + 'T00:00:00');
      end.setDate(end.getDate() + 1);
      return today >= start && today < end;
    });
    if (weekIndex >= 0) setCurrentWeek(weekIndex);
  }, []);

  const week = cheerPlan.weeks[currentWeek];

  return (
    <div className="space-y-3">
      <div className="px-1">
        <h2 className="font-heading text-lg font-bold text-navy">{cheerPlan.name}</h2>
        <p className="font-body text-xs text-gray-400 mt-0.5">Texas All Star Cheer · TTOC · Level 1</p>
      </div>

      {/* Week Selector */}
      <div className="flex overflow-x-auto hide-scrollbar gap-1.5 px-1">
        {cheerPlan.weeks.map((w, i) => (
          <button
            key={i}
            onClick={() => setCurrentWeek(i)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-body font-medium transition-colors ${
              currentWeek === i
                ? 'bg-coral text-white'
                : 'bg-white text-gray-500 border border-gray-200'
            }`}
          >
            Wk {w.weekNumber}
          </button>
        ))}
      </div>

      {/* Week Header */}
      <div className="bg-white rounded-xl p-3 shadow-sm">
        <p className="font-body font-bold text-sm text-navy">Week {week.weekNumber}: {week.title}</p>
        <p className="font-body text-xs text-gray-500">{week.dateRange}</p>
        <p className="font-body text-xs text-gray-400 mt-0.5">{week.focus}</p>
      </div>

      {/* Days */}
      <div className="space-y-2">
        {week.days.map((day) => (
          <DayCard key={day.date} day={day} />
        ))}
      </div>

      {/* Legend */}
      <div className="bg-white rounded-xl p-3 shadow-sm">
        <p className="font-body text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-2">Day Types</p>
        <div className="flex flex-wrap gap-2">
          <span className="text-[10px] font-body px-2 py-1 rounded-full bg-red-50 text-coral border border-coral/20">🔥 BWO Day</span>
          <span className="text-[10px] font-body px-2 py-1 rounded-full bg-purple-50 text-purple-600 border border-purple-200">⚡ RO Day</span>
          <span className="text-[10px] font-body px-2 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">🏆 Full Practice</span>
          <span className="text-[10px] font-body px-2 py-1 rounded-full bg-gray-50 text-gray-500 border border-gray-200">💤 Rest</span>
          <span className="text-[10px] font-body px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">🏟️ Gym</span>
        </div>
      </div>
    </div>
  );
}
