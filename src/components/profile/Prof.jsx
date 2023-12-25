import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "react-toastify/dist/ReactToastify.css";
import "./Prof.css";
import axios from "axios";
import Instruction from "../Helper/Instruction";
export default function Prof() {
  const token = Cookies.get("token");
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const [user, setuser] = useState({
    username: "loading...",
    email: "loading...",
  });
 
  var [userBlogs, setuserBlogs] = useState(null);
  const [blogLoaded, setblogLoaded] = useState(false);
  const [showpost, setShowpost] = useState("Write Blog");
  const initialValues = { title: "", image: "", content: "",summary:"", category: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setformErrors] = useState({});
  const [button, setButton] = useState("Post");
  const [success, setSuccess] = useState("");
  //pagination
  const [currentPage, setCurrentPage] = useState(1);

  const [file, setfile] = useState(null);
  const [canBeSubmitted, setcanBeSubmitted] = useState(false);
  const [info, setinfo] = useState(
    "Upload your first blog by clicking button below"
  );

  const url = "https://nk-blog-theta.vercel.app";

  let formData = new FormData();
  function submitHandler(event) {
    event.preventDefault();
    console.log(formData);
    setformErrors(validate(formValues));
    if (Object.keys(formErrors).length === 0) {
      setcanBeSubmitted(true);
      setButton("Posting..");
    } else {
      setcanBeSubmitted(false);
      setButton("Post");
    }
  }
  function random(milliseconds) {
    const date = new Date(milliseconds);
    const formattedDate = date.toLocaleString();
    return formattedDate;
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
    setfile(e.target.files[0]);
  };

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
    if (!token) {
      navigate("/login");
    }

    fetch(`${url}/userbytoken/${token}`, {
      method: "get",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setuser(data.message));

    //Blog Post

    if (canBeSubmitted) {
      formData.append("title", formValues.title);
      formData.append("content", formValues.content);
      formData.append("category", formValues.category);
      formData.append("summary", formValues.summary);
      formData.append("image", file);
      console.log("File is: ", formData.get("image"));
      axios
        .post(`${url}/createblog/${token}`, formData)
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

    fetch(`${url}/userblogs/${token}`, {
      method: "get",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setuserBlogs(data.blogs);
        setblogLoaded(true);
      });
  }, [canBeSubmitted, blogLoaded]);

  //pagination
  const itemsperpage = 4;
  const startIndex = (currentPage - 1) * itemsperpage;
  const endIndex = startIndex + itemsperpage;
  const maindata = userBlogs;
  if (blogLoaded) {
    userBlogs = userBlogs.slice(startIndex, endIndex);
  }

  return (
    <>
    <Helmet>
      <title>{user.username}</title> 
    </Helmet>
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

          {blogLoaded ? (
            maindata.length === 0 ? (
              <h2 className="blog-info-header">
                Write & Upload your first blog by clicking Button Below
              </h2>
            ) : (
              <h2 className="blog-info-header">
                Hii Blogger, Total Blog post is {maindata.length}
              </h2>
            )
          ) : (
            <h1></h1>
          )}
          <div className="userblog">
            {blogLoaded ?(
              userBlogs.map((data) => (
                <div>
                  <details className="bloguser" key={data._id}>
                    <summary>
                      {data.title} <span style={{float: "right", color: "gray"}}>{Math.ceil(data.views / 2 )} views</span>
                       <br />
                      <span className="date">
                        Date: {random(data.createdAt)}
                      </span>
                    </summary>
                    <div className="det-img">
                      <img className="detimg" src={data.image} alt="" />
                    </div>
                    <p className="det-content">
                      {data.content.slice(0, 250)}
                    </p>
                    <p className="detail-cate">
                      Category:{" "}
                      <span className="category">{data.category}</span>
                    </p>
                    <button
                      className="del"
                      onClick={() => {
                        axios
                          .delete(`${url}/userblogs/delete/${data._id}`)
                          .then(() => {
                            setblogLoaded(false);
                          });
                      }}
                    >
                      Delete
                    </button>
                    <Link
                      className="edit"
                      to={`/prof/userblog/${data._id}/edit`}
                    >
                      Edit
                    </Link>
                    <Link className="edit view" to={`/blog/${data.title.replace(/ /g,"~")}`}>
                      View
                    </Link>
                  </details>
                </div>
              ))
             
            ) : (
              <div className="loader" style={{ marginTop: 20 }}></div>
            )}
          </div>

          {/* //Pagination Control */}
          {blogLoaded && maindata.length > 4 ? (
            <div className="pagination-control">
              <div className="blog-nav-container">
                <h3>
                  Page {currentPage} of {parseInt(Math.ceil(maindata.length / 4))}
                </h3>
                <div>
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}               disabled={currentPage === 1}
                  >
                  <i class="fa-solid fa-arrow-left"></i>
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={endIndex >= maindata.length}
                >
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          {blogLoaded ? (<div className="showformbtn">
            <button
              className="btnshow"
              onClick={() => {
                if (showpost == "Write Blog") {
                  document.querySelector(".formm").style.display = "block";
                  setShowpost("Blog");
                } else {
                  document.querySelector(".formm").style.display = "none";
                  setShowpost("Write Blog");
                }
              }}
            >
              <i class='fa-solid fa-pen-nib'></i>   &nbsp;   {showpost}
            </button>
          </div>):(<></>)}
        </div>
        {/* //form */}
        <div className="formm">
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <h2>Post Blog</h2>
            </div>
            <div className="form-group">
              <label style={{color
    : "black"}} htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                onChange={handleChange}
                value={formValues.title}
                required
              />
            </div>
            <div className="form-group">
              <label style={{color
    : "black"}} htmlFor="image">Image</label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="form-group">
              <label style={{color
    : "black"}} htmlFor="content">Content</label>
              <textarea
                name="content"
                id="content"
                cols="50"
                rows="10"
                onChange={handleChange}
                value={formValues.content}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label style={{color
    : "black"}} htmlFor="content">Summary</label>
              <textarea
                name="summary"
                id="summary"
                cols="50"
                rows="10"
                onChange={handleChange}
                value={formValues.summary}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label style={{color
    : "black"}} htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
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
            </div>
            <div className="form-group">
              <button className="submitbtn" type="submit">
                {button}
              </button>
            </div>
            <div className="form-group success">{success}</div>
          </form>
        </div>
      </div>
      <div className="lgdiv" style={{marginBottom: 80}}>
        <button
          className="navbtn"
          onClick={() => {
            removeCookie("token");
            navigate("/");
          }}
        >
          LOGOUT
        </button>
      </div>
    </>
  );
}
