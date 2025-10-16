'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from './ui/button';

interface AIMessageSuggestionsProps {
  currentMessage: string;
  conversationContext: string[];
  onSelectSuggestion: (suggestion: string) => void;
  onFeedback: (suggestionId: string, feedback: 'positive' | 'negative') => void;
  isEnabled: boolean;
  className?: string;
}

interface Suggestion {
  id: string;
  text: string;
  confidence: number;
}

export const AIMessageSuggestions: React.FC<AIMessageSuggestionsProps> = ({
  currentMessage,
  conversationContext,
  onSelectSuggestion,
  onFeedback,
  isEnabled,
  className = ''
}) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isEnabled || currentMessage.length < 3) {
      setSuggestions([]);
      return;
    }

    const generateSuggestions = async () => {
      setIsLoading(true);
      
      // Simulate AI suggestion generation
      setTimeout(() => {
        const mockSuggestions: Suggestion[] = [
          {
            id: '1',
            text: `How about: "${currentMessage}? I'd love to hear your thoughts on this."`,
            confidence: 0.85
          },
          {
            id: '2',
            text: `Alternative: "I'm thinking about ${currentMessage.toLowerCase()}. What do you think?"`,
            confidence: 0.72
          },
          {
            id: '3',
            text: `Professional version: "Regarding ${currentMessage.toLowerCase()}, I believe we should consider..."`,
            confidence: 0.68
          }
        ];
        
        setSuggestions(mockSuggestions);
        setIsLoading(false);
      }, 1000);
    };

    const debounceTimer = setTimeout(generateSuggestions, 500);
    return () => clearTimeout(debounceTimer);
  }, [currentMessage, conversationContext, isEnabled]);

  if (!isEnabled || suggestions.length === 0) {
    return null;
  }

  return (
    <div className={`bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 ${className}`}>
      <div className="flex items-center space-x-2 mb-3">
        <Sparkles className="h-4 w-4 text-blue-600" />
        <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
          AI Suggestions
        </span>
      </div>
      
      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-blue-200 dark:bg-blue-800 rounded w-3/4 mb-2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="flex items-start justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-800"
            >
              <div className="flex-1">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  {suggestion.text}
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onSelectSuggestion(suggestion.text)}
                    className="text-xs h-7 px-2"
                  >
                    Use This
                  </Button>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => onFeedback(suggestion.id, 'positive')}
                      className="p-1 hover:bg-green-100 dark:hover:bg-green-900/30 rounded"
                      title="Good suggestion"
                    >
                      <ThumbsUp className="h-3 w-3 text-green-600" />
                    </button>
                    <button
                      onClick={() => onFeedback(suggestion.id, 'negative')}
                      className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                      title="Poor suggestion"
                    >
                      <ThumbsDown className="h-3 w-3 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="ml-2">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {Math.round(suggestion.confidence * 100)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
