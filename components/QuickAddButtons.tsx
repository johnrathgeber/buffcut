'use client';

import { useState } from 'react';
import { addFood } from '@/app/actions';
import { PRESET_FOODS } from '@/lib/types';

export default function QuickAddButtons() {
  const [adding, setAdding] = useState<string | null>(null);

  const handleQuickAdd = async (food: typeof PRESET_FOODS[number]) => {
    setAdding(food.name);
    await addFood(food);
    setAdding(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Add Foods</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {PRESET_FOODS.map((food) => (
          <button
            key={food.name}
            onClick={() => handleQuickAdd(food)}
            disabled={adding === food.name}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg hover:from-green-600 hover:to-green-700 transition disabled:from-gray-400 disabled:to-gray-500 shadow-md"
          >
            <div className="font-bold text-lg mb-1">{food.name}</div>
            <div className="text-sm opacity-90">
              {food.protein}g protein • {food.calories} cal
            </div>
            {adding === food.name && (
              <div className="text-xs mt-1">Adding...</div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
