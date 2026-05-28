
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { database } from "../../firebase/firebase";
import { ref, get } from "firebase/database";
import "./ExamInstructions.css";

type ExamData = {
  title?: string;
  courseCode?: string;
  startTime?: number;
  endTime?: number;
  questions?: any;
};

export default function ExamInstructions() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [examData, setExamData] = useState<ExamData | null>(null);
  const [remainingMinutes, setRemainingMinutes] = useState<number | null>(null);
  const [questionCount, setQuestionCount] = useState<number | null>(null);
  const studentStorageKey = examId ? `exam_student_${examId}` : null;

  // verify exam availability when instructions page loads
  useEffect(() => {
    const check = async () => {
      if (!examId) return;
      try {
        const snap = await get(ref(database, `exams/${examId}`));
        if (!snap.exists()) {
          alert("Exam not found");
          navigate("/");
          return;
        }
        const exam: any = snap.val();
        const now = Date.now();
        if (!exam.isVisible || now < exam.startTime) {
          alert("This exam is not yet available.");
          navigate("/");
          return;
        }
        if (now > exam.endTime) {
          alert("This exam has already ended.");
          navigate("/");
        }
        setExamData(exam);
        const remaining = Math.max(0, Math.floor((exam.endTime - now) / 60000));
        setRemainingMinutes(remaining);
        const qCount = exam.questions ? (Array.isArray(exam.questions) ? exam.questions.length : Object.keys(exam.questions).length) : 0;
        setQuestionCount(qCount);
      } catch (err: any) {
        console.error(err);
      }
    };
    check();
  }, [examId, navigate]);

  const [student, setStudent] = useState({
    fullName: "",
    studentNumber: "",
    level: "",
  });

  useEffect(() => {
    if (!studentStorageKey) return;
    const stored = localStorage.getItem(studentStorageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.fullName || parsed.studentNumber || parsed.level) {
          setStudent(parsed);
        }
      } catch {
        localStorage.removeItem(studentStorageKey);
      }
    }
  }, [studentStorageKey]);

  useEffect(() => {
    if (!studentStorageKey) return;
    localStorage.setItem(studentStorageKey, JSON.stringify(student));
  }, [student, studentStorageKey]);

  const handleStart = () => {
      if (!student.fullName || !student.studentNumber || !student.level) {
        alert("Please fill in all required fields.");
      return;
      }

    if (studentStorageKey) {
      localStorage.setItem(studentStorageKey, JSON.stringify(student));
    }

    navigate(`/student/exam/${examId}`, {
      state: { student },
    });
  };

  return (
   <div className="stud-info">
     <div>
      <div className="examin-header">
        {examData && (
        <p className="exam-inst-title">{examData.courseCode} - {examData.title}</p>
      )}
        <button className="back-btn" onClick={() => navigate("/student")}>← Back to Dashboard</button>
      </div>
      <h2>Verify Your Identity</h2>
      <p className="inst">Fill in your details below before the exam begins.</p>
      {remainingMinutes !== null && questionCount !== null && (
        <div className="exam-info-tab">
          <div className="info-item">
            <div className="info-label">Duration</div>
            <div className="info-value">{remainingMinutes} mins</div>
          </div>
          <div className="info-item">
            <div className="info-label">Questions</div>
            <div className="info-value">{questionCount}</div>
          </div>
          <div className="info-item">
            <div className="info-label">Starts</div>
            <div className="info-value">Now</div>
          </div>
        </div>
      )}
      <input
      required
        placeholder="Full Name"
        value={student.fullName}
        onChange={(e) =>
          setStudent({ ...student, fullName: e.target.value })
        }
      />

      <input
      required
        placeholder="Matric Number"
        value={student.studentNumber}
        onChange={(e) =>
          setStudent({ ...student, studentNumber: e.target.value })
        }
      />

      <select
      required
        value={student.level}
        onChange={(e) =>
          setStudent({ ...student, level: e.target.value })
        }
      >
        <option value="">Select Level</option>
        <option value="ND1">ND1</option>
        <option value="ND2">ND2</option>
         <option value="HND1">HND1</option>
        <option value="HND2">HND2</option>
      </select>

      <button onClick={handleStart} className="start">Start Exam →</button>
    </div>
   </div>
  );
}