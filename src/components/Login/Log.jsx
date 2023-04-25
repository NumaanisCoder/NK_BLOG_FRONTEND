import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Log.css";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";

export const Log = () => {
  const navigate = useNavigate();
 

  const initialValues = {  email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setformErrors] = useState({});
  const [cookies, setCookie, removeCookie] = useCookies(['name']);
  const [canBeSubmitted, setcanBeSubmitted] = useState(false);
  const [Button, setButton] = useState("Login")
  const [Hide, setHide] = useState("Show")
  const url = 'https://nk-blog-theta.vercel.app';
  

  function submitHandler(event) {
    event.preventDefault();
    setformErrors(validate(formValues));
    if(Object.keys(formErrors).length === 0){
       setcanBeSubmitted(true);
       setButton("Logining..")
    }else{
        setcanBeSubmitted(false);
    }
  }
  const validate = (values) => {
        const error = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
        if(!values.email){
            error.email = "Email is Required"
        }else if(!emailRegex.test(values.email)){
            error.email = "Email is not Valid"
        }
        if(!values.password){
            error.password = "Password is Required"
        }else if(values.password.length < 4){
            error.password = "Invalid passsword"
        }
        return error;
  }
  const handleChange =  (e) => {
    const { name, value } = e.target;
   setFormValues({...formValues,[name]: value});
   if(Object.keys(formErrors).length != 0){
     setformErrors(validate(formValues));
     setcanBeSubmitted(false);
   }
   };

  useEffect(() => {
  if(canBeSubmitted){
    fetch(`${url}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      })
      .then(response => response.json())
      .then(data => {
        const {status,success, message, token} = data;
        let expiryDate = new Date();
expiryDate.setTime(expiryDate.getTime() + (7 * 24 * 60 * 60 * 1000));
        if(success){
          setCookie('token',token,{
            sameSite:"none",
            secure: true ,
            expires: expiryDate
          });
          navigate('/prof')
        }

        else if(!success){
          if(status == '401'){
            setformErrors({password: message});
            setButton('Login')
          }else if(status == '404'){
            setformErrors({email: message});
            setButton('Login');
          }
        }
        
      })
      .catch(error => {
        console.log("Error While creating user",error)
      });
  }
  }, [canBeSubmitted])
  return (
    <>
      <div className="container">
        <div className="item">
          <form onSubmit={submitHandler}>
            <table  cellPadding={'10px'} cellSpacing={'10px'}>
              <tr>
                <th colSpan={2}>Login</th>
              </tr>
    
              <tr>
                <td>Email</td>
                <td>
                  <input
                    type="text"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    required
                  />
                    <p className="errorMessage">{formErrors.email}</p>
                </td>
              </tr>
              <tr>
                <td>Password</td>
                <td>
                  <input
                    type="password"
                    name="password"
                    id="pas"
                    value={formValues.password}
                    onChange={handleChange}
                    required
                  />
                  <button type="button" className="btnsec" onClick={()=>{
                    if(Hide == 'Show'){
                    document.getElementById('pas').type = 'text';
                    setHide("Hide");
                  }else{
                    document.getElementById('pas').type = 'password';
                    setHide("Show");
                  }
                  }}>{Hide}</button>
                    <p className="errorMessage">{formErrors.password}</p>
                </td>
              </tr>
              <tr>
                <th colSpan={2}>
                  <button type="submit" className="btnsubmit">{Button}</button>
                </th>
              </tr>
            </table>
          </form>
        </div>
      </div>
      <div className="lgdiv">
        <button className="loginbtn" onClick={()=>{
          navigate('/signup')
        }}>Register</button>
        <button className="loginbtn" onClick={()=>{
          navigate('/sendresetlink');
        }}>Reset Password</button>
      </div>
      
    </>
  );
};
