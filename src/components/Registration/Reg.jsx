import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./Reg.css";
export const Reg = () => {
  const initialValues = { username: "",email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setformErrors] = useState({});
  const [cookies, setCookie, removeCookie] = useCookies(['name']);
  const [canBeSubmitted, setcanBeSubmitted] = useState(false);
  const [Button, setButton] = useState("Register");
  const [Hide, setHide] = useState("Show");
  const navigate = useNavigate();
  removeCookie("token");

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
    if(!usernameRegex.test(values.username)){
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
    }else{
      setButton("Register")
    }
  };

  useEffect(() => {
    if (canBeSubmitted) {
      if(Object.keys(formErrors).length === 0){
      fetch("https://nk-blog-5ax8.vercel.app/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      })
        .then((response) => response.json())
        .then((data) => {
          const { status, success, message } = data;
          if (success) {
            if(Object.keys(formErrors).length === 0){
              navigate("/prof");
            }else{
              setButton("Register")
            }
          } else if (!success) {
            if (status == "409") {
              if (message === "username already taken") {
                setformErrors({ username: message });
                setButton("Register");
              }else{
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
            <table cellSpacing={1} cellPadding={10}>
              <tr>
                <th colSpan={2}>Registration</th>
              </tr>
              <tr>
                <td>Username</td>
                <td>
                  <input
                    type="text"
                    name="username"
                    value={formValues.name}
                    onChange={handleChange}
                    required
                  />
                  <p className="errorMessage">{formErrors.username}</p>
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
                    id="pas"
                    value={formValues.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="btnsec"
                    onClick={() => {
                      if (Hide == "Show") {
                        document.getElementById("pas").type = "text";
                        setHide("Hide");
                      } else {
                        document.getElementById("pas").type = "password";
                        setHide("Show");
                      }
                    }}
                  >
                    {Hide}
                  </button>
                  <p className="errorMessage">{formErrors.password}</p>
                </td>
              </tr>
              <tr>
                <th colSpan={2}>
                  <button type="submit" className="btnsubmit">
                    {Button}
                  </button>
                </th>
              </tr>
            </table>
          </form>
        </div>
      </div>
      <div className="lgdiv">
        <button className="loginbtn" onClick={()=>{
          navigate('/login')
        }}>Already Have Account? Login</button>
      </div>
    </>
  );
};
