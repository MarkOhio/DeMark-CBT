
// src/utils/localAuth.ts
const ADMIN_KEY = "adminAuth";

// Save admin session with expiration
export function saveAdminSession(email: string, durationDays: number = 7) {
  const expires = new Date().getTime() + durationDays * 24 * 60 * 60 * 1000;
  const data = { email, expires };
  localStorage.setItem(ADMIN_KEY, JSON.stringify(data));
}

// Check if admin session is valid
export function isAdminLoggedIn(): boolean {
  const raw = localStorage.getItem(ADMIN_KEY);
  if (!raw) return false;

  const data = JSON.parse(raw);
  if (new Date().getTime() > data.expires) {
    localStorage.removeItem(ADMIN_KEY);
    return false;
  }
  return true;
}

// Clear admin session manually (logout)
export function clearAdminSession() {
  localStorage.removeItem(ADMIN_KEY);
}

const ADMIN_NAME_KEY = "adminDisplayName";

export function saveAdminDisplayName(name: string) {
  try {
    localStorage.setItem(ADMIN_NAME_KEY, name || "");
  } catch {}
}

export function getAdminDisplayName(): string | null {
  try {
    return localStorage.getItem(ADMIN_NAME_KEY);
  } catch {
    return null;
  }
}
