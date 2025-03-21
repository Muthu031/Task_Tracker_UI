import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

 const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

// Example components
const Home: React.FC = () => <h1>Home Page</h1>;
const About: React.FC = () => <h1>About Page</h1>;
export default AppRouter;