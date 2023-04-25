import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Blog.css'

const Blog = () => {
    const {id} = useParams();
    console.log(id)
    const [blog, setblog] = useState(null);
    const [Loading, setLoading] = useState(false);

    const fetchBlog = async () =>{
        await fetch(`https://nk-blog-theta.vercel.app/blog/${id}`).then((res)=> res.json().then((data) => {setblog(data.blog); setLoading(true)}));
    }
    useEffect(() => { 
        fetchBlog();
    }, [])
  return (
    <div>
        {Loading ? <>
        <div className='viewblog'>
        <h1 className='blog-title'>{blog.title}</h1>
        <img src={blog.image} alt="" />
        <p className='blog-content'>{blog.content}</p>
        <p className='author-p'>Posted By: <span className='author'>{blog.user.username}</span></p>
        </div>
        
        </> : <h1>Loading...</h1>}
    </div>
  )
}

export default Blog
