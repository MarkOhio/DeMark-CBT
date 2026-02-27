
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
          <h2>Select Role</h2>
          <button id="login-btn" onClick={handleStudent}>Student</button>
          <button id="login-btn" onClick={() => setMode("admin")}>Admin</button>
        </div>
      )}

      {mode === "admin" && (
        <div className="admin-login">
          <h2>Admin Login</h2>

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

          <LoadingButton id="login-btn" loading={loading} onClick={handleAdminLogin}>Login</LoadingButton>
          <button id="login-btn" onClick={() => setMode("select")}>Back</button>
        </div>
      )}
    </div>
  );
}

