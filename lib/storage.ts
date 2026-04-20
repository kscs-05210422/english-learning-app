export interface StreakInfo {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string | null;
  totalXP: number;
}

interface StorageData {
  streak: StreakInfo;
  progress: Record<string, { correctCount: number; wrongCount: number }>;
}

function getStorage(): StorageData {
  if (typeof window === "undefined") {
    return { streak: { currentStreak: 0, longestStreak: 0, lastStudyDate: null, totalXP: 0 }, progress: {} };
  }
  try {
    const raw = localStorage.getItem("english_app_data");
    if (raw) return JSON.parse(raw);
  } catch {}
  return { streak: { currentStreak: 0, longestStreak: 0, lastStudyDate: null, totalXP: 0 }, progress: {} };
}

function saveStorage(data: StorageData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("english_app_data", JSON.stringify(data));
}

function today(): string {
  return new Date().toISOString().split("T")[0];
}

export function recordStudySession(_mode: "chunk" | "vocabulary" | "conversation"): void {
  const data = getStorage();
  const todayStr = today();
  const last = data.streak.lastStudyDate;

  if (last === todayStr) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  if (last === yesterdayStr) {
    data.streak.currentStreak += 1;
  } else {
    data.streak.currentStreak = 1;
  }

  if (data.streak.currentStreak > data.streak.longestStreak) {
    data.streak.longestStreak = data.streak.currentStreak;
  }
  data.streak.lastStudyDate = todayStr;
  saveStorage(data);
}

export function getStreakInfo(): StreakInfo {
  return getStorage().streak;
}

export function addXP(amount: number): void {
  const data = getStorage();
  data.streak.totalXP = (data.streak.totalXP || 0) + amount;
  saveStorage(data);
}

export function getItemProgress(id: string): { correctCount: number; wrongCount: number } {
  const data = getStorage();
  return data.progress[id] ?? { correctCount: 0, wrongCount: 0 };
}

export function recordAnswer(id: string, correct: boolean): void {
  const data = getStorage();
  if (!data.progress[id]) data.progress[id] = { correctCount: 0, wrongCount: 0 };
  if (correct) data.progress[id].correctCount += 1;
  else data.progress[id].wrongCount += 1;
  saveStorage(data);
}
