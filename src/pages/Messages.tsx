import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import ChatSidebar from "@/components/messages/ChatSidebar";
import ChatHeader from "@/components/messages/ChatHeader";
import MessagesList from "@/components/messages/MessagesList";
import MessageInput from "@/components/messages/MessageInput";
import ProfileSidebar from "@/components/messages/ProfileSidebar";
import { Chat, Message } from "@/components/messages/types";

const Messages = () => {
  const [selectedChatId, setSelectedChatId] = useState<string>("1");
  const [newMessage, setNewMessage] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  // Мок данные для чатов
  const [chats, setChats] = useState<Chat[]>([
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
      messages: [
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
      ],
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
      messages: [
        {
          id: "6",
          text: "Привет! Интересует ваш курс по криптотрейдингу",
          timestamp: "12.07.25",
          sender: "other"
        },
        {
          id: "7",
          text: "Здравствуйте! Конечно, расскажу подробнее",
          timestamp: "12.07.25",
          sender: "yaDe92"
        },
        {
          id: "8",
          text: "Сообщение о заказе",
          timestamp: "12.07.25",
          sender: "yaDe92"
        }
      ],
      listing: {
        id: "2",
        title: "Криптотрейдинг PRO",
        price: 150,
        image: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=200&h=150&fit=crop"
      }
    },
    {
      id: "3",
      user: {
        id: "alex_dev",
        name: "Alex Developer",
        avatar: "/api/placeholder/40/40",
        isOnline: true,
        registrationDate: "10 июня 2023, 14:22",
        discordProfile: "https://discord.gg/alexdev"
      },
      lastMessage: "Готово! Проект завершен",
      lastMessageTime: "11.07",
      unreadCount: 0,
      messages: [
        {
          id: "9",
          text: "Привет! Нужна помощь с веб-сайтом",
          timestamp: "11.07.25",
          sender: "other"
        },
        {
          id: "10",
          text: "Здравствуйте! Конечно, что именно нужно сделать?",
          timestamp: "11.07.25",
          sender: "alex_dev"
        },
        {
          id: "11",
          text: "Готово! Проект завершен",
          timestamp: "11.07.25",
          sender: "alex_dev"
        }
      ],
      listing: {
        id: "3",
        title: "Разработка веб-сайтов",
        price: 5000,
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&h=150&fit=crop"
      }
    }
  ]);

  const selectedChat = chats.find(chat => chat.id === selectedChatId);
  const chatMessages = selectedChat?.messages || [];

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;
    
    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      timestamp: new Date().toLocaleString('ru-RU', { 
        day: '2-digit', 
        month: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      sender: "other"
    };
    
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === selectedChatId 
          ? { 
              ...chat, 
              messages: [...chat.messages, message],
              lastMessage: newMessage,
              lastMessageTime: new Date().toLocaleString('ru-RU', { 
                day: '2-digit', 
                month: '2-digit' 
              })
            }
          : chat
      )
    );
    
    setNewMessage("");
  };

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
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
        <ChatSidebar
          chats={chats}
          selectedChatId={selectedChatId}
          showSidebar={showSidebar}
          onChatSelect={handleChatSelect}
        />

        {/* Центральная область - чат */}
        <div className={`${
          !showSidebar || window.innerWidth >= 768 ? 'flex' : 'hidden'
        } md:flex flex-1 flex-col`}>
          {selectedChat && (
            <>
              {/* Заголовок чата */}
              <ChatHeader selectedChat={selectedChat} />

              {/* Сообщения */}
              <MessagesList messages={chatMessages} />

              {/* Поле ввода */}
              <MessageInput
                newMessage={newMessage}
                onMessageChange={setNewMessage}
                onSendMessage={sendMessage}
              />
            </>
          )}
        </div>

        {/* Правая панель - информация о собеседнике и объявлении */}
        {selectedChat && (
          <ProfileSidebar
            selectedChat={selectedChat}
            showProfile={showProfile}
            onCloseProfile={() => setShowProfile(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Messages;