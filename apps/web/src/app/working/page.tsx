'use client';

import { useState, useEffect } from 'react';

export default function WorkingPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-8 animate-pulse">
            <div className="w-20 h-20">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="48" fill="#87CEEB"></circle>
                <path d="M15 25 C15 15, 25 10, 50 10 C75 10, 85 15, 85 25 C85 35, 75 40, 50 40 L30 50 L20 45 Z" fill="white" stroke="#E5E7EB" strokeWidth="0.5"></path>
                <g transform="translate(50, 25)">
                  <ellipse cx="0" cy="0" rx="12" ry="8" fill="#4A90E2"></ellipse>
                  <circle cx="-8" cy="-3" r="6" fill="#4A90E2"></circle>
                  <path d="M-5 -5 C-12 -8, -15 -2, -12 2 C-9 5, -2 1, -5 -5 Z" fill="#4A90E2"></path>
                  <path d="M2 -2 C-2 -4, -5 0, -2 2 C1 4, 5 1, 2 -2 Z" fill="#4A90E2"></path>
                  <path d="M12 0 L20 -5 L18 5 L12 0 Z" fill="#4A90E2"></path>
                  <circle cx="-10" cy="-5" r="2" fill="white"></circle>
                  <path d="M-14 -2 L-18 0 L-14 2 Z" fill="#4A90E2"></path>
                </g>
              </svg>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
            <div className="space-y-2">
              <p className="text-gray-700 text-lg font-medium">Loading Lyvo...</p>
              <p className="text-gray-500 text-sm">Preparing your messaging experience...</p>
            </div>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Lyvo</h1>
            <p className="text-sm text-gray-500">Modern Messaging</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900">Welcome to Lyvo!</h3>
                <p className="text-sm text-blue-700">Your modern messaging platform is ready.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white border-b border-gray-200 p-4">
            <h2 className="text-xl font-semibold text-gray-900">General Chat</h2>
            <p className="text-sm text-gray-500">Start a conversation</p>
          </div>
          
          <div className="flex-1 p-4">
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No messages yet</h3>
                <p className="text-gray-500 mb-4">Start a conversation by typing a message below.</p>
              </div>
            </div>
          </div>
          
          {/* Message Input */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}