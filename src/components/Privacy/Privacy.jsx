import React from "react";
import style from './Privacy.module.css';

const Privacy = () => {
  return (
    <div className={style.PrivacyContainer}>
      <h2>Privacy Policy for Content Canvas</h2>

      <p style={{textAlign: 'left'}}>
        <strong>Effective Date:</strong> 16/11/2023
      </p>

      <p>
        Thank you for choosing Content Canvas. This Privacy Policy is designed
        to help you understand how we collect, use, and safeguard your personal
        information. Please take a moment to familiarize yourself with our
        privacy practices.
      </p>

      <h3>Data Sharing</h3>

      <p>
        We may share information about the types of blogs you view most with
        Ads Company for the purpose of analytics and advertising. This data sharing
        enables us to improve our services and provide you with more relevant
        content and advertisements.
      </p>

      <p>
        By using Content Canvas, you agree to the terms outlined in this Privacy
        Policy.
      </p>
    </div>
  );
};

export default Privacy;
