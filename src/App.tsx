import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import LoginSuccess from "./components/login_successfull/loginSuccess";
import RegisterSuccess from "./components/register_success/RegisterSuccess";

const AppRoutes = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unlisten = () => {
      // Show loading indicator when route changes
      setLoading(true);

      // Simulate data fetching or processing
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    unlisten();
  }, [location, navigate]);

  return (
    <div style={{ position: 'relative' }}>
      {loading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          zIndex: 1000, // Ensure the loading indicator is on top
        }}>
          <CircularProgress />
        </div>
      )}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login_success" element={<LoginSuccess />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register_success" element={<RegisterSuccess />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;
