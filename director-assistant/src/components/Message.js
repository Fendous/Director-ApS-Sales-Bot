import React from "react";
//import "./Chat.css";

function Message({ text, sender }) {
    return (
        <div className={`message ${sender}`}>
            <p>{text}</p>
        </div>
    );
}

export default Message;
