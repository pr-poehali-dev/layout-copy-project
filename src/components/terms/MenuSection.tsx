import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { SectionProps } from "@/types/terms";

const MenuSection = ({ isDarkMode }: SectionProps) => {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Icon name="MessageSquare" size={20} />
          О платформе Discord Ads Board
        </h2>
        <p className="leading-relaxed mb-4">
          Добро пожаловать на Discord Ads Board — ведущую площадку для размещения 
          рекламы Discord серверов. Наш сервис помогает владельцам серверов найти 
          новых участников, а пользователям — открыть для себя интересные сообщества.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Icon name="Target" size={20} />
          Наши возможности
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Plus" size={16} />
              <h3 className="font-semibold">Размещение объявлений</h3>
            </div>
            <p className="text-sm opacity-80">
              Создавайте привлекательные объявления для своих Discord серверов
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Search" size={16} />
              <h3 className="font-semibold">Поиск сообществ</h3>
            </div>
            <p className="text-sm opacity-80">
              Находите серверы по интересам с удобной системой фильтров
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Icon name="TrendingUp" size={16} />
              <h3 className="font-semibold">Аналитика</h3>
            </div>
            <p className="text-sm opacity-80">
              Отслеживайте статистику просмотров и переходов
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Heart" size={16} />
              <h3 className="font-semibold">Избранное</h3>
            </div>
            <p className="text-sm opacity-80">
              Сохраняйте интересные серверы в избранное
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Icon name="Users" size={20} />
          Статистика платформы
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">1,250+</div>
            <div className="text-sm opacity-70">Серверов</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">850K+</div>
            <div className="text-sm opacity-70">Участников</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-500">125K+</div>
            <div className="text-sm opacity-70">Просмотров</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">2,100+</div>
            <div className="text-sm opacity-70">Переходов</div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Icon name="Mail" size={20} />
          Связь с нами
        </h2>
        <p className="leading-relaxed mb-4">
          Есть вопросы или предложения? Мы всегда готовы помочь!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button variant="outline" className="justify-start">
            <Icon name="MessageSquare" size={16} className="mr-2" />
            Discord сервер поддержки
          </Button>
          <Button variant="outline" className="justify-start">
            <Icon name="Mail" size={16} className="mr-2" />
            Email: support@adcord.net
          </Button>
        </div>
      </section>
    </div>
  );
};

export default MenuSection;