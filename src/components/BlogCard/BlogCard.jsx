import React,{useEffect, useState} from 'react'
import styles from './BlogCardStyle.module.css';
import { Link } from 'react-router-dom';
import removeMarkdown from '../../tests/markDownRemoval';

const BlogCard = ({data}) => {
const {_id,title,image,content,category,createdAt} = data;
const [Sliced, setSliced] = useState(content.slice(0,400))
const urlpart = title.replace(/ /g,'~');

function random(milliseconds) {
  const date = new Date(milliseconds);
  const formattedDate = date.toLocaleString();
  return formattedDate;
} 
function removeHtmlTags(input) {
  return input.replace(/<\/?[^>]+(>|$)/g, "");
}

useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth > 768) {
      setSliced(content.slice(0, 1000));
    }
  };
  window.addEventListener('resize', handleResize);
  handleResize();
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, [content]);

const {username} = data.user;

  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <img src={image} alt="" srcset="" /> 
      </div>
      <div className={styles.text_container}> 
      <div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.username}>By <span style={{color: "var(--main-color)", fontWeight:600}}>{username}</span></p>
      </div>
        <p className={styles.content}>{removeHtmlTags(Sliced)}....</p>
        <div className={styles.linkCategoryDiv}>
        <p className={styles.Link}><Link to={`/blog/${urlpart}`}>Read More</Link></p>
        <p className={styles.category}>Category: <span style={{color: "var(--main-color)", fontWeight:600}}>{category}</span></p>
        </div>
        <p className={styles.date}>Date: <span style={{color: "var(--main-color)", fontWeight:600}}>{random(createdAt)}</span></p>
      </div>
    </div>
  )
}

export default BlogCard
