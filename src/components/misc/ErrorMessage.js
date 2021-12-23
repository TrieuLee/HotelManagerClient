import React from "react";

function ErrorMessage({message, clear}) {
   return <div className ="error-message">
    <p>{message}</p>
    <button onClick={clear}>Xóa</button>
   </div>;
};

export default ErrorMessage;