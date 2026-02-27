
import type { Question } from "./Question";

export type Exam = {
  id: string;
  title: string;
  courseCode: string;
  duration: number; // in minutes
  questions: Question[];
  totalQuestionsPerStudent: number;
  status: "Upcoming" | "Active" | "Closed";
};
