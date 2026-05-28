
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./adminNavbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    return location.pathname === path ? "nav-item active" : "nav-item";
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* MOBILE NAVBAR */}
      <div className="mobile-navbar" ref={menuRef}>
        <div className="nav-logo">CBT.ng</div>

        <div
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {isOpen && (
          <div className="mobile-menu">
               <button
              className={isActive("/admin")}
              onClick={() => handleNavigate("/admin")}
            >
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <rect x={3} y={3} width={7} height={7} rx={1}></rect>
                <rect x={14} y={3} width={7} height={7} rx={1}></rect>
                <rect x={3} y={14} width={7} height={7} rx={1}></rect>
                <rect x={14} y={14} width={7} height={7} rx={1}></rect>
              </svg>
              Dashboard
            </button>

           <button
            className={isActive("/admin/upload")}
            onClick={() => handleNavigate("/admin/upload")}
          >
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path d="M12 3v12" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 7l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
              <rect x={3} y={13} width={18} height={8} rx={2}></rect>
            </svg>
            Upload Exam
          </button>

          <button
            className={isActive("/admin/feedback")}
            onClick={() => handleNavigate("/admin/feedback")}
          >
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h4m-8 4h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            Feedback
          </button>

        <button
            className={isActive("/admin/results/1")}
            onClick={() => handleNavigate("/admin/results/1")}
          >
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18 14v4M13 10v8M8 6v12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Results
          </button>

          <button
            className={isActive("/admin/instruction")}
            onClick={() => handleNavigate("/admin/instruction")}
          >
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path d="M12 2v6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 6l-9 6-9-6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 10v10h18V10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Instructions
          </button>
          <button
            className="nav-item logout"
            onClick={() => handleNavigate("/")}
          >
           <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden><path d="M16 17l5-5-5-5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M21 12H9" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9 5H5a2 2 0 00-2 2v10a2 2 0 002 2h4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            Logout
          </button>
          </div>
        )}
      </div>

      {/* DESKTOP SIDEBAR */}
      <nav className="sidebar">
        <div className="nav-logo">Admin Panel</div>

        <div className="nav-links">
          <button
            className={isActive("/admin")}
            onClick={() => handleNavigate("/admin")}
          >
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              <rect x={3} y={3} width={7} height={7} rx={1}></rect>
              <rect x={14} y={3} width={7} height={7} rx={1}></rect>
              <rect x={3} y={14} width={7} height={7} rx={1}></rect>
              <rect x={14} y={14} width={7} height={7} rx={1}></rect>
            </svg>
            Dashboard
          </button>

            <button
            className={isActive("/admin/upload")}
            onClick={() => handleNavigate("/admin/upload")}
          >
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path d="M12 3v12" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 7l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
              <rect x={3} y={13} width={18} height={8} rx={2}></rect>
            </svg>
            Upload Exam
          </button>

          <button
            className={isActive("/admin/feedback")}
            onClick={() => handleNavigate("/admin/feedback")}
          >
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h4m-8 4h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            Feedback
          </button>

        <button
            className={isActive("/admin/results/1")}
            onClick={() => handleNavigate("/admin/results/1")}
          >
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18 14v4M13 10v8M8 6v12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Results
          </button>

          <button
            className={isActive("/admin/instruction")}
            onClick={() => handleNavigate("/admin/instruction")}
          >
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path d="M12 2v6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 6l-9 6-9-6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 10v10h18V10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Instructions
          </button>
          <button
            className="nav-item logout"
            onClick={() => handleNavigate("/")}
          >
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden><path d="M16 17l5-5-5-5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M21 12H9" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9 5H5a2 2 0 00-2 2v10a2 2 0 002 2h4" strokeLinecap="round" strokeLinejoin="round"></path></svg>

            Logout
          </button>
        </div>
      </nav>
    </>
  );
}

 