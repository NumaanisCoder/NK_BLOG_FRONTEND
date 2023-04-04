import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home/Home";
import { Log } from "./components/Login/Log";
import Prof from "./components/profile/Prof";
import { Reg } from "./components/Registration/Reg";
import { Navbar } from "./components/Navbar/Navbar";



function App() {
  return (
    <>
      <Router>
    <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
        <Routes>
          <Route path="/signup" element={<Reg/>}/>
        </Routes>
        <Routes>
          <Route path="/login" element={<Log/>}/>
      
        </Routes>
        <Routes>
          <Route path="/prof" element={<Prof/>}/>

        </Routes>
        
      </Router>
    </>
  );
}

export default App;
