import React, { useEffect, useState } from 'react'
import './Edit.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Instruction from '../Helper/Instruction';

const Edit = () => {
    const {id} = useParams();
    const navigate = useNavigate();
     
      const [formErrors, setformErrors] = useState({});
      const [button, setButton] = useState("Update");
      const [success, setSuccess] = useState("");
      const [file, setfile] = useState(null)
      const [canBeSubmitted, setcanBeSubmitted] = useState(false);
      const url = 'https://nk-blog-theta.vercel.app';
      let formData = new FormData(); 
      const [blog, setblog] = useState(null);
      const [Loading, setLoading] = useState(false);
     
    const initialValues = {title:"", content: "", category:"",summary:""};
    const [formValues, setFormValues] = useState(initialValues);
      
      function submitHandler(event) {
        event.preventDefault();
        console.log(formData)
        setformErrors(validate(formValues));
        if (Object.keys(formErrors).length === 0) {
          setcanBeSubmitted(true);
          setButton("Updating..");
        } else {
          setcanBeSubmitted(false);
          setButton("Update");
        }
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
    function submitHandler(event) {
        event.preventDefault();
        console.log(formData)
        setformErrors(validate(formValues));
        if (Object.keys(formErrors).length === 0) {
          setcanBeSubmitted(true);
          setButton("Updating..");
        } else {
          setcanBeSubmitted(false);
          setButton("Post");
        }
      }

      const fetchBlog = async () =>{
        await fetch(`${url}/blog/id/${id}`).then((res)=> res.json().then((data) => {setFormValues(data.blog); setLoading(true)})); 
    }

      useEffect(() => {
            fetchBlog();
             //Blog Post

    if (canBeSubmitted) {
        formData.append('title',formValues.title);
        formData.append('content',formValues.content);
        formData.append('category',formValues.category);
        formData.append('summary',formValues.summary);
        formData.append('image',file)
        console.log("File is: ",formData.get('image'));
        console.log("Title is: ",formData.get('title'));
        console.log("Category is: ",formData.get('category'));
        console.log("content is: ",formData.get('content'));
        axios.put(`${url}/userblogs/update/${id}`,formData)
          .then((res) => {
            const { success } = res.data; 
            if (success) {
              setSuccess("Updated..");
              setButton("Updated");
              setTimeout(() => {
                setFormValues({ title: "", image: "", content: "",category:"" });
                setSuccess("");
                setButton("Post");
                setcanBeSubmitted(false);
                navigate('/prof')
              }, 2000);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
        }, [canBeSubmitted])
        

  return (
   <>
{Loading ? (
    <div className="EditForm">
        <form onSubmit={submitHandler}>
  <div className="form-group">
    <h2>Update Blog</h2>
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
    <p>{formValues.summary.length}</p>
  </div>
  <div className="form-group">
    <label style={{color
    : "black"}} htmlFor="category">Category</label>
    <select
      name="category"
      id="category"
      onChange={handleChange}
      value={formValues.category} 
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
  <div className="form-group success">
    {success}
  </div>
</form>
<div className="edit-helper">
</div>
    </div>
):(
<div className="containerloader">
          <div className="loader">
          </div>
          </div>
    
)}
      
   </>
  )
}

export default Edit
