'use client';

import { useState, useEffect } from 'react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snack'] as const;
const STORAGE_KEY = 'lcc-meal-plan';
const GROCERY_KEY = 'lcc-grocery-list';

type MealPlan = Record<string, Record<string, string>>;

interface GroceryItem {
  id: string;
  text: string;
  checked: boolean;
}

export default function MealsTab() {
  const [mealPlan, setMealPlan] = useState<MealPlan>({});
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);
  const [newItem, setNewItem] = useState('');
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [activeSection, setActiveSection] = useState<'plan' | 'grocery'>('plan');
  const [copied, setCopied] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const savedPlan = localStorage.getItem(STORAGE_KEY);
    if (savedPlan) setMealPlan(JSON.parse(savedPlan));
    const savedGrocery = localStorage.getItem(GROCERY_KEY);
    if (savedGrocery) setGroceryItems(JSON.parse(savedGrocery));
  }, []);

  const savePlan = (plan: MealPlan) => {
    setMealPlan(plan);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
  };

  const saveGrocery = (items: GroceryItem[]) => {
    setGroceryItems(items);
    localStorage.setItem(GROCERY_KEY, JSON.stringify(items));
  };

  const startEdit = (day: string, meal: string) => {
    const key = `${day}-${meal}`;
    setEditingCell(key);
    setEditValue(mealPlan[day]?.[meal] || '');
  };

  const saveEdit = (day: string, meal: string) => {
    const updated = { ...mealPlan };
    if (!updated[day]) updated[day] = {};
    updated[day][meal] = editValue;
    savePlan(updated);
    setEditingCell(null);
  };

  const clearPlan = () => {
    if (!confirm('Clear the entire meal plan?')) return;
    savePlan({});
  };

  const addGroceryItem = () => {
    if (!newItem.trim()) return;
    const items = [...groceryItems, { id: Date.now().toString(), text: newItem.trim(), checked: false }];
    saveGrocery(items);
    setNewItem('');
  };

  const toggleGroceryItem = (id: string) => {
    const items = groceryItems.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    saveGrocery(items);
  };

  const deleteGroceryItem = (id: string) => {
    saveGrocery(groceryItems.filter((item) => item.id !== id));
  };

  const clearChecked = () => {
    saveGrocery(groceryItems.filter((item) => !item.checked));
  };

  const copyGroceryList = async () => {
    const uncheckedItems = groceryItems
      .filter((item) => !item.checked)
      .map((item) => `• ${item.text}`)
      .join('\n');

    if (!uncheckedItems) {
      alert('No items to copy');
      return;
    }

    try {
      await navigator.clipboard.writeText(uncheckedItems);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for iOS Safari
      const textarea = document.createElement('textarea');
      textarea.value = uncheckedItems;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const uncheckedCount = groceryItems.filter((i) => !i.checked).length;
  const checkedCount = groceryItems.filter((i) => i.checked).length;

  return (
    <div className="space-y-4">
      <h2 className="font-heading text-lg font-bold text-navy px-1">Meal Planning</h2>

      {/* Section Toggle */}
      <div className="flex gap-2 px-1">
        <button
          onClick={() => setActiveSection('plan')}
          className={`text-sm font-body font-medium px-3 py-1.5 rounded-full transition-colors ${
            activeSection === 'plan' ? 'bg-coral text-white' : 'bg-gray-100 text-gray-500'
          }`}
        >
          📅 Weekly Plan
        </button>
        <button
          onClick={() => setActiveSection('grocery')}
          className={`text-sm font-body font-medium px-3 py-1.5 rounded-full transition-colors ${
            activeSection === 'grocery' ? 'bg-coral text-white' : 'bg-gray-100 text-gray-500'
          }`}
        >
          🛒 Grocery List {uncheckedCount > 0 && `(${uncheckedCount})`}
        </button>
      </div>

      {/* Weekly Meal Plan */}
      {activeSection === 'plan' && (
        <div className="space-y-2">
          <div className="flex justify-end px-1">
            <button onClick={clearPlan} className="text-xs text-gray-400 hover:text-red-400 font-body">
              Clear all
            </button>
          </div>
          {DAYS.map((day) => (
            <div key={day} className="bg-white rounded-xl p-3 shadow-sm">
              <p className="font-body font-semibold text-navy text-sm mb-2">{day}</p>
              <div className="grid grid-cols-2 gap-1.5">
                {MEAL_TYPES.map((meal) => {
                  const key = `${day}-${meal}`;
                  const value = mealPlan[day]?.[meal] || '';
                  const isEditing = editingCell === key;

                  return (
                    <div key={meal}>
                      {isEditing ? (
                        <input
                          autoFocus
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => saveEdit(day, meal)}
                          onKeyDown={(e) => e.key === 'Enter' && saveEdit(day, meal)}
                          placeholder={meal}
                          className="w-full border border-coral rounded px-2 py-1 text-xs font-body"
                        />
                      ) : (
                        <button
                          onClick={() => startEdit(day, meal)}
                          className={`w-full text-left px-2 py-1 rounded text-xs font-body transition-colors ${
                            value
                              ? 'bg-emerald-50 text-emerald-800'
                              : 'bg-gray-50 text-gray-300 hover:bg-gray-100'
                          }`}
                        >
                          <span className="text-[10px] text-gray-400 uppercase">{meal}: </span>
                          {value || 'tap to add'}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grocery List */}
      {activeSection === 'grocery' && (
        <div className="space-y-3">
          {/* Add Item */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add item (e.g. chicken breast)"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addGroceryItem()}
              className="flex-1 border rounded-lg px-3 py-2 text-sm font-body"
            />
            <button
              onClick={addGroceryItem}
              disabled={!newItem.trim()}
              className="bg-coral text-white text-sm px-4 py-2 rounded-lg font-body font-medium disabled:opacity-50"
            >
              Add
            </button>
          </div>

          {/* Action Buttons */}
          {groceryItems.length > 0 && (
            <div className="flex gap-2 px-1">
              <button
                onClick={copyGroceryList}
                className="text-xs font-body font-medium text-coral hover:text-coral/80 flex items-center gap-1"
              >
                {copied ? (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copy list
                  </>
                )}
              </button>
              {checkedCount > 0 && (
                <button
                  onClick={clearChecked}
                  className="text-xs font-body text-gray-400 hover:text-red-400 ml-auto"
                >
                  Clear {checkedCount} checked
                </button>
              )}
            </div>
          )}

          {/* Items */}
          {groceryItems.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p className="text-3xl mb-2">🛒</p>
              <p className="font-body text-sm">Your grocery list is empty.</p>
              <p className="font-body text-xs mt-1">Add items above, then tap &ldquo;Copy list&rdquo; to paste into any app.</p>
            </div>
          ) : (
            <div className="space-y-1">
              {groceryItems
                .filter((i) => !i.checked)
                .map((item) => (
                  <div key={item.id} className="bg-white rounded-lg p-2.5 shadow-sm flex items-center gap-2">
                    <button
                      onClick={() => toggleGroceryItem(item.id)}
                      className="w-5 h-5 border-2 border-gray-300 rounded flex-shrink-0 hover:border-coral transition-colors"
                    />
                    <span className="font-body text-sm text-navy flex-1">{item.text}</span>
                    <button
                      onClick={() => deleteGroceryItem(item.id)}
                      className="text-gray-300 hover:text-red-400 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              {/* Checked items */}
              {checkedCount > 0 && (
                <div className="pt-2 space-y-1">
                  <p className="text-xs text-gray-400 font-body px-1">Checked off</p>
                  {groceryItems
                    .filter((i) => i.checked)
                    .map((item) => (
                      <div key={item.id} className="bg-gray-50 rounded-lg p-2.5 flex items-center gap-2 opacity-60">
                        <button
                          onClick={() => toggleGroceryItem(item.id)}
                          className="w-5 h-5 border-2 border-emerald-400 bg-emerald-100 rounded flex-shrink-0 flex items-center justify-center"
                        >
                          <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                        <span className="font-body text-sm text-gray-400 flex-1 line-through">{item.text}</span>
                        <button
                          onClick={() => deleteGroceryItem(item.id)}
                          className="text-gray-300 hover:text-red-400 transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
