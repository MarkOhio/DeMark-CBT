
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
        <div className="nav-logo">Admin Panel</div>

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
            Dashboard
          </button>

           <button
            className={isActive("/admin/upload")}
            onClick={() => handleNavigate("/admin/upload")}
          >
            Upload Exam
          </button>

          <button
            className={isActive("/admin/feedback")}
            onClick={() => handleNavigate("/admin/feedback")}
          >
            Feedback
          </button>

        <button
            className={isActive("/admin/results/1")}
            onClick={() => handleNavigate("/admin/results/1")}
          >
            Results
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
        <div className="nav-logo">Admin Panel</div>

        <div className="nav-links">
          <button
            className={isActive("/admin")}
            onClick={() => handleNavigate("/admin")}
          >
            Dashboard
          </button>

            <button
            className={isActive("/admin/upload")}
            onClick={() => handleNavigate("/admin/upload")}
          >
            Upload Exam
          </button>

          <button
            className={isActive("/admin/feedback")}
            onClick={() => handleNavigate("/admin/feedback")}
          >
            Feedback
          </button>

        <button
            className={isActive("/admin/results/1")}
            onClick={() => handleNavigate("/admin/results/1")}
          >
            Results
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

 