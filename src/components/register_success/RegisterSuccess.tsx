import React from "react";
import "./RegisterSuccess.css"; 

const RegisterSuccess: React.FC = () => {
  return (
    <div className="register-success-wrapper">
      <div className="register-success-wrapper-container">
        <h1>Registration Successful!</h1>
        <p>Thank you for registering. You can now log in to your account.</p>
        <a href="/login" className="btn">
          Go to Login
        </a>
      </div>
    </div>
  );
};

export default RegisterSuccess;
