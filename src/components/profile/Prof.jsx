import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./Prof.css";
import axios from "axios";
export default function Prof() {
  const token = Cookies.get("token");
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const navigate = useNavigate();
  if(!token || token === undefined){
    navigate('/login')
  }
  function check(){
    if(!token || token === undefined){
      navigate('/login')
    }
  }
  
  const [user, setuser] = useState({
    username: "loading...",
    email: "loading...",
  });
 
  const [userBlogs, setuserBlogs] = useState(null);
  const [blogLoaded, setblogLoaded] = useState(false);
  const [showpost, setShowpost] = useState("Upload Blog");
  const initialValues = { title: "", image: "", content: "", category: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setformErrors] = useState({});
  const [button, setButton] = useState("Post");
  const [success, setSuccess] = useState("");
  const [file, setfile] = useState(null)
  const [canBeSubmitted, setcanBeSubmitted] = useState(false);
  const url = 'https://nk-blog-theta.vercel.app';
  let formData = new FormData(); 

  function submitHandler(event) {
    event.preventDefault();
    console.log(formData)
    setformErrors(validate(formValues));
    if (Object.keys(formErrors).length === 0) {
      setcanBeSubmitted(true);
      setButton("Posting..");
    } else {
      setcanBeSubmitted(false);
      setButton("Post");
    }
  }
  function random(milliseconds){ 
    const date = new Date(milliseconds);
const formattedDate = date.toLocaleString();
return formattedDate.substring(0,9);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
    if (Object.keys(formErrors).length !== 0) {
      setformErrors(validate(formValues));
      setcanBeSubmitted(false);
      setButton("Post");
    }
  };
  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setfile(e.target.files[0]);
  }

  const validate = (values) => {
    const error = {};
    if (!values.title) {
      error.title = "title is required";
    }
    if (!values.image) {
      error.image = "image is required";
    }
    if (!values.content) {
      error.content = "content is required";
    }
    return error; 
  };

  useEffect(() => {
    if(!token){
      navigate('/login');
    }

    fetch(`${url}/userbytoken/${token}`, {
      method: "get",
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => setuser(data.message));

    //Blog Post

    if (canBeSubmitted) {
      formData.append('title',formValues.title);
      formData.append('content',formValues.content);
      formData.append('category',formValues.category);
      formData.append('image',file)
      console.log("File is: ",formData.get('image'));
      axios.post(`${url}/createblog/${token}`,formData)
        .then((res) => {
          const { success } = res.data; 
          if (success) {
            setSuccess("Posted..");
            setButton("Posted");
            setTimeout(() => {
              setFormValues({ title: "", image: "", content: "" });
              setSuccess("");
              setButton("Post");
              setcanBeSubmitted(false);
            }, 2000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    fetch(`${url}/userblogs/${token}`, { method: "get",
    credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setuserBlogs(data.blogs);
        setblogLoaded(true);
      });
  }, [canBeSubmitted, blogLoaded]);

  return (
    <>
    {check()}
      <div className="content">
        <div>
          <div className="userDetails">
            <p className="key">
              Username: <span className="value">{user.username}</span>
            </p>
            <p className="key">
              Email: <span className="value">{user.email}</span>
            </p>
          </div>
          <div className="userblog">
            <h1 className="userb">My Blogs</h1>
            {blogLoaded ? (
              userBlogs.map((data) => (
                <>
            <details className="blog" key={data._id}>
              
          <summary>{data.title}<span className="date">Date: {random(data.createdAt)}</span></summary> 
          <img src={data.image} alt="" />
          <p>{data.content}</p>
          <p className="cate">Category: <span className="category">{data.category}</span></p>
          <button className="del" onClick={()=>{
            axios.delete(`${url}/userblogs/delete/${data._id}`).then(()=>{
              setblogLoaded(false);
            })
          }}>Delete</button>
          
        </details>
  
        </>
              ))
            ) : (
              <div className="lo">
                <h1>Loading..</h1>
              </div>
            )}
          </div>
          <div className="showformbtn">
            <button
              className="btnshow"
              onClick={() => {
                if (showpost == "Upload Blog") {
                  document.querySelector(".formm").style.display = "block";
                  setShowpost("Hide Post Blog");
                } else {
                  document.querySelector(".formm").style.display = "none";
                  setShowpost("Upload Blog");
                }
              }}
            >
              {showpost}
            </button>
          </div>
        </div>
        {/* //form */} 
        <div className="formm">
          <form onSubmit={submitHandler}>
            <table className="oktable" cellPadding={'10px'} cellSpacing={'10px'}>
              <tr>
                <th colSpan={2}>Post Blog</th>
              </tr>
              <tr>
                <td>Title</td>
                <td>
                  <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={formValues.title}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>image</td>
                <td>
                  <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    required
                   
                  />
                </td>
              </tr>
              <tr>
                <td>Content</td>
                <td>
                  <textarea
                    name="content"
                    id=""
                    cols="30"
                    rows="10"
                    onChange={handleChange}
                    value={formValues.content}
                    required
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>Category</td>
                <td>
                  <select
                    name="category"
                    id=""
                    onChange={handleChange}
                    required
                  >
                    <option value="Technology">Technology</option>
                    <option value="Programming">Programming</option>
                    <option value="Wildlife">Wildlife</option>
                    <option value="Education">Education</option>
                    <option value="Personal thought">Personal thought</option>
                    <option value="Travel">Travel</option>
                    <option value="Video Games">Video Games</option>
                    <option value="Anime">Anime</option>
                    <option value="Movie">Movie</option>
                    <option value="Sports">Sports</option>
                    <option value="News">News</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th colSpan={2}>
                  <button className="submitbtn" type="submit">
                    {button}
                  </button>
                </th>
              </tr>
              <tr>
                <th colSpan={2} className="success">
                  {success}
                </th>
              </tr>
            </table>
          </form>
        </div>
      </div>
      <div className="lgdiv">
        <button
          className="loginbtn"
        onClick={()=>{
          removeCookie("token")
          navigate('/');
        }}>
          LOGOUT
        </button>
      </div>
    </>
  );
}
