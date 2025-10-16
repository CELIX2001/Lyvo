'use client';

import React from 'react';
import { ArrowLeft, Phone, Video, VolumeX, MoreVertical, Search } from 'lucide-react';

interface ModernChatHeaderProps {
  chatName: string;
  isOnline: boolean;
  lastSeen?: string;
  onBack?: () => void;
  onCall?: () => void;
  onVideoCall?: () => void;
  onMute?: () => void;
  onMore?: () => void;
  onSearch?: () => void;
  className?: string;
}

export const ModernChatHeader: React.FC<ModernChatHeaderProps> = ({
  chatName,
  isOnline,
  lastSeen,
  onBack,
  onCall,
  onVideoCall,
  onMute,
  onMore,
  onSearch,
  className = ''
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between ${className}`}>
      <div className="flex items-center space-x-3">
        {onBack && (
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors lg:hidden"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        )}
        
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {chatName.charAt(0).toUpperCase()}
          </div>
          {isOnline && (
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
          )}
        </div>
        
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {chatName}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isOnline ? 'Online' : lastSeen || 'Offline'}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {onSearch && (
          <button
            onClick={onSearch}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Search className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        )}
        
        {onCall && (
          <button
            onClick={onCall}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Phone className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        )}
        
        {onVideoCall && (
          <button
            onClick={onVideoCall}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Video className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        )}
        
        {onMute && (
          <button
            onClick={onMute}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <VolumeX className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        )}
        
        {onMore && (
          <button
            onClick={onMore}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <MoreVertical className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        )}
      </div>
    </div>
  );
};
