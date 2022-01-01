import React from "react";
import  './errorMess.css'
function ErrorMessage({message}) {
   return <div className ="error-message">
    <p>{message}</p>
   
   </div>;
};

export default ErrorMessage;