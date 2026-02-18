import { getHistoryData } from '../actions';
import HistoryTable from '@/components/HistoryTable';

export const dynamic = 'force-dynamic';

export default async function HistoryPage() {
  const entries = await getHistoryData();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6 pb-8">
      <h1 className="text-3xl font-bold text-white mb-6">History</h1>

      {entries.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center border-2 border-gray-200">
          <p className="text-gray-600 text-lg">No history yet. Start tracking your progress!</p>
        </div>
      ) : (
        <HistoryTable entries={entries} />
      )}

      {entries.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {entries.slice(0, 5).map((entry, idx) => {
            const totalProtein = entry.foods.reduce((sum, food) => sum + food.protein, 0);
            const totalCalories = entry.foods.reduce((sum, food) => sum + food.calories, 0);

            return (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  {formatDate(entry.date)}
                </h3>

                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-600">Weight</div>
                    <div className="text-xl font-semibold text-gray-900">
                      {entry.weight.toFixed(1)} lbs
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600">Foods Eaten</div>
                    {entry.foods.length === 0 ? (
                      <div className="text-sm text-gray-500 italic">No foods logged</div>
                    ) : (
                      <div className="text-sm text-gray-700 space-y-1 mt-1">
                        {entry.foods.map((food, foodIdx) => (
                          <div key={foodIdx} className="flex justify-between">
                            <span>{food.name}</span>
                            <span className="text-gray-600">
                              {food.protein}g / {food.calories}cal
                            </span>
                          </div>
                        ))}
                        <div className="pt-2 border-t border-gray-200 font-semibold">
                          Total: {totalProtein.toFixed(1)}g / {totalCalories}cal
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="text-sm text-gray-600">Cardio</div>
                    {entry.cardio.length === 0 ? (
                      <div className="text-sm text-gray-500 italic">No cardio logged</div>
                    ) : (
                      <div className="text-sm text-gray-700 space-y-1 mt-1">
                        {entry.cardio.map((cardio, cardioIdx) => (
                          <div key={cardioIdx}>
                            {cardio.type}: {cardio.duration}min ({cardio.caloriesBurned} cal)
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
