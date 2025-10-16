'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ModernSidebar } from '@/components/ModernSidebar';
import { ModernChatHeader } from '@/components/ModernChatHeader';
import { ModernMessageList } from '@/components/ModernMessageList';
import { ModernMessageInput } from '@/components/ModernMessageInput';
import { Button } from '@/components/ui/button';
import { ErrorBoundary } from 'react-error-boundary';

// Mock data for development
const mockChats = [
  {
    id: '1',
    name: 'John Doe',
    lastMessage: 'Hey, how are you doing?',
    timestamp: '2 min ago',
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    lastMessage: 'Can we schedule a meeting for tomorrow?',
    timestamp: '1 hour ago',
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: '3',
    name: 'Mike Johnson',
    lastMessage: 'Thanks for the update!',
    timestamp: '3 hours ago',
    unreadCount: 1,
    isOnline: true,
  },
];

const mockMessages = [
  {
    id: '1',
    content: 'Hey there! How are you doing today?',
    sender: 'John Doe',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    isOwn: false,
    status: 'read',
  },
  {
    id: '2',
    content: 'I\'m doing great! Thanks for asking. How about you?',
    sender: 'You',
    timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    isOwn: true,
    status: 'read',
  },
  {
    id: '3',
    content: 'Pretty good! Just working on some new features for our project.',
    sender: 'John Doe',
    timestamp: new Date(Date.now() - 1000 * 60 * 1).toISOString(),
    isOwn: false,
    status: 'delivered',
  },
];

