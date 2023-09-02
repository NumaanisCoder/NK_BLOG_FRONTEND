import React from 'react'
import { useState } from 'react';

const ThemeButton = () => {
    const [lightMode, setlightMode] = useState("Light Mode"); 
  return (
    <div>
        <div>
      <button style={{border: 2, borderColor: 'white', color
            : 'black', borderRadius: 10}} className="switch-mode" id="mode" onClick={()=>{
              if(lightMode === "Light Mode"){
                document.body.style.color = "black";
                document.body.style.backgroundColor = "white";
                document.querySelector("#mode").style.color = "white";
                document.querySelector("#mode").style.backgroundColor = "black";
                document.querySelector("#mode").style.border = "2px solid black";
                document.querySelector("#mode").style.borderRadius = "10px";
                setlightMode("Dark Mode")
              }else{
                document.body.style.color = "white";
                document.body.style.backgroundColor = "black";
                document.querySelector("#mode").style.color = "black";
                document.querySelector("#mode").style.backgroundColor = "white";
                document.querySelector("#mode").style.borderColor = "white";
                setlightMode("Light Mode")
              }
            }}>{lightMode}</button>
          </div>
    </div>
  )
}

export default ThemeButton
