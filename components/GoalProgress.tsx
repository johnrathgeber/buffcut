'use client';

interface GoalProgressProps {
  weight: number;
  totalProtein: number;
  totalCalories: number;
}

export default function GoalProgress({ weight, totalProtein, totalCalories }: GoalProgressProps) {
  const proteinGoal = Math.round(weight * 1);
  const calorieGoal = Math.round(weight * 12);

  const proteinProgress = Math.min((totalProtein / proteinGoal) * 100, 100);
  const calorieProgress = Math.min((totalCalories / calorieGoal) * 100, 100);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Daily Goals</h2>

      <div className="space-y-6">
        {/* Protein Goal */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold text-gray-800">Protein</span>
            <span className="text-lg font-bold text-gray-900">
              {totalProtein}g / {proteinGoal}g
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className={`h-4 rounded-full transition-all duration-300 ${
                proteinProgress >= 100 ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{ width: `${proteinProgress}%` }}
            />
          </div>
          {proteinProgress >= 100 && (
            <p className="text-sm text-green-600 font-semibold mt-1">✓ Goal reached!</p>
          )}
        </div>

        {/* Calorie Goal */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold text-gray-800">Calories</span>
            <span className="text-lg font-bold text-gray-900">
              {totalCalories} / {calorieGoal} cal
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className={`h-4 rounded-full transition-all duration-300 ${
                calorieProgress >= 100 ? 'bg-green-500' : 'bg-purple-500'
              }`}
              style={{ width: `${calorieProgress}%` }}
            />
          </div>
          {calorieProgress >= 100 && (
            <p className="text-sm text-green-600 font-semibold mt-1">✓ Goal reached!</p>
          )}
        </div>
      </div>
    </div>
  );
}
