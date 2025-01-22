import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import LoginSuccess from "./components/login_successfull/loginSuccess";
import RegisterSuccess from "./components/register_success/RegisterSuccess";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        <Route path="login_success" element={<LoginSuccess />} />
        
        <Route path="/register" element={<Register />} />

        <Route path = "/register_success" element={<RegisterSuccess />} />
        
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
