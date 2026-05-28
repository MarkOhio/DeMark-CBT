
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
        <div className="page-title">Dashboard</div>
        <div className="page-sub">Welcome back — check your available exams below.</div>
        <div className="section-head">
        <h2>Active Exams</h2>
        <div className="section-divider"></div>
        <span className="etag tag-green">Live</span>
      </div>
        

        {activeExams.length === 0 && (
          <p>No active exams available.</p>
        )}
<div className="arrange-exam-cards">

        {activeExams.map((exam) => (
          <ExamCard
            key={exam.id}
            title={exam.title}
            courseCode={exam.courseCode}
            date={new Date(exam.startTime).toLocaleString()}
            status="Active"
            onClick={() => navigate(`/student/instructions/${exam.id}`)}
            durationMinutes={
              exam.durationMinutes
                ? exam.durationMinutes
                : exam.startTime && exam.endTime
                ? Math.round((exam.endTime - exam.startTime) / 60000)
                : undefined
            }
            questionCount={
              exam.questions
                ? Array.isArray(exam.questions)
                  ? exam.questions.length
                  : Object.keys(exam.questions).length
                : undefined
            }
          />
        ))}

</div>
        {upcomingExams.length > 0 && (
          <>
          <div className="section-head" >
        <h2>Upcoming Exams</h2>
        <div className="section-divider"></div>
        <span className="etag tag-orange">Scheduled</span>
      </div>
           
            <div className="arrange-exam-cards">

              {upcomingExams.map((exam) => (
              <ExamCard
                key={exam.id}
                title={exam.title}
                courseCode={exam.courseCode}
                date={new Date(exam.startTime).toLocaleString()}
                status="Upcoming"
                  onClick={() => alert("This exam is not yet available.")}
                  durationMinutes={
                    exam.durationMinutes
                      ? exam.durationMinutes
                      : exam.startTime && exam.endTime
                      ? Math.round((exam.endTime - exam.startTime) / 60000)
                      : undefined
                  }
              />
            ))}

            </div>
          </>
        )}
      </main>
    </div>
  );
}

