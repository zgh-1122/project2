import React, { createContext, useState, useEffect } from 'react';

// Context create kar rahe hain taake data har page par accessible ho
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Internet connection check (Network Off Error Handling)
      if (!navigator.onLine) {
        throw new Error("No internet connection. Please check your network.");
      }

      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
      // 2. Server Issue Check (Server Error Handling)
      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}. Could not fetch data.`);
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();

    // Live internet network tracking listeners
    const goOnline = () => setError(null);
    const goOffline = () => setError("You are currently offline. Please reconnect.");

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  return (
    <UserContext.Provider value={{ users, loading, error, retryFetch: fetchUsers }}>
      {children}
    </UserContext.Provider>
  );
};