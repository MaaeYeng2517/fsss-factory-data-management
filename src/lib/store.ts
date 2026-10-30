import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

function filePath(name: string) {
  return path.join(DATA_DIR, `${name}.json`);
}

function readArr(name: string): Record<string, unknown>[] {
  try {
    const raw = fs.readFileSync(filePath(name), 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeArr(name: string, arr: Record<string, unknown>[]) {
  fs.writeFileSync(filePath(name), JSON.stringify(arr, null, 2));
}

function makeStore(name: string) {
  return {
    all: () => readArr(name),
    save: (arr: Record<string, unknown>[]) => writeArr(name, arr),
  };
}

export const Store = {
  employees: makeStore('employees'),
  schedules: makeStore('schedules'),
  attendance: makeStore('attendance'),
  shifts: makeStore('shifts'),
  shiftSwaps: makeStore('shift-swaps'),
};
