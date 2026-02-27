const PREFIX = "cbt_";

export function saveToStore<T>(key: string, data: T): void {
  localStorage.setItem(PREFIX + key, JSON.stringify(data));
}

export function loadFromStore<T>(key: string): T | null {
  const raw = localStorage.getItem(PREFIX + key);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function removeFromStore(key: string): void {
  localStorage.removeItem(PREFIX + key);
}

export function clearExamStore(examId: string): void {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(`${PREFIX}${examId}`)) {
      localStorage.removeItem(key);
    }
  });
}