'use client';

import React, { useState } from 'react';
import { Search, Plus, MoreVertical, Settings, LogOut, Moon, Sun } from 'lucide-react';

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  avatar?: string;
}

interface ModernSidebarProps {
  chats: Chat[];
  currentChatId?: string;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
  onSettings: () => void;
  onLogout: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const ModernSidebar: React.FC<ModernSidebarProps> = ({
  chats,
  currentChatId,
  onChatSelect,
  onNewChat,
  onSettings,
  onLogout,
  isDark,
  onToggleTheme
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Lyvo</h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={onSettings}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Settings className="h-5 w-5" />
            </button>
            <button
              onClick={onLogout}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat.id)}
            className={`p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
              currentChatId === chat.id ? 'bg-blue-50 dark:bg-blue-900/20 border-r-2 border-r-blue-500' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {chat.name.charAt(0).toUpperCase()}
                </div>
                {chat.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {chat.name}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {chat.timestamp}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 truncate mt-1">
                  {chat.lastMessage}
                </p>
                {chat.unreadCount > 0 && (
                  <div className="flex justify-end mt-1">
                    <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                      {chat.unreadCount}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
