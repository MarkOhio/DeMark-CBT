import "./QuestionCard.css";

interface QuestionCardProps {
  questionId: string; // FIXED: was number
  text: string;
  options: string[];
  selectedOption: number | null;
  onSelect: (optionIndex: number) => void;
}

export default function QuestionCard({
  questionId,
  text,
  options,
  selectedOption,
  onSelect,
}: QuestionCardProps) {
  return (
    <div className="question-card">
      <h3>
        {questionId}. {text}
      </h3>
      <div className="options">
        {options.map((opt, idx) => (
          <button
            key={idx}
            className={`option-btn ${selectedOption === idx ? "selected" : ""}`}
            onClick={() => onSelect(idx)}
          >
            {/* strip any existing prefix like "A. ", "1. ", etc */}
            {String.fromCharCode(65 + idx)}. {opt.replace(/^\s*[A-Za-z0-9]+[\.\)]\s*/, "")}
          </button>
        ))}
      </div>
    </div>
  );
}