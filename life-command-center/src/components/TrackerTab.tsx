'use client';

import { useState, useEffect } from 'react';
import { RecurringItemType, TrackerStatus } from '@/types';

function calculateStatus(lastDate: string | null, frequencyMonths: number, notes: string | null): TrackerStatus {
  if (!lastDate || frequencyMonths === 0) {
    if (notes && notes.toLowerCase().includes('lapsed')) return { label: 'LAPSED', color: 'red' };
    if (notes && notes.toLowerCase().includes('overdue')) return { label: 'CHECK STATUS', color: 'red' };
    if (!lastDate && frequencyMonths > 0) return { label: 'No date set', color: 'red' };
    return { label: notes || 'Manual tracking', color: 'gray' };
  }
  const last = new Date(lastDate);
  const nextDue = new Date(last);
  nextDue.setMonth(nextDue.getMonth() + frequencyMonths);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const soon = new Date(today);
  soon.setDate(soon.getDate() + 45);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  if (nextDue < today) return { label: 'OVERDUE', color: 'red' };
  if (nextDue < soon) return { label: `Due ${months[nextDue.getMonth()]}`, color: 'yellow' };
  return { label: `Due ~${months[nextDue.getMonth()]} ${nextDue.getFullYear()}`, color: 'green' };
}

const statusColorMap = {
  red: 'bg-red-100 text-red-700',
  yellow: 'bg-amber-100 text-amber-700',
  green: 'bg-emerald-100 text-emerald-700',
  gray: 'bg-gray-100 text-gray-500',
};

export default function TrackerTab() {
  const [items, setItems] = useState<RecurringItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', icon: '📌', frequencyMonths: 12, provider: '', notes: '' });

  const fetchItems = async () => {
    const res = await fetch('/api/tracker');
    const data = await res.json();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const updateDate = async (id: string, lastDate: string) => {
    await fetch('/api/tracker', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, lastDate }),
    });
    setEditingId(null);
    fetchItems();
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Delete this item?')) return;
    await fetch(`/api/tracker?id=${id}`, { method: 'DELETE' });
    fetchItems();
  };

  const addItem = async () => {
    await fetch('/api/tracker', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });
    setNewItem({ name: '', icon: '📌', frequencyMonths: 12, provider: '', notes: '' });
    setShowAddForm(false);
    fetchItems();
  };

  if (loading) return <div className="p-4 text-center text-gray-400">Loading…</div>;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="font-heading text-lg font-bold text-navy">Recurring Tracker</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-sm text-coral hover:text-coral/80 font-body font-medium"
        >
          {showAddForm ? 'Cancel' : '+ Add'}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
          <input
            type="text"
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm font-body"
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Icon"
              value={newItem.icon}
              onChange={(e) => setNewItem({ ...newItem, icon: e.target.value })}
              className="w-16 border rounded-lg px-3 py-2 text-sm text-center"
            />
            <input
              type="number"
              placeholder="Months"
              value={newItem.frequencyMonths}
              onChange={(e) => setNewItem({ ...newItem, frequencyMonths: parseInt(e.target.value) || 0 })}
              className="w-20 border rounded-lg px-3 py-2 text-sm font-body"
            />
            <input
              type="text"
              placeholder="Provider"
              value={newItem.provider}
              onChange={(e) => setNewItem({ ...newItem, provider: e.target.value })}
              className="flex-1 border rounded-lg px-3 py-2 text-sm font-body"
            />
          </div>
          <button
            onClick={addItem}
            disabled={!newItem.name}
            className="bg-coral text-white text-sm px-4 py-2 rounded-lg font-body font-medium disabled:opacity-50"
          >
            Add Item
          </button>
        </div>
      )}

      <div className="space-y-2">
        {items.map((item) => {
          const status = calculateStatus(item.lastDate, item.frequencyMonths, item.notes);
          return (
            <div key={item.id} className="bg-white rounded-xl p-3 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-body font-semibold text-navy text-sm">{item.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-body font-medium ${statusColorMap[status.color]}`}>
                      {status.label}
                    </span>
                  </div>
                  <p className="font-body text-xs text-gray-500 mt-0.5">{item.provider}</p>
                  {editingId === item.id ? (
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="date"
                        defaultValue={item.lastDate?.split('T')[0] || ''}
                        onChange={(e) => updateDate(item.id, e.target.value)}
                        className="border rounded px-2 py-1 text-sm font-body"
                      />
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-xs text-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setEditingId(item.id)}
                      className="text-xs text-coral/70 hover:text-coral mt-1 font-body"
                    >
                      {item.lastDate
                        ? `Last: ${new Date(item.lastDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                        : 'Set date'
                      }
                    </button>
                  )}
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="text-gray-200 hover:text-red-400 transition-colors flex-shrink-0"
                  title="Delete"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
