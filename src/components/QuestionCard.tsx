import "./QuestionCard.css";
import { forwardRef, useState, useEffect } from "react";

interface QuestionCardProps {
  questionId: string;
  text: string;
  options: string[];
  selectedOption: number | null;
  onSelect: (optionIndex: number) => void;
  isHighlighted?: boolean;
}

export default forwardRef<HTMLDivElement, QuestionCardProps>(function QuestionCard({
  questionId,
  text,
  options,
  selectedOption,
  onSelect,
  isHighlighted = false,
}, ref) {
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    if (isHighlighted) {
      setGlow(true);
      const timer = setTimeout(() => setGlow(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isHighlighted]);

  return (
    <div ref={ref} className={`question-card ${glow ? "highlight-glow" : ""}`}>
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
});