import fs from 'fs';
import path from 'path';
import { TrackerData, DayEntry } from './types';

const DATA_FILE = path.join(process.cwd(), 'tracker_data.json');

export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

export function readData(): TrackerData {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const initialData: TrackerData = { entries: [] };
      fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
      return initialData;
    }
    const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(fileContent) as TrackerData;
  } catch (error) {
    console.error('Error reading data file:', error);
    return { entries: [] };
  }
}

export function writeData(data: TrackerData): void {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing data file:', error);
    throw new Error('Failed to save data');
  }
}

export function getTodayEntry(data: TrackerData): DayEntry | null {
  const today = getTodayString();
  return data.entries.find(entry => entry.date === today) || null;
}

export function getYesterdayEntry(data: TrackerData): DayEntry | null {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  return data.entries.find(entry => entry.date === yesterdayStr) || null;
}

export function ensureTodayEntry(data: TrackerData): TrackerData {
  const today = getTodayString();
  let todayEntry = getTodayEntry(data);

  if (!todayEntry) {
    const yesterdayEntry = getYesterdayEntry(data);
    const defaultWeight = yesterdayEntry?.weight || 177.5;

    todayEntry = {
      date: today,
      weight: defaultWeight,
      weightUpdated: false,
      foods: [],
      cardio: [],
    };

    data.entries.push(todayEntry);
  }

  return data;
}

export function getCurrentWeight(data: TrackerData): { weight: number; lastUpdated: string; isToday: boolean } {
  const todayEntry = getTodayEntry(data);

  if (todayEntry && todayEntry.weightUpdated) {
    return {
      weight: todayEntry.weight,
      lastUpdated: todayEntry.date,
      isToday: true,
    };
  }

  if (todayEntry && !todayEntry.weightUpdated) {
    const yesterdayEntry = getYesterdayEntry(data);
    if (yesterdayEntry) {
      return {
        weight: yesterdayEntry.weight,
        lastUpdated: yesterdayEntry.date,
        isToday: false,
      };
    }
  }

  return {
    weight: todayEntry?.weight || 177.5,
    lastUpdated: todayEntry?.date || getTodayString(),
    isToday: false,
  };
}
