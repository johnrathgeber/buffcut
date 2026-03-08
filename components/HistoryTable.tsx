'use client';

import { useState } from 'react';
import { DayEntry } from '@/lib/types';
import EditDayModal from './EditDayModal';

interface HistoryTableProps {
  entries: DayEntry[];
}

export default function HistoryTable({ entries }: HistoryTableProps) {
  const [editingDate, setEditingDate] = useState<string | null>(null);
  const [editingSteps, setEditingSteps] = useState<number>(0);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleEditClick = (date: string, currentSteps: number) => {
    setEditingDate(date);
    setEditingSteps(currentSteps);
  };

  const handleCloseModal = () => {
    setEditingDate(null);
  };

  const toggleRow = (date: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(date)) {
        next.delete(date);
      } else {
        next.add(date);
      }
      return next;
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-4 text-left font-semibold w-6"></th>
                <th className="px-6 py-4 text-left font-semibold">Date</th>
                <th className="px-6 py-4 text-left font-semibold">Weight</th>
                <th className="px-6 py-4 text-left font-semibold">Steps</th>
                <th className="px-6 py-4 text-left font-semibold">Protein</th>
                <th className="px-6 py-4 text-left font-semibold">Calories</th>
                <th className="px-6 py-4 text-left font-semibold">Cardio</th>
                <th className="px-6 py-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {entries.map((entry, idx) => {
                const totalProtein = entry.foods.reduce((sum, food) => sum + food.protein, 0);
                const totalCalories = entry.foods.reduce((sum, food) => sum + food.calories, 0);
                const proteinGoal = Math.round(entry.weight * 1);
                const calorieGoal = Math.round(entry.weight * 12);
                const isExpanded = expandedRows.has(entry.date);

                const cardioSummary = entry.cardio.length > 0
                  ? entry.cardio.map(c => `${c.type} (${c.duration}m, ${c.caloriesBurned} cal)`).join(', ')
                  : 'None';

                return (
                  <>
                    <tr
                      key={idx}
                      className="hover:bg-gray-50 transition cursor-pointer"
                      onClick={() => toggleRow(entry.date)}
                    >
                      <td className="px-4 py-4 text-gray-400">
                        <span className="text-xs">{isExpanded ? '▼' : '▶'}</span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {formatDate(entry.date)}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {entry.weight.toFixed(1)} lbs
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {(entry.steps || 0).toLocaleString()}
                          </span>
                          🚶
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-700">
                          {totalProtein.toFixed(1)}g / {proteinGoal}g
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {((totalProtein / proteinGoal) * 100).toFixed(0)}% of goal
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-700">
                          {totalCalories} / {calorieGoal} cal
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {((totalCalories / calorieGoal) * 100).toFixed(0)}% of maintenance
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700 max-w-md">
                        <div className="truncate" title={cardioSummary}>
                          {cardioSummary}
                        </div>
                      </td>
                      <td className="px-6 py-4" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => handleEditClick(entry.date, entry.steps || 0)}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                          Edit Steps
                        </button>
                      </td>
                    </tr>

                    {isExpanded && (
                      <tr key={`${idx}-detail`} className="bg-gray-50">
                        <td colSpan={8} className="px-10 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <div className="text-sm font-semibold text-gray-700 mb-2">Foods Eaten</div>
                              {entry.foods.length === 0 ? (
                                <div className="text-sm text-gray-500 italic">No foods logged</div>
                              ) : (
                                <div className="space-y-1">
                                  {entry.foods.map((food, foodIdx) => (
                                    <div key={foodIdx} className="flex justify-between text-sm text-gray-700">
                                      <span>{food.name}</span>
                                      <span className="text-gray-500">{food.protein}g protein · {food.calories} cal</span>
                                    </div>
                                  ))}
                                  <div className="pt-2 border-t border-gray-300 text-sm font-semibold text-gray-800 flex justify-between">
                                    <span>Total</span>
                                    <span>{totalProtein.toFixed(1)}g protein · {totalCalories} cal</span>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div>
                              <div className="text-sm font-semibold text-gray-700 mb-2">Cardio</div>
                              {entry.cardio.length === 0 ? (
                                <div className="text-sm text-gray-500 italic">No cardio logged</div>
                              ) : (
                                <div className="space-y-1">
                                  {entry.cardio.map((c, cardioIdx) => (
                                    <div key={cardioIdx} className="text-sm text-gray-700">
                                      {c.type}: {c.duration} min · {c.caloriesBurned} cal burned
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {editingDate && (
        <EditDayModal
          date={editingDate}
          currentSteps={editingSteps}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
