'use client';

import React, { useState } from 'react';
import { Smile, Heart, ThumbsUp, Laugh, Angry, Frown } from 'lucide-react';

interface Reaction {
  emoji: string;
  count: number;
  users: string[];
}

interface MessageReactionsProps {
  reactions: Reaction[];
  onAddReaction: (emoji: string) => void;
  onRemoveReaction: (emoji: string) => void;
  currentUserId: string;
  className?: string;
}

const REACTION_EMOJIS = [
  { emoji: '👍', icon: ThumbsUp, label: 'Like' },
  { emoji: '❤️', icon: Heart, label: 'Love' },
  { emoji: '😂', icon: Laugh, label: 'Laugh' },
  { emoji: '😮', icon: Smile, label: 'Wow' },
  { emoji: '😢', icon: Frown, label: 'Sad' },
  { emoji: '😡', icon: Angry, label: 'Angry' },
];

export const MessageReactions: React.FC<MessageReactionsProps> = ({
  reactions,
  onAddReaction,
  onRemoveReaction,
  currentUserId,
  className = ''
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleReactionClick = (emoji: string) => {
    const existingReaction = reactions.find(r => r.emoji === emoji);
    
    if (existingReaction) {
      if (existingReaction.users.includes(currentUserId)) {
        onRemoveReaction(emoji);
      } else {
        onAddReaction(emoji);
      }
    } else {
      onAddReaction(emoji);
    }
    setShowPicker(false);
  };

  const hasUserReacted = (emoji: string) => {
    const reaction = reactions.find(r => r.emoji === emoji);
    return reaction?.users.includes(currentUserId) || false;
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center space-x-1">
        {reactions.map((reaction, index) => (
          <button
            key={index}
            onClick={() => handleReactionClick(reaction.emoji)}
            className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs transition-colors ${
              hasUserReacted(reaction.emoji)
                ? 'bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700'
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <span className="text-sm">{reaction.emoji}</span>
            <span className="text-gray-600 dark:text-gray-300">{reaction.count}</span>
          </button>
        ))}
        
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <Smile className="h-4 w-4 text-gray-500" />
        </button>
      </div>

      {showPicker && (
        <div className="absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-2 z-10">
          <div className="flex space-x-1">
            {REACTION_EMOJIS.map((reaction, index) => (
              <button
                key={index}
                onClick={() => handleReactionClick(reaction.emoji)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title={reaction.label}
              >
                <span className="text-lg">{reaction.emoji}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
