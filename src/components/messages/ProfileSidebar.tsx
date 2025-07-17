import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Chat } from "./types";

interface ProfileSidebarProps {
  selectedChat: Chat;
  showProfile: boolean;
  onCloseProfile: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  selectedChat,
  showProfile,
  onCloseProfile
}) => {
  return (
    <div className={`${
      showProfile ? 'block' : 'hidden'
    } md:block w-full md:w-80 bg-white border-l border-gray-200 p-3 md:p-4 space-y-4 md:space-y-6 absolute md:relative z-20 h-full overflow-y-auto`}>
      {/* Мобильный заголовок */}
      <div className="md:hidden flex items-center justify-between pb-3 border-b border-gray-200">
        <h3 className="font-semibold text-lg">Профиль</h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onCloseProfile}
        >
          <Icon name="X" size={20} />
        </Button>
      </div>
      
      {/* Мобильные действия */}
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

      {/* Информация об объявлении */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 md:pt-6">
        <div className="bg-card border border-border rounded-lg p-4 space-y-3">
          {/* Заголовок объявления */}
          <div className="flex items-start gap-3">
            <img 
              src={selectedChat.listing.image} 
              alt={selectedChat.listing.title}
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-foreground">{selectedChat.listing.title}</h3>
              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                <Icon name="Users" size={12} />
                <span>9128O участников</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground p-1">
              <Icon name="Heart" size={16} />
            </Button>
          </div>

          {/* Описание услуг */}
          <div className="space-y-2 text-sm text-foreground">
            <div className="text-blue-500 dark:text-blue-400 underline cursor-pointer">
              https://discord.gg/yaoitag
            </div>
            
            <div>
              <div className="font-medium">Ping Prices</div>
              <div>- 1 Day @here - $100</div>
              <div>- 1 Day @everyone - $150</div>
            </div>
            
            <div>
              <div className="font-medium">Bundle Deals</div>
              <div>- 7d @everyone with Ping On Join - $200</div>
              <div>- 7d @everyone with Join DM - $250</div>
              <div>- 7d @everyone with Ping On Join & Join DM - $300</div>
            </div>
            
            <div className="text-muted-foreground">
              • Write to discord - @allanwood
            </div>
          </div>

          {/* Статистика */}
          <div className="flex gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
            <div className="flex items-center gap-1">
              <Icon name="Eye" size={12} />
              <span>6 просмотров</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="MessageCircle" size={12} />
              <span>0 лайков</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Star" size={12} />
              <span>0 в избранном</span>
            </div>
          </div>

          {/* Цена */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <div className="text-2xl font-bold text-foreground">100</div>
              <div className="text-xs text-muted-foreground">USD</div>
            </div>
            <div className="text-xs text-muted-foreground">
              <div>Общение /</div>
              <div>Знакомства</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;