import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  isPrivate?: boolean;
  mention?: string;
}

interface ChatWidgetProps {
  isDarkMode: boolean;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'global' | 'private'>('global');
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      author: 'Гурман',
      content: 'куплю рубины 500/2, лёд 100/5, желтохвост 1/2, апогон 1/1, форель 100/40',
      timestamp: new Date(Date.now() - 300000),
      isPrivate: false
    },
    {
      id: '2',
      author: 'Гурман',
      content: 'куплю рубины 500/2, лёд 100/5, желтохвост 1/2, апогон 1/1, форель 100/35',
      timestamp: new Date(Date.now() - 240000),
      isPrivate: false
    },
    {
      id: '3',
      author: 'АлекСан',
      content: '@Гурман: привет, у меня есть форель, можешь написать в личку?',
      timestamp: new Date(Date.now() - 180000),
      isPrivate: true,
      mention: 'Гурман'
    },
    {
      id: '4',
      author: 'Гурман',
      content: '@АлекСан: окей, сколько у тебя есть?',
      timestamp: new Date(Date.now() - 120000),
      isPrivate: true,
      mention: 'АлекСан'
    }
  ]);
  const [currentUser] = useState('Игрок123');
  const [lastMention, setLastMention] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle mention detection
  const detectMention = (content: string): string | null => {
    const mentionMatch = content.match(/@(\w+)/);
    return mentionMatch ? mentionMatch[1] : null;
  };

  // Get unique usernames sorted by recent activity
  const getRecentUsers = (): string[] => {
    const userActivityMap = new Map<string, number>();
    
    // Sort messages by timestamp descending and collect users
    const sortedMessages = [...messages].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    sortedMessages.forEach((msg, index) => {
      if (msg.author !== currentUser && !userActivityMap.has(msg.author)) {
        userActivityMap.set(msg.author, index);
      }
    });

    // Convert to array and sort by activity (lower index = more recent)
    return Array.from(userActivityMap.entries())
      .sort((a, b) => a[1] - b[1])
      .map(([username]) => username);
  };

  // Handle @ symbol detection for suggestions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cursorPos = e.target.selectionStart || 0;
    
    setMessageInput(value);
    setCursorPosition(cursorPos);

    // Check if @ is at cursor position or just before it
    const atIndex = value.lastIndexOf('@', cursorPos);
    const hasAtSymbol = atIndex !== -1 && (atIndex === cursorPos - 1 || (atIndex < cursorPos && !value.slice(atIndex + 1, cursorPos).includes(' ')));
    
    setShowSuggestions(hasAtSymbol);
  };

  // Handle clicking on username in suggestions or messages
  const handleUsernameClick = (username: string) => {
    // Check if this username is already mentioned anywhere in the message
    const mentionRegex = new RegExp(`@${username}(?:\\s*:|\\b)`, 'i');
    
    // If this user is already mentioned, do nothing
    if (mentionRegex.test(messageInput)) {
      setShowSuggestions(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
      return;
    }
    
    // Replace any existing mention with the new one
    const existingMentionMatch = messageInput.match(/@\w+:\s*/);
    let newInput;
    
    if (existingMentionMatch) {
      // Replace existing mention
      newInput = messageInput.replace(/@\w+:\s*/, `@${username}: `);
    } else {
      // Add new mention at the beginning
      const trimmedInput = messageInput.trim();
      newInput = trimmedInput ? `@${username}: ${trimmedInput}` : `@${username}: `;
    }
    
    setMessageInput(newInput);
    setLastMention(username);
    setShowSuggestions(false);
    
    // Focus input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle keyboard navigation in suggestions
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Handle sending messages
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const mention = detectMention(messageInput);
    const isPrivate = mention !== null;

    const newMessage: Message = {
      id: Date.now().toString(),
      author: currentUser,
      content: messageInput,
      timestamp: new Date(),
      isPrivate,
      mention: mention || undefined
    };

    setMessages(prev => [...prev, newMessage]);
    
    // Update last mention for private messages
    if (mention) {
      setLastMention(mention);
    }

    setMessageInput('');
  };

  // Get filtered messages
  const getFilteredMessages = () => {
    return messages.filter(msg => {
      if (activeTab === 'global') {
        return !msg.isPrivate;
      } else {
        return msg.isPrivate && (
          msg.author === currentUser || 
          msg.mention === currentUser ||
          msg.author === lastMention ||
          msg.mention === lastMention
        );
      }
    });
  };

  // Handle input focus for private tab
  useEffect(() => {
    if (activeTab === 'private' && lastMention && !messageInput.includes('@')) {
      setMessageInput(`@${lastMention}: `);
    }
  }, [activeTab, lastMention]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowSuggestions(false);
    };

    if (showSuggestions) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showSuggestions]);

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!isOpen) {
    return (
      <Button
        size="sm"
        variant="outline"
        className="h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm"
        onClick={() => setIsOpen(true)}
      >
        <Icon name="MessageCircle" size={14} className="sm:mr-1" />
        <span className="hidden sm:inline">Чаты</span>
      </Button>
    );
  }

  return (
    <div className="relative">
      {/* Chat Button */}
      <Button
        size="sm"
        variant="outline"
        className="h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon name="MessageCircle" size={14} className="sm:mr-1" />
        <span className="hidden sm:inline">Чаты</span>
      </Button>

      {/* Chat Window */}
      <div 
        className={`absolute top-12 right-0 w-80 sm:w-96 h-96 border rounded-lg shadow-lg z-50 ${
          isDarkMode 
            ? 'bg-gray-900 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}
      >
        {/* Header */}
        <div className={`p-3 border-b flex justify-between items-center ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex">
            <Button
              size="sm"
              variant={activeTab === 'global' ? 'default' : 'ghost'}
              className={`mr-2 text-xs ${
                activeTab === 'global' 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : isDarkMode 
                    ? 'text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('global')}
            >
              Глобальный
            </Button>
            <Button
              size="sm"
              variant={activeTab === 'private' ? 'default' : 'ghost'}
              className={`text-xs ${
                activeTab === 'private' 
                  ? 'bg-cyan-600 hover:bg-cyan-700 text-white' 
                  : isDarkMode 
                    ? 'text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('private')}
            >
              Приват
            </Button>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="w-6 h-6 p-0"
            onClick={() => setIsOpen(false)}
          >
            <Icon name="X" size={14} />
          </Button>
        </div>

        {/* Messages */}
        <div 
          ref={chatRef}
          className={`h-64 overflow-y-auto p-3 space-y-2 ${
            activeTab === 'global' 
              ? isDarkMode ? 'bg-gray-800' : 'bg-green-50'
              : isDarkMode ? 'bg-gray-850' : 'bg-cyan-50'
          }`}
        >
          {getFilteredMessages().map((message) => (
            <div key={message.id} className="text-sm">
              <div className="flex items-start gap-2">
                <span 
                  className={`font-medium text-xs cursor-pointer hover:underline ${
                    message.author === currentUser 
                      ? 'text-blue-600' 
                      : isDarkMode 
                        ? 'text-gray-200 hover:text-gray-100' 
                        : 'text-gray-800 hover:text-gray-600'
                  }`}
                  onClick={() => handleUsernameClick(message.author)}
                >
                  {message.author}:
                </span>
                <span className="text-xs opacity-60">
                  {formatTime(message.timestamp)}
                </span>
              </div>
              <div className={`mt-1 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {message.content.split(/(@\w+)/).map((part, index) => (
                  part.startsWith('@') ? (
                    <span key={index} className="text-blue-500 font-medium">
                      {part}
                    </span>
                  ) : (
                    <span key={index}>{part}</span>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className={`p-3 border-t relative ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          {/* Username Suggestions */}
          {showSuggestions && (
            <div className={`absolute bottom-full left-3 right-3 mb-1 border rounded-lg shadow-lg max-h-32 overflow-y-auto z-10 ${
              isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'
            }`}>
              {getRecentUsers().map((username) => (
                <div
                  key={username}
                  className={`px-3 py-2 text-xs cursor-pointer hover:bg-opacity-80 ${
                    isDarkMode 
                      ? 'text-gray-200 hover:bg-gray-700' 
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                  onClick={() => handleUsernameClick(username)}
                >
                  @{username}
                </div>
              ))}
              {getRecentUsers().length === 0 && (
                <div className={`px-3 py-2 text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Нет доступных пользователей
                </div>
              )}
            </div>
          )}

          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={messageInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={
                activeTab === 'global' 
                  ? 'Сообщение... (@ для упоминаний)' 
                  : lastMention 
                    ? `Сообщение для @${lastMention}...`
                    : 'Упомяните @никнейм...'
              }
              className={`flex-1 h-8 text-xs ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white'
              }`}
            />
            <Button 
              type="submit" 
              size="sm" 
              className={`h-8 px-3 text-xs ${
                activeTab === 'global'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-cyan-600 hover:bg-cyan-700'
              }`}
            >
              <Icon name="Send" size={12} />
            </Button>
          </div>
          {activeTab === 'private' && (
            <div className="mt-1 text-xs opacity-60">
              Упомяните @никнейм для отправки в приват
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChatWidget;