// src/components/Card.jsx
import React from "react";

export default function Card({ title, children }) {
  return (
    <div className="p-4 bg-white shadow rounded hover:shadow-lg transition">
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      {children}
    </div>
  );
}
