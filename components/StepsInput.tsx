'use client';

import { useState } from 'react';
import { updateSteps } from '@/app/actions';

interface StepsInputProps {
  currentSteps: number;
}

export default function StepsInput({ currentSteps }: StepsInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [steps, setSteps] = useState(currentSteps.toString());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const stepsValue = parseInt(steps);
    if (!isNaN(stepsValue) && stepsValue >= 0) {
      await updateSteps(stepsValue);
      setIsEditing(false);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Steps Today</h2>

      {!isEditing ? (
        <div>
          <div className="text-4xl font-bold text-green-600 mb-2">
            {currentSteps.toLocaleString()} 🚶
          </div>
          <button
            onClick={() => {
              setSteps(currentSteps.toString());
              setIsEditing(true);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Update Steps
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Steps Count
            </label>
            <input
              type="number"
              step="1"
              min="0"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
              required
              autoFocus
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
