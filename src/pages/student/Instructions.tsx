import "./Instructions.css";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Instructions() {
  const navigate = useNavigate();

  return (
    <div className='instruction-page'>
      <div>
        <Navbar />
      </div>
      <div className='instruction-container'>
        <div className='instruction-header'>
          <h1>Student Examination Guidelines</h1>
          <p className='subtitle'>Please read these instructions carefully before starting your exam</p>
        </div>

        <div className='instruction-sections'>
          <section className='instruction-section'>
            <h2>
              <svg className="section-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <rect x={7} y={3} width={10} height={4} rx={1}></rect>
                <rect x={5} y={7} width={14} height={14} rx={2}></rect>
              </svg>
              Before You Begin
            </h2>
            <ul>
              <li>Ensure you have a stable internet connection throughout the exam</li>
              <li>Close all unnecessary applications and browser tabs</li>
              <li>Clear your desk of any unauthorized materials</li>
              <li>Ensure adequate lighting in your exam environment</li>
              <li>Have a pen and paper ready for calculations if needed</li>
              <li>Keep your student ID or matric number nearby for verification</li>
            </ul>
          </section>

          <section className='instruction-section'>
            <h2>
              <svg className="section-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <circle cx={12} cy={12} r={9} />
                <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Exam Duration & Navigation
            </h2>
            <ul>
              <li>Your exam has a fixed time limit - monitor the timer at the top of the screen</li>
              <li>Use the question navigator on the right (desktop) or bottom (mobile) to jump between questions</li>
              <li>Green numbers = answered questions</li>
              <li>Gray numbers = unanswered questions</li>
              <li>Blue highlight = currently viewing question</li>
              <li>You can review and change your answers anytime before submitting</li>
            </ul>
          </section>

          <section className='instruction-section'>
            <h2>
              <svg className="section-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              How to Answer Questions
            </h2>
            <ul>
              <li>Each question will display multiple choice options</li>
              <li>Click on your selected answer to mark it</li>
              <li>Your selection is automatically saved</li>
              <li>You can change your answer at any time during the exam</li>
              <li>Answer all questions for the best score</li>
              <li>Unanswered questions will count as incorrect</li>
            </ul>
          </section>

          <section className='instruction-section'>
            <h2>
              <svg className="section-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 9v4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 17h.01" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Important Rules & Conduct
            </h2>
            <ul>
              <li>Do not close or refresh your browser during the exam</li>
              <li>Do not switch to other windows or tabs - this may be detected</li>
              <li>Do not attempt to use external resources or seek help</li>
              <li>Maintain academic integrity at all times</li>
              <li>Any suspicious activity may result in exam disqualification</li>
              <li>The exam will auto-submit when the time runs out</li>
            </ul>
          </section>

          <section className='instruction-section'>
            <h2>
              <svg className="section-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path d="M3 8l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
                <rect x={3} y={6} width={18} height={12} rx={2}></rect>
              </svg>
              Submitting Your Exam
            </h2>
            <ul>
              <li>Review your answers before submitting</li>
              <li>Click the 'Submit Exam' button when you are ready</li>
              <li>A confirmation dialog will appear - confirm to submit</li>
              <li>Once submitted, you cannot make changes</li>
              <li>You will receive confirmation of successful submission</li>
              <li>Results will be available shortly after submission</li>
            </ul>
          </section>

          <section className='instruction-section'>
            <h2>
              <svg className="section-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <circle cx={12} cy={12} r={9} />
                <path d="M12 17h.01" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 13a2 2 0 10-2-2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Technical Support
            </h2>
            <ul>
              <li>If your connection drops, log back in immediately</li>
              <li>Your progress is automatically saved to the server</li>
              <li>Contact your instructor if you experience technical issues</li>
              <li>Do not restart your browser unless absolutely necessary</li>
              <li>In case of emergency, inform your instructor immediately</li>
            </ul>
          </section>
        </div>

        <div className='instruction-footer'>
          <p className='acknowledgment'>I acknowledge that I have read and understand the examination guidelines</p>
          <button className='btn-back' onClick={() => navigate('/student')}>← Back to Dashboard</button>
        </div>
      </div>
    </div>
  );
}