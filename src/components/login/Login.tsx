import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  
import "./LoginStyle.css";
import { FaUser, FaLock } from "react-icons/fa";


interface LoginProps {
  onLoginSuccess: () => void;
}
const Login: React.FC <LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    onLoginSuccess();
    navigate("/dashboard");

    if (username === "Muthukumaran" && password === "muthu@123") {
      navigate("/login_success");
    } else {
      alert("Invalid Username or Password");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="wrapper">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="input-box">
            <span className="icon">
              <FaUser />
            </span>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <span className="icon">
              <FaLock />
            </span>            
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn">
            Login
          </button>

          <div className="register-link">
            <p>
              Don't have an account? <a href="/register">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
