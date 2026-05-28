
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import LoadingButton from "../components/LoadingButton";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"select" | "admin">("select");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStudent = () => {
    navigate("/student");
  };

  const handleAdminLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {mode === "select" && (
        <div className="login-choice">
          <div className="role-brand">
            <h1>CBT<em>.</em>ng</h1>
            <p>Computer Based Testing Platform</p>
          </div>
         <div id="login-btns" >
             <button id="login-btn" onClick={handleStudent}>
                <div className="role-card-icon" id="stud-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 14c-4 0-6 2-6 3v1h12v-1c0-1-2-3-6-3zm0-2a4 4 0 100-8 4 4 0 000 8z"/>
              </svg>
            </div>
            <span>Student</span>  
          </button>
          <button id="login-btn" onClick={() => setMode("admin")}>
            
                  <div className="role-card-icon" id="admin-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span>Admin</span>
          

          </button>
         </div>
          <p className="role-footer">Select your role to continue</p>
          <div className="legal-links">
       <div className="under-links">
           <Link to="/privacy">Privacy Policy</Link>
        <span >•</span>
        <Link to="/terms">Terms & Conditions</Link>
       </div> 
        <p>Designed by <a href="https://markohio.github.io/react-portfoilo/">Mark Ohio</a></p>
      </div>
        </div>
      )}

      {mode === "admin" && (
        <div className="admin-login">
          <div className="admin-login-title">
            <div className="role-card-icon2" id="admin-icon">
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                          </div>
                      <h2>Admin Login</h2>
          </div>
           

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="admin-login-btn">

            <LoadingButton id="login-btn2" loading={loading} onClick={handleAdminLogin}>Login</LoadingButton>
          <button id="login-btn2" className="back" onClick={() => setMode("select")}>Back</button>

          </div>
        </div>
      )}

      
    </div>
  );
}

