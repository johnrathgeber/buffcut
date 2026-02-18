'use client';

import { useState } from 'react';
import { addFood, estimateNutrition } from '@/app/actions';

export default function CustomFoodForm() {
  const [name, setName] = useState('');
  const [protein, setProtein] = useState('');
  const [calories, setCalories] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEstimating, setIsEstimating] = useState(false);
  const [aiError, setAiError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await addFood({
      name,
      protein: parseFloat(protein),
      calories: parseFloat(calories),
    });

    setName('');
    setProtein('');
    setCalories('');
    setAiError('');
    setIsSubmitting(false);
  };

  const handleAiEstimate = async () => {
    if (!name.trim()) return;
    setIsEstimating(true);
    setAiError('');

    const result = await estimateNutrition(name.trim());

    if (result.error) {
      setAiError(result.error);
    } else {
      setProtein(result.protein.toString());
      setCalories(result.calories.toString());
    }

    setIsEstimating(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Add Custom Food</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Food Name
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              required
              placeholder="e.g., Grilled Salmon"
            />
            <button
              type="button"
              onClick={handleAiEstimate}
              disabled={isEstimating || !name.trim()}
              title="AI-estimate protein & calories"
              className="
                relative flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-sm text-white
                bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500
                hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600
                disabled:from-gray-300 disabled:via-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed
                shadow-md hover:shadow-lg hover:shadow-fuchsia-200
                transition-all duration-200
                whitespace-nowrap
              "
            >
              {isEstimating ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Estimating...
                </>
              ) : (
                <>
                  <span className="text-base">✨</span>
                  AI Fill
                </>
              )}
            </button>
          </div>
          {aiError && (
            <p className="text-red-500 text-xs mt-1">{aiError}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Protein (g)
            </label>
            <input
              type="number"
              step="0.1"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              required
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Calories
            </label>
            <input
              type="number"
              step="1"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              required
              placeholder="0"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:bg-gray-400"
        >
          {isSubmitting ? 'Adding...' : 'Add Food'}
        </button>
      </form>
    </div>
  );
}
