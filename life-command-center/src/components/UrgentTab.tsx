'use client';

import { useState, useEffect } from 'react';
import { UrgentItemType } from '@/types';

export default function UrgentTab() {
  const [items, setItems] = useState<UrgentItemType[]>([]);
  const [showDismissed, setShowDismissed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newText, setNewText] = useState('');
  const [newDetail, setNewDetail] = useState('');
  const [newColor, setNewColor] = useState('yellow');

  const fetchItems = async () => {
    const res = await fetch('/api/urgent');
    const data = await res.json();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const toggleDismiss = async (id: string, dismissed: boolean) => {
    await fetch('/api/urgent', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, dismissed }),
    });
    fetchItems();
  };

  const addItem = async () => {
    if (!newText.trim()) return;
    await fetch('/api/urgent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newText, detail: newDetail, color: newColor }),
    });
    setNewText('');
    setNewDetail('');
    setNewColor('yellow');
    setShowAdd(false);
    fetchItems();
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Delete this item permanently?')) return;
    await fetch(`/api/urgent?id=${id}`, { method: 'DELETE' });
    fetchItems();
  };

  const activeItems = items.filter((i) => !i.dismissed);
  const dismissedItems = items.filter((i) => i.dismissed);

  if (loading) return <div className="p-4 text-center text-gray-400">Loading…</div>;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="font-heading text-lg font-bold text-navy">Action Items</h2>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="text-sm text-coral hover:text-coral/80 font-body font-medium"
        >
          {showAdd ? 'Cancel' : '+ Add'}
        </button>
      </div>

      {showAdd && (
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm font-body"
          />
          <input
            type="text"
            placeholder="Details (optional)"
            value={newDetail}
            onChange={(e) => setNewDetail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm font-body"
          />
          <div className="flex gap-2 items-center">
            <span className="text-xs font-body text-gray-500">Priority:</span>
            <button
              onClick={() => setNewColor('red')}
              className={`text-xs px-3 py-1 rounded-full font-body ${newColor === 'red' ? 'bg-coral text-white' : 'bg-red-50 text-coral'}`}
            >
              Urgent
            </button>
            <button
              onClick={() => setNewColor('yellow')}
              className={`text-xs px-3 py-1 rounded-full font-body ${newColor === 'yellow' ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-700'}`}
            >
              Soon
            </button>
          </div>
          <button
            onClick={addItem}
            disabled={!newText.trim()}
            className="bg-coral text-white text-sm px-4 py-2 rounded-lg font-body font-medium disabled:opacity-50"
          >
            Add Item
          </button>
        </div>
      )}

      {activeItems.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p className="text-3xl mb-2">🎉</p>
          <p>All caught up!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {activeItems.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-xl p-3 shadow-sm border-l-4 ${
                item.color === 'red' ? 'border-coral' : 'border-amber'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-body font-semibold text-navy text-sm">{item.text}</p>
                  <p className="font-body text-xs text-gray-500 mt-0.5">{item.detail}</p>
                </div>
                <button
                  onClick={() => toggleDismiss(item.id, true)}
                  className="text-gray-300 hover:text-sage transition-colors flex-shrink-0"
                  title="Mark done"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {dismissedItems.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => setShowDismissed(!showDismissed)}
            className="text-xs text-gray-400 hover:text-gray-600 font-body"
          >
            {showDismissed ? 'Hide' : 'Show'} {dismissedItems.length} completed item{dismissedItems.length !== 1 ? 's' : ''}
          </button>
          {showDismissed && (
            <div className="space-y-2 mt-2">
              {dismissedItems.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-xl p-3 opacity-60">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm text-gray-500 line-through">{item.text}</p>
                    </div>
                    <button
                      onClick={() => toggleDismiss(item.id, false)}
                      className="text-gray-300 hover:text-coral transition-colors text-xs"
                      title="Restore"
                    >
                      ↩
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-gray-300 hover:text-red-400 transition-colors"
                      title="Delete permanently"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
