import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './Prof.css'
export default function Prof() {
  const navigate = useNavigate()
  const token = Cookies.get("token");
  setTimeout(()=>{
    if(!token){
      navigate('/login');
    }
  },4000)
  
  
 
const [user, setuser] = useState({username: 'loading...', email: 'loading...'});
const [showpost, setShowpost] = useState("Upload Blog");
const initialValues = { title: "",image: "", content: "", category: ""};
const [formValues, setFormValues] = useState(initialValues);
const [formErrors, setformErrors] = useState({});
const [button, setButton] = useState("Post");
const [success, setSuccess] = useState("");
const [canBeSubmitted, setcanBeSubmitted] = useState(false);


function submitHandler(event) {
  event.preventDefault();
  setformErrors(validate(formValues));
  if (Object.keys(formErrors).length === 0) {
    setcanBeSubmitted(true);
    setButton("Posting..");
  } else {
    setcanBeSubmitted(false);
    setButton("Post");
  }
}


const handleChange = (e) => {
  const { name, value } = e.target;
  setFormValues({ ...formValues, [name]: value });
  console.log(formValues);
  if (Object.keys(formErrors).length !== 0) {
    setformErrors(validate(formValues));
    setcanBeSubmitted(false);
    setButton("Post")
  }
};


const validate = (values) => {
  const error = {};
  if(!values.title){
    error.title = "title is required";
  }
  if(!values.image){
    error.image = "image is required";
  }
  if(!values.content){
    error.content = "content is required";
  }
  return error;
};



useEffect(() => {
    fetch('https://nk-blog-5ax8.vercel.app/login',{
        method: 'post',
        headers: {
          "Content-Type": "application/json",
        },
    })
    .then(res => res.json())
    .then(data => setuser(data.message))

    //Blog Post

    if(canBeSubmitted){
      fetch('/createblog', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      })
      .then(res => res.json())
      .then(data => {
        const {success} = data;
        console.log(data);
        if(success){
          setSuccess("Posted..")
          setButton("Posted");
          setTimeout(() => {
            setFormValues({title: "", image: "", content: ""});
            setSuccess("");
            setButton("Post");
            setcanBeSubmitted(false);
          }, 2000);
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
}, [canBeSubmitted])


  return (
    <>
    <div className='content'>
    <div>
      <div className='userDetails'>
        <p className='key'>Username: <span className='value'>{user.username}</span></p>
        <p className='key'>Email: <span className='value'>{user.email}</span></p>
      </div>
      <div className='showformbtn'>
        <button className='btnshow'  onClick={()=>{
          if(showpost == 'Upload Blog'){
          document.querySelector('.formm').style.display = 'block';
          setShowpost('Hide Post Blog')
          }else{
            document.querySelector('.formm').style.display = 'none';
            setShowpost('Upload Blog')
          }
        }}>{showpost}</button>
      </div>
    </div>
    {/* //form */}
    <div className='formm'>
    <form onSubmit={submitHandler}>
      <table className='formTable' cellSpacing={10} cellPadding={10}>
        <tr>
          <th colSpan={2}>Post Blog</th>
        </tr>
        <tr>
          <td>Title</td>
          <td><input type="text" name='title' onChange={handleChange} value={formValues.title} required/></td>
        </tr>
        <tr>
          <td>image</td>
          <td><input type="text" placeholder='image url' name='image' onChange={handleChange} required value={formValues.image}/></td>
        </tr>
        <tr>
          <td>Content</td>
          <td><textarea name="content" id="" cols="30" rows="10" onChange={handleChange} value={formValues.content} required></textarea></td>
        </tr>
        <tr>
          <td>Category</td>
          <td><select name="category" id="" onChange={handleChange} required>
          <option value="Technology">Technology</option>
          <option value="Programming">Programming</option>
          <option value="Wildlife">Wildlife</option>
          <option value="Education">Education</option>
          <option value="Personal thought" selected>Personal thought</option>
          <option value="Travel">Travel</option>
          <option value="Video Games">Video Games</option>
          <option value="Anime">Anime</option>
          <option value="Movie">Movie</option>
          <option value="Sports">Sports</option>
          <option value="News">News</option>
            </select></td>
        </tr>
        <tr>
          <th colSpan={2}><button className='submitbtn' type='submit'>{button}</button></th>
        </tr>
        <tr>
        <th colSpan={2} className='success'>{success}</th>
        </tr>
      </table>
    </form>
    </div>
    </div>
    <div className="lgdiv">
        <button className="loginbtn" onClick={async ()=>{
          await fetch('/logout')
            .then(response => 
              response.json()
            ).then(data => {
              const {success} = data;
              if(success){
              navigate('/'); }
            })
            .catch(error => {
             console.log(error)
            });
        }}>logout</button>
      </div>
    </>
  )
}
