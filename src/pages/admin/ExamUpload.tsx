
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { database } from "../../firebase/firebase";
import { ref, push, set, get, update } from "firebase/database";
import "./ExamUpload.css";
import Navbar from "../../components/adminNavbar";
import LoadingButton from "../../components/LoadingButton";

function parseQuestions(raw: string) {
  const blocks = raw
    .trim()
    .split("\n\n")
    .filter((b) => b.trim().length > 0);

  return blocks.map((block) => {
    const lines = block.split("\n").filter(Boolean);

    const text = lines[0]?.trim();
    const optionLines = lines.slice(1);

    const options = optionLines.map((l) =>
      l.replace("*", "").trim()
    );

    const correctIndex = optionLines.findIndex((l) =>
      l.includes("*")
    );

    return { text, options, correctIndex };
  });
}

export default function ExamUpload() {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [examTitle, setExamTitle] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [duration, setDuration] = useState(30);
  const [totalQuestions, setTotalQuestions] = useState(50);
  const [questionsPerStudent, setQuestionsPerStudent] = useState(50);
  const [startTime, setStartTime] = useState("");
  const [rawText, setRawText] = useState("");
  const [loading, setLoading] = useState(false);

  const isEditing = Boolean(examId);

  // when editing we need to load existing exam data
  useEffect(() => {
    if (!examId) return;

    const loadExam = async () => {
      setLoading(true);
      try {
        const snap = await get(ref(database, `exams/${examId}`));
        if (!snap.exists()) {
          alert("Exam not found");
          setLoading(false);
          return;
        }

        const data: any = snap.val();
        setExamTitle(data.title || "");
        setCourseCode(data.courseCode || "");
        setDuration(data.duration || 30);
        setTotalQuestions(data.totalQuestions || 50);
        setQuestionsPerStudent(data.questionsPerStudent || 50);
        setStartTime(data.startTime ? new Date(data.startTime).toISOString().slice(0,16) : "");

        // convert questions object back to rawText format
        if (data.questions) {
          const blocks = Object.values<any>(data.questions).map((q: any) => {
            const lines = [q.text];
            q.options.forEach((opt: string, i: number) => {
              lines.push(`${i === q.correctIndex ? "*" : ""}${opt}`);
            });
            return lines.join("\n");
          });
          setRawText(blocks.join("\n\n"));
        }
      } catch (err: any) {
        console.error(err);
        alert("Failed to load exam: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    loadExam();
  }, [examId]);

  const handleUpload = async () => {
    try {
      if (loading) return;

      if (!examTitle || !courseCode || !rawText || !startTime) {
        alert("All fields are required");
        return;
      }

      const parsed = parseQuestions(rawText);

      if (parsed.length === 0) {
        alert("Questions not formatted correctly");
        return;
      }

      if (parsed.some((q) => q.correctIndex === -1)) {
        alert("Each question must have one * correct answer");
        return;
      }

      const startTimestamp = new Date(startTime).getTime();
      const endTimestamp = startTimestamp + duration * 60 * 1000;

      setLoading(true);

      let examKey = examId;

      if (isEditing && examKey) {
        // update metadata
        await update(ref(database, `exams/${examKey}`), {
          title: examTitle,
          courseCode,
          duration: Number(duration),
          totalQuestions: Number(totalQuestions),
          questionsPerStudent: Number(questionsPerStudent),
          startTime: startTimestamp,
          endTime: endTimestamp,
        });

        // remove old questions before rewriting
        await set(ref(database, `exams/${examKey}/questions`), null);
      } else {
        const examRef = push(ref(database, "exams"));
        examKey = examRef.key;
        await set(examRef, {
          title: examTitle,
          courseCode,
          duration: Number(duration),
          totalQuestions: Number(totalQuestions),
          questionsPerStudent: Number(questionsPerStudent),
          startTime: startTimestamp,
          endTime: endTimestamp,
          isVisible: true,
          createdAt: Date.now(),
        });
      }

      // add questions under the determined key
      for (const q of parsed) {
        const questionRef = push(
          ref(database, `exams/${examKey}/questions`)
        );
        await set(questionRef, q);
      }

      alert("Exam uploaded successfully");

      if (isEditing) {
        // return to dashboard after editing
        navigate("/admin");
      }

      if (!isEditing) {
        setExamTitle("");
        setCourseCode("");
        setRawText("");
        setStartTime("");
      }

    } catch (error: any) {
      console.error("UPLOAD ERROR:", error);
      alert("Upload failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="exam-upload">
      <Navbar />
      <div className="exam-input">

      <h2>Upload Exam</h2>

      <div className="feild">
              <input
        placeholder="Exam Title"
        value={examTitle}
        onChange={(e) => setExamTitle(e.target.value)}
      />

      </div>

       <div className="flex-input">
       
      <div className="feild">
         <label htmlFor="text"> Course Code</label>
          <input
          type="text"
        placeholder="Course Code"
        value={courseCode}
        onChange={(e) => setCourseCode(e.target.value)}
      />
      </div>

      <div className="feild">
        <label htmlFor="datetime-local"> Exam Start Time</label>
      <input
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      </div>
      
     </div>

      <div className="flex-input">
        <div className="feild">
         <label htmlFor="number">Exam Duration (Minuites)</label>
      <input 
        type="number"
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
      />
      </div>

      <div className="feild">
         <label htmlFor="number">Number of Set Questions</label>
      <input
        type="number"
        value={totalQuestions}
        onChange={(e) => setTotalQuestions(Number(e.target.value))}
      />

      </div>
      </div>

      <div className="feild">
         <label htmlFor="number">Number of Questions per Student</label>
      <input
        type="number"
        value={questionsPerStudent}
        onChange={(e) =>
          setQuestionsPerStudent(Number(e.target.value))
        }
      />
      </div>

      <div className="feild">
         <textarea
        placeholder="Upload CBT questions, With asterics [*] on the correct answers"
        rows={12}
        value={rawText}
        onChange={(e) => setRawText(e.target.value)}
      />
      </div>

    

     

     
     

     

      <LoadingButton onClick={handleUpload} loading={loading}>
        {isEditing ? (loading ? "Saving..." : "Save Changes") : (loading ? "Uploading..." : "Upload Exam")}
      </LoadingButton>
    </div>
      </div> 
  );
}
