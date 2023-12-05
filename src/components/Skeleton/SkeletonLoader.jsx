import React from "react";
import style from "./SkeletonLoaderStyle.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = () => {
  return (
    <div className={style.Skeletoncontainer}>
      <div className={style.leftContainer}>  
      </div>
      <div className={style.rightContainer}>
        <div className={style.heading}></div>
        <div className={style.content}></div>
        <div className={style.content}></div>
        <div className={style.date}></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
