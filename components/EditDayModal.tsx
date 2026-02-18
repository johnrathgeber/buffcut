'use client';

import { useState } from 'react';
import { updateDaySteps } from '@/app/actions';

interface EditDayModalProps {
  date: string;
  currentSteps: number;
  onClose: () => void;
}

export default function EditDayModal({ date, currentSteps, onClose }: EditDayModalProps) {
  const [steps, setSteps] = useState(currentSteps.toString());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const stepsValue = parseInt(steps);
    if (!isNaN(stepsValue) && stepsValue >= 0) {
      await updateDaySteps(date, stepsValue);
      onClose();
    }

    setIsSubmitting(false);
  };

  const formatDate = (dateStr: string) => {
    const dateObj = new Date(dateStr + 'T00:00:00');
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Edit Steps
        </h2>
        <p className="text-gray-600 mb-6">
          {formatDate(date)}
        </p>

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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              required
              autoFocus
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {isSubmitting ? 'Saving...' : 'Save Steps'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
