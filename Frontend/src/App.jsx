import React, { useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/home/Home.jsx';
import Signup from './pages/signup/Signup.jsx';
import Login from './pages/login/Login.jsx';
// import { UserDataContext } from './context/userContext.jsx';

function App() {
  // const { userData, loading ,getCurrentUser} = useContext(UserDataContext);
  // useEffect(()=>{
  //   getCurrentUser();
  // },[])
  
  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       Loading...
  //     </div>
  //   );
  // }

  return (
    <Routes>
      {/* <Route path="/" element={userData ? <Home /> : <Navigate to="/login" />} />
      <Route path="/login" element={!userData ? <Login /> : <Navigate to="/" />} />
      <Route path="/signup" element={<Signup />} /> */}

       <Route path="/" element={<Home />/>} />
      <Route path="/login" element={<Login /> />} />
      <Route path="/signup" element={<Signup />} />
      
    </Routes>
  );
}

export default App;
