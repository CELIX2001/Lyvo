'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Paperclip, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VoiceMessageRecorder } from './VoiceMessageRecorder';
import { FileShareModal } from './FileShareModal';
import { AIMessageSuggestions } from './AIMessageSuggestions';

interface ModernMessageInputProps {
  onSendMessage: (message: string) => void;
  onSendVoiceMessage?: (audioBlob: Blob, duration: number) => void;
  onSendFiles?: (files: File[]) => void;
  onTyping?: (isTyping: boolean) => void;
  placeholder?: string;
  disabled?: boolean;
  conversationContext?: string[];
  enableAISuggestions?: boolean;
  className?: string;
}

export const ModernMessageInput: React.FC<ModernMessageInputProps> = ({
  onSendMessage,
  onSendVoiceMessage,
  onSendFiles,
  onTyping,
  placeholder = 'Type a message...',
  disabled = false,
  conversationContext = [],
  enableAISuggestions = true,
  className
}) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFilePicker, setShowFilePicker] = useState(false);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      onTyping?.(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    onTyping?.(e.target.value.length > 0);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onSendFiles?.(files);
    }
  };

  const handleVoiceMessage = (audioBlob: Blob, duration: number) => {
    onSendVoiceMessage?.(audioBlob, duration);
  };

  const handleFileShare = (files: File[]) => {
    onSendFiles?.(files);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <>
      {/* Voice Message Recorder Modal */}
      {showVoiceRecorder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <VoiceMessageRecorder
            onSendVoiceMessage={handleVoiceMessage}
            onClose={() => setShowVoiceRecorder(false)}
          />
        </div>
      )}

      {/* File Share Modal */}
      {showFilePicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <FileShareModal
            onSendFiles={handleFileShare}
            onClose={() => setShowFilePicker(false)}
          />
        </div>
      )}

      {/* AI Suggestions */}
      {enableAISuggestions && message.trim() && (
        <div className="mb-4">
          <AIMessageSuggestions
            currentMessage={message}
            conversationContext={conversationContext}
            onSelectSuggestion={(suggestion) => {
              setMessage(suggestion);
              textareaRef.current?.focus();
            }}
            onFeedback={(suggestionId, feedback) => {
              console.log(`AI suggestion feedback: ${suggestionId} - ${feedback}`);
            }}
            isEnabled={enableAISuggestions}
          />
        </div>
      )}

      <div className={cn(
        'bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 sticky bottom-0 z-10',
        className
      )}>
        <div className="flex items-end space-x-3">
          <button
            onClick={() => setShowFilePicker(true)}
            disabled={disabled}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors disabled:opacity-50"
          >
            <Paperclip className="h-5 w-5" />
          </button>

          <button
            onClick={() => setShowVoiceRecorder(true)}
            disabled={disabled}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors disabled:opacity-50"
          >
            <Mic className="h-5 w-5" />
          </button>

          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              disabled={disabled}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
          </div>

          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            disabled={disabled}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors disabled:opacity-50"
          >
            <Smile className="h-5 w-5" />
          </button>

          <button
            onClick={handleSend}
            disabled={disabled || !message.trim()}
            className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-full transition-colors disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
        />
      </div>
    </>
  );
};
