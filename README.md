# BuffCut Tracker 🏋️

A personal fitness and nutrition tracking application built with Next.js.

## Features

- **Daily Dashboard**: Track your weight, protein intake, calories, and cardio
- **Smart Goal Tracking**:
  - Protein goal: Current weight × 1 (e.g., 177.5 lbs = 177.5g protein)
  - Calorie target: Current weight × 12 (e.g., 177.5 lbs = 2,130 calories)
- **Quick-Add Foods**: Pre-configured buttons for common foods (Chicken Breast, Turkey Patty, Protein Bar, Protein Shake, Plate of Veggies)
- **Custom Food Entry**: Add any food with custom protein and calorie values
- **Cardio Logging**: Track cardio activities with preset types (Running, Cycling, Walking, Elliptical, Swimming)
- **History View**: Review past days' data including weight trends, nutrition, and cardio
- **Weight Management**: Automatic carry-over of previous day's weight with "last updated" indicator
- **Local Storage**: All data stored in a local JSON file - no database required

## Tech Stack

- Next.js 14+ (App Router)
- React
- TypeScript
- Tailwind CSS
- Local JSON file storage

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Data Storage

- All tracking data is stored in `tracker_data.json` in the root directory
- This file is automatically created on first run
- **IMPORTANT**: `tracker_data.json` is in `.gitignore` to keep your personal data private

## Usage

### Dashboard
- View current weight with last update date
- See progress toward daily protein and calorie goals
- Quick-add preset foods with one click
- Add custom foods or cardio activities
- View today's complete log

### History
- Browse all previous days in a table view
- See detailed cards for recent days
- Track weight trends over time
- Review nutrition and cardio history

## Project Structure

```
/
├── app/
│   ├── page.tsx           # Dashboard
│   ├── history/page.tsx   # History view
│   ├── actions.ts         # Server actions
│   └── layout.tsx         # Root layout
├── components/
│   ├── WeightDisplay.tsx
│   ├── GoalProgress.tsx
│   ├── QuickAddButtons.tsx
│   ├── CustomFoodForm.tsx
│   ├── CardioForm.tsx
│   └── TodayLog.tsx
├── lib/
│   ├── types.ts           # TypeScript types
│   └── dataManager.ts     # Data operations
└── tracker_data.json      # Your personal data (not in repo)
```

## Customization

To modify preset foods or cardio types, edit:
- `lib/types.ts` - Update `PRESET_FOODS` or `CARDIO_TYPES` arrays

To change goal calculations, edit:
- `components/GoalProgress.tsx` - Modify the multipliers (currently weight × 1 for protein, weight × 12 for calories)

---

Built for personal use - simple, effective, and private. 💪
