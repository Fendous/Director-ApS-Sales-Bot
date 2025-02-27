import React from "react";
import { FaPaperclip } from "react-icons/fa";

const FileUpload = () => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`File uploaded: ${file.name}`);
    }
  };

  return (
    <label className="file-upload">
      <FaPaperclip size={20} />
      <input type="file" onChange={handleFileUpload} style={{ display: "none" }} />
    </label>
  );
};

export default FileUpload;
