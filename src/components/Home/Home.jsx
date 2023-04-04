import React from "react";
import { useState, useEffect } from "react";
import './Home.css';

export const Home = () => {
  const [Blogs, setBlogs] = useState(null);
  const [loaded, setloaded] = useState(false);
  useEffect(() => {
    const getData = async () =>{
    await fetch("/get")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.blogs);
        setloaded(true);
        console.log(data.blogs);
      });
    }
    getData();
  }, []);
  return <>
  <div>
  {loaded ? Blogs.map(data => (
        <div className="blog" key={data._id}>
          <h1>{data.title}</h1>
          <p className="cate">Created By: <span className="category">{data.user.username}</span></p>
          <img src={data.image} alt="" />
          <p>{data.content}</p>
          <p className="cate">Category: <span className="category">{data.category}</span></p>
          <hr />
        </div>
      ))
      : <h1>Loading..</h1>}
  </div>
  </>;
};
