
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";

/* Pages */
import Login from "./pages/Login";

/* Student Pages */
import StudentDashboard from "./pages/student/StudentDashboard";
import ExamInstructions from "./pages/student/ExamInstructions";
import Exam from "./pages/student/Exam";
import ExamComplete from "./pages/student/ExamComplete";
import StudentFeedback from "./pages/student/StudentFeedback";
import StudentInstructions from "./pages/student/Instructions"

/* Admin Pages */
import AdminDashboard from "./pages/admin/AdminDashboard";
import ExamUpload from "./pages/admin/ExamUpload";
import ExamSettings from "./pages/admin/ExamSettings";
import ExamPreview from "./pages/admin/ExamPreview";
import Results from "./pages/admin/Results";
import AdminFeedback from "./pages/admin/AdminFeedback";
import AdminInstructions from "./pages/admin/AdminInstructions"
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import CookieConsent from "./components/CookieConsent";

function App() {
  const [consentStatus, setConsentStatus] = useState<"unknown" | "accepted" | "declined">(() => {
      const stored = localStorage.getItem("cbt_cookie_consent");
      if (stored === "accepted") return "accepted";
      if (stored === "declined") return "declined";
      return "unknown";
    });

  const handleAccept = () => {
    localStorage.setItem("cbt_cookie_consent", "accepted");
    setConsentStatus("accepted");
  };

  const handleDecline = () => {
    localStorage.setItem("cbt_cookie_consent", "declined");
    setConsentStatus("declined");
  };
  return (
    <HashRouter>
      <CookieConsent status={consentStatus} onAccept={handleAccept} onDecline={handleDecline} />
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Student */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/feedback" element={<StudentFeedback />} />
        <Route path="/student/instructions/:examId" element={<ExamInstructions />} />
        <Route path="/student/exam/:examId" element={<Exam />} />
        <Route path="/student/complete/:examId" element={<ExamComplete />} />
         <Route path="/student/Instruction" element={<StudentInstructions />} />


        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/upload" element={<ExamUpload />} />
        <Route path="/admin/upload/:examId" element={<ExamUpload />} />
        {/* legacy settings route kept for metadata-only edits if needed */}
        <Route path="/admin/settings/:examId" element={<ExamSettings />} />
        <Route path="/admin/preview/:examId" element={<ExamPreview />} />
        <Route path="/admin/results/:examId" element={<Results />} />
        <Route path="/admin/feedback" element={<AdminFeedback />} />
        <Route path="/admin/instruction" element={<AdminInstructions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;

