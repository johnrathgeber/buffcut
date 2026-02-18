export interface FoodEntry {
  name: string;
  protein: number;
  calories: number;
  timestamp: string;
}

export interface CardioEntry {
  type: string;
  duration: number;
  caloriesBurned: number;
  timestamp: string;
}

export interface DayEntry {
  date: string;
  weight: number;
  weightUpdated: boolean;
  foods: FoodEntry[];
  cardio: CardioEntry[];
  steps: number;
}

export interface TrackerData {
  entries: DayEntry[];
}

export const PRESET_FOODS = [
  { name: 'Chicken Breast', protein: 22, calories: 134 },
  { name: 'Turkey Patty', protein: 20, calories: 158 },
  { name: 'Protein Bar', protein: 28, calories: 150 },
  { name: 'Protein Shake', protein: 24, calories: 130 },
  { name: 'Plate of Veggies', protein: 2, calories: 50 },
] as const;

export const CARDIO_TYPES = [
  'Running',
  'Cycling',
  'Walking',
  'Elliptical',
  'Swimming',
] as const;
