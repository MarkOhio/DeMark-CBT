
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../../firebase/firebase";
import { ref, get } from "firebase/database";
import ExamCard from "../../components/ExamCard";
import Navbar from "../../components/Navbar";
import "./StudentDashboard.css";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [activeExams, setActiveExams] = useState<any[]>([]);
  const [upcomingExams, setUpcomingExams] = useState<any[]>([]);

  useEffect(() => {
    const fetchExams = async () => {
      const snapshot = await get(ref(database, "exams"));

      if (snapshot.exists()) {
        const data = snapshot.val();
        const now = Date.now();

        const all = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        const active = all.filter(
          (exam) =>
            exam.isVisible && now >= exam.startTime && now <= exam.endTime
        );

        const upcoming = all.filter(
          (exam) =>
            exam.isVisible && now < exam.startTime
        );

        setActiveExams(active);
        setUpcomingExams(upcoming);
      } else {
        setActiveExams([]);
        setUpcomingExams([]);
      }
    };

    fetchExams();

    const interval = setInterval(fetchExams, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-layout">
      <Navbar />

      <main className="dashboard-content">
        <h2>Available Exams</h2>

        {activeExams.length === 0 && (
          <p>No active exams available.</p>
        )}

        {activeExams.map((exam) => (
          <ExamCard
            key={exam.id}
            title={exam.title}
            courseCode={exam.courseCode}
            date={new Date(exam.startTime).toLocaleString()}
            status="Active"
            onClick={() =>
              navigate(`/student/instructions/${exam.id}`)
            }
          />
        ))}

        {upcomingExams.length > 0 && (
          <>
            <h2 style={{ marginTop: 24 }}>Upcoming Exams</h2>
            {upcomingExams.map((exam) => (
              <ExamCard
                key={exam.id}
                title={exam.title}
                courseCode={exam.courseCode}
                date={new Date(exam.startTime).toLocaleString()}
                status="Upcoming"
                onClick={() =>
                  alert("This exam is not yet available.")
                }
              />
            ))}
          </>
        )}
      </main>
    </div>
  );
}

