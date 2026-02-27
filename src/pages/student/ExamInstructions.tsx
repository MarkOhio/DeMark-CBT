
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { database } from "../../firebase/firebase";
import { ref, get } from "firebase/database";
import "./ExamInstructions.css";

export default function ExamInstructions() {
  const { examId } = useParams();
  const navigate = useNavigate();

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

  const handleStart = () => {
    if (!student.fullName || !student.studentNumber || !student.level)
      return;

    navigate(`/student/exam/${examId}`, {
      state: { student },
    });
  };

  return (
   <div className="stud-info">
     <div>
      <h2>Student Details</h2>

      <input
        placeholder="Full Name"
        value={student.fullName}
        onChange={(e) =>
          setStudent({ ...student, fullName: e.target.value })
        }
      />

      <input
        placeholder="Matric Number"
        value={student.studentNumber}
        onChange={(e) =>
          setStudent({ ...student, studentNumber: e.target.value })
        }
      />

      <select
        value={student.level}
        onChange={(e) =>
          setStudent({ ...student, level: e.target.value })
        }
      >
        <option value="">Select Level</option>
        <option value="ND1">ND1</option>
        <option value="ND2">ND2</option>
         <option value="ND1">HND1</option>
        <option value="ND2">HND2</option>
      </select>

      <button onClick={handleStart}>Start Exam</button>
    </div>
   </div>
  );
}