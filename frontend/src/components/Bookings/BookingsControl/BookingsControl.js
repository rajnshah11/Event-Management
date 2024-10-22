import React from "react";
import "./BookingsControl.css";

const BookingsControl = ({ activeOutputType, onChange, outputTypes = ["list", "chart"] }) => {
  return (
    <div className="bookings-control">
      {outputTypes.map((type) => (
        <button
          key={type}
          className={`control-button ${activeOutputType === type ? "active" : ""}`}
          onClick={() => onChange(type)}
          aria-pressed={activeOutputType === type}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default BookingsControl;
