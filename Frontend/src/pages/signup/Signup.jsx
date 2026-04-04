import React, { useContext, useState } from 'react'
import { AuthDataContext } from '../../context/authContext';
import styles from './Signup.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'
import { UserDataContext } from '../../context/userContext';

function Signup() {
    const navigate = useNavigate();
    const serverUrl = useContext(AuthDataContext);
    const {setUserData} = useContext(UserDataContext);
    const [info, setInfo] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false);

    const handleInput = (e)=>{
        const {name, value} = e.target;
        setInfo({
            ...info,
            [name]: value
        });
    }

    const handleSubmit = async(e)=>{
         e.preventDefault();
         setLoading(true);
         
         console.log(serverUrl);
         try {
            const result = await axios.post(`${serverUrl}/api/auth/signup`, info, {withCredentials: true});
            console.log(result.user);
            if(result.status === 200 || result.status===201){
              setUserData(result.data);
              toast.success("Singup Successfully");
              navigate("/");
            }
         } catch (error) {
            console.log("Error in signup", error);
            toast.error("Something went wrong");
         }finally{
            setLoading(false);
         }
    }

  return (
    <div className={styles.container} >
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Register Form</h1>
        <input className={styles.input} placeholder='Enter name' onChange={handleInput} name="username" value={info.username}/>
        <input type='email' className={styles.input} placeholder='Enter email' onChange={handleInput} name="email" value={info.email}/>
        <input type='password' className={styles.input} placeholder='Enter password' onChange={handleInput} name="password" value={info.password} autoComplete='off'/>
        <button type='submit' className={styles.btn}>{loading ? "loading..." : "SignUp"}</button>
        <p>Already have an account? <Link to="/login">login</Link></p>
      </form>
    </div>
  )
}

export default Signup
