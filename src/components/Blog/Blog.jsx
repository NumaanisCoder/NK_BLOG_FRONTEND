import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Blog.css'
import { Helmet } from 'react-helmet'
import AdSense from '../Adsense/Adsense'
import ThemeButton from '../ThemeButton/ThemeButton'
import WhatsAppShareButton from '../shareButton/washarebtn'



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
        <p style={{marginLeft: 14, fontWeight: 500}}>Total Views: <span style={{color: 'blue'}}>{Math.ceil(blog.views/2)}</span></p>
        <img src={blog.image} alt="" />
        <br />
       
            
        <p className='blog-content'>{blog.content}</p>

        <WhatsAppShareButton shareUrl={`https://contentcanvas.netlify.app/blog/${blog.title.replace(/ /g,"~")}`}/>
        </div>
        
        </> : <div className="containerloader" style={{marginTop: 160}}>
          <div className='loader'></div>
          </div>} 
    </div>
  )
}

export default Blog
