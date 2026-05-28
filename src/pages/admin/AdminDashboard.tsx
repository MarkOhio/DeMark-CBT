import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../../firebase/firebase";
import { ref, get, child, remove } from "firebase/database";
import "./AdminDashboard.css";
import Navbar from "../../components/adminNavbar";
import { useRef } from "react";

type ExamItem = {
  id: string;
  title?: string;
  courseCode?: string;
  startTime?: number;
  endTime?: number;
  duration?: number;
  isVisible?: boolean;
  questions?: any;
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [exams, setExams] = useState<ExamItem[]>([]);
  const [totalExams, setTotalExams] = useState<number | null>(null);
  const [activeNowCount, setActiveNowCount] = useState<number | null>(null);
  const [studentThisWeek, setStudentThisWeek] = useState<number | null>(null);
  const [untakenCount, setUntakenCount] = useState<number | null>(null);
  const [pendingFeedbackCount, setPendingFeedbackCount] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 10;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const dbRef = ref(database);

      const examsSnap = await get(child(dbRef, "exams"));
      const submissionsSnap = await get(child(dbRef, "submissions"));
      const feedbackSnap = await get(child(dbRef, "feedback"));

      const submissions = submissionsSnap.exists() ? submissionsSnap.val() : {};
      const examsObj = examsSnap.exists() ? examsSnap.val() : {};
      const feedbackObj = feedbackSnap.exists() ? feedbackSnap.val() : {};

      const list: ExamItem[] = Object.keys(examsObj || {}).map((key) => ({
        id: key,
        ...(examsObj[key] || {}),
      }));

      // total exams
      setTotalExams(list.length);

      // active now (visible & now between start and end)
      const now = Date.now();
      const activeNow = list.filter(
        (ex) => (ex as any).isVisible && ex.startTime && ex.endTime && now >= (ex as any).startTime && now <= (ex as any).endTime
      ).length;
      setActiveNowCount(activeNow);

      // student registrations/submissions this week
      const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      const submissionsArr = Object.values(submissions) as any[];
      const thisWeekCount = submissionsArr.filter((s) => s && s.submittedAt && s.submittedAt >= oneWeekAgo).length;
      setStudentThisWeek(thisWeekCount);

      const pending = list.filter((ex) => {
        const hasSubmission = Object.values(submissions).some((s: any) => s.examId === ex.id);
        return !hasSubmission;
      });

      setUntakenCount(pending.length);

      // pending feedback (status !== 'closed')
      const feedbackArr = Object.values(feedbackObj || {}) as any[];
      const pendingFeedback = feedbackArr.filter((f) => !f || f.status === undefined ? true : f.status !== "closed").length;
      setPendingFeedbackCount(pendingFeedback);

      setExams(pending);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleDelete = async (examId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this exam?");
    if (!confirmDelete) return;

    try {
      await remove(ref(database, `exams/${examId}`));
      setExams((prev) => prev.filter((e) => e.id !== examId));
      alert("Exam deleted successfully");
    } catch (error: any) {
      alert("Delete failed: " + error.message);
    }
  };

  const handleEdit = (examId: string) => {
    // route to upload page with examId to trigger edit mode
    navigate(`/admin/upload/${examId}`);
  };

  const untakenSectionRef = useRef<HTMLDivElement | null>(null);

  const goToUntaken = () => {
    if (untakenSectionRef.current) {
      untakenSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="admin-con">
      <Navbar />
    
      <div className="admin-dashboard">
          <h2>Admin Dashboard</h2>
        {/* Overview cards */}
        <div className="overview-grid">
          <div
            className="overview-card clickable"
            onClick={() => navigate("/admin/upload")}
            title="Go to Exams"
          >
            <svg className="overview-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden>
              <path fill="currentColor" d="M3 13h8V3H3v10zm0 8h8v-6H3v6zM13 21h8V11h-8v10zm0-18v6h8V3h-8z" />
            </svg>
            <div className="overview-title">Total Exams</div>
            <div className="overview-number">{totalExams ?? "—"}</div>
            <div className="overview-sub">Active now: {activeNowCount ?? "—"}</div>
          </div>

          <div
            className="overview-card clickable"
            onClick={() => navigate("/admin/upload")}
            title="View submissions"
          >
            <svg className="overview-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden>
              <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            <div className="overview-title">Student Registered</div>
            <div className="overview-number">{studentThisWeek ?? "—"}</div>
            <div className="overview-sub">This week</div>
          </div>

          <div
            className="overview-card clickable"
            onClick={goToUntaken}
            title="Jump to untaken exams"
          >
            <svg className="overview-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden>
              <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14l4-4h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
            </svg>
            <div className="overview-title">Untaken Exams</div>
            <div className="overview-number">{untakenCount ?? "—"}</div>
            <div className="overview-sub">All untaken</div>
          </div>

          <div
            className="overview-card clickable"
            onClick={() => navigate("/admin/feedback")}
            title="View feedback"
          >
            <svg className="overview-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden>
              <path fill="currentColor" d="M21 6h-2v9H7v2c0 .55.45 1 1 1h9l4 4V7c0-.55-.45-1-1-1zM3 5h14V3H3c-1.1 0-2 .9-2 2v12l4-4V5z" />
            </svg>
            <div className="overview-title">Pending Feedback</div>
            <div className="overview-number">{pendingFeedbackCount ?? "—"}</div>
            <div className="overview-sub">Needs response</div>
          </div>
        </div>

        <h2>Untaken Exams</h2>

        {loading && <p>Loading exams…</p>}

        {!loading && exams.length === 0 && <p>No untaken exams available.</p>}

        {exams.length > PAGE_SIZE && (
          <div style={{ marginBottom: 16 }}>
            <button disabled={page === 0} onClick={() => setPage(page - 1)}>
              Prev
            </button>
            <button
              disabled={(page + 1) * PAGE_SIZE >= exams.length}
              onClick={() => setPage(page + 1)}
              style={{ marginLeft: 8 }}
            >
              Next
            </button>
          </div>
        )}

         <div className="arrange-exam-cards">
          {exams.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE).map((exam) => (
            <div key={exam.id} className="exam-card">
              <h3>{exam.title || "Untitled"}</h3>
              <p>Course Code: {exam.courseCode}</p>
              <p>Start: {exam.startTime ? new Date(exam.startTime).toLocaleString() : "N/A"}</p>
              {exam.duration != null && <p>Duration: {exam.duration} mins</p>}

              <div className="card-buttons">
                <button onClick={() => handleEdit(exam.id)}>Edit</button>
                  <button onClick={() => navigate(`/admin/preview/${exam.id}`)}>
                    Preview
                  </button>
                <button className="delete-btn" onClick={() => handleDelete(exam.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}