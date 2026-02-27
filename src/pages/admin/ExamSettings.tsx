
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { database } from "../../firebase/firebase";
import { ref, get, update } from "firebase/database";
import "./ExamSettings.css";

export default function ExamSettings() {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [questionsPerStudent, setQuestionsPerStudent] = useState<number>(50);
  const [totalQuestions, setTotalQuestions] = useState<number>(100);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!examId) return;

    const load = async () => {
      setLoading(true);
      try {
        const snap = await get(ref(database, `exams/${examId}`));
        if (!snap.exists()) {
          alert("Exam not found");
          setLoading(false);
          return;
        }

        const data: any = snap.val();

        if (typeof data.questionsPerStudent === "number")
          setQuestionsPerStudent(data.questionsPerStudent);
        if (typeof data.totalQuestions === "number")
          setTotalQuestions(data.totalQuestions);
        if (typeof data.isVisible === "boolean") setIsVisible(data.isVisible);
      } catch (err: any) {
        console.error(err);
        alert("Failed to load exam: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [examId]);

  const handleSave = async () => {
    if (!examId) {
      alert("No exam selected for settings.");
      return;
    }

    try {
      await update(ref(database, `exams/${examId}`), {
        questionsPerStudent: Number(questionsPerStudent) || 0,
        totalQuestions: Number(totalQuestions) || 0,
        isVisible: Boolean(isVisible),
      });

      alert("Settings updated");
      navigate("/admin");
    } catch (err: any) {
      console.error(err);
      alert("Failed to save settings: " + err.message);
    }
  };

  return (
    <div className="exam-settings">
      <h2>Exam Settings</h2>

      {loading ? (
        <p>Loading exam settings…</p>
      ) : (
        <>
          <div className="form-group">
            <label>Number of Questions per Student</label>
            <input
              type="number"
              value={questionsPerStudent}
              onChange={(e) => setQuestionsPerStudent(parseInt(e.target.value || "0"))}
            />
          </div>

          <div className="form-group">
            <label>Total Question Pool</label>
            <input
              type="number"
              value={totalQuestions}
              onChange={(e) => setTotalQuestions(parseInt(e.target.value || "0"))}
            />
          </div>

          <div className="form-group">
            <label>Exam Visibility</label>
            <select value={isVisible ? "visible" : "hidden"} onChange={(e) => setIsVisible(e.target.value === "visible")}>
              <option value="visible">Visible</option>
              <option value="hidden">Hidden</option>
            </select>
          </div>

          <button onClick={handleSave}>Save Settings</button>
        </>
      )}
    </div>
  );
}
