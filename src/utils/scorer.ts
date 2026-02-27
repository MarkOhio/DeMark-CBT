import type { Question } from "../types/Question";

export type AnswerMap = {
  [questionId: number]: number; // selected option index
};

export function scoreExam(
  questions: Question[],
  answers: AnswerMap
): { score: number; total: number; percentage: number } {
  let score = 0;

  questions.forEach((q) => {
    if (answers[q.id] === q.correctIndex) {
      score++;
    }
  });

  const total = questions.length;
  const percentage = total === 0 ? 0 : Math.round((score / total) * 100);

  return { score, total, percentage };
}