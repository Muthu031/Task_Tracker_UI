import React, { useState } from "react";
import { Mail, Star, Clock, Send, File, Menu } from "lucide-react";

const menuItems = [
  { name: "Inbox", icon: <Mail />, count: 1 },
  { name: "Starred", icon: <Star /> },
  { name: "Snoozed", icon: <Clock /> },
  { name: "Sent", icon: <Send /> },
  { name: "Drafts", icon: <File />, count: 1 },
];

const Sidebar: React.FC = () => {
  const [active, setActive] = useState("Inbox");

  return (
    <div className="w-64 bg-gray-100 h-screen p-4">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-6">
        <Menu className="w-6 h-6" />
        <h1 className="text-xl font-bold">Gmail</h1>
      </div>

      {/* Compose Button */}
      <button className="bg-blue-500 text-white w-full py-2 rounded-lg flex items-center justify-center space-x-2 mb-4">
        ✍️ <span>Compose</span>
      </button>

      {/* Menu Items */}
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer 
              ${
                active === item.name ? "bg-blue-200" : "hover:bg-gray-200"
              }`}
            onClick={() => setActive(item.name)}
          >
            <div className="flex items-center space-x-2">
              {item.icon}
              <span>{item.name}</span>
            </div>
            {item.count && (
              <span className="text-sm bg-gray-300 px-2 rounded-full">
                {item.count}
              </span>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
