import React from "react";
// import { Link, redirect } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Reg.css";
export const Reg = () => {
  const initialValues = { name: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setformErrors] = useState({});
  const [canBeSubmitted, setcanBeSubmitted] = useState(false);
  const [Button, setButton] = useState("Register")
  const navigate = useNavigate();

  function submitHandler(event) {
    event.preventDefault();
    setformErrors(validate(formValues));
    if(Object.keys(formErrors).length === 0){
       setcanBeSubmitted(true);
       setButton("Registering..")
    }else{
        setcanBeSubmitted(false);
    }
  }
  const validate = (values) => {
        const error = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
        if(!values.name){
            error.name = "Name is Required"
        }
        if(!values.email){
            error.email = "Email is Required"
        }else if(!emailRegex.test(values.email)){
            error.email = "Email is not Valid"
        }
        if(!values.password){
            error.password = "Password is Required"
        }
        return error;
  }
  const handleChange =  (e) => {
    const { name, value } = e.target;
   setFormValues({...formValues,[name]: value});
  
   };

  useEffect(() => {
  if(canBeSubmitted){
    console.log(formValues);
    fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      })
      .then(response => response.json())
      .then(data => {
        const {success, message} = data;
        if(!success){
            setformErrors({email: message});
            setButton("Register");
        }else{
            localStorage.setItem('token', 'hasjhgajsh');
            navigate('/prof');
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
            <table border={1} cellSpacing={0} cellPadding={10}>
              <tr>
                <th colSpan={2}>Registration</th>
              </tr>
              <tr>
                <td>Name</td>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    required
                  />
                  <p className="errorMessage">{formErrors.name}</p>
                </td>
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
                    value={formValues.password}
                    onChange={handleChange}
                    required
                  />
                  <button>show</button>
                    <p className="errorMessage">{formErrors.password}</p>
                </td>
              </tr>
              <tr>
                <th colSpan={2}>
                  <button type="submit">{Button}</button>
                </th>
              </tr>
            </table>
          </form>
        </div>
      </div>
    </>
  );
};
