import React, { useContext, useState } from 'react'
import { AuthDataContext } from '../../context/authContext';
import styles from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
// import { UserDataContext } from '../../context/userContext';
function Login() {
    const serverUrl = useContext(AuthDataContext);
    // const {setUserData} = useContext(UserDataContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({
        email: "",
        password: ""
    })

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
         try {
            const result = await axios.post(`${serverUrl}/api/auth/login`, info, {withCredentials: true});
            if(result.status === 200 || result.status===201){
              // setUserData(result.data);
              toast.success(result?.data?.msg || "Singup Successfully");
              navigate("/");
            }
         } catch (error) {
            console.log("Error in login", error);
            toast.error("Something went wrong");
         }finally{
            setLoading(false);
         }
    }

  return (
    <div className={styles.container} >
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Register Form</h1>
        <input type='email' className={styles.input} placeholder='Enter email' onChange={handleInput} name="email" value={info.email}/>
        <input type='password' className={styles.input} placeholder='Enter password' onChange={handleInput} name="password" value={info.password} autoComplete='off'/>
        <button type='submit' className={styles.btn}>{loading ? "loading..." : "Login"}</button>
        <p>Create a new Account? <Link to={"/signup"}>signup</Link></p>
      </form>
    </div>
  )
}

export default Login;
