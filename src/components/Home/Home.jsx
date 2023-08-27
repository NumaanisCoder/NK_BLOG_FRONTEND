import React from "react";
import { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { FirstName } from "../../App";
import axios, { Axios } from "axios";
import { useImage } from "react-image";
import { LazyLoadImage } from "react-lazy-load-image-component";
import eyeIcon from './eyeimage.png';

export const Home = () => {

  const [Load, setLoad] = useState(false);

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
    document.querySelector('button').innerText = 'Searching...'
    await fetch('https://nk-blog-theta.vercel.app/blog/query', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchQuery)
    })
    .then(res => res.json().then(data => {setBlogs(data.blogs); setloaded(true); document.querySelector('button').innerText = 'Search'}))
  } 
  
  useEffect(() => {

    getData();

  }, []);

  return (
    <>
       

       <div>

       <div className="search-container">
  <input type="search" id="searchInput" onSubmit={getSearchBlogs} onChange={HandleChange} className="search-input" name="query" placeholder="Search Blog" />
  <button type="button" className="search-button" onClick = {getSearchBlogs}>Search</button>
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
              <LazyLoadImage
               src={data.image}
              effect="blur"
              alt="Image Alt"
              
              placeholderSrc={data.image}
              className="imagee"
      />
              </div>
               
              <div className="container1">
                <div>
              <Link className="Link" to={`/blog/${data._id}`}>READ <img className="eye-icon" src={eyeIcon} alt="" /></Link>
                </div>
                <div>
                <p className="datee">
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
          <div className="containerloader">
          <div className="loader">
          </div>
          </div>
        )}
      </div>
      </div>
    </>

);
};
