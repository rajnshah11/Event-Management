import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { graphqlRequest } from "../graphqlClient";

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    const requestBody = {
      query: `
        query {
          events {
            _id
            title
            description
            date
            price
            creator { _id }
          }
        }
      `
    };

    try {
      const resData = await graphqlRequest(requestBody.query);
      setEvents(resData.data.events);
    } catch (error) {
      console.error(error); 
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createEvent = async (eventData) => {
    const requestBody = {
      query: `
        mutation CreateEvent($title: String!, $description: String!, $date: String!, $price: Float!) {
          createEvent(eventInput: { title: $title, description: $description, date: $date, price: $price }) {
            _id
            title
            description
            date
            price
            creator {
            _id}
          }
        }
      `,
      variables: {
        title: eventData.title,
        description: eventData.description,
        date: eventData.date,
        price: eventData.price
      }
    };

    try {
      const resData = await graphqlRequest(requestBody.query, requestBody.variables, token);
      setEvents((prevEvents) => [
        ...prevEvents,
        {
          _id: resData.data.createEvent._id,
          title: resData.data.createEvent.title,
          description: resData.data.createEvent.description,
          date: resData.data.createEvent.date,
          price: resData.data.createEvent.price,
          creator: {
            _id: userId, 
          },
        },
      ]);

    } catch (error) {
      console.error(error);
    }
  };

  const bookEvent = async (eventId) => {
    const requestBody = {
      query: `
        mutation BookEvent($eventId: ID!) {
          bookEvent(eventId: $eventId) {
            _id
          }
        }
      `,
      variables: {
        eventId: eventId
      }
    };

    try {
      await graphqlRequest(requestBody.query, requestBody.variables, token);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    events,
    isLoading,
    fetchEvents,
    createEvent,
    bookEvent,
  };
};

export default useEvents;
