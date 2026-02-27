
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./Navbar.css";

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
        <div className="nav-logo">Student Panel</div>

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
              className={isActive("/student")}
              onClick={() => handleNavigate("/student")}
            >
              Dashboard
            </button>

            <button
              className={isActive("/student/feedback")}
              onClick={() => handleNavigate("/student/feedback")}
            >
              Feedback
            </button>

            <button
              className="nav-item logout"
              onClick={() => handleNavigate("/")}
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* DESKTOP SIDEBAR */}
      <nav className="sidebar">
        <div className="nav-logo">Student Panel</div>

        <div className="nav-links">
          <button
            className={isActive("/student")}
            onClick={() => handleNavigate("/student")}
          >
            Dashboard
          </button>

          <button
            className={isActive("/student/feedback")}
            onClick={() => handleNavigate("/student/feedback")}
          >
            Feedback
          </button>

          <button
            className="nav-item logout"
            onClick={() => handleNavigate("/")}
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}
