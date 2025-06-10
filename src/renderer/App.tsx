import React, { useState } from 'react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'editor' | 'console' | 'settings'>('editor');

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Menace</h1>
          <span className="text-sm text-gray-400">Open Source Codex</span>
        </div>
      </header>

      <div className="bg-gray-800 border-b border-gray-700">
        <div className="flex space-x-1 px-4">
          {(['editor', 'console', 'settings'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'text-white border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {activeTab === 'editor' && (
          <div className="h-full flex">
            <div className="w-64 bg-gray-800 border-r border-gray-700 p-4">
              <h2 className="text-sm font-semibold text-gray-400 mb-4">Files</h2>
              <div className="space-y-1">
                {['main.js', 'index.html', 'styles.css'].map((file) => (
                  <div
                    key={file}
                    className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded cursor-pointer transition-colors"
                  >
                    {file}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 p-6">
              <div className="bg-gray-800 rounded-lg border border-gray-700 h-full p-4">
                <pre className="text-sm text-gray-300 font-mono">
                  <code>{`// Welcome to Menace
// Start coding here...

function main() {
  console.log('Hello from Menace!');
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'console' && (
          <div className="h-full p-6">
            <div className="bg-gray-800 rounded-lg border border-gray-700 h-full p-4">
              <pre className="text-sm text-green-400 font-mono">
{`$ npm start
> menace@1.0.0 start
> electron .

[INFO] Application started successfully
[INFO] Renderer process initialized`}
              </pre>
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="h-full p-6">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Appearance</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Theme</span>
                      <select className="bg-gray-700 text-gray-300 px-3 py-1 rounded">
                        <option>Dark</option>
                        <option>Light</option>
                        <option>System</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-800 border-t border-gray-700 px-4 py-2">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Ready</span>
          <span>TypeScript | UTF-8</span>
        </div>
      </div>
    </div>
  );
};

export default App;