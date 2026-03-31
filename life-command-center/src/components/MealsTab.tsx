'use client';

import { useState, useEffect, useRef } from 'react';
import { GroceryItemType } from '@/types';

const STORES = [
  { id: 'h-e-b', label: 'HEB' },
  { id: 'target', label: 'Target' },
  { id: 'randalls', label: "Randall's" },
  { id: 'aldi', label: 'Aldi' },
];

const CATEGORIES = [
  { id: 'produce', label: 'Produce', icon: '🥦' },
  { id: 'dairy', label: 'Dairy & Eggs', icon: '🥛' },
  { id: 'meat', label: 'Meat & Seafood', icon: '🥩' },
  { id: 'bakery', label: 'Bread & Bakery', icon: '🍞' },
  { id: 'frozen', label: 'Frozen', icon: '🧊' },
  { id: 'pantry', label: 'Pantry', icon: '🥫' },
  { id: 'beverages', label: 'Beverages', icon: '🧃' },
  { id: 'cleaning', label: 'Household', icon: '🧹' },
  { id: 'other', label: 'Other', icon: '🛒' },
];

const PRODUCE_KEYWORDS = ['apple', 'banana', 'orange', 'grape', 'berry', 'berries', 'lemon', 'lime', 'avocado', 'tomato', 'lettuce', 'spinach', 'kale', 'broccoli', 'carrot', 'onion', 'garlic', 'pepper', 'cucumber', 'zucchini', 'squash', 'potato', 'sweet potato', 'yam', 'mushroom', 'celery', 'asparagus', 'corn', 'pea', 'bean', 'mango', 'pineapple', 'watermelon', 'melon', 'peach', 'plum', 'pear', 'strawberry', 'blueberry', 'raspberry', 'cilantro', 'parsley', 'basil', 'herbs', 'salad', 'cabbage', 'cauliflower', 'jalapeño', 'serrano', 'ginger', 'scallion', 'green onion', 'shallot', 'radish', 'beet', 'artichoke'];
const DAIRY_KEYWORDS = ['milk', 'cheese', 'yogurt', 'butter', 'egg', 'eggs', 'cream', 'sour cream', 'cottage cheese', 'ricotta', 'mozzarella', 'cheddar', 'parmesan', 'creamer', 'half and half', 'whipped cream', 'oat milk', 'almond milk', 'soy milk'];
const MEAT_KEYWORDS = ['chicken', 'beef', 'pork', 'turkey', 'lamb', 'fish', 'salmon', 'tuna', 'shrimp', 'tilapia', 'cod', 'steak', 'ground beef', 'ground turkey', 'bacon', 'sausage', 'ham', 'deli', 'rotisserie', 'wings', 'thighs', 'breast', 'ribs', 'brisket', 'seafood', 'crab', 'lobster', 'scallop'];
const BAKERY_KEYWORDS = ['bread', 'bagel', 'muffin', 'tortilla', 'roll', 'bun', 'croissant', 'pita', 'naan', 'wrap', 'loaf', 'english muffin', 'biscuit', 'cracker'];
const FROZEN_KEYWORDS = ['frozen', 'ice cream', 'gelato', 'sorbet', 'frozen pizza', 'frozen meal', 'frozen vegetable', 'edamame', 'waffle', 'tater tot'];
const BEVERAGE_KEYWORDS = ['juice', 'soda', 'water', 'sparkling', 'coffee', 'tea', 'lemonade', 'sports drink', 'energy drink', 'beer', 'wine', 'kombucha', 'coconut water', 'broth', 'stock'];
const CLEANING_KEYWORDS = ['soap', 'detergent', 'cleaner', 'bleach', 'paper towel', 'toilet paper', 'tissue', 'trash bag', 'plastic bag', 'zip lock', 'foil', 'saran wrap', 'dish', 'laundry', 'fabric softener', 'sponge', 'mop', 'broom', 'wipe', 'lysol', 'febreze', 'dryer sheet'];
const PANTRY_KEYWORDS = ['pasta', 'rice', 'quinoa', 'oat', 'cereal', 'flour', 'sugar', 'salt', 'pepper', 'oil', 'vinegar', 'sauce', 'salsa', 'ketchup', 'mustard', 'mayo', 'hot sauce', 'soy sauce', 'ranch', 'dressing', 'canned', 'can of', 'jar of', 'bean', 'lentil', 'chickpea', 'peanut butter', 'jelly', 'jam', 'honey', 'maple syrup', 'syrup', 'chip', 'cracker', 'popcorn', 'pretzel', 'cookie', 'granola', 'protein bar', 'nut', 'almond', 'cashew', 'walnut', 'pecan', 'sunflower', 'pumpkin seed', 'chocolate', 'candy', 'gummy', 'spice', 'seasoning', 'cumin', 'paprika', 'oregano', 'thyme', 'rosemary', 'bay leaf', 'baking powder', 'baking soda', 'vanilla', 'cocoa', 'yeast', 'breadcrumb', 'panko', 'cornstarch', 'soup', 'broth', 'tomato paste'];

function guessCategory(name: string): string {
  const lower = name.toLowerCase();
  if (PRODUCE_KEYWORDS.some(k => lower.includes(k))) return 'produce';
  if (DAIRY_KEYWORDS.some(k => lower.includes(k))) return 'dairy';
  if (MEAT_KEYWORDS.some(k => lower.includes(k))) return 'meat';
  if (BAKERY_KEYWORDS.some(k => lower.includes(k))) return 'bakery';
  if (FROZEN_KEYWORDS.some(k => lower.includes(k))) return 'frozen';
  if (BEVERAGE_KEYWORDS.some(k => lower.includes(k))) return 'beverages';
  if (CLEANING_KEYWORDS.some(k => lower.includes(k))) return 'cleaning';
  if (PANTRY_KEYWORDS.some(k => lower.includes(k))) return 'pantry';
  return 'other';
}

function instacartSearchUrl(storeId: string, query: string): string {
  return `https://www.instacart.com/store/${storeId}/search_v3/${encodeURIComponent(query)}`;
}

function instacartStoreUrl(storeId: string): string {
  return `https://www.instacart.com/store/${storeId}/storefront`;
}

export default function MealsTab() {
  const [items, setItems] = useState<GroceryItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState('');
  const [selectedStore, setSelectedStore] = useState(STORES[0].id);
  const [toast, setToast] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const copyList = async (itemsToCopy: GroceryItemType[]) => {
    const text = itemsToCopy.map(i => i.quantity ? `${i.name} (${i.quantity})` : i.name).join('\n');
    await navigator.clipboard.writeText(text);
    showToast('List copied to clipboard!');
  };

  const fetchItems = async () => {
    const res = await fetch('/api/grocery');
    const data = await res.json();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const addItem = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput('');
    const category = guessCategory(trimmed);
    await fetch('/api/grocery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: trimmed, category }),
    });
    fetchItems();
    inputRef.current?.focus();
  };

  const toggleCheck = async (item: GroceryItemType) => {
    setItems(prev => prev.map(i => i.id === item.id ? { ...i, checked: !i.checked } : i));
    await fetch('/api/grocery', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item.id, checked: !item.checked }),
    });
    fetchItems();
  };

  const deleteItem = async (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
    await fetch(`/api/grocery?id=${id}`, { method: 'DELETE' });
  };

  const clearChecked = async () => {
    setItems(prev => prev.filter(i => !i.checked));
    await fetch('/api/grocery', { method: 'DELETE' });
  };

  const unchecked = items.filter(i => !i.checked);
  const checked = items.filter(i => i.checked);
  const checkedCount = checked.length;

  // Group unchecked by category
  const grouped = CATEGORIES.map(cat => ({
    ...cat,
    items: unchecked.filter(i => i.category === cat.id),
  })).filter(g => g.items.length > 0);

  const storeLabel = STORES.find(s => s.id === selectedStore)?.label ?? '';

  if (loading) return <div className="p-4 text-center text-gray-400 font-body text-sm">Loading…</div>;



  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <h2 className="font-heading text-lg font-bold text-navy">Grocery List</h2>
        {checkedCount > 0 && (
          <button
            onClick={clearChecked}
            className="text-xs text-gray-400 hover:text-red-400 font-body"
          >
            Clear {checkedCount} checked
          </button>
        )}
      </div>

      {/* Store picker */}
      <div className="flex gap-2">
        {STORES.map(store => (
          <button
            key={store.id}
            onClick={() => setSelectedStore(store.id)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-body font-medium transition-colors ${
              selectedStore === store.id
                ? 'bg-coral text-white'
                : 'bg-white text-gray-500 shadow-sm hover:text-navy'
            }`}
          >
            {store.label}
          </button>
        ))}
      </div>

      {/* Add item input */}
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addItem()}
          placeholder="Add item…"
          className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm font-body bg-white shadow-sm focus:outline-none focus:border-coral"
        />
        <button
          onClick={addItem}
          disabled={!input.trim()}
          className="bg-coral text-white text-sm px-4 py-2 rounded-xl font-body font-medium disabled:opacity-40"
        >
          Add
        </button>
      </div>

      {/* Grocery list */}
      {items.length === 0 ? (
        <div className="bg-white rounded-xl p-6 shadow-sm text-center">
          <p className="text-3xl mb-2">🛒</p>
          <p className="font-body text-sm text-gray-400">Your list is empty. Add items above.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {grouped.map(group => (
            <div key={group.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-3 py-2 bg-gray-50 border-b border-gray-100 flex items-center gap-1.5">
                <span className="text-sm">{group.icon}</span>
                <span className="font-body text-xs font-semibold text-gray-500 uppercase tracking-wider">{group.label}</span>
              </div>
              <div className="divide-y divide-gray-50">
                {group.items.map(item => (
                  <GroceryRow
                    key={item.id}
                    item={item}
                    storeId={selectedStore}
                    onToggle={() => toggleCheck(item)}
                    onDelete={() => deleteItem(item.id)}
                  />
                ))}
              </div>
            </div>
          ))}

          {checkedCount > 0 && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden opacity-60">
              <div className="px-3 py-2 bg-gray-50 border-b border-gray-100 flex items-center gap-1.5">
                <span className="font-body text-xs font-semibold text-gray-400 uppercase tracking-wider">Checked off</span>
              </div>
              <div className="divide-y divide-gray-50">
                {checked.map(item => (
                  <GroceryRow
                    key={item.id}
                    item={item}
                    storeId={selectedStore}
                    onToggle={() => toggleCheck(item)}
                    onDelete={() => deleteItem(item.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bottom actions */}
      {unchecked.length > 0 && (
        <div className="space-y-2">
          {/* Copy + open Instacart */}
          <button
            onClick={async () => {
              await copyList(unchecked);
              window.open(instacartStoreUrl(selectedStore), '_blank');
            }}
            className="flex items-center justify-center gap-2 w-full bg-[#43B02A] text-white text-sm font-body font-semibold py-3 rounded-xl shadow-sm active:bg-[#3a9a24] transition-colors"
          >
            <span>Copy list &amp; open {storeLabel} on Instacart</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
          <p className="text-center font-body text-xs text-gray-400">
            Copies your list, then paste it into Instacart's search
          </p>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-navy text-white text-xs font-body font-medium px-4 py-2 rounded-full shadow-lg z-50 whitespace-nowrap">
          {toast}
        </div>
      )}
    </div>
  );
}

function GroceryRow({
  item,
  storeId,
  onToggle,
  onDelete,
}: {
  item: GroceryItemType;
  storeId: string;
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5">
      <button
        onClick={onToggle}
        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
          item.checked
            ? 'bg-emerald-400 border-emerald-400'
            : 'border-gray-300 hover:border-coral'
        }`}
      >
        {item.checked && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      <span className={`flex-1 font-body text-sm ${item.checked ? 'line-through text-gray-300' : 'text-navy'}`}>
        {item.name}
        {item.quantity && (
          <span className="text-gray-400 ml-1 text-xs">({item.quantity})</span>
        )}
      </span>

      {!item.checked && (
        <a
          href={instacartSearchUrl(storeId, item.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 bg-[#43B02A]/10 text-[#43B02A] text-xs font-body font-semibold px-2 py-1 rounded-lg active:bg-[#43B02A]/20"
        >
          Search
        </a>
      )}

      <button
        onClick={onDelete}
        className="text-gray-200 hover:text-red-400 transition-colors flex-shrink-0"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
