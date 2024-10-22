import React, { useState, useEffect, useRef } from "react";
import "./Events.css";
import Modal from "./Modal/Modal";
import Backdrop from "./Backdrop/Backdrop";
import Spinner from "./Spinner/Spinner";
import EventList from "./EventList/EventList";
import useEvents from "../../controller/eventController/eventController.js";
import { useSelector } from "react-redux";

const EventsPage = () => {
  const [creating, setCreating] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const { events, isLoading, fetchEvents, createEvent, bookEvent } = useEvents();
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);

  const titleElRef = useRef();
  const priceElRef = useRef();
  const dateElRef = useRef();
  const descriptionElRef = useRef();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const startCreateEventHandler = () => {
    setCreating(true);
  };

  const modalConfirmHandler = async () => {
    setErrorMessage(""); 
    const title = titleElRef.current.value;
    const price = +priceElRef.current.value;
    const date = dateElRef.current.value;
    const description = descriptionElRef.current.value;

    if (
      title.trim().length === 0 ||
      price <= 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    ) {
      setErrorMessage("Please fill in all fields correctly.");
      return;
    }

    await createEvent({ title, description, date, price });
    setCreating(false); 
  };

  const modalCancelHandler = () => {
    setCreating(false);
    setSelectedEvent(null);
    setErrorMessage(null);
  };

  const showDetailHandler = (eventId) => {
    const selected = events.find((e) => e._id === eventId);
    setSelectedEvent(selected);
  };

  const bookEventHandler = async () => {
    if (!token) {
      setSelectedEvent(null);
      return;
    }

    await bookEvent(selectedEvent._id);
    setSelectedEvent(null);
  };

  return (
    <>
      {creating && (
        <>
          <Backdrop />
          <Modal
            title="Add Event"
            canCancel
            canConfirm
            onCancel={modalCancelHandler}
            onConfirm={modalConfirmHandler}
            confirmText="Confirm"
          >
            <form>
              <div className="form-control">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" ref={titleElRef} placeholder="Enter event Name here..." required />
              </div>

              <div className="form-control">
                <label htmlFor="price">Price</label>
                <input type="number" id="price" ref={priceElRef} placeholder="Enter event Price here..." required />
              </div>

              <div className="form-control">
                <label htmlFor="date">Date</label>
                <input type="date" id="date" ref={dateElRef} placeholder="Enter event Date here..." required />
              </div>

              <div className="form-control">
                <label htmlFor="description">Description</label>
                <textarea id="description" rows="4 " ref={descriptionElRef}  placeholder="Enter event description here..." 
                 required/>
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
          </Modal>
        </>
      )}
      {selectedEvent && (
        <>
          <Backdrop />
          <Modal
            title={selectedEvent.title}
            canCancel
            canConfirm
            onCancel={modalCancelHandler}
            onConfirm={bookEventHandler}
            confirmText={token ? "Book it!" : "Confirm"}
          >
            <h2 className="event-item-price">Price: ${selectedEvent.price.toFixed(2)}</h2>
            <p className="event-item-date">
              Date: {new Date(selectedEvent.date).toLocaleDateString()}
            </p>
            <p className="event-item-description">Description: {selectedEvent.description}</p>
          </Modal>
        </>
      )}
      {token && (
        <div className="events-control">
          <p>Share your own events!</p>
          <button className="btn" onClick={startCreateEventHandler}>
            Create Event
          </button>
        </div>
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <EventList events={events} authUserId={userId} onViewDetails={showDetailHandler} />
      )}
    </>
  );
};

export default EventsPage;
