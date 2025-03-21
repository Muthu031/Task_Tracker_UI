import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MarketDashboard from "../components/MarketDashboard";
import NotFound from "../components/NotFound";
import Sidebar from "../components/MenuBar";


export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Sidebar/>
            <div className="container mx-auto p-4">
              <MarketDashboard />
            </div>
          </>
        } />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;