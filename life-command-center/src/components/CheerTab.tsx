'use client';

import { useState } from 'react';
import {
  TRYOUT_PHASE,
  DEV_PHASE,
  MILESTONES,
  TRYOUT_TIPS,
  ENGAGEMENT,
  HEIGHT_TIPS,
} from '@/lib/cheer-plan';

type Section = 'plan' | 'tryout' | 'milestones' | 'engagement';
type Phase = 'tryout' | 'dev';

export default function CheerTab() {
  const [activeSection, setActiveSection] = useState<Section>('plan');
  const [activePhase, setActivePhase] = useState<Phase>('tryout');
  const [activeDay, setActiveDay] = useState(0);
  const [activeWeek, setActiveWeek] = useState(0);

  const sections: { id: Section; label: string; icon: string }[] = [
    { id: 'plan', label: 'Training', icon: '📋' },
    { id: 'tryout', label: 'Tryout Day', icon: '🎯' },
    { id: 'milestones', label: 'Milestones', icon: '📊' },
    { id: 'engagement', label: 'Engage', icon: '🎮' },
  ];

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-red-600 rounded-xl p-5 text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-400/10 rounded-full" />
        <div className="absolute -bottom-8 left-1/4 w-48 h-48 bg-blue-400/10 rounded-full" />
        <div className="relative z-10">
          <p className="text-[10px] tracking-[3px] text-red-300 uppercase font-bold mb-1">
            Mini Prep 1.1 &rarr; TAC Hutto
          </p>
          <h1 className="font-heading text-2xl font-bold tracking-wide leading-tight">
            Training &amp; Development Plan
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Two-phase strategy for a tall 7-year-old aging out of Tiny Novice.
          </p>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-1">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`flex-1 py-2 px-1 rounded-lg text-center transition-colors ${
              activeSection === s.id
                ? 'bg-white shadow-sm font-bold text-gray-900'
                : 'bg-gray-50 text-gray-400'
            }`}
          >
            <span className="block text-base">{s.icon}</span>
            <span className="font-body text-[10px]">{s.label}</span>
          </button>
        ))}
      </div>

      {/* ===== TRAINING PLAN ===== */}
      {activeSection === 'plan' && (
        <div className="space-y-3">
          {/* Phase Toggle */}
          <div className="flex gap-2">
            {([
              { id: 'tryout' as Phase, data: TRYOUT_PHASE, color: 'border-red-500 bg-red-50/50' },
              { id: 'dev' as Phase, data: DEV_PHASE, color: 'border-blue-500 bg-blue-50/50' },
            ]).map((p) => (
              <button
                key={p.id}
                onClick={() => { setActivePhase(p.id); setActiveDay(0); setActiveWeek(0); }}
                className={`flex-1 p-3 rounded-xl text-left border-2 transition-all ${
                  activePhase === p.id ? p.color : 'border-gray-200 bg-gray-50'
                }`}
              >
                <span className="text-2xl block mb-1">{p.data.icon}</span>
                <span className={`text-[10px] tracking-widest font-bold block ${
                  activePhase === p.id
                    ? p.id === 'tryout' ? 'text-red-500' : 'text-blue-600'
                    : 'text-gray-400'
                }`}>
                  {p.data.label}
                </span>
                <span className="font-body font-bold text-sm text-gray-900 block">{p.data.title}</span>
                <span className="font-body text-xs text-gray-400">{p.data.duration}</span>
              </button>
            ))}
          </div>

          {/* Philosophy */}
          <div className={`rounded-xl p-3 border text-xs font-body leading-relaxed ${
            activePhase === 'tryout'
              ? 'bg-red-50/50 border-red-200 text-gray-600'
              : 'bg-blue-50/50 border-blue-200 text-gray-600'
          }`}>
            <span className={`font-bold ${activePhase === 'tryout' ? 'text-red-500' : 'text-blue-600'}`}>
              Philosophy:{' '}
            </span>
            {activePhase === 'tryout' ? TRYOUT_PHASE.philosophy : DEV_PHASE.philosophy}
          </div>

          {/* Phase 1: Training Days */}
          {activePhase === 'tryout' && (
            <>
              <div className="flex gap-1.5">
                {TRYOUT_PHASE.days.map((day, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveDay(i)}
                    className={`flex-1 p-2 rounded-lg text-center border-2 transition-all ${
                      activeDay === i ? 'border-red-500 bg-white' : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <span className={`font-body font-bold text-xs block ${
                      activeDay === i ? 'text-red-500' : 'text-gray-400'
                    }`}>
                      {day.name}
                    </span>
                    <span className="font-body text-[10px] text-gray-400 block mt-0.5">{day.focus}</span>
                    <span className="font-body text-[10px] text-gray-300 block">{day.time}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                {TRYOUT_PHASE.days[activeDay].blocks.map((block, i) => (
                  <div key={i} className={`flex gap-3 p-3 rounded-xl border border-gray-100 ${
                    i % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  }`}>
                    <div className="flex-shrink-0">
                      <span className="inline-block bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md">
                        {block.time}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body font-bold text-sm text-gray-900">{block.name}</p>
                      <p className="font-body text-xs text-gray-500 leading-relaxed mt-0.5">{block.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                <p className="font-body text-xs text-amber-800 leading-relaxed">
                  <strong>Week 2 adjustments:</strong> Increase bridge rock reps by 2–3/set. Add one-leg bridge
                  holds. Introduce wall walk-downs. Slight increase in round-off attempts. Reduce intensity final 2
                  days before tryouts — Day 4 is light stretching + one confidence run-through only.
                </p>
              </div>
            </>
          )}

          {/* Phase 2: Development Weeks */}
          {activePhase === 'dev' && (
            <>
              <div className="grid grid-cols-2 gap-2">
                {DEV_PHASE.weeks.map((week, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveWeek(i)}
                    className={`p-3 rounded-xl text-left border-2 transition-all ${
                      activeWeek === i ? 'border-blue-500 bg-white' : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <span className={`font-body font-bold text-xs block ${
                      activeWeek === i ? 'text-blue-600' : 'text-gray-400'
                    }`}>
                      {week.range}
                    </span>
                    <span className="font-body text-[10px] text-gray-400 block mt-0.5">{week.title}</span>
                    <span className="font-body text-[10px] text-gray-300 block">{week.sessions}</span>
                  </button>
                ))}
              </div>

              {(() => {
                const week = DEV_PHASE.weeks[activeWeek];
                return (
                  <div className="space-y-3">
                    <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-3">
                      <p className="font-body text-xs text-gray-600">
                        <span className="font-bold text-blue-600">Goal: </span>
                        {week.goal}
                      </p>
                    </div>

                    <div className="space-y-2">
                      {week.drills.map((drill, i) => (
                        <div key={i} className={`flex gap-3 p-3 rounded-xl border border-gray-100 ${
                          i % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                        }`}>
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                            {i + 1}
                          </span>
                          <p className="font-body text-xs text-gray-600 leading-relaxed">{drill}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                      <p className="font-body text-xs text-emerald-800 leading-relaxed">
                        <strong>Checkpoint before advancing:</strong> {week.checkpoint}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </>
          )}
        </div>
      )}

      {/* ===== TRYOUT DAY ===== */}
      {activeSection === 'tryout' && (
        <div className="space-y-4">
          <div>
            <h2 className="font-heading text-lg font-bold text-red-500">Tryout Day Strategy</h2>
            <p className="font-body text-xs text-gray-400">
              What coaches will evaluate and how to maximize placement odds
            </p>
          </div>

          {([
            { title: 'What to Showcase', items: TRYOUT_TIPS.showcase, icon: '✅', bg: 'bg-emerald-50', border: 'border-emerald-200', titleColor: 'text-emerald-700' },
            { title: 'Between Skills', items: TRYOUT_TIPS.between, icon: '💡', bg: 'bg-blue-50', border: 'border-blue-200', titleColor: 'text-blue-700' },
            { title: 'What to Avoid', items: TRYOUT_TIPS.avoid, icon: '⚠️', bg: 'bg-red-50', border: 'border-red-200', titleColor: 'text-red-600' },
          ]).map((section, si) => (
            <div key={si} className="space-y-1.5">
              <h3 className={`font-body font-bold text-sm ${section.titleColor}`}>
                {section.icon} {section.title}
              </h3>
              {section.items.map((item, i) => (
                <div key={i} className={`${section.bg} ${section.border} border rounded-lg p-2.5`}>
                  <p className="font-body text-xs text-gray-600 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          ))}

          <div className="bg-gray-900 rounded-xl p-4 text-white">
            <p className="font-body font-bold text-xs text-red-300 mb-1.5">📌 Parent Logistics</p>
            <p className="font-body text-xs text-white/70 leading-relaxed">
              Handle logistics quietly. Calm encouragement only — no coaching in the parking lot. Arrive
              rested (good sleep the 2 nights before &gt; extra practice). Hydrated. Fitted athletic clothing
              that shows body lines. Hair fully secured. No new skills in the final 48 hours.
            </p>
          </div>
        </div>
      )}

      {/* ===== MILESTONES ===== */}
      {activeSection === 'milestones' && (
        <div className="space-y-3">
          <div>
            <h2 className="font-heading text-lg font-bold text-blue-600">Expected Milestones by Week 10</h2>
            <p className="font-body text-xs text-gray-400">
              Realistic-to-optimistic for a tall athlete training 4–5 days/week
            </p>
          </div>

          <div className="space-y-2">
            {MILESTONES.map((m, i) => (
              <div key={i} className={`flex gap-3 items-center p-3 rounded-xl border border-gray-100 ${
                i % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              }`}>
                <span className="text-2xl flex-shrink-0">{m.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-body font-bold text-sm text-gray-900">{m.skill}</p>
                  <p className="font-body text-xs text-gray-500">{m.status}</p>
                </div>
                <span className={`font-body text-[10px] font-semibold px-2 py-1 rounded-md text-center flex-shrink-0 max-w-[100px] ${
                  m.competition.includes('Comp-ready') || m.competition.includes('Can be added')
                    ? 'bg-emerald-50 text-emerald-700'
                    : m.competition.includes('Not')
                    ? 'bg-gray-100 text-gray-400'
                    : 'bg-amber-50 text-amber-700'
                }`}>
                  {m.competition}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-red-500 to-blue-600 rounded-xl p-3 text-white">
            <p className="font-body text-xs leading-relaxed">
              <strong>Priority order if time runs short:</strong> Round-off consistency first (highest
              competition utility at Level 1), then front walkover, then back walkover.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-heading text-sm font-bold text-gray-900">About Sitting Out Tumbling</h3>
            <p className="font-body text-xs text-gray-500 leading-relaxed">
              On a 12-person team, 3 athletes sitting out back walkovers still leaves 9 tumblers —{' '}
              <strong>above the Max participation threshold</strong> (8) under 2025–26 Prep scoring. The scoring
              math favors sitting out cleanly over attempting a sloppy skill.
            </p>
            <p className="font-body text-xs text-gray-500 leading-relaxed">
              Stunting accounts for ~50% of the scoresheet vs tumbling&apos;s ~35%. A reliable base who prevents
              one stunt bobble saves more points than the marginal tumbling participation she&apos;d add.
            </p>
            <p className="font-body text-xs text-gray-500 leading-relaxed">
              Choreographers give non-tumblers a <strong>named role</strong> during tumbling sections — a motion
              sequence, stunt-prep transition, or substitute pass. She has a role, not an absence. As her walkover
              develops, she&apos;ll be added to the section mid-season.
            </p>
          </div>
        </div>
      )}

      {/* ===== ENGAGEMENT ===== */}
      {activeSection === 'engagement' && (
        <div className="space-y-3">
          <div>
            <h2 className="font-heading text-lg font-bold text-red-500">Keeping Her Engaged</h2>
            <p className="font-body text-xs text-gray-400">
              Research-backed methods for a 7-year-old who gets bored easily
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {ENGAGEMENT.map((e, i) => (
              <div key={i} className={`p-3 rounded-xl border ${
                i % 3 === 0
                  ? 'bg-red-50 border-red-200'
                  : i % 3 === 1
                  ? 'bg-blue-50 border-blue-200'
                  : 'bg-emerald-50 border-emerald-200'
              }`}>
                <span className="text-2xl block mb-1">{e.icon}</span>
                <p className="font-body font-bold text-sm text-gray-900 mb-1">{e.rule}</p>
                <p className="font-body text-xs text-gray-500 leading-relaxed">{e.detail}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="font-heading text-sm font-bold text-gray-900">Height Adaptations</h3>
            {HEIGHT_TIPS.map((tip, i) => (
              <div key={i} className="flex gap-2 items-start p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-blue-600 font-bold flex-shrink-0">&rarr;</span>
                <p className="font-body text-xs text-gray-600 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <p className="text-center font-body text-[10px] text-gray-300 py-2">
        Built for Mini Prep 1.1 placement at TAC Hutto &middot; April 2026
      </p>
    </div>
  );
}
