import React from 'react';

const LoadingIndicator: React.FC = () => {
  return (
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
  );
};

export default LoadingIndicator;