export default function WorkingPage() {
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState(mockMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<Array<{ id: string; displayName: string }>>([]);
  const [isDark, setIsDark] = useState(false);
  const [showUserSettings, setShowUserSettings] = useState(false);
  const [showChatManager, setShowChatManager] = useState(false);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [showVoiceCommands, setShowVoiceCommands] = useState(false);
  const [showSmartTemplates, setShowSmartTemplates] = useState(false);
  const [isChatAnalyticsOpen, setIsChatAnalyticsOpen] = useState(false);
  const [messageTemplates, setMessageTemplates] = useState<Array<{ id: string; name: string; content: string; category: string }>>([
    { id: '1', name: 'Greeting', content: 'Hello! How are you doing today?', category: 'General' },
    { id: '2', name: 'Meeting Request', content: 'Can we schedule a meeting for this week?', category: 'Work' },
    { id: '3', name: 'Thank You', content: 'Thank you for your help!', category: 'General' },
  ]);
  const [voiceCommandsEnabled, setVoiceCommandsEnabled] = useState(false);
  const [voiceCommands] = useState([
    { id: '1', command: 'Send message', description: 'Send a message to current chat', action: 'send_message' },
    { id: '2', command: 'New chat', description: 'Start a new conversation', action: 'new_chat' },
    { id: '3', command: 'Search messages', description: 'Search through messages', action: 'search' },
  ]);

  const currentChat = mockChats.find(chat => chat.id === currentChatId);

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: Date.now().toString(),
      content,
      sender: 'You',
      timestamp: new Date().toISOString(),
      isOwn: true,
      status: 'sending' as const,
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'delivered' as const }
            : msg
        )
      );
    }, 1000);
  };

  const handleTyping = (isTyping: boolean) => {
    setIsTyping(isTyping);
    if (isTyping) {
      setTypingUsers([{ id: '1', displayName: 'John Doe' }]);
    } else {
      setTypingUsers([]);
    }
  };

  const handleVoiceMessage = (audioBlob: Blob, duration: number) => {
    console.log('Voice message recorded:', { duration, size: audioBlob.size });
    // Handle voice message logic here
  };

  const handleFileShare = (files: File[]) => {
    console.log('Files to share:', files.map(f => f.name));
    // Handle file sharing logic here
  };

  const handleVoiceCommandExecuted = (command: string) => {
    console.log('Voice command executed:', command);
    // Handle voice command logic here
  };

  const handleToggleVoiceCommands = (enabled: boolean) => {
    setVoiceCommandsEnabled(enabled);
  };

  const handleUseMessageTemplate = (template: any) => {
    console.log('Using template:', template);
    // Handle template usage logic here
  };

  const handleSaveMessageTemplate = (template: any) => {
    const newTemplate = {
      id: Date.now().toString(),
      ...template,
    };
    setMessageTemplates(prev => [...prev, newTemplate]);
  };

  const handleUpdateMessageTemplate = (id: string, updates: any) => {
    setMessageTemplates(prev => 
      prev.map(template => 
        template.id === id ? { ...template, ...updates } : template
      )
    );
  };

  const handleDeleteMessageTemplate = (id: string) => {
    setMessageTemplates(prev => prev.filter(template => template.id !== id));
  };

  const handleToggleMessageEncryption = (messageId: string, encrypt: boolean) => {
    console.log('Toggle encryption for message:', messageId, encrypt);
    // Handle encryption logic here
  };

  const handleGenerateEncryptionKey = async (): Promise<string> => {
    // Simulate key generation
    return 'mock-encryption-key-' + Date.now();
  };

  const handleTranslateMessage = async (messageId: string, targetLanguage: string): Promise<string> => {
    // Simulate translation
    return `Translated message in ${targetLanguage}`;
  };

  const changeTheme = (newTheme: string) => {
    setIsDark(newTheme === 'dark');
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ErrorBoundary fallback={<div className="p-4 text-red-500">Something went wrong. Please refresh the page.</div>}>
      <div className={`h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-all duration-300 ${isDark ? 'dark' : ''}`}>
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="hidden lg:block">
            <ModernSidebar
              chats={mockChats}
              currentChatId={currentChatId}
              onChatSelect={setCurrentChatId}
              onNewChat={() => setCurrentChatId(null)}
              onSettings={() => setShowUserSettings(true)}
              onLogout={() => console.log('Logout')}
              isDark={isDark}
              onToggleTheme={toggleTheme}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {currentChat ? (
              <>
                <ModernChatHeader
                  chatName={currentChat.name}
                  isOnline={currentChat.isOnline}
                  lastSeen="2 minutes ago"
                  onBack={() => setCurrentChatId(null)}
                  onCall={() => console.log('Call')}
                  onVideoCall={() => console.log('Video call')}
                  onMute={() => console.log('Mute')}
                  onMore={() => console.log('More options')}
                  onSearch={() => console.log('Search')}
                />

                <div className="flex-1 overflow-y-auto bg-slate-50/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <ModernMessageList
                    messages={messages}
                    currentUserId="current-user"
                    onReaction={(messageId, emoji) => console.log('Reaction:', messageId, emoji)}
                    onReply={(messageId) => console.log('Reply to:', messageId)}
                  />
                  {isTyping && typingUsers.length > 0 && (
                    <div className="p-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span>{typingUsers.map(u => u.displayName).join(', ')} is typing...</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-shrink-0">
                  <ModernMessageInput
                    onSendMessage={handleSendMessage}
                    onSendVoiceMessage={handleVoiceMessage}
                    onSendFiles={handleFileShare}
                    onTyping={handleTyping}
                    placeholder="Type a message..."
                    disabled={false}
                    conversationContext={currentChat.messages?.map(m => m.content) || []}
                    enableAISuggestions={true}
                  />
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-slate-50/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-8">
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
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Welcome to Lyvo
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md">
                    Your modern messaging platform with AI-powered features, voice commands, and real-time communication.
                  </p>
                  <div className="space-y-4">
                    <Button 
                      onClick={() => setCurrentChatId('1')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                    >
                      Start Chatting
                    </Button>
                    <div className="flex justify-center space-x-4">
                      <Button 
                        variant="outline"
                        onClick={() => setShowVoiceCommands(true)}
                        className="px-6 py-2"
                      >
                        🗣️ Voice Commands
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setShowSmartTemplates(true)}
                        className="px-6 py-2"
                      >
                        📝 Templates
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setIsChatAnalyticsOpen(true)}
                        className="px-6 py-2"
                      >
                        📊 Analytics
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
          <Button 
            onClick={() => setShowVoiceRecorder(true)}
            className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
            title="Voice Message"
          >
            🎤
          </Button>
          <Button 
            onClick={() => setShowVoiceCommands(true)}
            className="w-12 h-12 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg"
            title="Voice Commands"
          >
            🗣️
          </Button>
          <Button 
            onClick={() => setShowSmartTemplates(true)}
            className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
            title="Message Templates"
          >
            📝
          </Button>
          <Button 
            onClick={() => setShowUserSettings(true)}
            className="w-12 h-12 rounded-full bg-gray-600 hover:bg-gray-700 text-white shadow-lg"
            title="Settings"
          >
            ⚙️
          </Button>
          <Button 
            onClick={() => setShowChatManager(true)}
            className="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg"
            title="Chat Manager"
          >
            💬
          </Button>
        </div>

        {/* Modals and Overlays */}
        {showVoiceRecorder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Voice Message</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Voice recording feature will be implemented here.
              </p>
              <Button onClick={() => setShowVoiceRecorder(false)}>
                Close
              </Button>
            </div>
          </div>
        )}

        {showVoiceCommands && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Voice Commands</h3>
              <div className="space-y-2 mb-4">
                {voiceCommands.map(cmd => (
                  <div key={cmd.id} className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
                    <div className="font-medium">{cmd.command}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{cmd.description}</div>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <Button 
                  onClick={() => setVoiceCommandsEnabled(!voiceCommandsEnabled)}
                  className={voiceCommandsEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'}
                >
                  {voiceCommandsEnabled ? 'Disable' : 'Enable'} Voice Commands
                </Button>
                <Button variant="outline" onClick={() => setShowVoiceCommands(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {showSmartTemplates && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Message Templates</h3>
              <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
                {messageTemplates.map(template => (
                  <div key={template.id} className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
                    <div className="font-medium">{template.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{template.content}</div>
                    <div className="text-xs text-gray-500">{template.category}</div>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <Button onClick={() => console.log('Add template')}>
                  Add Template
                </Button>
                <Button variant="outline" onClick={() => setShowSmartTemplates(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {showUserSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Dark Mode</span>
                  <Button 
                    onClick={toggleTheme}
                    className={isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'}
                  >
                    {isDark ? 'On' : 'Off'}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Voice Commands</span>
                  <Button 
                    onClick={() => setVoiceCommandsEnabled(!voiceCommandsEnabled)}
                    className={voiceCommandsEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'}
                  >
                    {voiceCommandsEnabled ? 'On' : 'Off'}
                  </Button>
                </div>
              </div>
              <div className="mt-6">
                <Button variant="outline" onClick={() => setShowUserSettings(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {showChatManager && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Chat Manager</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Manage your conversations and chat settings.
              </p>
              <div className="space-y-2">
                <Button className="w-full justify-start">New Group Chat</Button>
                <Button className="w-full justify-start">Archive Chats</Button>
                <Button className="w-full justify-start">Export Messages</Button>
              </div>
              <div className="mt-6">
                <Button variant="outline" onClick={() => setShowChatManager(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {isChatAnalyticsOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Chat Analytics</h3>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <div className="text-sm font-medium text-blue-900 dark:text-blue-100">Messages Sent</div>
                  <div className="text-2xl font-bold text-blue-600">1,247</div>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                  <div className="text-sm font-medium text-green-900 dark:text-green-100">Active Chats</div>
                  <div className="text-2xl font-bold text-green-600">12</div>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                  <div className="text-sm font-medium text-purple-900 dark:text-purple-100">Voice Messages</div>
                  <div className="text-2xl font-bold text-purple-600">89</div>
                </div>
              </div>
              <div className="mt-6">
                <Button variant="outline" onClick={() => setIsChatAnalyticsOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}