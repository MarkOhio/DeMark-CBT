import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { database } from "../../firebase/firebase";
import { ref, get, push, set } from "firebase/database";
import QuestionCard from "../../components/QuestionCard";
import "./Exam.css";

export default function Exam() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const student = location.state?.student;

  const SESSION_KEY = `exam_session_${examId}`;
  const PENDING_KEY = `pending_submission_${examId}`;

  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [examData, setExamData] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [tabSwitches, setTabSwitches] = useState<number>(0);
  const [locked, setLocked] = useState(false);

  const submittedRef = useRef(false);

  /* ================= LOAD EXAM ================= */

  useEffect(() => {
    const init = async () => {
      const savedSession = localStorage.getItem(SESSION_KEY);

      // prevent re-taking on same device
      if (localStorage.getItem(`submitted_${examId}`)) {
        alert("You have already completed this exam on this device.");
        navigate("/");
        return;
      }

      // ask for notification permission if not already decided
      if (Notification.permission === "default") {
        Notification.requestPermission();
      }

      if (savedSession) {
        const parsed = JSON.parse(savedSession);
        setAnswers(parsed.answers || {});
        setTabSwitches(parsed.tabSwitches || 0);
      }

      const snap = await get(ref(database, `exams/${examId}`));

      if (!snap.exists()) {
        navigate("/");
        return;
      }
      const exam = snap.val();      
      const now = Date.now();      
      if (!exam.isVisible || now < exam.startTime || now > exam.endTime) {        
        alert("This exam is not currently available.");        
        navigate("/");        
        return;      
      }      
      setExamData(exam);      

      const qSnap = await get(ref(database, `exams/${examId}/questions`));
      if (qSnap.exists()) {
        const data = qSnap.val();
        const arr = Object.keys(data).map((k) => ({
          id: k,
          ...data[k],
        }));
        // randomize and limit if examData.questionsPerStudent is set
        if (exam.questionsPerStudent && arr.length > exam.questionsPerStudent) {
          const { getRandomQuestions } = await import("../../utils/randomizer");
          const subset = getRandomQuestions(arr, exam.questionsPerStudent);
          setQuestions(subset);
        } else {
          setQuestions(arr);
        }
      }

      const remaining = exam.endTime - Date.now();
      if (remaining <= 0) {
        submit(true);
      } else {
        setTimeLeft(remaining);
      }
    };

    init();
  }, [examId]);

  /* ================= TIMER ================= */

  useEffect(() => {
    if (!examData || locked) return;

    const interval = setInterval(() => {
      const remaining = examData.endTime - Date.now();

      if (remaining <= 0) {
        clearInterval(interval);
        submit(true);
      } else {
        setTimeLeft(remaining);
        // fire browser notification at 5 minute mark
        if (remaining <= 5 * 60 * 1000 && remaining > 5 * 60 * 1000 - 1000) {
          if (Notification.permission === "granted") {
            new Notification("Exam ending soon", {
              body: "Only 5 minutes remaining",
            });
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [examData, locked]);

  /* ================= SAVE SESSION ================= */

  useEffect(() => {
    if (!examData) return;

    const session = {
      answers,
      tabSwitches,
      endTime: examData.endTime,
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }, [answers, tabSwitches, examData]);

  /* ================= TAB SWITCH DETECTION ================= */

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && !locked) {
        const newCount = tabSwitches + 1;
        setTabSwitches(newCount);

        if (newCount === 1) {
          alert("Warning: Switch tab one more time and your exam will be submitted.");
        } else if (newCount === 2) {
          alert("Warning: Switch tab zero more times and your exam will be submitted.");
        } else if (newCount >= 3) {
          submit(false, true);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, [tabSwitches, locked]);

  /* ================= ONLINE RECOVERY ================= */

  useEffect(() => {
    const attemptResubmit = async () => {
      const pending = localStorage.getItem(PENDING_KEY);
      if (!pending) return;

      const data = JSON.parse(pending);

      try {
        const submissionRef = push(ref(database, "submissions"));
        await set(submissionRef, data);

        localStorage.removeItem(PENDING_KEY);
        localStorage.removeItem(SESSION_KEY);
        alert("Connection restored. Exam submitted.");
        navigate("/");
      } catch {}
    };

    window.addEventListener("online", attemptResubmit);
    return () => window.removeEventListener("online", attemptResubmit);
  }, []);

  /* ================= SELECT ANSWER ================= */

  const select = (qid: string, opt: number) => {
    if (locked) return;
    setAnswers((prev) => ({ ...prev, [qid]: opt }));
  };

  /* ================= SUBMIT ================= */

  const submit = async (auto = false, tabViolation = false) => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setLocked(true);

    // ===== SCORING FIXED =====
    let score = 0;

    questions.forEach((q) => {
      const selected = answers[q.id];
      if (
        selected !== undefined &&
        Number(selected) === Number(q.correctIndex)
      ) {
        score++;
      }
    });
    // ==========================

    const payload = {
      examId,
      examTitle: examData.title,
      courseCode: examData.courseCode,
      studentName: student.fullName,
      studentNumber: student.studentNumber,
      level: student.level,
      score,
      total: questions.length,
      answers,
      submittedAt: Date.now(),
      autoSubmitted: auto,
      tabViolation,
    };

    if (!navigator.onLine) {
      localStorage.setItem(PENDING_KEY, JSON.stringify(payload));
      alert("You are offline. Exam saved and will submit when connection returns.");
      return;
    }

    try {
      const submissionRef = push(ref(database, "submissions"));
      await set(submissionRef, payload);

      // mark as completed on this device
      localStorage.setItem(`submitted_${examId}`, "1");

      localStorage.removeItem(SESSION_KEY);
      alert(
        tabViolation
          ? "Exam submitted due to tab switching."
          : auto
          ? "Time expired. Exam submitted."
          : "Exam submitted successfully."
      );

      navigate("/");
    } catch (err: any) {
      localStorage.setItem(PENDING_KEY, JSON.stringify(payload));
      alert("Submission failed. Will retry when online.");
    }
  };

  if (!student) return <div>Invalid session.</div>;
  if (!examData) return <div>Loading...</div>;

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  return (
    <div className="exam-page">
      <div className="timer-bubble">
        {minutes}:{seconds.toString().padStart(2, "0")}
      </div>
      <h3>
        Time Remaining: {minutes}:{seconds.toString().padStart(2, "0")}
      </h3>

      {questions.map((q, idx) => (
        <QuestionCard
          key={q.id}
            questionId={`${idx + 1}`}
          text={q.text}
          options={q.options}
          selectedOption={answers[q.id] ?? null}
          onSelect={(opt) => select(q.id, opt)}
        />
      ))}

      <button disabled={locked} onClick={() => submit(false)}>
        Submit Exam
      </button>
    </div>
  );
}