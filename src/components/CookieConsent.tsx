import { Link } from "react-router-dom";
import "./CookieConsent.css";

type CookieConsentStatus = "unknown" | "accepted" | "declined";

type CookieConsentProps = {
  status: CookieConsentStatus;
  onAccept: () => void;
  onDecline: () => void;
};

export default function CookieConsent({ status, onAccept, onDecline }: CookieConsentProps) {
  if (status === "accepted") return null;

  const declined = status === "declined";

  return (
    <div className="cookie-consent-backdrop" role="dialog" aria-modal="true">
      <div className="cookie-consent-card">
        <h2>Cookie & Local Storage Consent</h2>
        <p>
          CBT.ng uses browser storage to keep exam progress, pending submissions, and feedback working correctly. Accepting enables essential functionality such as exam recovery, offline sync, and session handling.
        </p>
        <p className="cookie-consent-note">
          Read our <Link to="/privacy">Privacy Policy</Link> and <Link to="/terms">Terms & Conditions</Link> before continuing.
        </p>

        {declined ? (
          <>
            <div className="cookie-consent-warning">
              You declined consent. This platform requires essential browser storage to operate properly.
            </div>
            <div className="cookie-consent-actions">
              <button className="cookie-accept" onClick={onAccept}>
                Accept and Continue
              </button>
              <a className="cookie-decline" href="https://www.google.com" rel="noreferrer">
                Leave Site
              </a>
            </div>
          </>
        ) : (
          <div className="cookie-consent-actions">
            <button className="cookie-accept" onClick={onAccept}>
              Accept
            </button>
            <button className="cookie-decline" onClick={onDecline}>
              Decline
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
