import type { Question } from "../types/Question";

export function parseQuestions(rawText: string): Question[] {
  const blocks = rawText
    .split(/\n(?=\d+\.)/)
    .map(b => b.trim())
    .filter(Boolean);

  const questions: Question[] = [];

  blocks.forEach((block, index) => {
    const lines = block.split(/\s(?=[A-D]\.)/);

    if (lines.length < 5) {
      throw new Error(`Invalid question format at question ${index + 1}`);
    }

    const questionText = lines[0].replace(/^\d+\.\s*/, "").trim();

    const options: string[] = [];
    let correctIndex = -1;

    lines.slice(1).forEach((line, i) => {
      const isCorrect = line.includes("*");
      const cleaned = line.replace("*", "").replace(/^[A-D]\.\s*/, "").trim();
      options.push(cleaned);
      if (isCorrect) correctIndex = i;
    });

    if (correctIndex === -1) {
      throw new Error(`No correct option marked in question ${index + 1}`);
    }

    questions.push({
      id: index + 1,
      text: questionText,
      options,
      correctIndex
    });
  });

  return questions;
}