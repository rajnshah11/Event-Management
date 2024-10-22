import React from "react";
import "./EventItem.css";

const EventItem = ({ event, authUserId, onDetail }) => { 

  const { _id, title, price, date, creator } = event;

  const formattedDate = new Date(date).toLocaleDateString();

  const isEven = authUserId === creator?._id ;
  return (
    <li key={_id} className="events-list-item">
      <div className="event-item-content">
        <h1 className="event-item-title">{title}</h1>
        <h2 className="event-item-price">${price.toFixed(2)}</h2>
        <p className="event-item-date">Date: {formattedDate}</p>
      </div>
      <div className="event-item-action">
        {isEven ? (
          <p className="event-owner">You are the owner of this event</p>
        ) : (
          <button
          className="btn btn-view-details"
          onClick={() => onDetail(_id)}
        >
          View Details
        </button>
        )}
      </div>
    </li>
  );
};

export default EventItem;
