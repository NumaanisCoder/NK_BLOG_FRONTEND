import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Blog.css'
import { Helmet } from 'react-helmet'
import WhatsAppShareButton from '../shareButton/washarebtn'
import SkeletonLoader from '../Skeleton/SkeletonLoader'
import ReactMarkdown from 'react-markdown'
import Footer from '../footer/Footer'



const Blog = () => {
    const {title} = useParams();
    const [blog, setblog] = useState(null);
    const [lightMode, setlightMode] = useState("Light Mode"); 
    const [Loading, setLoading] = useState(false);

    const fetchBlog = async () =>{
        await fetch(`https://nk-blog-theta.vercel.app/blog/${title}`, {method: "POST"}).then((res)=> res.json().then((data) => {setblog(data.blog); setLoading(true)}));
    }
    useEffect(() => { 
        fetchBlog();
    }, [])
  return (
    <div>
     
        {Loading ? <>
          <Helmet>
          <link rel='canonical' href={`https://contentcanvas.netlify.app/blog/${blog.title.replace(/ /g,"~")}`} />
        <title>{blog.title}</title>
        <meta name="description" content={blog.content.substring(0,165)} />
      </Helmet>
        <div className='viewblog'>
        <h1 className='blog-title'>{blog.title}</h1>
        <p className='author-p'>Posted By: <span className='author'>{blog.user.username}</span></p>
        <p className='category'>Category : <span style={{color: 'blue'}}>{blog.category}</span></p>
        <p style={{marginLeft: 14, fontWeight: 500}}>Total Views: <span style={{color: 'blue'}}>{Math.ceil(blog.views/2)}</span></p>
        <img src={blog.image} alt="" />
        <br />
       
        <p className="blog-content"  dangerouslySetInnerHTML={{ __html: blog.content }}></p>
   

        <WhatsAppShareButton shareUrl={`https://contentcanvas.netlify.app/blog/${blog.title.replace(/ /g,"~")}`}/>
        </div>

        </> : <div className="" >
          
          <SkeletonLoader/>
          </div>} 
    </div>
  ) 
}

export default Blog
