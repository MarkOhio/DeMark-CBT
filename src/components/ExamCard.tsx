
import "./ExamCard.css";

type ExamCardProps = {
  title: string;
  courseCode: string;
  date: string;
  status: "Upcoming" | "Active";
  onClick: () => void;
  durationMinutes?: number | null;
  questionCount?: number | null;
};

export default function ExamCard({
  title,
  courseCode,
  date,
  status,
  onClick,
  durationMinutes,
  questionCount,
}: ExamCardProps) {
  const durationLabel = durationMinutes
    ? `${durationMinutes} min`
    : null;
  return (
    <div className={`exam-card ${status.toLowerCase()}`} onClick={onClick}>
      <p className="exam-course">{courseCode}</p>
      <h3 className="exam-title">{title}</h3>
      <p className="exam-date">{date}</p>

      {durationLabel && (
        <p className="exam-duration">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path stroke-linecap="round" d="M12 6v6l4 2"></path></svg>
          <strong>{durationLabel}</strong></p>
      )}

      {status === "Active" && typeof questionCount === "number" && (
        <p className="exam-questions">
          
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
          
          <strong>{questionCount}</strong></p>
      )}

      <span className={`exam-status ${status.toLowerCase()}`}>{status}</span>
    </div>
  );
}