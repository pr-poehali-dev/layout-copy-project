import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icon from "@/components/ui/icon";

interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  registrationDate: string;
  discordProfile?: string;
}

interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: string;
  isSystem?: boolean;
}

interface Chat {
  id: string;
  user: User;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  listing: {
    id: string;
    title: string;
    price: number;
    image: string;
  };
}

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  owner: string;
  category: string;
}

const Messages = () => {
  const [selectedChatId, setSelectedChatId] = useState<string>("1");
  const [newMessage, setNewMessage] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  // Мок данные для чатов
  const chats: Chat[] = [
    {
      id: "1",
      user: {
        id: "evilegx",
        name: "EvilEgx",
        avatar: "https://cdn.poehali.dev/files/059a95b9-1a0c-421e-b381-a69ab9299ca7.png",
        isOnline: true,
        registrationDate: "21 ноября 2021, 13:17",
        discordProfile: "https://discord.gg/vbCdKC2q"
      },
      lastMessage: "Приглашаем вас в наш закрытый Telegram 😎",
      lastMessageTime: "13.07",
      unreadCount: 0,
      listing: {
        id: "1",
        title: "Игровое сообщество RPG",
        price: 2500,
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=150&fit=crop"
      }
    },
    {
      id: "2",
      user: {
        id: "yaDe92",
        name: "YaDe92",
        avatar: "/api/placeholder/40/40",
        isOnline: false,
        registrationDate: "15 марта 2022, 09:30",
        discordProfile: "https://discord.gg/example"
      },
      lastMessage: "Сообщение о заказе",
      lastMessageTime: "12.07",
      unreadCount: 2,
      listing: {
        id: "2",
        title: "Криптотрейдинг PRO",
        price: 150,
        image: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=200&h=150&fit=crop"
      }
    }
  ];

  // Мок данные для сообщений
  const messages: { [chatId: string]: Message[] } = {
    "1": [
      {
        id: "1",
        text: "Привет, отправляй пригласительную ссылку на дискорд сервер",
        timestamp: "13.07.25",
        sender: "evilegx"
      },
      {
        id: "2",
        text: "https://discord.gg/vbCdKC2q",
        timestamp: "13.07.25",
        sender: "other"
      },
      {
        id: "3",
        text: "выдал",
        timestamp: "13.07.25",
        sender: "evilegx"
      },
      {
        id: "4",
        text: "Покупатель Pudding2200 подтвердил успешное выполнение заказа #S8PSAPZM и отправил деньги продавцу EvilEgx.",
        timestamp: "13.07.25",
        sender: "system",
        isSystem: true
      },
      {
        id: "5",
        text: "Приглашаем вас в наш закрытый Telegram 😎",
        timestamp: "13.07.25",
        sender: "other"
      }
    ]
  };

  const selectedChat = chats.find(chat => chat.id === selectedChatId);
  const chatMessages = messages[selectedChatId] || [];

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    // Здесь будет логика отправки сообщения
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Мобильная кнопка назад или меню */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => {
              if (window.innerWidth < 768) {
                if (!showSidebar && selectedChatId) {
                  setShowSidebar(true);
                } else {
                  window.location.href = '/';
                }
              } else {
                window.location.href = '/';
              }
            }}
            className="md:hidden"
          >
            <Icon name={!showSidebar && selectedChatId ? "ArrowLeft" : "Home"} size={20} />
          </Button>
          
          {/* Десктоп кнопка назад */}
          <Button variant="ghost" size="sm" className="hidden md:flex" onClick={() => window.location.href = '/'}>
            <Icon name="ArrowLeft" size={20} />
          </Button>
          
          <h1 className="text-lg md:text-2xl font-bold">
            {!showSidebar && selectedChatId && window.innerWidth < 768 
              ? chats.find(c => c.id === selectedChatId)?.user.name 
              : "Сообщения"
            }
          </h1>
          
          {/* Мобильная кнопка профиля */}
          {!showSidebar && selectedChatId && (
            <div className="ml-auto md:hidden">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowProfile(!showProfile)}
              >
                <Icon name="User" size={20} />
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] relative">
        {/* Левая панель - список чатов */}
        <div className={`${
          showSidebar ? 'flex' : 'hidden'
        } md:flex w-full md:w-80 bg-white border-r border-gray-200 flex-col absolute md:relative z-10 h-full`}>
          <div className="p-3 md:p-4 border-b border-gray-100">
            <h2 className="font-semibold text-base md:text-lg">Чаты</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => {
                  setSelectedChatId(chat.id);
                  if (window.innerWidth < 768) {
                    setShowSidebar(false);
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
        </div>

        {/* Центральная область - чат */}
        <div className={`${
          !showSidebar || window.innerWidth >= 768 ? 'flex' : 'hidden'
        } md:flex flex-1 flex-col`}>
          {selectedChat && (
            <>
              {/* Заголовок чата */}
              <div className="bg-white border-b border-gray-200 p-3 md:p-4 hidden md:block">
                <div className="flex items-center gap-3">
                  <img 
                    src={selectedChat.user.avatar} 
                    alt={selectedChat.user.name}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm md:text-base">{selectedChat.user.name}</h3>
                      {selectedChat.user.isOnline && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                          Онлайн
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2 md:gap-4 mt-1">
                      <Button variant="outline" size="sm" className="h-6 md:h-7 text-xs bg-green-500 text-white border-green-500 hover:bg-green-600">
                        <span className="hidden md:inline">Включены оповещения</span>
                        <Icon name="Bell" size={12} className="md:hidden" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="h-6 md:h-7 text-xs">
                            •••
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Icon name="Flag" size={16} className="mr-2" />
                            Пожаловаться
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Icon name="Ban" size={16} className="mr-2" />
                            Заблокировать
                          </DropdownMenuItem>
                          {selectedChat.user.discordProfile && (
                            <DropdownMenuItem onClick={() => window.open(selectedChat.user.discordProfile, '_blank')}>
                              <Icon name="MessageCircle" size={16} className="mr-2" />
                              Discord профиль
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </div>

              {/* Сообщения */}
              <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
                {chatMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === "evilegx" ? "justify-end" : "justify-start"}`}>
                    {message.isSystem ? (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 md:p-3 max-w-full md:max-w-2xl">
                        <div className="flex items-start gap-2">
                          <Icon name="Info" size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-xs md:text-sm text-blue-800">{message.text}</p>
                            <span className="text-xs text-blue-600 mt-1 block">{message.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className={`max-w-[85%] md:max-w-xs lg:max-w-md px-2 md:px-3 py-2 rounded-lg ${
                        message.sender === "evilegx" 
                          ? "bg-blue-500 text-white" 
                          : "bg-white border border-gray-200"
                      }`}>
                        <p className="text-xs md:text-sm">{message.text}</p>
                        <span className={`text-xs mt-1 block ${
                          message.sender === "evilegx" ? "text-blue-100" : "text-gray-500"
                        }`}>
                          {message.timestamp}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Поле ввода */}
              <div className="bg-white border-t border-gray-200 p-3 md:p-4">
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Написать..."
                    className="flex-1 text-sm"
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <Button onClick={sendMessage} size="sm" className="px-3">
                    <Icon name="Send" size={14} />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Правая панель - информация о собеседнике и объявлении */}
        {selectedChat && (
          <div className={`${
            showProfile ? 'block' : 'hidden'
          } md:block w-full md:w-80 bg-white border-l border-gray-200 p-3 md:p-4 space-y-4 md:space-y-6 absolute md:relative z-20 h-full overflow-y-auto`}>
            {/* Мобильный заголовок */}
            <div className="md:hidden flex items-center justify-between pb-3 border-b border-gray-200">
              <h3 className="font-semibold text-lg">Профиль</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowProfile(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            {/* Информация о пользователе */}
            <div className="space-y-3 md:space-y-4">
              <div className="space-y-2">
                <div className="text-xs text-gray-500 uppercase">ДАТА РЕГИСТРАЦИИ</div>
                <div className="text-sm">{selectedChat.user.registrationDate}</div>
                <div className="text-xs text-gray-500">4 года назад</div>
              </div>
              
              {/* Мобильное меню действий */}
              <div className="md:hidden space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-left justify-start"
                  onClick={() => alert('Пожаловаться')}
                >
                  <Icon name="Flag" size={16} className="mr-2" />
                  Пожаловаться
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-left justify-start"
                  onClick={() => alert('Заблокировать')}
                >
                  <Icon name="Ban" size={16} className="mr-2" />
                  Заблокировать
                </Button>
                {selectedChat.user.discordProfile && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-left justify-start"
                    onClick={() => window.open(selectedChat.user.discordProfile, '_blank')}
                  >
                    <Icon name="MessageCircle" size={16} className="mr-2" />
                    Discord профиль
                  </Button>
                )}
              </div>
            </div>

            {/* Информация об объявлении */}
            <div className="border-t border-gray-200 pt-4 md:pt-6">
              <div className="text-xs text-gray-500 uppercase mb-3">ОБЪЯВЛЕНИЕ</div>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <img 
                  src={selectedChat.listing.image} 
                  alt={selectedChat.listing.title}
                  className="w-full h-24 md:h-32 object-cover"
                />
                <div className="p-3">
                  <h5 className="font-medium text-xs md:text-sm mb-1">{selectedChat.listing.title}</h5>
                  <div className="text-base md:text-lg font-bold text-blue-600 mb-2">
                    {selectedChat.listing.price.toLocaleString()} ₽
                  </div>
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    Перейти к объявлению
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;