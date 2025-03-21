import React from "react";
import BackButton from "../elements/BackButtons";
import { backbuttonStyles } from "../styles/backbutton";

const NotFound: React.FC = () => {
  return (
    <div className="text-center text-red-500 font-bold text-xl p-6">
      404 - Page Not Found
      <BackButton 
      route="/"
      style = {backbuttonStyles}
      />
    </div>
  );
};

export default NotFound;