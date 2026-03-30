'use client';

import { useState, useEffect } from 'react';
import { SchoolEventType } from '@/types';
import { generateIcsUrl, parseSchoolDate } from '@/lib/calendar';

const typeStyles: Record<string, string> = {
  action: 'border-coral bg-red-50',
  event: 'border-amber bg-amber-50',
  info: 'border-gray-300 bg-gray-50',
};

const typeBadge: Record<string, string> = {
  action: 'bg-coral/10 text-coral',
  event: 'bg-amber/10 text-amber-700',
  info: 'bg-gray-100 text-gray-500',
};

export default function SchoolTab() {
  const [events, setEvents] = useState<SchoolEventType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/school')
      .then((r) => r.json())
      .then((data) => { setEvents(data); setLoading(false); });
  }, []);

  if (loading) return <div className="p-4 text-center text-gray-400">Loading…</div>;

  if (events.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="font-heading text-lg font-bold text-navy px-1">School Calendar</h2>
        <div className="text-center py-8 text-gray-400">
          <p className="text-3xl mb-2">📚</p>
          <p className="font-body text-sm">No upcoming school events.</p>
        </div>
      </div>
    );
  }

  // Group by month
  const grouped: Record<string, SchoolEventType[]> = {};
  events.forEach((e) => {
    const monthStr = e.dateDisplay.split(' ')[0];
    const monthNames: Record<string, string> = {
      Jan: 'January', Feb: 'February', Mar: 'March', Apr: 'April',
      May: 'May', Jun: 'June', Jul: 'July', Aug: 'August',
      Sep: 'September', Oct: 'October', Nov: 'November', Dec: 'December',
    };
    const key = monthNames[monthStr] || monthStr;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(e);
  });

  const handleAddToCalendar = (event: SchoolEventType) => {
    const date = parseSchoolDate(event.dateDisplay);
    if (!date) return;

    const url = generateIcsUrl(event.eventText, date, `Source: ${event.source}`, true);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.eventText.substring(0, 30).replace(/[^a-z0-9]/gi, '_')}.ics`;
    link.click();
  };

  return (
    <div className="space-y-4">
      <h2 className="font-heading text-lg font-bold text-navy px-1">School Calendar</h2>
      <div className="flex gap-2 px-1">
        <span className="text-xs font-body px-2 py-1 rounded-full bg-red-50 text-coral border border-coral/20">Action needed</span>
        <span className="text-xs font-body px-2 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber/20">Event</span>
        <span className="text-xs font-body px-2 py-1 rounded-full bg-gray-50 text-gray-500 border border-gray-200">Info</span>
      </div>

      {Object.entries(grouped).map(([month, monthEvents]) => (
        <div key={month}>
          <h3 className="font-heading text-sm font-bold text-gray-400 uppercase tracking-wider px-1 mb-2">{month} 2026</h3>
          <div className="space-y-1.5">
            {monthEvents.map((event) => (
              <div
                key={event.id}
                className={`rounded-lg p-2.5 border-l-3 border ${typeStyles[event.type] || typeStyles.info}`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-body font-bold text-xs text-navy min-w-[60px]">{event.dateDisplay}</span>
                  <span className="font-body text-sm text-navy flex-1">{event.eventText}</span>
                  <button
                    onClick={() => handleAddToCalendar(event)}
                    className="text-gray-400 hover:text-coral transition-colors flex-shrink-0 p-1"
                    title="Add to Calendar"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-body ${typeBadge[event.type] || typeBadge.info}`}>
                    {event.source}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
