import React, { useState, useRef, useEffect } from 'react';
import { Message } from './types';
import WelcomeScreen from './WelcomeScreen';
import MessagesList from './MessagesList';
import ChatInput from './ChatInput';

interface ChatInterfaceProps {
  onClearMessages?: (clearFn: () => void) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onClearMessages }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (onClearMessages) {
      onClearMessages(() => {
        setMessages([]);
        setIsLoading(false);
      });
    }
  }, [onClearMessages]);

  const createMessage = (text: string, role: 'user' | 'assistant'): Message => ({
    id: Date.now().toString() + (role === 'assistant' ? '1' : ''),
    text,
    role,
    timestamp: new Date(),
  });

  const simulateAssistantResponse = (): void => {
    setTimeout(() => {
      const assistantMessage = createMessage('This is a simulated response. Connect your backend here!', 'assistant');
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const messageText = inputText;
    setInputText('');

    if (messages.length === 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        const userMessage = createMessage(messageText, 'user');
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);
        setIsTransitioning(false);
        simulateAssistantResponse();
      }, 800);
    } else {
      const userMessage = createMessage(messageText, 'user');
      setMessages(prev => [...prev, userMessage]);
      setIsLoading(true);
      simulateAssistantResponse();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 relative overflow-hidden">
      {messages.length === 0 ? (
        <WelcomeScreen
          inputText={inputText}
          isLoading={isLoading}
          isTransitioning={isTransitioning}
          onInputChange={setInputText}
          onSubmit={handleSubmit}
        />
      ) : (
        <>
          <MessagesList
            messages={messages}
            isLoading={isLoading}
            messagesEndRef={messagesEndRef}
          />
          <div className="w-full px-4 pb-4">
            <div className="max-w-3xl mx-auto">
              <ChatInput
                inputText={inputText}
                isLoading={isLoading}
                onInputChange={setInputText}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatInterface;