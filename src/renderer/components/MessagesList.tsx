import React from 'react';
import { Message } from './types';
import MessageBubble from './MessageBubble';
import LoadingIndicator from './LoadingIndicator';

interface MessagesListProps {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

const MessagesList: React.FC<MessagesListProps> = ({ messages, isLoading, messagesEndRef }) => {
  return (
    <div className="flex-1 overflow-y-auto pb-20">
      <div className="max-w-3xl mx-auto py-8">
        {messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            isFirstTwo={index < 2}
            index={index}
          />
        ))}
        {isLoading && <LoadingIndicator />}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessagesList;