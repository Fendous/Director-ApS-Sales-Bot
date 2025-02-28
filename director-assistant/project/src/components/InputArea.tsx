import React, { useState } from 'react';
import { Send } from 'lucide-react';
import VoiceInput from './VoiceInput';
import FileUpload from './FileUpload';
import { FileAttachment } from '../types';

interface InputAreaProps {
  onSendMessage: (message: string, attachments: FileAttachment[]) => void;
  isLoading: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || attachments.length > 0) {
      onSendMessage(message, attachments);
      setMessage('');
      setAttachments([]);
    }
  };

  const handleVoiceInput = (text: string) => {
    setMessage((prev) => prev + ' ' + text);
  };

  const handleFileUpload = (files: FileList) => {
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newFile: FileAttachment = {
          id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          name: file.name,
          type: file.type,
          size: file.size,
          content: e.target?.result || null
        };
        setAttachments(prev => [...prev, newFile]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveFile = (id: string) => {
    setAttachments(prev => prev.filter(file => file.id !== id));
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <div className="flex-1 bg-gray-100 rounded-lg p-2">
          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {attachments.map(file => (
                <div key={file.id} className="bg-indigo-100 text-indigo-800 text-xs rounded px-2 py-1 flex items-center">
                  <span className="truncate max-w-[150px]">{file.name}</span>
                  <button 
                    type="button" 
                    onClick={() => handleRemoveFile(file.id)}
                    className="ml-1 text-indigo-600 hover:text-indigo-800"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-end">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 bg-transparent border-0 focus:ring-0 resize-none max-h-[150px] min-h-[40px]"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <div className="flex space-x-2 ml-2">
              <FileUpload 
                attachments={attachments} 
                onFileUpload={handleFileUpload} 
                onRemoveFile={handleRemoveFile} 
              />
              <VoiceInput onVoiceInput={handleVoiceInput} />
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading || (!message.trim() && attachments.length === 0)}
          className={`p-3 rounded-full ${
            isLoading || (!message.trim() && attachments.length === 0)
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default InputArea;