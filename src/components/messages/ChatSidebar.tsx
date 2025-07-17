import { Badge } from "@/components/ui/badge";
import { Chat, ChatSection } from "./types";
import Icon from "@/components/ui/icon";

interface ChatSidebarProps {
  chats: Chat[];
  selectedChatId: string;
  showSidebar: boolean;
  onChatSelect: (chatId: string) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  chats,
  selectedChatId,
  showSidebar,
  onChatSelect
}) => {
  // Группировка чатов по типам
  const groupedChats: ChatSection[] = [
    {
      type: 'private',
      title: 'Личные',
      chats: chats.filter(chat => chat.type === 'private')
    },
    {
      type: 'business',
      title: 'Бизнес',
      chats: chats.filter(chat => chat.type === 'business')
    },
    {
      type: 'community',
      title: 'Сообщества',
      chats: chats.filter(chat => chat.type === 'community')
    }
  ].filter(section => section.chats.length > 0);

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'private': return 'User';
      case 'business': return 'Briefcase';
      case 'community': return 'Users';
      default: return 'MessageCircle';
    }
  };

  return (
    <div className={`${
      showSidebar ? 'flex' : 'hidden'
    } md:flex w-full md:w-80 bg-white border-r border-gray-200 flex-col absolute md:relative z-10 h-full`}>
      <div className="p-3 md:p-4 border-b border-gray-100">
        <h2 className="font-semibold text-base md:text-lg">Сообщения</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {groupedChats.map((section) => (
          <div key={section.type} className="mb-2">
            {/* Заголовок секции */}
            <div className="px-3 md:px-4 py-2 bg-gray-50 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Icon name={getSectionIcon(section.type)} size={14} className="text-gray-500" />
                <span className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                  {section.title}
                </span>
                <span className="text-xs text-gray-500 ml-auto">
                  {section.chats.length}
                </span>
              </div>
            </div>
            
            {/* Чаты в секции */}
            {section.chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => {
                  onChatSelect(chat.id);
                  if (window.innerWidth < 768) {
                    // Мобильная логика будет обработана в родительском компоненте
                  }
                }}
                className={`p-3 md:p-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 ${
                  selectedChatId === chat.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src={chat.user.avatar} 
                      alt={chat.user.name}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                    />
                    {chat.user.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 md:gap-2">
                        <span className="font-medium text-xs md:text-sm">{chat.user.name}</span>
                        {chat.user.isOnline && (
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 hidden md:inline-flex">
                            Онлайн
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">{chat.lastMessageTime}</span>
                    </div>
                    
                    <p className="text-xs md:text-sm text-gray-600 truncate mt-1">
                      {chat.lastMessage}
                    </p>
                    
                    {chat.unreadCount > 0 && (
                      <div className="flex justify-end mt-1">
                        <Badge className="bg-red-500 text-white text-xs">
                          {chat.unreadCount}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;