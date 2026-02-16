'use server';

import { revalidatePath } from 'next/cache';
import {
  readData,
  writeData,
  ensureTodayEntry,
  getTodayEntry,
  getTodayString,
  getCurrentWeight,
} from '@/lib/dataManager';
import { FoodEntry, CardioEntry, TrackerData, DayEntry } from '@/lib/types';

export async function getDashboardData() {
  const data = readData();
  const updatedData = ensureTodayEntry(data);
  writeData(updatedData);

  const todayEntry = getTodayEntry(updatedData);
  const weightData = getCurrentWeight(updatedData);

  return {
    todayEntry,
    weightData,
  };
}

export async function updateWeight(weight: number) {
  const data = readData();
  ensureTodayEntry(data);

  const todayEntry = getTodayEntry(data);
  if (todayEntry) {
    todayEntry.weight = weight;
    todayEntry.weightUpdated = true;
    writeData(data);
  }

  revalidatePath('/');
  return { success: true };
}

export async function addFood(food: { name: string; protein: number; calories: number }) {
  const data = readData();
  ensureTodayEntry(data);

  const todayEntry = getTodayEntry(data);
  if (todayEntry) {
    const newFood: FoodEntry = {
      ...food,
      timestamp: new Date().toISOString(),
    };
    todayEntry.foods.push(newFood);
    writeData(data);
  }

  revalidatePath('/');
  return { success: true };
}

export async function addCardio(cardio: { type: string; duration: number; caloriesBurned: number }) {
  const data = readData();
  ensureTodayEntry(data);

  const todayEntry = getTodayEntry(data);
  if (todayEntry) {
    const newCardio: CardioEntry = {
      ...cardio,
      timestamp: new Date().toISOString(),
    };
    todayEntry.cardio.push(newCardio);
    writeData(data);
  }

  revalidatePath('/');
  return { success: true };
}

export async function getHistoryData(): Promise<DayEntry[]> {
  const data = readData();
  return data.entries.sort((a, b) => b.date.localeCompare(a.date));
}
