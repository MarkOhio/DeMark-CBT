// src/firebase/exams.ts

export type Exam = {
  id: string;
  title: string;
  courseCode: string;
  date: string;
  status: "Upcoming" | "Active";
  durationMinutes: number;
};

/*
  This array represents what would normally come from Firebase.
  You can safely empty this array later when Firebase is live.
*/
const DUMMY_EXAMS: Exam[] = [
  {
    id: "1",
    title: "Computer Basics",
    courseCode: "CSC101",
    date: "2026-02-10",
    status: "Active",
    durationMinutes: 30,
  },
  {
    id: "2",
    title: "Networking Fundamentals",
    courseCode: "CSC102",
    date: "2026-02-15",
    status: "Upcoming",
    durationMinutes: 45,
  },
  {
    id: "3",
    title: "Networking Fundamentals 2",
    courseCode: "CSC103",
    date: "2026-02-15",
    status: "Active",
    durationMinutes: 45,
  },
];

/*
  This function mimics a Firebase fetch.
  Later, replace the body with Firestore logic.
*/
export async function getExams(): Promise<Exam[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(DUMMY_EXAMS);
    }, 300); // simulate network delay
  });
}