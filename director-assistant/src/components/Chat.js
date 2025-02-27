import React, { useState, useRef } from "react";
import { FaMicrophone, FaPaperclip, FaPaperPlane } from "react-icons/fa";
//import "./Chat.css";


const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setMessages([...messages, { text: `File: ${file.name}`, sender: "user" }]);
    }
  };

  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();
    recognition.onresult = (event) => {
      setInput(event.results[0][0].transcript);
    };
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-900 text-white p-4">
      <div className="flex-grow overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-xs ${
              msg.sender === "user" ? "bg-blue-600 ml-auto" : "bg-gray-700"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 p-4 border-t border-gray-700">
        <button onClick={() => fileInputRef.current.click()} className="text-gray-400 hover:text-white">
          <FaPaperclip size={20} />
        </button>
        <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
        <button onClick={startListening} className="text-gray-400 hover:text-white">
          <FaMicrophone size={20} />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 bg-gray-800 rounded-lg text-white outline-none"
          placeholder="Type a message..."
        />
        <button onClick={handleSend} className="text-blue-500 hover:text-blue-400">
          <FaPaperPlane size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
