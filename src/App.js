import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home/Home";
import { Log } from "./components/Login/Log";
import Prof from "./components/profile/Prof";
import { Reg } from "./components/Registration/Reg";
import { Navbar } from "./components/Navbar/Navbar";
import Blog from "./components/Blog/Blog";
import Footer from "./components/footer/Footer";
import Res from "./components/ResetPassword/Res";
import Sm from "./components/SendMail/Sm";
import Edit from "./components/Edit/Edit";
import Ul from "./components/Navbar/ul/Ul";
import OTPVerification from "./components/OTP/OTPVerification";

function App() {

  return (
    <>
    <div className="app-wrapper">
      <Router>
    <Navbar/>
    <Ul/>
    
        <Routes>
          <Route exact path="/" element={
              <Home/>}/>
        </Routes>
        <Routes>
          <Route path="/signup" element={<Reg/>}/>
        </Routes>
        <Routes>
          <Route path="/login" element={<Log/>}/>
        </Routes>
        <Routes>
          <Route path="/user/otp-verification" element={<OTPVerification/>}/>
        </Routes>
        <Routes>
          <Route path="/prof" element={<Prof/>}/>
          <Route path="/prof/userblog/:id/edit" element={<Edit/>}/>
        </Routes>
        <Routes>
          <Route path="/blog/:user/:id" element={<Prof/>}/>
        </Routes>
        <Routes>
          <Route path="/blog/:id" element={<Blog/>}/>
        </Routes>
      
        <Routes>
          <Route path="/resetpassword/:token" element={<Res/>}/>
        </Routes>
        <Routes>
          <Route path="/sendresetlink" element={<Sm/>}/>
        </Routes>
        <Footer/>
      </Router>
      </div>
    </>
  );
}

export default App;
