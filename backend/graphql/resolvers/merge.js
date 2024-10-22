const Event = require("../../models/event");
const User = require("../../models/user");
const { dateToString } = require("../../helpers/date");
const DataLoader = require("dataloader");

// Create DataLoader instances for batch loading events and users
const eventLoader = new DataLoader(loadEventIds);
const userLoader = new DataLoader(loadUserIds);

// Batch load events by their IDs
async function loadEventIds(eventIds) {
  const events = await Event.find({ _id: { $in: eventIds } });
  events.sort((a, b) => eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString()));
  return events.map(transformEvent);
}

// Batch load users by their IDs
async function loadUserIds(userIds) {
  return User.find({ _id: { $in: userIds } });
}

// Retrieve a single event using DataLoader
async function singleEvent(eventId) {
  try {
    return await eventLoader.load(eventId.toString());
  } catch (err) {
    throw err;
  }
}

// Retrieve a single user using DataLoader and attach created events
async function getUser(userId) {
  try {
    const user = await userLoader.load(userId.toString());
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: eventLoader.load.bind(null, user._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
}

// Transform an event object for client consumption
function transformEvent(event) {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
    creator: getUser.bind(null, event.creator),
  };
}

// Transform a booking object for client consumption
function transformBooking(booking) {
  return {
    ...booking._doc,
    _id: booking.id,
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
    user: getUser.bind(null, booking._doc.user),
    event: singleEvent.bind(null, booking._doc.event),
  };
}

module.exports = {
  transformEvent,
  transformBooking,
};
