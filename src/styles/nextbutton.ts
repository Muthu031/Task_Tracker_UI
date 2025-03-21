export const buttonStyles: React.CSSProperties = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background 0.3s ease-in-out",
};


import React from "react";

export const nextButtonStyles: Record<
  string,
  React.CSSProperties
> = {
  primary: {
    backgroundColor: "#3b82f6", // Equivalent to Tailwind's bg-blue-500
    color: "white",
    padding: "8px 16px",
    borderRadius: "4px",
    transition: "background 0.3s ease-in-out",
  },
  secondary: {
    backgroundColor: "#6b7280", // Equivalent to Tailwind's bg-gray-500
    color: "white",
    padding: "8px 16px",
    borderRadius: "4px",
    transition: "background 0.3s ease-in-out",
  },
  success: {
    backgroundColor: "#10b981", // Equivalent to Tailwind's bg-green-500
    color: "white",
    padding: "8px 16px",
    borderRadius: "4px",
    transition: "background 0.3s ease-in-out",
  },
  danger: {
    backgroundColor: "#ef4444", // Equivalent to Tailwind's bg-red-500
    color: "white",
    padding: "8px 16px",
    borderRadius: "4px",
    transition: "background 0.3s ease-in-out",
  },
  outline: {
    backgroundColor: "transparent",
    border: "2px solid #3b82f6", // Equivalent to Tailwind's border-blue-500
    color: "#3b82f6",
    padding: "8px 16px",
    borderRadius: "4px",
    transition: "background 0.3s ease-in-out",
  },
  disabled: {
    backgroundColor: "#d1d5db", // Equivalent to Tailwind's bg-gray-300
    color: "#6b7280",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "not-allowed",
  },
};
