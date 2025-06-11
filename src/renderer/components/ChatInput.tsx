import React, { useRef, useEffect } from 'react';
import SendIcon from './SendIcon';

interface ChatInputProps {
  inputText: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  inputText, 
  isLoading, 
  onInputChange, 
  onSubmit 
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [inputText]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e as any);
    }
  };

  return (
    <form onSubmit={onSubmit} className="relative">
      <textarea
        ref={textareaRef}
        value={inputText}
        onChange={(e) => onInputChange(e.target.value)}
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
        <SendIcon />
      </button>
    </form>
  );
};

export default ChatInput;