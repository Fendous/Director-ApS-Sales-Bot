import React, { useState } from "react";
import { FaMicrophone } from "react-icons/fa";

const VoiceInput = () => {
  const [listening, setListening] = useState(false);

  const startListening = () => {
    const recognition = new window.SpeechRecognition();
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      alert(`Recognized speech: ${transcript}`);
    };
    recognition.start();
  };

  return (
    <button className="voice-input" onClick={startListening}>
      <FaMicrophone size={20} color={listening ? "red" : "black"} />
    </button>
  );
};

export default VoiceInput;
