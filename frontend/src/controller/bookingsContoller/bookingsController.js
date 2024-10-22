import { graphqlRequest } from "../graphqlClient.js";

export const fetchBookings = async (token) => {
  const query = `
    query {
      bookings {
        _id
        createdAt
        event {
          _id
          title
          date
          price
        }
      }
    }
  `;

  const resData = await graphqlRequest(query, {}, token);
  return resData.data.bookings;
};

export const deleteBooking = async (token, bookingId) => {
  const mutation = `
    mutation CancelBooking($id: ID!) {
      cancelBooking(bookingId: $id) {
        _id
        title
      }
    }
  `;

  const variables = {
    id: bookingId
  };

  const resData = await graphqlRequest(mutation, variables, token);
  return resData.data.cancelBooking;
};
