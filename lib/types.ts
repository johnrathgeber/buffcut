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

export type PresetFood = { name: string; protein: number; calories: number };
export type PresetFoodGroup = { group: string; variants: PresetFood[] };
export type PresetItem = PresetFood | PresetFoodGroup;

export const PRESET_FOODS: PresetItem[] = [
  { name: 'Chicken Breast', protein: 22, calories: 134 },
  { name: 'Turkey Patty', protein: 20, calories: 158 },
  {
    group: 'Protein Bar',
    variants: [
      { name: 'David Bar', protein: 28, calories: 150 },
      { name: 'Quest Bar', protein: 21, calories: 190 },
      { name: 'Barebells Bar', protein: 20, calories: 200 },
    ],
  },
  { name: 'Protein Shake', protein: 24, calories: 120 },
  { name: 'Plate of Veggies', protein: 2, calories: 50 },
  { name: 'Hard Boiled Egg', protein: 6, calories: 78 },
];

export const CARDIO_TYPES = [
  'Running',
  'Cycling',
  'Walking',
  'Elliptical',
  'Swimming',
] as const;
