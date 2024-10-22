

import React from "react";
import EventItem from "../EventItem/EventItem";
import "./EventList.css";

const EventList = ({ events, authUserId, onViewDetails }) => {
  const renderEvents = () => {
    if (!events || events.length === 0) {
      return <p className="no-events">No events available.</p>;
    }  

    return events.map((event) => (
      <EventItem
        key={event._id}
        event={event}
        authUserId={authUserId}
        onDetail={onViewDetails}
      />
    ));
  };

  return (
    <div className="event-list-container">
      <h1 className="event-list-title">Upcoming Events</h1>
      <ul className="events-list">
        {renderEvents()}
      </ul>
    </div>
  );
};

export default EventList;
