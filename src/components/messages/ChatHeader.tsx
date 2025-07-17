import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icon from "@/components/ui/icon";
import { Chat } from "./types";

interface ChatHeaderProps {
  selectedChat: Chat;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ selectedChat }) => {
  return (
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
                  <Icon name="Calendar" size={16} className="mr-2" />
                  <div>
                    <div className="text-sm">Зарегистрирован</div>
                    <div className="text-xs text-gray-500">{selectedChat.user.registrationDate}</div>
                  </div>
                </DropdownMenuItem>
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
  );
};

export default ChatHeader;