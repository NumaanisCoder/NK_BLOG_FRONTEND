import React from "react";
import { useState, useEffect } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet'
import { LazyLoadImage } from "react-lazy-load-image-component";


const Home = () => {

  const [Load, setLoad] = useState(false);
  const navigate = useNavigate();
  const [Blogs, setBlogs] = useState(null);
  const [loaded, setloaded] = useState(false);
  const [searchQuery, setsearchQuery] = useState({query: ""});
  const [ValidQuery, setValidQuery] = useState(false);

  const getData = async () => {
    await fetch("https://nk-blog-theta.vercel.app/get") 
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.blogs);
        setloaded(true);
      });  
  };

  function HandleChange(e){
    const {name, value} = e.target;
    setsearchQuery({...searchQuery, [name]: value})
    console.log(searchQuery, searchQuery.query.length);
    if(searchQuery.query.length === 1){
      getData();
    }
  }

  function random(milliseconds) {
    const date = new Date(milliseconds);
    const formattedDate = date.toLocaleString();
    return formattedDate;
  } 

  function HandleLoad(){
    setLoad(true);
  }


  async function getSearchBlogs(){
    setloaded(false);
    await fetch('https://nk-blog-theta.vercel.app/blog/query', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchQuery)
    })
    .then(res => res.json().then(data => {setBlogs(data.blogs); setloaded(true)}))
  } 
  
  useEffect(() => {

    getData();

  }, []);

  return (
    <>
        <Helmet>
        <title>NK Blogs</title>
        <meta
      name="description"
      content="NK Blogs an React app that gives user to view, share and create your own blog"
    />
      </Helmet>

  
       <div className="search-container" onSubmit={getSearchBlogs}>
  <input type="search" id="searchInput" onSubmit={getSearchBlogs} onChange={HandleChange} className="search-input" name="query" placeholder="Search Blog" />

  <button type="button" className="search-button" style={{display: "flex"}} onClick = {getSearchBlogs}><i class="fa-solid fa-magnifying-glass"></i></button>  
    </div>
    <div className="blog-container">
        {loaded ? (
          Blogs.map((data) => (
            <div className="blog" key={data._id}>

              <h1>{data.title}</h1>
              <p className="cate">
                Created By:{" "}
                <span className="category">{data.user.username }</span>
              </p>
              <div className="imageDiv">
              <LazyLoadImage onClick={()=>{
                const title = data.title.replace(/ /g,"~");
                navigate(`/blog/${title}`) 
              }}
               src={data.image}
              effect="blur"
              alt="Image Alt"
              
              placeholderSrc={data.image}
              className="imagee"
      />
              </div>
               
              <div className="container1">
                <div>
              <Link className="Link" to={`/blog/${data.title.replace(/ /g,"~")}`}><i class="fa-brands fa-readme"></i></Link>
                </div>
                <div>
                  <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                  <div style={{marginRight: 4}}><i class="fa-regular fa-eye"></i></div> 
                  <div style={{fontSize: 18}}>{Math.ceil(data.views/2)}</div>
                  </div>
                <p className="cate">
                Posted On: 
                <span className="date2"> {random(data.createdAt)}</span>
              </p>
                </div>
            
              </div>
              <p className="cate">
                Category: <span className="category">{data.category}</span>
              </p>

            </div>
          ))
        ):
        (
          <div className="loader-container">
            <div className="containerloader loader">
            </div>
          </div>
        )}
      </div>
      
    </>

);
};
