import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./Reg.css";
import axios from "axios";
export const Reg = () => {
  const initialValues = { username: "", email: "", password: "", otp:""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setformErrors] = useState({});
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [canBeSubmitted, setcanBeSubmitted] = useState(false);
  const [Button, setButton] = useState("Register");
  const [SendEmailButton, setSendEmailButton] = useState("Send Otp");
  const [Hide, setHide] = useState("Show");
  const navigate = useNavigate();
  const url = "https://nk-blog-theta.vercel.app";

  function submitHandler(event) {
    event.preventDefault();
    setformErrors(validate(formValues));
    if (Object.keys(formErrors).length === 0) {
      setcanBeSubmitted(true);
      setButton("Registering..");
    } else {
      setcanBeSubmitted(false);
    }
  }
  const validate = (values) => {
    const error = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    const usernameRegex = /^[A-Za-z0-9]+$/i;
    if (!usernameRegex.test(values.username)) {
      error.username = "username should not contain space";
    }
    if (!values.email) {
      error.email = "Email is Required";
    } else if (!emailRegex.test(values.email)) {
      error.email = "Email is not Valid";
    }
    if (!values.password) {
      error.password = "Password is Required";
    } else if (values.password.length < 4) {
      error.password = "Invalid passsword";
    }
    return error;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (Object.keys(formErrors).length !== 0) {
      setformErrors(validate(formValues));
      setcanBeSubmitted(false);
    } else {
      setButton("Register");
    }

  };

  useEffect(() => {
    if (canBeSubmitted) {
      if (Object.keys(formErrors).length === 0) {
        fetch(`${url}/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        })
          .then((response) => response.json())
          .then((data) => {
            const { status, success, message, token } = data;
            console.log(token);
            if (success) {
              if (Object.keys(formErrors).length === 0) {
                let expiryDate = new Date();
                expiryDate.setTime(
                  expiryDate.getTime() + 7 * 24 * 60 * 60 * 1000
                );
                setCookie("Emailtoken", token, {
                  expires: expiryDate,
                });
                navigate("/user/otp-verification");
                setButton("OK");
              } else {
                setButton("Register");
              }
            } else if (!success) {
              if (status == "409") {
                if (message === "username already taken") {
                  setformErrors({ username: message });
                  setButton("Register");
                } else {
                  setformErrors({ email: message });
                  setButton("Register");
                }
              }
            }
          })
          .catch((error) => {
            console.log("Error While creating user", error);
          });
      }
    }
  }, [canBeSubmitted]);

  return (
    <>
      <div className="container">
        <div className="item">
        <form onSubmit={submitHandler}>
  <div>
    <h1>Registration</h1>
  </div>
  <div  className="form-group">
    <label>Username</label>
    <input
      type="text"
      name="username"
      value={formValues.name}
      onChange={handleChange}
      required
    />
    <p className="errorMessage" style={{color: 'red'}}>{formErrors.username}</p>
  </div>
  <div className="form-group">
    <label>Email</label>
    <input
      type="text"
      name="email"
      value={formValues.email}
      onChange={handleChange}
      id="email"
      required
    />
    <p className="errorMessage" style={{color: 'red'}}>{formErrors.email}</p>
  </div>
  <label style={{fontWeight: 600}}>Password</label>
    <div className="form-group">
      <div className="passwordfield">
      <input
        type={Hide === 'Show' ? 'password' : 'text'}
        name="password"
        className="loginInput"
        value={formValues.password}
        onChange={handleChange}
        required
      />
      <button
        type="button"
        className="btnsexy"
        onClick={() => {
          setHide(Hide === 'Show' ? 'Hide' : 'Show');
        }}
      >
        {Hide}
      </button>
      </div>
      <div>
      <p className="errorMessage" style={{color: 'red'}}>{formErrors.password}</p>
      </div>
    </div>

  <div>
    <button type="submit" className="btnsubmit">
      {Button}
    </button>
  </div>
</form>

        </div>
      </div>
      <div className="lgdiv">
        <button
          className="navbtn"
          onClick={() => {
            navigate("/login");
          }}
        >
          Already Have Account? Login
        </button>
      </div>
    </>
  );
};
