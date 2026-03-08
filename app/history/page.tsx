import { getHistoryData } from '../actions';
import HistoryTable from '@/components/HistoryTable';

export const dynamic = 'force-dynamic';

export default async function HistoryPage() {
  const entries = await getHistoryData();

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
    </div>
  );
}
