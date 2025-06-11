import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onClearMessages?: () => void;//this is purely for debugging...
}

interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, onClearMessages }) => {
  const sidebarItems: SidebarItem[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'projects', label: 'Projects' },
    { id: 'settings', label: 'Settings' },
    { id: 'help', label: 'Help' },
    { id: 'clear', label: 'Clear', onClick: onClearMessages },
  ];

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white transition-all duration-300 ease-in-out z-40 ${
          isOpen ? 'w-64' : 'w-16'
        }`}
      >
        {/* Toggle Button - fixed square size */}
        <button
          onClick={onToggle}
          className="absolute top-4 right-4 w-10 h-10 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center"
          aria-label="Toggle sidebar"
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
              d={isOpen ? "M11 19l-7-7 7-7m8 14l-7-7 7-7" : "M13 5l7 7-7 7M5 5l7 7-7 7"}
            />
          </svg>
        </button>
        
        <div className="px-4 pt-16">
          
          <h2 className={`text-xl font-semibold mb-6 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>Menu</h2>
          <nav>
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={item.onClick}
                    className="w-full text-left py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200 flex items-center"
                  >
                    <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                      {item.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;