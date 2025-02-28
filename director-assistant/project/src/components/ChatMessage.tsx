import React from 'react';
import { Message } from '../types';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${isUser ? 'bg-indigo-100 ml-3' : 'bg-gray-200 mr-3'}`}>
          {isUser ? <User className="h-5 w-5 text-indigo-600" /> : <Bot className="h-5 w-5 text-gray-700" />}
        </div>
        <div className={`p-3 rounded-lg ${isUser ? 'message-user rounded-tr-none' : 'message-assistant rounded-tl-none'}`}>
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          <p className="text-xs mt-1 opacity-70">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;