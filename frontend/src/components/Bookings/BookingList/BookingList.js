import React from "react";
import "./BookingList.css";

const BookingList = ({ bookings, onDelete }) => {
  const handleDelete = (id) => {
    onDelete(id);
  };

  if (bookings.length === 0) {
    return <p className="no-bookings-message">No bookings available.</p>;
  }

  return (
    <ul className="bookings-list-wrapper">
      {bookings.map(({ _id, event, createdAt }) => (
        <li key={_id} className="bookings-list-item">
          <div className="bookings-item-content">
            <p>Title: {event.title}</p>
            <p>Date: {new Date(createdAt).toLocaleDateString('en-US')}
              </p>
          </div>
          <div className="bookings-item-button">
            <button className="btn" onClick={() => handleDelete(_id)}>
              Cancel Booking
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BookingList;
