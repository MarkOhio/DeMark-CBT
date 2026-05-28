import { Link } from "react-router-dom";
import "./Legal.css";

export default function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <div className="legal-card">
        <div className="legal-header">
          <p className="legal-badge">Last Updated: 26 May 2026</p>
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-subtitle">
            This Privacy Policy describes how CBT.ng collects, stores, and uses data when students, administrators, and staff use the platform.
          </p>
        </div>

        <section className="legal-section">
          <h2>Who We Are</h2>
          <p>
            Sumakohio Ltd ("we", "us", "our") operates CBT.ng, a Computer Based Testing platform deployed for academic institutions in Nigeria. We are registered and operating under the laws of the Federal Republic of Nigeria.
          </p>
          <p>
            Contact: obosohio@gmail.com | +2348148083305 | Kasamine Street, Off Zaria Road, Jos, Plateau State, Nigeria.
          </p>
        </section>

        <section className="legal-section">
          <h2>Scope of This Policy</h2>
          <p>
            This Privacy Policy applies to all data collected when students, administrators, and staff use CBT.ng to administer, take, or review computer-based examinations. It does not apply to third-party services or external websites linked from this platform.
          </p>
        </section>

        <section className="legal-section">
          <h2>Data We Collect and Why</h2>
          <ul>
            <li>
              <strong>Student exam data</strong>: full name, student number, academic level, selected answers, current exam progress, timing information, and tab-switch/focus violation counts.
            </li>
            <li>
              <strong>Exam submission data</strong>: exam ID, title, course code, student identity data, score, total marks, answer record, submission timestamp, auto-submission flags, and integrity flags.
            </li>
            <li>
              <strong>Feedback and complaint data</strong>: name, email address, feedback type, priority, subject, message content, rating, status, and timestamp.
            </li>
            <li>
              <strong>Admin reply data</strong>: reply message text, admin display name, and reply timestamps.
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Device Data Stored Locally</h2>
          <p>
            CBT.ng stores essential data in your browser's localStorage to support exam continuity and offline functionality. Stored data includes: exam session state, student identity details, pending submission payloads, submitted flags, offline feedback, admin session email, and admin display name.
          </p>
          <p>
            Important: this data is stored locally in your browser in plaintext JSON and is accessible to anyone with physical access to your device. Avoid using shared or public computers.
          </p>
        </section>

        <section className="legal-section">
          <h2>Legal Basis for Processing</h2>
          <p>
            We process personal data under the Nigeria Data Protection Act 2023 (NDPA 2023). Legal bases include contractual necessity, legitimate interests, consent for feedback, and legal obligation for academic record retention.
          </p>
        </section>

        <section className="legal-section">
          <h2>Minors</h2>
          <p>
            The platform serves polytechnic students, some of whom may be under 18 years of age. The institution is responsible for authorising student access, and we do not knowingly collect data from minors for any purpose other than the sanctioned academic examination.
          </p>
        </section>

        <section className="legal-section">
          <h2>How We Share Your Data</h2>
          <ul>
            <li>With the educational institution for academic and administrative review.</li>
            <li>With Firebase for admin authentication, governed by Firebase's privacy policy.</li> 
            <li>For legal compliance if required by Nigerian law or regulatory authority.</li>
            <li>In a business transfer, subject to continuity of this privacy policy.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Data Security</h2>
          <p>
            We use Firebase-hosted infrastructure with access controls and Firebase Authentication for admin access. Browser localStorage is unencrypted, so users should use trusted devices and avoid clearing browser data during exams.
          </p>
        </section>

        <section className="legal-section">
          <h2>Data Retention</h2>
          <p>
            Exam submission records are retained according to institutional policy. Feedback entries are retained until closed or deleted. Admin session data remains until expiry or logout. LocalStorage exam data is cleared after successful submission or synchronization.
          </p>
        </section>

        <section className="legal-section">
          <h2>Your Rights</h2>
          <p>
            Under the NDPA 2023, you have rights to access, rectify, erase, object, and port your personal data. Contact obosohio@gmail.com to exercise your rights.
          </p>
        </section>

        <section className="legal-section">
          <h2>Cookies</h2>
          <p>
            CBT.ng does not use advertising cookies, tracking pixels, or third-party analytics scripts. It uses browser localStorage only for functional purposes described in this policy.
          </p>
        </section>

        <section className="legal-section">
          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy to reflect changes in our data practices or applicable law. Continued use after changes constitutes acceptance.
          </p>
        </section>

        <section className="legal-section">
          <h2>Contact</h2>
          <p>
            Sumakohio Ltd, Kasamine Street, Off Zaria Road, Jos, Plateau State, Nigeria. Email: obosohio@gmail.com. Phone: +2348148083305.
          </p>
        </section>

        <div className="legal-footer">
          <Link to="/" className="legal-back">
            ← Back to Home
          </Link>
          <div />
        </div>
      </div>
    </div>
  );
}
