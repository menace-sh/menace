import React from 'react';
import { Message } from './types';

interface MessageBubbleProps {
  message: Message;
  isFirstTwo: boolean;
  index: number;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isFirstTwo, index }) => {
  return (
    <div
      className={`mb-4 ${isFirstTwo ? 'animate-fade-in' : ''} ${
        message.role === 'user' ? 'flex justify-end' : ''
      }`}
      style={{
        animationDelay: isFirstTwo ? `${index * 100}ms` : '0ms'
      }}
    >
      <div className="max-w-[70%]">
        <div className={`p-4 rounded-lg inline-block ${
          message.role === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-100'
        }`}>
          {message.role === 'assistant' && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                A
              </div>
              <div className="flex-1">
                <p className="text-gray-800 whitespace-pre-wrap">{message.text}</p>
              </div>
            </div>
          )}
          {message.role === 'user' && (
            <p className="whitespace-pre-wrap">{message.text}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;