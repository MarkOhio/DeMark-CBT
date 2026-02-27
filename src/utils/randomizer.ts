import type { Question } from "../types/Question";

export function getRandomQuestions(
  pool: Question[],
  count: number
): Question[] {
  if (count > pool.length) {
    throw new Error("Requested question count exceeds pool size");
  }

  const shuffled = [...pool];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}
