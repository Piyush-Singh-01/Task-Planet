import React, { useState, useContext , useEffect} from 'react'
import { FaBell, FaSearch } from "react-icons/fa";
import profile from "../../assets/profile.png"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthDataContext } from "../../context/authContext";

import styles from './Navbar.module.css'
import { UserDataContext } from '../../context/userContext';

function Navbar({ search, setSearch }) {
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();
  const serverUrl = useContext(AuthDataContext);
  const {setUserData} = useContext(UserDataContext);

  //  Logout function
  const handleLogout = async () => {
    try {
      await axios.post(`${serverUrl}/api/auth/logout`,{},{withCredentials: true});

      setUserData(null);
      navigate("/login");
    } catch (error) {
      console.log("Logout error", error);
    }
  };

  return (
    <nav className={styles.navbar}>
      
      <h1 className={styles.logo}>Social</h1>

      {/*  Search */}
      <div className={styles.search}>
        <FaSearch className={styles.searchIcon} />
        <input 
          placeholder='Search posts...' 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Right Side */}
      <div className={styles.right}>

        {/* Notification */}
        <span><FaBell /></span>

        {/* Profile */}
        <img 
          className={styles.avatar} 
          src={profile}
          alt="profile"
          onClick={() => setShowMenu(!showMenu)} 
        />

        {showMenu && (
            <button className={styles.dropdown} onClick={handleLogout}>Logout</button>
        )}

      </div>

    </nav>
  )
}

export default Navbar;
