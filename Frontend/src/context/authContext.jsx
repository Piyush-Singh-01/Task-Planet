import React, { createContext } from 'react'

export const AuthDataContext = createContext();

export default function AuthDataProvider({children}) {
    const serverUrl = "https://backend-v5by.onrender.com"
    
  return (
    <AuthDataContext.Provider value={serverUrl}>
          {children}
    </AuthDataContext.Provider>
  )
}

