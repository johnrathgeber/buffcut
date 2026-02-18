import { getDashboardData } from './actions';
import WeightDisplay from '@/components/WeightDisplay';
import GoalProgress from '@/components/GoalProgress';
import StepsInput from '@/components/StepsInput';
import QuickAddButtons from '@/components/QuickAddButtons';
import CustomFoodForm from '@/components/CustomFoodForm';
import CardioForm from '@/components/CardioForm';
import TodayLog from '@/components/TodayLog';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { todayEntry, weightData } = await getDashboardData();

  const totalProtein = todayEntry?.foods.reduce((sum, food) => sum + food.protein, 0) || 0;
  const totalCalories = todayEntry?.foods.reduce((sum, food) => sum + food.calories, 0) || 0;

  return (
    <div className="space-y-6 pb-8">
      <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>

      {/* Weight, Goals, and Steps Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <WeightDisplay
          weight={weightData.weight}
          lastUpdated={weightData.lastUpdated}
          isToday={weightData.isToday}
        />
        <GoalProgress
          weight={weightData.weight}
          totalProtein={totalProtein}
          totalCalories={totalCalories}
        />
        <StepsInput currentSteps={todayEntry?.steps || 0} />
      </div>

      {/* Quick Add Foods */}
      <QuickAddButtons />

      {/* Custom Food and Cardio Forms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CustomFoodForm />
        <CardioForm />
      </div>

      {/* Today's Log */}
      <TodayLog entry={todayEntry} />
    </div>
  );
}
