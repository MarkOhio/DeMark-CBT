import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { database } from "../../firebase/firebase";
import { ref, get } from "firebase/database";
import QuestionCard from "../../components/QuestionCard";
import "../student/Exam.css"; // reuse styles

export default function ExamPreview() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [examData, setExamData] = useState<any>(null);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!examId) return;
      const snap = await get(ref(database, `exams/${examId}`));
      if (!snap.exists()) {
        alert("Exam not found");
        navigate("/admin");
        return;
      }
      const exam: any = snap.val();
      setExamData(exam);
      const qSnap = await get(ref(database, `exams/${examId}/questions`));
      if (qSnap.exists()) {
        const data = qSnap.val();
        const arr = Object.keys(data).map((k) => ({ id: k, ...data[k] }));
        setQuestions(arr);
      }
    };
    load();
  }, [examId, navigate]);

  const select = (qid: string, opt: number) => {
    setAnswers((prev) => ({ ...prev, [qid]: opt }));
  };

  const handleFinish = () => {
    let count = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) count++;
    });
    setScore(count);
  };

  if (!examData) return <div>Loading exam...</div>;

  return (
    <div className="exam-page">
      <h2>Preview: {examData.title}</h2>
      {score === null ? (
        <>
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
          <button onClick={handleFinish}>Finish Preview</button>
        </>
      ) : (
        <div>
          <h3>Your score: {score} / {questions.length}</h3>
          <button onClick={() => navigate("/admin")}>Back to dashboard</button>
        </div>
      )}
    </div>
  );
}
