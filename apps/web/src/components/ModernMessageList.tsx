'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  isOwn: boolean;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
  reactions?: Array<{ emoji: string; count: number; users: string[] }>;
  replyTo?: {
    id: string;
    content: string;
    sender: string;
  };
}

interface ModernMessageListProps {
  messages: Message[];
  currentUserId: string;
  onReaction?: (messageId: string, emoji: string) => void;
  onReply?: (messageId: string) => void;
  className?: string;
}

export const ModernMessageList: React.FC<ModernMessageListProps> = ({
  messages,
  currentUserId,
  onReaction,
  onReply,
  className
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'sending':
        return '⏳';
      case 'sent':
        return '✓';
      case 'delivered':
        return '✓✓';
      case 'read':
        return '✓✓';
      default:
        return null;
    }
  };

  return (
    <div className={cn('flex-1 overflow-y-auto p-4 space-y-4', className)}>
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            'flex',
            message.isOwn ? 'justify-end' : 'justify-start'
          )}
        >
          <div
            className={cn(
              'max-w-xs lg:max-w-md px-4 py-2 rounded-2xl',
              message.isOwn
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600'
            )}
          >
            {message.replyTo && (
              <div className="mb-2 p-2 bg-gray-100 dark:bg-gray-600 rounded-lg border-l-4 border-blue-500">
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Replying to {message.replyTo.sender}
                </p>
                <p className="text-sm truncate">{message.replyTo.content}</p>
              </div>
            )}
            
            <p className="text-sm">{message.content}</p>
            
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs opacity-70">
                {formatTime(message.timestamp)}
              </span>
              {message.isOwn && (
                <span className="text-xs opacity-70 ml-2">
                  {getStatusIcon(message.status)}
                </span>
              )}
            </div>

            {message.reactions && message.reactions.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {message.reactions.map((reaction, index) => (
                  <button
                    key={index}
                    onClick={() => onReaction?.(message.id, reaction.emoji)}
                    className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-600 rounded-full px-2 py-1 text-xs hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                  >
                    <span>{reaction.emoji}</span>
                    <span>{reaction.count}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-2 mt-2">
              <button
                onClick={() => onReply?.(message.id)}
                className="text-xs opacity-70 hover:opacity-100 transition-opacity"
              >
                Reply
              </button>
              <button
                onClick={() => onReaction?.(message.id, '👍')}
                className="text-xs opacity-70 hover:opacity-100 transition-opacity"
              >
                React
              </button>
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
