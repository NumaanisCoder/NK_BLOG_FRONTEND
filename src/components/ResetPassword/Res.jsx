import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import style from './Res.module.css';

const Res = () => {
    const {token} = useParams();
    const navigate = useNavigate();
    const [formValues, setformValues] = useState({password: ''});
    const [validPassword, setvalidPassword] = useState(false);
    const [btn, setbtn] = useState("Update Password")
    const [error, seterror] = useState("");


    function submitHandler(event) {
        event.preventDefault();
        setbtn("Updating...")
        const pass = document.getElementById('pas').value;
        const confpass = document.getElementById('confpas').value;
        if(pass === confpass){
            if(formValues.password.length >= 6){
                setvalidPassword(true)
            }
        }else{
            seterror("Password didn't match");
            setvalidPassword(false);
            setbtn("Update Password");
        }
       
    }
    function handleChange(event){
        const {name, value} = event.target;
        setformValues({...formValues,[name]:value});
        
    }
   

    useEffect(() => {
        if(token){
            axios.get(`https://nk-blog-theta.vercel.app/user/verify/${token}`)
            .then((res)=>{
                console.log(res.data);
                const {success} = res.data;
                if(!success){
                    navigate('/login');
                }

            })
        }
        if(validPassword){
            axios.post(`https://nk-blog-theta.vercel.app/user/updatepassword/${token}`, formValues).then((res)=>{
                const {success} = res.data;
                console.log(res.data);
                if(success){
                    setbtn("Updated Congrats")
                    setTimeout(() => {
                        navigate('/login');
                    }, 1500);
                }
            })
        }
    }, [validPassword]);
  return (
    <>
    <div className={style.ResContainer}>
        <h2>Reset Password</h2>
        <form className={style.ResForm} onSubmit={submitHandler}>
            <div className={style.formGroup}>
                <label htmlFor="">Enter New Password</label>
                <input id='pas' onChange={handleChange} name='password' type="password" />
            </div>
            <div className={style.formGroup}>
            <label htmlFor="">Confirm New Password</label>
                <input id='confpas' type="text" />
                <p>{error}</p>
            </div>

            <div className={style.formGroup}>
                <button>{btn}</button>
            </div>
        </form>
    </div>
    </>
  )
}

export default Res;
