import React  from "react";
import "./RegisterStyle.css";
import { FaUser, FaLock, FaPhoneAlt   } from "react-icons/fa";
// import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface RegisterProps {
  onRegisterSuccess: () => void;
}
const Register: React.FC <RegisterProps> = ({ onRegisterSuccess }) => {

  const navigate = useNavigate();

  const handleRegister = (event:React.FormEvent ) => {
    event.preventDefault();
    onRegisterSuccess();
    navigate("/dashboard");
    setTimeout(() => {
      navigate("/register_success");
    },500);
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <form onSubmit={handleRegister}>
          <h1>Registration</h1>
          <div className="input-box">

            <div className="input-field">
              <span className="icon">
                <FaUser />
              </span>              
              <input type="text" placeholder="User Name" required />
            </div>

            <div className="input-field">
              <span className="icon">
                <FaLock />
              </span>               
              <input type="password" placeholder="Password" required />
            </div>

          </div>

          <div className="input-box">
            {/* <div className="input-field">
              <span className="icon">
                <MdEmail />
              </span>
              <input type="email" placeholder="Email id" required />
            </div> */}

            <div className="input-field">
              <span className="icon">
                <FaPhoneAlt />
              </span>              
              <input type="text" placeholder="Phone Number"  />
            </div>
          </div>

          <label>
            <input type="checkbox" />
            I hereby declare that the above information provided is true and correct
          </label>
          <button type="submit" className="btn">Register</button>
          <p>
              if you have an account go &  <a href="/login" className="btn">login</a>
            </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
