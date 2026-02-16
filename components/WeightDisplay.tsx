'use client';

import { useState } from 'react';
import { updateWeight } from '@/app/actions';

interface WeightDisplayProps {
  weight: number;
  lastUpdated: string;
  isToday: boolean;
}

export default function WeightDisplay({ weight, lastUpdated, isToday }: WeightDisplayProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newWeight, setNewWeight] = useState(weight.toString());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const weightValue = parseFloat(newWeight);
    if (!isNaN(weightValue) && weightValue > 0) {
      await updateWeight(weightValue);
      setIsEditing(false);
    }

    setIsSubmitting(false);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Current Weight</h2>

      {!isEditing ? (
        <div>
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {weight.toFixed(1)} lbs
          </div>
          <div className="text-sm text-gray-600 mb-4">
            Last updated: {formatDate(lastUpdated)}
            {!isToday && <span className="text-orange-600 font-semibold"> (Not updated today)</span>}
          </div>
          <button
            onClick={() => {
              setNewWeight(weight.toString());
              setIsEditing(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Update Weight
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Weight (lbs)
            </label>
            <input
              type="number"
              step="0.1"
              value={newWeight}
              onChange={(e) => setNewWeight(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
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
