import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthDataContext } from './authContext';

export const UserDataContext = createContext();

export default function UserDataProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const serverUrl = useContext(AuthDataContext);

  const getCurrentUser = async () => {
    try {
        console.log("Server URL:", serverUrl);
      const result = await axios.get(`${serverUrl}/api/user/currentuser`,{ withCredentials: true });
      setUserData(result.data);
      console.log(result.data);

    } catch (error) {
      setUserData(null);
      console.log("Error in getCurrentUser", error);
    } finally {
      setLoading(false);   
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, [serverUrl]);

  return (
    <UserDataContext.Provider
      value={{ userData, setUserData, getCurrentUser, loading }}
    >
      {children}
    </UserDataContext.Provider>
  );
}
