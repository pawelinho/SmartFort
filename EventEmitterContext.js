import React, { createContext, useCallback, useState } from 'react';

const EventEmitterContext = createContext();

const EventEmitterProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState({});

  const subscribe = useCallback((eventName, callback) => {
    setSubscriptions((subs) => ({
      ...subs,
      [eventName]: [...(subs[eventName] || []), callback],
    }));

    // Returning an unsubscribe function
    return () => {
      setSubscriptions((subs) => {
        const { [eventName]: removed, ...rest } = subs;
        return { ...rest, [eventName]: removed.filter((cb) => cb !== callback) };
      });
    };
  }, []);

  const emit = useCallback((eventName, data) => {
    if (!subscriptions[eventName]) return;
    subscriptions[eventName].forEach((callback) => callback(data));
  }, [subscriptions]);

  return (
    <EventEmitterContext.Provider value={{ subscribe, emit }}>
      {children}
    </EventEmitterContext.Provider>
  );
};

export { EventEmitterProvider, EventEmitterContext };
