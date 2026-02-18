'use client';

import { useState } from 'react';
import { addCardio } from '@/app/actions';
import { CARDIO_TYPES } from '@/lib/types';

export default function CardioForm() {
  const [selectedPreset, setSelectedPreset] = useState<string>(CARDIO_TYPES[0]);
  const [customType, setCustomType] = useState('');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isCustom = selectedPreset === 'Custom';
  const actualType = isCustom ? customType : selectedPreset;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isCustom && !customType.trim()) {
      return; // Don't submit if custom is selected but no type entered
    }

    setIsSubmitting(true);

    await addCardio({
      type: actualType,
      duration: parseInt(duration),
      caloriesBurned: parseInt(caloriesBurned),
    });

    setSelectedPreset(CARDIO_TYPES[0]);
    setCustomType('');
    setDuration('');
    setCaloriesBurned('');
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Log Cardio</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cardio Type
          </label>
          <select
            value={selectedPreset}
            onChange={(e) => setSelectedPreset(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          >
            {CARDIO_TYPES.map((cardioType) => (
              <option key={cardioType} value={cardioType}>
                {cardioType}
              </option>
            ))}
            <option value="Custom">Custom (type your own)</option>
          </select>
        </div>

        {isCustom && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Custom Cardio Type
            </label>
            <input
              type="text"
              value={customType}
              onChange={(e) => setCustomType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="e.g., Boxing, Jump Rope, Hiking"
              required
              autoFocus
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (min)
            </label>
            <input
              type="number"
              step="1"
              min="1"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              required
              placeholder="30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Calories Burned
            </label>
            <input
              type="number"
              step="1"
              min="0"
              value={caloriesBurned}
              onChange={(e) => setCaloriesBurned(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              required
              placeholder="300"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition font-semibold disabled:bg-gray-400"
        >
          {isSubmitting ? 'Logging...' : 'Log Cardio'}
        </button>
      </form>
    </div>
  );
}
