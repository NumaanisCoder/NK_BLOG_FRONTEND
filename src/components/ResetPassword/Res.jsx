import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './Res.css';

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
    function suiii(){
        seterror("");
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
    <div className='update'>
        <form onSubmit={submitHandler}>
            <table cellSpacing={'20px'} cellPadding={'10px'}>
                <tr>
                    <th colSpan={2}>Update Password</th>
                </tr>
                <tr>
            <input type="password" id='pas' onChange={suiii}  placeholder='Enter new Password' required />
                </tr> 
                <tr>
            <input type="text" id='confpas' name='password' onChange={handleChange} placeholder='Confirm New Password' required />
<p>{error}</p>
                </tr>
                <tr>
                    <th>

            <button className='btnsubmit2'>{btn}</button>
                    </th>
                </tr>
            </table>
        </form>
    </div>
    </>
  )
}

export default Res;
