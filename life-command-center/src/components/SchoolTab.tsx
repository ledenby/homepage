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

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthNames: Record<string, string> = {
  Jan: 'January', Feb: 'February', Mar: 'March', Apr: 'April',
  May: 'May', Jun: 'June', Jul: 'July', Aug: 'August',
  Sep: 'September', Oct: 'October', Nov: 'November', Dec: 'December',
};

export default function SchoolTab() {
  const [events, setEvents] = useState<SchoolEventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ dateDisplay: '', eventText: '', source: '', type: 'event', sortKey: '' });

  const fetchEvents = () => {
    fetch('/api/school')
      .then((r) => r.json())
      .then((data) => { setEvents(data); setLoading(false); });
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleAddToCalendar = (event: SchoolEventType) => {
    const date = parseSchoolDate(event.dateDisplay);
    if (!date) return;
    const url = generateIcsUrl(event.eventText, date, `Source: ${event.source}`, true);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.eventText.substring(0, 30).replace(/[^a-z0-9]/gi, '_')}.ics`;
    link.click();
  };

  const handleSave = async () => {
    // Auto-generate sortKey from dateDisplay if not set
    let sortKey = form.sortKey;
    if (!sortKey && form.dateDisplay) {
      const d = parseSchoolDate(form.dateDisplay);
      if (d) sortKey = d.toISOString().split('T')[0];
    }

    if (editingId) {
      await fetch('/api/school', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, sortKey, id: editingId }),
      });
    } else {
      await fetch('/api/school', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, sortKey }),
      });
    }
    setEditingId(null);
    setShowAdd(false);
    setForm({ dateDisplay: '', eventText: '', source: '', type: 'event', sortKey: '' });
    fetchEvents();
  };

  const handleEdit = (event: SchoolEventType) => {
    setEditingId(event.id);
    setForm({
      dateDisplay: event.dateDisplay,
      eventText: event.eventText,
      source: event.source,
      type: event.type,
      sortKey: '',
    });
    setShowAdd(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this event?')) return;
    await fetch(`/api/school?id=${id}`, { method: 'DELETE' });
    fetchEvents();
  };

  if (loading) return <div className="p-4 text-center text-gray-400">Loading…</div>;

  // Group by month
  const grouped: Record<string, SchoolEventType[]> = {};
  events.forEach((e) => {
    const monthStr = e.dateDisplay.split(' ')[0];
    const key = monthNames[monthStr] || monthStr;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(e);
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <h2 className="font-heading text-lg font-bold text-navy">School Calendar</h2>
        <button
          onClick={() => { setShowAdd(!showAdd); setEditingId(null); setForm({ dateDisplay: '', eventText: '', source: '', type: 'event', sortKey: '' }); }}
          className="text-sm text-coral hover:text-coral/80 font-body font-medium"
        >
          {showAdd ? 'Cancel' : '+ Add'}
        </button>
      </div>

      {showAdd && (
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Date (e.g. Apr 15)"
              value={form.dateDisplay}
              onChange={(e) => setForm({ ...form, dateDisplay: e.target.value })}
              className="w-28 border rounded-lg px-3 py-2 text-sm font-body"
            />
            <input
              type="text"
              placeholder="Event description"
              value={form.eventText}
              onChange={(e) => setForm({ ...form, eventText: e.target.value })}
              className="flex-1 border rounded-lg px-3 py-2 text-sm font-body"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Source (e.g. PFISD)"
              value={form.source}
              onChange={(e) => setForm({ ...form, source: e.target.value })}
              className="flex-1 border rounded-lg px-3 py-2 text-sm font-body"
            />
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="border rounded-lg px-3 py-2 text-sm font-body bg-white"
            >
              <option value="event">Event</option>
              <option value="action">Action</option>
              <option value="info">Info</option>
            </select>
          </div>
          <button
            onClick={handleSave}
            disabled={!form.dateDisplay || !form.eventText}
            className="bg-coral text-white text-sm px-4 py-2 rounded-lg font-body font-medium disabled:opacity-50"
          >
            {editingId ? 'Update' : 'Add Event'}
          </button>
        </div>
      )}

      <div className="flex gap-2 px-1">
        <span className="text-xs font-body px-2 py-1 rounded-full bg-red-50 text-coral border border-coral/20">Action needed</span>
        <span className="text-xs font-body px-2 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber/20">Event</span>
        <span className="text-xs font-body px-2 py-1 rounded-full bg-gray-50 text-gray-500 border border-gray-200">Info</span>
      </div>

      {Object.keys(grouped).length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p className="text-3xl mb-2">📚</p>
          <p className="font-body text-sm">No upcoming school events.</p>
        </div>
      ) : (
        Object.entries(grouped).map(([month, monthEvents]) => (
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
                    <button
                      onClick={() => handleEdit(event)}
                      className="text-gray-300 hover:text-blue-400 transition-colors flex-shrink-0 p-1"
                      title="Edit"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0 p-1"
                      title="Delete"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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
        ))
      )}
    </div>
  );
}
