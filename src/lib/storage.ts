const PROGRESS_KEY = "denko2-progress-v1";

export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorageが利用できない環境（プライベートモード等）では保存をスキップする
  }
}

export { PROGRESS_KEY };
