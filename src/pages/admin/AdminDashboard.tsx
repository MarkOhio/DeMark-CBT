import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../../firebase/firebase";
import { ref, get, child, remove } from "firebase/database";
import "./AdminDashboard.css";
import Navbar from "../../components/adminNavbar";

type ExamItem = {
  id: string;
  title?: string;
  courseCode?: string;
  startTime?: number;
  duration?: number;
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [exams, setExams] = useState<ExamItem[]>([]);
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 10;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const dbRef = ref(database);

      const examsSnap = await get(child(dbRef, "exams"));
      const submissionsSnap = await get(child(dbRef, "submissions"));

      const submissions = submissionsSnap.exists() ? submissionsSnap.val() : {};
      const examsObj = examsSnap.exists() ? examsSnap.val() : {};

      const list: ExamItem[] = Object.keys(examsObj || {}).map((key) => ({
        id: key,
        ...(examsObj[key] || {}),
      }));

      const pending = list.filter((ex) => {
        const hasSubmission = Object.values(submissions).some((s: any) => s.examId === ex.id);
        return !hasSubmission;
      });

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

  return (
    <div className="admin-con">
      <Navbar />
      <div className="admin-dashboard">
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

        <div className="exam-cards">
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