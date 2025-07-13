import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { translations } from "@/data/translations";
import type { Language } from "@/types";
import type { InfoSection as InfoSectionType } from "@/hooks/useAppState";

interface InfoSectionProps {
  activeSection: InfoSectionType;
  onClose: () => void;
  onSectionChange: (section: InfoSectionType) => void;
  isDarkMode: boolean;
  language: Language;
}

const InfoSection = ({ 
  activeSection, 
  onClose, 
  onSectionChange, 
  isDarkMode, 
  language 
}: InfoSectionProps) => {
  const t = translations[language];

  if (activeSection === "none") return null;

  return (
    <div className={`min-h-screen animate-in fade-in duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="container mx-auto px-4 py-8">
        <div className={`max-w-4xl mx-auto ${isDarkMode ? "bg-gray-800/95 border-gray-700 text-white" : "bg-white/95"} backdrop-blur-sm rounded-lg border shadow-lg`}>
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-3 mb-6">
              <Button 
                variant="default" 
                size="sm"
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Вернуться к объявлениям
              </Button>
            </div>
            
            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Button
                variant={activeSection === 'menu' ? "default" : "outline"}
                size="sm"
                onClick={() => onSectionChange('menu')}
                className={`${activeSection === 'menu' ? '' : (isDarkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "")}`}
              >
                <Icon name="Menu" size={16} className="mr-2" />
                {t.mainMenu}
              </Button>
              <Button
                variant={activeSection === 'terms' ? "default" : "outline"}
                size="sm"
                onClick={() => onSectionChange('terms')}
                className={`${activeSection === 'terms' ? '' : (isDarkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "")}`}
              >
                <Icon name="FileText" size={16} className="mr-2" />
                {t.termsOfService}
              </Button>
              <Button
                variant={activeSection === 'privacy' ? "default" : "outline"}
                size="sm"
                onClick={() => onSectionChange('privacy')}
                className={`${activeSection === 'privacy' ? '' : (isDarkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "")}`}
              >
                <Icon name="Shield" size={16} className="mr-2" />
                {t.privacyPolicy}
              </Button>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold">
              {activeSection === 'menu' && t.mainMenu}
              {activeSection === 'terms' && t.termsOfService}
              {activeSection === 'privacy' && t.privacyPolicy}
            </h2>
            <p className={`mt-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Последнее обновление: 13 июля 2025 года
            </p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {activeSection === 'menu' && <MenuContent t={t} isDarkMode={isDarkMode} />}
            {activeSection === 'terms' && <TermsContent />}
            {activeSection === 'privacy' && <PrivacyContent />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Menu Content Component
const MenuContent = ({ t, isDarkMode }: { t: any; isDarkMode: boolean }) => (
  <div className="space-y-6">
    <section>
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Icon name="MessageSquare" size={20} />
        {t.aboutPlatform}
      </h3>
      <p className="leading-relaxed mb-4">
        {t.aboutText}
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Icon name="Target" size={20} />
        {t.ourFeatures}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Plus" size={16} />
            <h4 className="font-semibold">{t.createListings}</h4>
          </div>
          <p className="text-sm opacity-80">
            Создавайте привлекательные объявления для своих Discord серверов
          </p>
        </div>
        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Search" size={16} />
            <h4 className="font-semibold">{t.searchCommunities}</h4>
          </div>
          <p className="text-sm opacity-80">
            Находите серверы по интересам с удобной системой фильтров
          </p>
        </div>
        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Icon name="TrendingUp" size={16} />
            <h4 className="font-semibold">{t.analytics}</h4>
          </div>
          <p className="text-sm opacity-80">
            Отслеживайте статистику просмотров и переходов
          </p>
        </div>
        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Heart" size={16} />
            <h4 className="font-semibold">{t.favoriteFeature}</h4>
          </div>
          <p className="text-sm opacity-80">
            Сохраняйте интересные серверы в избранное
          </p>
        </div>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Icon name="Users" size={20} />
        {t.platformStats}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-500">1,250+</div>
          <div className="text-sm opacity-70">{t.servers}</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-500">850K+</div>
          <div className="text-sm opacity-70">{t.participants}</div>
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
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Icon name="Mail" size={20} />
        {t.contactUs}
      </h3>
      <p className="leading-relaxed mb-4">
        {t.questionsText}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button variant="outline" className="justify-start">
          <Icon name="MessageSquare" size={16} className="mr-2" />
          {t.discordSupport}
        </Button>
        <Button variant="outline" className="justify-start">
          <Icon name="Mail" size={16} className="mr-2" />
          {t.emailSupport}
        </Button>
      </div>
    </section>
  </div>
);

// Terms Content Component
const TermsContent = () => (
  <div className="space-y-6">
    <section>
      <h3 className="text-xl font-semibold mb-3">1. Общие правила</h3>
      <p className="leading-relaxed">
        Используя платформу adcord.net, вы соглашаетесь соблюдать данные правила. 
        Нарушение правил может привести к блокировке аккаунта без предварительного 
        уведомления. Администрация оставляет за собой право интерпретировать 
        правила по своему усмотрению.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold mb-3">2. Размещение объявлений</h3>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>Запрещено размещение ложной или вводящей в заблуждение информации</li>
        <li>Описания должны соответствовать содержанию сервера</li>
        <li>Цены должны быть указаны честно и корректно</li>
        <li>Запрещена реклама серверов с незаконным контентом</li>
        <li>Изображения должны соответствовать описанию</li>
        <li>Не допускается дублирование объявлений</li>
        <li>Обязательно указание актуальной контактной информации</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-semibold mb-3">3. Запрещенный контент</h3>
      <p className="mb-3">Строго запрещается размещение объявлений, содержащих:</p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>Материалы для взрослых (18+) и эротический контент</li>
        <li>Пропаганду экстремизма, терроризма и радикальных идеологий</li>
        <li>Продажу наркотических средств и психотропных веществ</li>
        <li>Мошеннические схемы и пирамиды</li>
        <li>Спам и массовые рассылки</li>
        <li>Продажу личных данных</li>
        <li>Материалы, нарушающие авторские права</li>
        <li>Призывы к насилию или дискриминации</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-semibold mb-3">4. Поведение пользователей</h3>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>Уважительное отношение к другим пользователям</li>
        <li>Запрет на оскорбления, угрозы и травлю</li>
        <li>Недопустимость накрутки показателей и фальшивых отзывов</li>
        <li>Честные отзывы и оценки</li>
        <li>Соблюдение этики делового общения</li>
        <li>Запрет на попытки взлома или нарушения работы сервиса</li>
        <li>Недопустимость создания множественных аккаунтов</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-semibold mb-3">5. Финансовые операции</h3>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>Все расчеты между пользователями происходят самостоятельно</li>
        <li>Платформа не несет ответственности за финансовые споры</li>
        <li>Рекомендуется использовать безопасные методы оплаты</li>
        <li>Запрещены схемы отмывания денег</li>
        <li>Обязательное соблюдение налогового законодательства</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-semibold mb-3">6. Контактная информация</h3>
      <p className="leading-relaxed">
        По вопросам применения правил, подачи жалоб или апелляций 
        обращайтесь через Discord сервер или официальные каналы связи. 
        Мы стремимся рассмотреть все обращения в кратчайшие сроки.
      </p>
    </section>
  </div>
);

// Privacy Content Component
const PrivacyContent = () => (
  <div className="space-y-6">
    <section>
      <h3 className="text-xl font-semibold mb-3">1. Введение</h3>
      <p className="leading-relaxed">
        Данная политика конфиденциальности описывает, как мы собираем, 
        используем и защищаем вашу персональную информацию при использовании 
        платформы Discord Ads Board (adcord.net). Мы серьезно относимся к 
        защите ваших данных и соблюдаем все применимые законы о защите персональных данных.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold mb-3">2. Какие данные мы собираем</h3>
      <div className="space-y-3">
        <div>
          <h4 className="font-semibold mb-2">Регистрационные данные:</h4>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Discord ID и имя пользователя</li>
            <li>Аватар пользователя Discord</li>
            <li>Email адрес (при добровольном предоставлении)</li>
            <li>Дата регистрации на платформе</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Данные активности:</h4>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Информация о размещенных объявлениях</li>
            <li>История просмотров и кликов</li>
            <li>Избранные объявления</li>
            <li>IP-адрес и данные браузера</li>
            <li>Время посещения и продолжительность сессий</li>
          </ul>
        </div>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-semibold mb-3">3. Как мы используем ваши данные</h3>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>Предоставление и улучшение функциональности платформы</li>
        <li>Аутентификация и авторизация пользователей</li>
        <li>Отображение статистики объявлений</li>
        <li>Модерация контента и обеспечение безопасности</li>
        <li>Связь с пользователями по вопросам поддержки</li>
        <li>Анализ использования сервиса для его улучшения</li>
        <li>Предотвращение мошенничества и злоупотреблений</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-semibold mb-3">4. Безопасность данных</h3>
      <p className="mb-3">Мы принимаем соответствующие меры для защиты ваших данных:</p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>Шифрование данных при передаче (HTTPS)</li>
        <li>Регулярное обновление систем безопасности</li>
        <li>Ограниченный доступ к персональным данным</li>
        <li>Регулярные аудиты безопасности</li>
        <li>Мониторинг подозрительной активности</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-semibold mb-3">5. Ваши права</h3>
      <p className="mb-3">В отношении ваших персональных данных вы имеете право на:</p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>Доступ к своим персональным данным</li>
        <li>Исправление неточных данных</li>
        <li>Удаление данных (право на забвение)</li>
        <li>Ограничение обработки данных</li>
        <li>Портабельность данных</li>
        <li>Возражение против обработки данных</li>
        <li>Отзыв согласия на обработку</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-semibold mb-3">6. Контактная информация</h3>
      <p className="leading-relaxed">
        По вопросам, связанным с обработкой персональных данных или данной 
        политикой конфиденциальности, обращайтесь к нам через Discord сервер 
        или официальные каналы связи. Мы ответим на ваш запрос в течение 30 дней.
      </p>
    </section>
  </div>
);

export default InfoSection;