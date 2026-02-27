
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

/* Pages */
import Login from "./pages/Login";

/* Student Pages */
import StudentDashboard from "./pages/student/StudentDashboard";
import ExamInstructions from "./pages/student/ExamInstructions";
import Exam from "./pages/student/Exam";
import ExamComplete from "./pages/student/ExamComplete";
import StudentFeedback from "./pages/student/StudentFeedback";

/* Admin Pages */
import AdminDashboard from "./pages/admin/AdminDashboard";
import ExamUpload from "./pages/admin/ExamUpload";
import ExamSettings from "./pages/admin/ExamSettings";
import ExamPreview from "./pages/admin/ExamPreview";
import Results from "./pages/admin/Results";
import AdminFeedback from "./pages/admin/AdminFeedback";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Student */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/feedback" element={<StudentFeedback />} />
        <Route path="/student/instructions/:examId" element={<ExamInstructions />} />
        <Route path="/student/exam/:examId" element={<Exam />} />
        <Route path="/student/complete/:examId" element={<ExamComplete />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/upload" element={<ExamUpload />} />
        <Route path="/admin/upload/:examId" element={<ExamUpload />} />
        {/* legacy settings route kept for metadata-only edits if needed */}
        <Route path="/admin/settings/:examId" element={<ExamSettings />} />
        <Route path="/admin/preview/:examId" element={<ExamPreview />} />
        <Route path="/admin/results/:examId" element={<Results />} />
        <Route path="/admin/feedback" element={<AdminFeedback />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

