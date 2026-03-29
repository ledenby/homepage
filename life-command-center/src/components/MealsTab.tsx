'use client';

export default function MealsTab() {
  return (
    <div className="space-y-4">
      <h2 className="font-heading text-lg font-bold text-navy px-1">Meal Planning</h2>

      <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
        <div className="text-center py-6">
          <p className="text-4xl mb-3">🍽️</p>
          <p className="font-body font-semibold text-navy text-sm">Coming Soon</p>
          <p className="font-body text-xs text-gray-400 mt-1 max-w-xs mx-auto">
            Upload recipe screenshots, build grocery lists, and get random lunch, dinner &amp; snack suggestions.
          </p>
        </div>

        <div className="border-t pt-3 space-y-2">
          <p className="font-body text-xs text-gray-500 font-medium uppercase tracking-wider">Planned Features</p>
          <div className="flex items-start gap-2">
            <span className="text-sm">📸</span>
            <p className="font-body text-xs text-gray-500">Upload recipe screenshots from Pinterest, Instagram, etc.</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-sm">🎲</span>
            <p className="font-body text-xs text-gray-500">Random meal randomizer — lunch, dinner &amp; snack picks</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-sm">🛒</span>
            <p className="font-body text-xs text-gray-500">Grocery list builder from selected recipes</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-sm">📅</span>
            <p className="font-body text-xs text-gray-500">Weekly meal calendar</p>
          </div>
        </div>
      </div>
    </div>
  );
}
