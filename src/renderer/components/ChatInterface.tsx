import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatInterfaceProps {
  onClearMessages?: (clearFn: () => void) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onClearMessages }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [inputText]);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const messageText = inputText;
    setInputText(''); // Clear immediately

    // Trigger transition if this is the first message
    if (messages.length === 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        const userMessage: Message = {
          id: Date.now().toString(),
          text: messageText,
          role: 'user',
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);
        setIsTransitioning(false);

        // Simulate assistant response
        setTimeout(() => {
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: 'This is a simulated response. Connect your backend here!',
            role: 'assistant',
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, assistantMessage]);
          setIsLoading(false);
        }, 1000);
      }, 800);
    } else {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: messageText,
        role: 'user',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);
      setIsLoading(true);

      // Simulate assistant response
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'This is a simulated response. Connect your backend here!',
          role: 'assistant',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 relative overflow-hidden">
      {/* Header and Messages */}
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col">
          {/* Title and description with fade animation */}
          <div className="flex-1 flex items-center justify-center">
            <div className={`text-center transition-all duration-700 ease-out ${isTransitioning ? 'opacity-0 transform -translate-y-8' : 'opacity-100 transform translate-y-0'}`}>
              <h1 className="text-4xl font-semibold text-gray-800 mb-4">Menace AI Assistant</h1>
              <p className="text-gray-600">How can I help you today?</p>
            </div>
          </div>
          
          {/* Input Container - Animated from center to bottom */}
          <div className={`w-full px-4 transition-all duration-700 ease-out ${isTransitioning ? 'pb-4' : 'pb-32'}`}>
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmit} className="relative">
                <textarea
                  ref={textareaRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Send a message..."
                  className="w-full p-4 pr-12 rounded-lg shadow-lg focus:outline-none bg-white resize-none overflow-hidden"
                  rows={1}
                  style={{ minHeight: '56px', height: 'auto' }}
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto pb-20">
            <div className="max-w-3xl mx-auto py-8">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`mb-4 ${index < 2 ? 'animate-fade-in' : ''} ${
                    message.role === 'user' ? 'flex justify-end' : ''
                  }`}
                  style={{
                    animationDelay: index < 2 ? `${index * 100}ms` : '0ms'
                  }}
                >
                  <div className={`${message.role === 'user' ? 'max-w-[70%]' : 'max-w-[70%]'}`}>
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
              ))}
              {isLoading && (
                <div className="mb-4">
                  <div className="max-w-[70%]">
                    <div className="p-4 bg-gray-100 rounded-lg inline-block">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                          <div className="animate-pulse text-white text-sm font-semibold">A</div>
                        </div>
                        <div className="flex-1">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Container - Bottom */}
          <div className="w-full px-4 pb-4">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmit} className="relative">
                <textarea
                  ref={textareaRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Send a message..."
                  className="w-full p-4 pr-12 rounded-lg shadow-lg focus:outline-none bg-white resize-none overflow-hidden"
                  rows={1}
                  style={{ minHeight: '56px', height: 'auto' }}
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatInterface;