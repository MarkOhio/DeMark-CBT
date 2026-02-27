
export type Result = {
  studentNumber: string;
  name: string;
  level: string;
  score: number;
  percentage: number;
  answers: { [questionId: number]: number }; // selected option index
  submittedAt: number | null; // timestamp
};
