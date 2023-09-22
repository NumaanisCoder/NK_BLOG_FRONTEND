import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useCookies } from 'react-cookie';
const OTPVerification = () => {
    const navigator = useNavigate();
    const emailToken = Cookies.get("Emailtoken");
    console.log(emailToken);
    const [otp, setotp] = useState({otpValue:""});
    const [CanBeSend, setCanBeSend] = useState(false);
    const [otpError, setotpError] = useState({otpError: ""})
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const HandleChange = (e) => {
        const {name, value} = e.target;
        setotp({...otp, [name]:value});
        if(otp.otpValue.length === 5){
            const button = document.querySelector('#otpverifybutton');
            button.disabled = false;
        }else{
            const button = document.querySelector('#otpverifybutton');
            button.disabled = true;
        }
    }
    const otpSubmitHandler = async (e) => {
        e.preventDefault();
        const button = document.querySelector('#otpverifybutton');
        const paragraph = document.querySelector('p');
        button.innerHTML = "Verifying";
        await fetch(`https://nk-blog-theta.vercel.app/verifyotp/${emailToken}`,{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(otp), 
        })
        .then(res => res.json().then((response)=>{
            const {success, message, token} = response;
            console.log("Response is ",response);
            if(success){
                setCookie("token", token);
                navigator("/prof");
            }else if(!success){
                otpError.otpError = message;
                button.innerHTML = "Verify"
                paragraph.innerText = message;
            }
        }))
    }
    useEffect(() => {
       if(CanBeSend){
        otpSubmitHandler();
       }
    }, [CanBeSend])

    
  return (
    <div>
        <form onSubmit={otpSubmitHandler}>
        <table>
            <tr>
                <th colSpan={2}>OTP Verification</th>
            </tr>
            <tr style={{marginTop: 7}}>
                <td>Enter OTP:</td>
                <td><input type="number" name='otpValue' onInput={HandleChange} id="otp" /></td>
            </tr>
                <p style={{color: 'red'}}>{otpError.otpError}</p> 
            <tr>
                <th colSpan={2}><button style={{padding: 5, backgroundColor: 'blue', color: 'white', borderRadius: 10}} id='otpverifybutton' disabled>Verify</button></th>
            </tr>
        </table>
        </form>
      
    </div>
  )
}

export default OTPVerification
