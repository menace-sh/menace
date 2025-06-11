import React from 'react';
import ChatInput from './ChatInput';

interface WelcomeScreenProps {
  inputText: string;
  isLoading: boolean;
  isTransitioning: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  inputText,
  isLoading,
  isTransitioning,
  onInputChange,
  onSubmit
}) => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className={`text-center transition-all duration-700 ease-out ${
          isTransitioning ? 'opacity-0 transform -translate-y-8' : 'opacity-100 transform translate-y-0'
        }`}>
          <h1 className="text-4xl font-semibold text-gray-800 mb-4">Menace AI Assistant</h1>
          <p className="text-gray-600">How can I help you today?</p>
        </div>
      </div>
      
      <div className={`w-full px-4 transition-all duration-700 ease-out ${
        isTransitioning ? 'pb-4' : 'pb-32'
      }`}>
        <div className="max-w-3xl mx-auto">
          <ChatInput
            inputText={inputText}
            isLoading={isLoading}
            onInputChange={onInputChange}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;