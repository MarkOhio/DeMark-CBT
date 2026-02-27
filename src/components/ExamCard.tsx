
import "./ExamCard.css";

type ExamCardProps = {
  title: string;
  courseCode: string;
  date: string;
  status: "Upcoming" | "Active";
  onClick: () => void;
};

export default function ExamCard({
  title,
  courseCode,
  date,
  status,
  onClick,
}: ExamCardProps) {
  return (
    <div className={`exam-card ${status.toLowerCase()}`} onClick={onClick}>
      <h3 className="exam-title">{title}</h3>
      <p className="exam-course">{courseCode}</p>
      <p className="exam-date">{date}</p>
      <span className={`exam-status ${status.toLowerCase()}`}>{status}</span>
    </div>
  );
}