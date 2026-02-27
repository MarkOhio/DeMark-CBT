
import { useParams } from "react-router-dom";
import "./ExamComplete.css";

export default function ExamComplete() {
  const { examId } = useParams();
  const submitted = localStorage.getItem(`exam-${examId}-completed`);

  return (
    <div className="exam-complete">
      <h2>Exam Completed</h2>
      <p>Status: {submitted ? "Submitted" : "Pending Sync"}</p>
    </div>
  );
}