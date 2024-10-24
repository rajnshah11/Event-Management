const Booking = require("../../models/booking.js");
const { transformBooking, transformEvent } = require("./merge");
const Event = require("../../models/event");

module.exports = {
  bookings: async (_, req) => {
    if (!req.isAuth) {
      throw new Error("User is not authorized to create event");
    }
    try {
      const bookings = await Booking.find({ user: req.userId });
      return bookings.map(booking => transformBooking(booking));
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("User is not authorized to create event");
    }

    const fetchedEvent = await Event.findOne({ _id: args.eventId });
    if (!fetchedEvent) {
      throw new Error("Event not found");
    }

    const booking = new Booking({
      user: req.userId,
      event: fetchedEvent
    });
    const result = await booking.save();
    return transformBooking(result);
  },

  cancelBooking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("User is not authorized to create event");
    }
    try {
      const booking = await Booking.findById(args.bookingId).populate("event");
      const event = transformEvent(booking.event);
      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
};