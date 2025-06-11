import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [clearMessages, setClearMessages] = useState<(() => void) | null>(null);

  const handleSidebarToggle = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClearMessages = (): void => {
    if (clearMessages) {
      clearMessages();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={handleSidebarToggle}
        onClearMessages={handleClearMessages}
      />
      
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <ChatInterface onClearMessages={(fn) => setClearMessages(() => fn)} />
      </div>
    </div>
  );
};

export default App;