'use server';

import OpenAI from 'openai';
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

export async function updateSteps(steps: number) {
  const data = readData();
  ensureTodayEntry(data);

  const todayEntry = getTodayEntry(data);
  if (todayEntry) {
    todayEntry.steps = steps;
    writeData(data);
  }

  revalidatePath('/');
  return { success: true };
}

export async function updateDaySteps(date: string, steps: number) {
  const data = readData();
  const dayEntry = data.entries.find(entry => entry.date === date);

  if (dayEntry) {
    dayEntry.steps = steps;
    writeData(data);
  }

  revalidatePath('/');
  revalidatePath('/history');
  return { success: true };
}

export async function estimateNutrition(foodName: string): Promise<{ protein: number; calories: number; error?: string }> {
  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a nutrition expert. When given a food item, respond with ONLY a JSON object containing estimated protein (in grams) and calories. No explanation, just JSON. Example: {"protein": 25, "calories": 300}. Round to nearest whole number. If the food is vague or unclear, give a reasonable average estimate.',
        },
        {
          role: 'user',
          content: `Estimate the protein (grams) and calories for: ${foodName}`,
        },
      ],
      max_tokens: 50,
      temperature: 0,
    });

    const content = response.choices[0]?.message?.content?.trim();
    if (!content) throw new Error('No response from AI');

    const parsed = JSON.parse(content);
    return {
      protein: Math.max(0, Math.round(parsed.protein)),
      calories: Math.max(0, Math.round(parsed.calories)),
    };
  } catch (error) {
    console.error('OpenAI error:', error);
    return { protein: 0, calories: 0, error: 'Failed to estimate nutrition. Try again or enter manually.' };
  }
}

export async function getHistoryData(): Promise<DayEntry[]> {
  const data = readData();
  return data.entries.sort((a, b) => b.date.localeCompare(a.date));
}
