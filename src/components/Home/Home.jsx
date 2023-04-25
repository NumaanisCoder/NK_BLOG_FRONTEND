import React from "react";
import { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

export const Home = () => {
  const [Blogs, setBlogs] = useState(null);
  const [loaded, setloaded] = useState(false);

  function random(milliseconds) {
    const date = new Date(milliseconds);
    const formattedDate = date.toLocaleString();
    return formattedDate.substring(0,9);
  }
  useEffect(() => {
    const getData = async () => {
      await fetch("https://nk-blog-theta.vercel.app/get")
        .then((res) => res.json())
        .then((data) => {
          setBlogs(data.blogs);
          setloaded(true);
          console.log(data.blogs); 
        });
    };
    getData();
  }, []);
  return (
    <>
      <div>
        {loaded ? (
          Blogs.map((data) => (
            <div className="blog" key={data._id}>
              {console.log(data._id)}
              <h1>{data.title}</h1>
              <p className="cate">
                Created By:{" "}
                <span className="category">{data.user.username}</span>
              </p>
              <img src={data.image} alt="" />
              <div className="container1">
                <div>
              <Link className="Link" to={`/blog/${data._id}`}>READ</Link>
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
              <hr />
            </div>
          ))
        ) : (
          <div className="loading">
            <h1>Loading..</h1>
          </div>
        )}
      </div>
    </>
  );
};
