'use client';

import { useState } from 'react';
import { addFood } from '@/app/actions';
import { PRESET_FOODS, PresetFood, PresetFoodGroup } from '@/lib/types';

export default function QuickAddButtons() {
  const [adding, setAdding] = useState<string | null>(null);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const handleQuickAdd = async (food: PresetFood) => {
    setAdding(food.name);
    setOpenGroup(null);
    await addFood(food);
    setAdding(null);
  };

  const isGroup = (item: typeof PRESET_FOODS[number]): item is PresetFoodGroup =>
    'group' in item;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Add Foods</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {PRESET_FOODS.map((item) => {
          if (isGroup(item)) {
            const isOpen = openGroup === item.group;
            return (
              <div key={item.group} className="flex flex-col gap-2">
                <button
                  onClick={() => setOpenGroup(isOpen ? null : item.group)}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg hover:from-green-600 hover:to-green-700 transition shadow-md text-left"
                >
                  <div className="font-bold text-lg flex justify-between items-center">
                    {item.group}
                    <span className="text-sm">{isOpen ? '▲' : '▼'}</span>
                  </div>
                  <div className="text-sm opacity-90">{item.variants.length} options</div>
                </button>

                {isOpen && (
                  <div className="flex flex-col gap-2 pl-3 border-l-2 border-green-300">
                    {item.variants.map((variant) => (
                      <button
                        key={variant.name}
                        onClick={() => handleQuickAdd(variant)}
                        disabled={adding === variant.name}
                        className="bg-gradient-to-r from-green-400 to-green-500 text-white p-3 rounded-lg hover:from-green-500 hover:to-green-600 transition disabled:from-gray-400 disabled:to-gray-500 shadow-sm text-left"
                      >
                        <div className="font-semibold">{variant.name}</div>
                        <div className="text-sm opacity-90">
                          {variant.protein}g protein · {variant.calories} cal
                        </div>
                        {adding === variant.name && (
                          <div className="text-xs mt-1">Adding...</div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <button
              key={item.name}
              onClick={() => handleQuickAdd(item)}
              disabled={adding === item.name}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg hover:from-green-600 hover:to-green-700 transition disabled:from-gray-400 disabled:to-gray-500 shadow-md"
            >
              <div className="font-bold text-lg mb-1">{item.name}</div>
              <div className="text-sm opacity-90">
                {item.protein}g protein · {item.calories} cal
              </div>
              {adding === item.name && (
                <div className="text-xs mt-1">Adding...</div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
