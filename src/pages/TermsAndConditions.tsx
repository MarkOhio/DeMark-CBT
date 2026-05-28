import { Link } from "react-router-dom";
import "./Legal.css";

export default function TermsAndConditions() {
  return (
    <div className="legal-page">
      <div className="legal-card">
        <div className="legal-header">
          <p className="legal-badge">Effective Date: 26 May 2026</p>
          <h1 className="legal-title">Terms & Conditions</h1>
          <p className="legal-subtitle">
            These Terms and Conditions govern your use of CBT.ng and explain the obligations of students, administrators, and users of the platform.
          </p>
        </div>

        <section className="legal-section">
          <h2>Acceptance of Terms</h2>
          <p>
            By accessing or using CBT.ng, you agree to be bound by these Terms and Conditions. If you do not agree, you must not use the platform. These Terms apply to all users including students and administrators.
          </p>
        </section>

        <section className="legal-section">
          <h2>The Service</h2>
          <p>
            CBT.ng is a web-based examination platform that enables institutions to administer computer-based tests. The platform may be modified, suspended, or discontinued at any time with or without notice.
          </p>
        </section>

        <section className="legal-section">
          <h2>Student Obligations and Exam Integrity</h2>
          <p>
            By submitting your name, student number, and academic level, you represent that you are authorised to take the examination and that you have not previously submitted the exam unless permitted.
          </p>
          <ul>
            <li>Do not impersonate another student or submit false identity information.</li>
            <li>Do not switch browser tabs or windows to access external resources during a timed exam.</li>
            <li>Do not use developer tools, extensions, or external software to manipulate exam content or timing.</li>
            <li>Do not collude with others or attempt to copy exam questions.</li>
            <li>Do not circumvent tab-switch detection or session recovery mechanisms.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Monitoring and Integrity Flags</h2>
          <p>
            The platform records tab switches during active examinations. This data is attached to your submission and made available to authorised institution administrators.
          </p>
        </section>

        <section className="legal-section">
          <h2>Consequences</h2>
          <p>
            Violations of exam integrity rules are subject to your institution's disciplinary processes. Sumakohio Ltd may provide technical records to administrators upon request.
          </p>
        </section>

        <section className="legal-section">
          <h2>Exam Results and Finality</h2>
          <p>
            Exam scores shown on the platform are computed automatically. Results are subject to institutional review and are not official until ratified by the institution.
          </p>
        </section>

        <section className="legal-section">
          <h2>Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by Nigerian law, Sumakohio Ltd is not liable for loss of exam data or progress due to connectivity failure, power outage, device issues, or local browser storage loss.
          </p>
        </section>

        <section className="legal-section">
          <h2>Offline Functionality and Pending Submissions</h2>
          <p>
            The platform supports offline exam resumption and feedback submission. Pending submission data is stored locally and may be lost if browser data is cleared or a different device is used.
          </p>
        </section>

        <section className="legal-section">
          <h2>Device and Browser Responsibility</h2>
          <p>
            You are responsible for using a trusted device and browser with working localStorage. The platform is not optimised for Internet Explorer.
          </p>
        </section>

        <section className="legal-section">
          <h2>Administrator Responsibilities</h2>
          <p>
            Administrators agree to use admin access only for legitimate institutional purposes, safeguard credentials, and treat student data confidentially.
          </p>
        </section>

        <section className="legal-section">
          <h2>Intellectual Property</h2>
          <p>
            The software, interface, and branding of CBT.ng are owned by Sumakohio Ltd. Examination content uploaded by institutions remains the property of the institution.
          </p>
        </section>

        <section className="legal-section">
          <h2>Privacy</h2>
          <p>
            Our Privacy Policy is incorporated into these Terms by reference. By using CBT.ng, you agree to the terms of that policy.
          </p>
        </section>

        <section className="legal-section">
          <h2>Third-Party Services</h2>
          <p>
            The platform uses Firebase Authentication and Supabase hosting. Their policies govern data they process. We are not responsible for third-party practices.
          </p>
        </section>

        <section className="legal-section">
          <h2>Governing Law and Dispute Resolution</h2>
          <p>
            These Terms are governed by Nigerian law. Disputes are first referred to negotiation, then mediation, and finally to the courts of Plateau State if unresolved.
          </p>
        </section>

        <section className="legal-section">
          <h2>Modifications</h2>
          <p>
            We may update these Terms at any time. Continued use after an update constitutes acceptance of the revised Terms.
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
