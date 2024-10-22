import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux"; // Use Redux hook
import Spinner from "../Event/Spinner/Spinner";
import BookingList from "./BookingList/BookingList";
import BookingsChart from "./BookingsChart/BookingsChart";
import BookingsControl from "./BookingsControl/BookingsControl";
import { fetchBookings, deleteBooking } from "../../controller/bookingsContoller/bookingsController.js";

const BookingsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [outputType, setOutputType] = useState("list");
  const [error, setError] = useState(null);

  const token = useSelector((state) => state.auth.token);

  const handleFetchBookings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const bookingsData = await fetchBookings(token);
      setBookings(bookingsData);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch bookings. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    handleFetchBookings();
  }, [handleFetchBookings]);

  const handleDeleteBooking = async (bookingId) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteBooking(token, bookingId);
      setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== bookingId));
    } catch (err) {
      console.error(err);
      setError("Failed to cancel booking. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const changeOutputTypeHandler = (type) => {
    setOutputType(type);
  };

  let content = <Spinner />;
  if (!isLoading) {
    content = (
      <>
        <BookingsControl activeOutputType={outputType} onChange={changeOutputTypeHandler} />
        {error && <p className="error-message">{error}</p>}
        <div>
          {outputType === "list" ? (
            <BookingList bookings={bookings} onDelete={handleDeleteBooking} />
          ) : (
            <BookingsChart bookings={bookings} />
          )}
        </div>
      </>
    );
  }

  return <>{content}</>;
};

export default BookingsPage;