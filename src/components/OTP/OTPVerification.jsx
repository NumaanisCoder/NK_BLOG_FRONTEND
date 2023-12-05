import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useCookies } from "react-cookie";
import style from "./OTPStyle.module.css";

const OTPVerification = () => {
  const navigator = useNavigate();
  const emailToken = Cookies.get("Emailtoken");
  console.log(emailToken);
  const [otp, setotp] = useState({ otpValue: "" });
  const [CanBeSend, setCanBeSend] = useState(false);
  const [otpError, setotpError] = useState({ otpError: "" });
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setotp({ ...otp, [name]: value });
    if (otp.otpValue.length === 5) {
      const button = document.querySelector("#otpverifybutton");
      button.disabled = false;
    } else {
      const button = document.querySelector("#otpverifybutton");
      button.disabled = true;
    }
  };

  const otpSubmitHandler = async (e) => {
    e.preventDefault();
    const button = document.querySelector("#otpverifybutton");
    const paragraph = document.querySelector("p");
    button.innerHTML = "Verifying";
    await fetch(`https://nk-blog-theta.vercel.app/verifyotp/${emailToken}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(otp),
    }).then((res) =>
      res.json().then((response) => {
        const { success, message, token } = response;
        console.log("Response is ", response);
        if (success) {
          setCookie("token", token);
          navigator("/prof");
        } else if (!success) {
          otpError.otpError = message;
          button.innerHTML = "Verify";
          paragraph.innerText = message;
        }
      })
    );
  };
  useEffect(() => {
    if (CanBeSend) {
      otpSubmitHandler();
    }
  }, [CanBeSend]);

  return (
    <div className={style.OtpContainer}>
      <form className={style.form} onSubmit={otpSubmitHandler}>
        <h3>OTP Verification</h3>

        <div className={style.formGroup}>
          <label htmlFor="">Enter Otp</label>
          <input
            type="number"
            name="otpValue"
            onInput={HandleChange}
            id="otp"
          />
        </div>
        <p style={{ color: "red" }}>{otpError.otpError}</p>
        <div className={style.formGroup}>
          <button id="otpverifybutton" disabled>
            Verify
          </button>
        </div>
        <button 
  className={style.resendButton} 
  type="button" 
  onClick={(e) => {
    const button = e.target;
    button.disabled = true;
    button.innerText = "Resend in 5 seconds";

    setTimeout(() => {
      button.disabled = false;
      button.innerText = "Resend";
    }, 5000);

    fetch(`https://nk-blog-theta.vercel.app/resendOtp/${emailToken}`, {
      method: 'post'
    })
    .then(res => res.json())
    .then(data => {
      if (data.success === true) {
        button.innerText = "Otp Sent";
      }
    })
    .catch(error => {
      // Handle the error
      console.error('Error:', error);
    });
  }}
>
  Resend OTP
</button>

      </form>
    </div>
  );
};

export default OTPVerification;
