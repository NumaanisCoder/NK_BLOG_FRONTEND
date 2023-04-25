import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Sm.css';
const Sm = () => {
    const navigate = useNavigate();
    const [formValues, setformValues] = useState({email: ''});
    const [button, setbutton] = useState("Send Link")
    const [Valid, setValid] = useState(false);
    const [error, seterror] = useState("");
    
const handleChange = (e) => {
const {name, value} = e.target;
setbutton("Send Link");
seterror("");
setValid(false);
setformValues({...formValues, [name]:value});
console.log(formValues)
if(formValues.email.length > 7){
    setValid(true);

}
}

function submitHandler (event) {
    setbutton('Sending..');
event.preventDefault();
    axios.post('https://nk-blog-theta.vercel.app/user/resetpassword',formValues).then((res)=>{
        const {success, message} = res.data;
        console.log(res.data);
        if(success){
            setbutton("Link Sent!");
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }else if(!success){
            setbutton("Send Link");
            seterror("Email is not registered");

        }
    })
}
    useEffect(() => {
    if(Valid){
        submitHandler();
    }
    }, [])

  return (
    <div>
        <form onSubmit={submitHandler} className='smform'>
            <table cellPadding={'10px'} className='smtable' cellSpacing={'10px'}>
                <tr>
                    <th colSpan={2}>Send Reset Link</th>
                </tr>
                <tr>
                <td>Email</td>
                <td><input type="email" onChange={handleChange} name='email' placeholder='' required/>
                <p>{error}</p></td>
                </tr>
                <tr><th colSpan={2}><button className='btnsubmit2'>{button}</button></th>
               </tr>
            </table>
            
        </form>
        <div className="lgdiv">
        <button className="loginbtn" onClick={()=>{
          navigate('/signup')
        }}>Register</button>
        <button className="loginbtn" onClick={()=>{
          navigate('/login')
        }}>Login</button>
      </div>
    </div>
  )
}

export default Sm

