import "./AdminInstructions.css";
import Navbar from "../../components/adminNavbar";
import { useNavigate } from "react-router-dom";

export default function AdminInstructions() {
  const navigate = useNavigate();

  return (
    <div className='admin-instruction-page'>
      <div><Navbar /></div>
      <div className='admin-instruction-container'>
        <div className='admin-instruction-header'>
          <h1>Admin Examination Management Guide</h1>
          <p className='subtitle'>Complete guidelines for creating, managing, and administering exams</p>
        </div>

        <div className='admin-instruction-sections'>
          <section className='admin-instruction-section'>
            <h2>
              <svg className="section-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Creating an Exam
            </h2>
            <ul>
              <li>Navigate to the 'Upload Exam' section from the admin dashboard</li>
              <li>Enter the exam title, course code, and course name</li>
              <li>Set the exam start date and time</li>
              <li>Set the exam end date and time (defines duration)</li>
              <li>Upload exam questions in the required format (plain text)</li>
              <li>Specify the number of questions per student (if randomized)</li>
              <li>Review all details before saving</li>
            </ul>
          </section>

          <section className='admin-instruction-section'>
            <h2>
              <svg className="section-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <circle cx={12} cy={12} r={9} />
                <path d="M12 16h.01M12 10a2 2 0 10-2-2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Question Format & Requirements
            </h2>
            <ul>
              <li>Each question must have clear text and 4 multiple choice options</li>
              <li>Clearly mark the correct answer</li>
              <li>Avoid overly long questions or answers</li>
              <li>Ensure options are distinct and not overlapping</li>
              <li>Use consistent formatting across all questions</li>
              <li>Questions can be reused across different exams</li>
              
            </ul>
          </section>

          <section className='admin-instruction-section'>
            <h2>
              <svg className="section-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path d="M12 8v8M8 12h8" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx={12} cy={12} r={9} />
              </svg>
              Exam Settings & Configuration
            </h2>
            <ul>
              <li>Enable/disable visibility to control when students can see exams</li>
              <li>Randomization is set to shuffle questions or answers</li>
              <li>Configure question distribution per student (e.g., 30 out of 50)</li>
              <li>Set duration to control exam time limits</li>
              <li>Review mode is enabled for post-exam feedback</li>
              <li>Save exam before exiting upload</li>
               
            </ul>
          </section>

          <section className='admin-instruction-section'>
            <h2>
              <svg className="section-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12z" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx={12} cy={12} r={3} />
              </svg>
              Previewing & Testing
            </h2>
            <ul>
              <li>Always preview your exam before making it visible to students</li>
              <li>Test the full exam flow including navigation and submission</li>
              <li>Verify all questions display correctly and timing works</li>
              <li>Check question randomization and distribution</li>
              <li>Test from different devices (desktop, tablet, mobile)</li>
              <li>Ensure all content load properly</li>
              <li>Preview as a student to understand the experience</li>
            </ul>
          </section>

          <section className='admin-instruction-section'>
            <h2>
              <svg className="section-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 14v4M12 10v8M17 6v12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Viewing Results & Analytics
            </h2>
            <ul>
              <li>Access results page to view all student submissions</li>
              <li>View individual scores and answer details</li>
              <li>Export results in PDF format for further analysis</li>
              <li>Identify commonly missed questions for curriculum improvement</li>
              <li>Filter results by date, student level, or course</li> 
              <li>Generate detailed reports for institutional records</li>
            </ul>
          </section>

          <section className='admin-instruction-section'>
            <h2>
              <svg className="section-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path d="M3 21v-3l11-11 3 3L6 21H3z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 7l3 3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Editing Exams
            </h2>
            <ul>
              <li>Edit exam metadata (title, dates, duration) anytime</li>
              <li>Modify questions and answers before exam starts</li>
              <li>Do not edit active exams (those currently in progress)</li>
              <li>Make copy of exam before major edits if you need backup</li>
              <li>Document changes in exam notes for audit trail</li>
              <li>Test edits thoroughly before re-enabling visibility</li>
            </ul>
          </section>

          <section className='admin-instruction-section'>
            <h2>
              <svg className="section-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path d="M3 8l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
                <rect x={3} y={6} width={18} height={12} rx={2}></rect>
              </svg>
              Managing Feedback & Communication
            </h2>
            <ul>
              <li>Monitor student feedback submissions regularly</li>
              <li>Respond to pending feedback promptly</li>
              <li>Mark feedback as 'Closed' once resolved</li>
              <li>Keep feedback topics organized (bugs, questions, suggestions)</li>
              <li>Use feedback to improve exam quality and user experience</li>
              <li>Archive closed feedback for record-keeping</li>
              <li>Review feedback trends to identify systemic issues</li>
            </ul>
          </section>

          <section className='admin-instruction-section'>
            <h2>
              <svg className="section-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <rect x={3} y={11} width={18} height={10} rx={2}></rect>
                <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Security & Best Practices
            </h2>
            <ul>
              <li>Never share exam content before the exam date</li>
              <li>Verify student identity before revealing scores</li>
              <li>Monitor for suspicious activity or anomalies</li>
              <li>Maintain backup copies of all exams</li>
              <li>Limit access to exam materials to authorized personnel</li>
              <li>Document all administrative changes for compliance</li>
              <li>Review system logs for security audits regularly</li>
            </ul>
          </section>

          <section className='admin-instruction-section'>
            <h2>
              <svg className="section-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path d="M3 6h18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 6v14a2 2 0 002 2h4a2 2 0 002-2V6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 11v6M14 11v6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Deleting & Archiving Exams
            </h2>
            <ul>
              <li>Archive completed exams instead of deleting immediately</li>
              <li>Only delete exams after all results are recorded and backed up</li>
              <li>Confirm deletion - deleted exams cannot be recovered</li>
              <li>Maintain historical data for academic records</li>
              <li>Follow institutional data retention policies</li>
              <li>Document all deletions for audit purposes</li>
            </ul>
          </section>
        </div>

        <div className='admin-instruction-footer'>
          <p className='acknowledgment'>These guidelines ensure exam integrity and optimal system performance</p>
          <button className='btn-back' onClick={() => navigate('/admin')}>← Back to Dashboard</button>
        </div>
      </div>
    </div>
  );
}
