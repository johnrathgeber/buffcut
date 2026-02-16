'use client';

import { DayEntry } from '@/lib/types';

interface TodayLogProps {
  entry: DayEntry | null;
}

export default function TodayLog({ entry }: TodayLogProps) {
  if (!entry) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Today's Log</h2>
        <p className="text-gray-600">No entries yet for today.</p>
      </div>
    );
  }

  const totalProtein = entry.foods.reduce((sum, food) => sum + food.protein, 0);
  const totalCalories = entry.foods.reduce((sum, food) => sum + food.calories, 0);
  const totalCardioCal = entry.cardio.reduce((sum, c) => sum + c.caloriesBurned, 0);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Today's Log</h2>

      {/* Foods */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
          🍽️ Foods
          <span className="text-sm font-normal text-gray-600">
            ({totalProtein.toFixed(1)}g protein, {totalCalories} cal)
          </span>
        </h3>
        {entry.foods.length === 0 ? (
          <p className="text-gray-500 text-sm italic">No foods logged yet</p>
        ) : (
          <div className="space-y-2">
            {entry.foods.map((food, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200"
              >
                <div>
                  <div className="font-semibold text-gray-800">{food.name}</div>
                  <div className="text-xs text-gray-600">{formatTime(food.timestamp)}</div>
                </div>
                <div className="text-right text-sm">
                  <div className="text-gray-700 font-medium">{food.protein}g protein</div>
                  <div className="text-gray-600">{food.calories} cal</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cardio */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
          🏃 Cardio
          <span className="text-sm font-normal text-gray-600">
            ({totalCardioCal} cal burned)
          </span>
        </h3>
        {entry.cardio.length === 0 ? (
          <p className="text-gray-500 text-sm italic">No cardio logged yet</p>
        ) : (
          <div className="space-y-2">
            {entry.cardio.map((cardio, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200"
              >
                <div>
                  <div className="font-semibold text-gray-800">{cardio.type}</div>
                  <div className="text-xs text-gray-600">{formatTime(cardio.timestamp)}</div>
                </div>
                <div className="text-right text-sm">
                  <div className="text-gray-700 font-medium">{cardio.duration} min</div>
                  <div className="text-gray-600">{cardio.caloriesBurned} cal burned</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
