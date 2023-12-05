import React from "react";
import { useState, useEffect } from "react";
import "./Home.css";
import { Helmet } from "react-helmet";
import BlogCard from "../BlogCard/BlogCard";
import SkeletonLoader from "../Skeleton/SkeletonLoader";
import Footer from "../footer/Footer";

export const Home = () => {
  const storedData = JSON.parse(sessionStorage.getItem("blogs"));
  const [Blogs, setBlogs] = useState(null);
  const [loaded, setloaded] = useState(false);
  const [searchQuery, setsearchQuery] = useState({ query: "" });

  const getData = async () => {
    await fetch("https://nk-blog-theta.vercel.app/get")
      .then((res) => res.json())
      .then((data) => {
        sessionStorage.setItem("blogs", JSON.stringify(data.blogs));
        setBlogs(data.blogs);
        setloaded(true);
      });
  };

  function HandleChange(e) {
    const { name, value } = e.target;
    setsearchQuery({ ...searchQuery, [name]: value });
    console.log(searchQuery, searchQuery.query.length);
    if (searchQuery.query.length === 1) {
      getData();
    }
  }

  async function getSearchBlogs() {
    setloaded(false);
    await fetch("https://nk-blog-theta.vercel.app/blog/search/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchQuery),
    }).then((res) =>
      res.json().then((data) => {
        setBlogs(data.blogs);
        setloaded(true);
      })
    );
  }

  useEffect(() => {
    // if (!storedData) {
    //   getData();
    // }else{
    //   setBlogs(storedData)
    // }
    // setTimeout(() => {
    //   sessionStorage.clear();
    // }, 20000);
    getData();
  }, []);

  return (
    <>
      <Helmet>
        <title>ContentCanvas</title>
        <meta
          name="description"
          content="ContentCanvas an React app that gives user to view, share and create your own blog"
        />
        <link rel="canonical" href="https://contentcanvas.netlify.app/" />
      </Helmet>

      <div className="search-container" onSubmit={getSearchBlogs}>
        <input
          type="search"
          id="searchInput"
          onSubmit={getSearchBlogs}
          onChange={HandleChange}
          className="search-input"
          name="query"
          placeholder="Search Blog"
        />
        <button
          type="button"
          className="search-button"
          style={{ display: "flex" }}
          onClick={getSearchBlogs}
        >
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <div className="blog-container">
        {loaded ? (
          Blogs.map((data) => <BlogCard data={data} />)
        ) : (
          <div className="">
            
          <SkeletonLoader/>
          <SkeletonLoader/>
          <SkeletonLoader/>
          <SkeletonLoader/>
  
  
         </div>
        )}
      </div>
  
    </>
  );
};
