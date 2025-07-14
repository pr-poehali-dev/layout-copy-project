import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Icon from "@/components/ui/icon";
import Footer from "@/components/Footer";

type TabType = 'menu' | 'terms' | 'privacy';

const Terms = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hasGradient, setHasGradient] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('menu');

  const navigateHome = () => {
    window.location.href = '/';
  };

  // Check URL parameters for initial tab
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam === 'privacy' || tabParam === 'terms') {
      setActiveTab(tabParam);
    }
  }, []);

  return (
    <div
      className={`min-h-screen ${
        isDarkMode
          ? "bg-gray-900 text-white"
          : hasGradient
            ? "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
            : "bg-gray-50"
      } transition-all duration-300`}
    >
      {/* Header */}
      <header
        className={`${
          isDarkMode
            ? "bg-gray-800/95 border-gray-700"
            : "bg-white/95 border-gray-200"
        } backdrop-blur-sm border-b sticky top-0 z-50`}
      >
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button 
              onClick={navigateHome}
              className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Icon
                  name="MessageSquare"
                  size={16}
                  className="sm:w-5 sm:h-5 text-white"
                />
              </div>
              <div>
                <h1
                  className={`text-lg sm:text-xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Discord Ads Board
                </h1>
                <p
                  className={`text-xs sm:text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Площадка для размещения рекламы Discord серверов
                </p>
              </div>
            </button>

            {/* Theme Controls */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <Icon
                  name="Palette"
                  size={14}
                  className={`sm:w-4 sm:h-4 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                />
                <Switch
                  checked={hasGradient}
                  onCheckedChange={setHasGradient}
                  className="scale-75 sm:scale-100"
                />
              </div>
              <div className="flex items-center gap-2">
                <Icon
                  name="Moon"
                  size={14}
                  className={`sm:w-4 sm:h-4 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                />
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                  className="scale-75 sm:scale-100"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Card className={`max-w-4xl mx-auto ${
          isDarkMode
            ? "bg-gray-800/95 border-gray-700 text-white"
            : "bg-white/95"
        } backdrop-blur-sm`}>
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={navigateHome}
                className={isDarkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : ""}
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Назад
              </Button>
            </div>
            
            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Button
                variant={activeTab === 'menu' ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab('menu')}
                className={`${activeTab === 'menu' ? '' : (isDarkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "")}`}
              >
                <Icon name="Menu" size={16} className="mr-2" />
                Главное меню
              </Button>
              <Button
                variant={activeTab === 'terms' ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab('terms')}
                className={`${activeTab === 'terms' ? '' : (isDarkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "")}`}
              >
                <Icon name="FileText" size={16} className="mr-2" />
                Правила площадки
              </Button>
              <Button
                variant={activeTab === 'privacy' ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab('privacy')}
                className={`${activeTab === 'privacy' ? '' : (isDarkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "")}`}
              >
                <Icon name="Shield" size={16} className="mr-2" />
                Политика конфиденциальности
              </Button>
            </div>

            <CardTitle className="text-2xl sm:text-3xl">
              {activeTab === 'menu' && 'Главное меню'}
              {activeTab === 'terms' && 'Правила площадки'}
              {activeTab === 'privacy' && 'Политика конфиденциальности'}
            </CardTitle>
            <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Последнее обновление: 13 июля 2025 года
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Menu Tab */}
            {activeTab === 'menu' && (
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
            )}

            {/* Terms Tab */}
            {activeTab === 'terms' && (
              <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Общие правила</h2>
              <p className="leading-relaxed">
                Используя платформу adcord.net, вы соглашаетесь соблюдать данные правила. 
                Нарушение правил может привести к блокировке аккаунта без предварительного 
                уведомления. Администрация оставляет за собой право интерпретировать 
                правила по своему усмотрению.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Размещение объявлений</h2>
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
              <h2 className="text-xl font-semibold mb-3">3. Запрещенный контент</h2>
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
              <h2 className="text-xl font-semibold mb-3">4. Поведение пользователей</h2>
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
              <h2 className="text-xl font-semibold mb-3">5. Финансовые операции</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Все расчеты между пользователями происходят самостоятельно</li>
                <li>Платформа не несет ответственности за финансовые споры</li>
                <li>Рекомендуется использовать безопасные методы оплаты</li>
                <li>Запрещены схемы отмывания денег</li>
                <li>Обязательное соблюдение налогового законодательства</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Интеллектуальная собственность</h2>
              <p className="leading-relaxed">
                Пользователи обязуются не нарушать права интеллектуальной собственности 
                третьих лиц. Запрещается использование торговых марок, логотипов, 
                и защищенного контента без разрешения правообладателей.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Модерация</h2>
              <p className="mb-3">Администрация оставляет за собой право:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Модерировать любой контент без предварительного уведомления</li>
                <li>Блокировать пользователей при нарушении правил</li>
                <li>Удалять объявления, не соответствующие стандартам</li>
                <li>Изменять или дополнять правила платформы</li>
                <li>Временно или постоянно приостанавливать работу сервиса</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Ответственность</h2>
              <p className="leading-relaxed">
                Пользователи несут полную ответственность за размещаемый контент 
                и свои действия на платформе. Администрация не несет ответственности 
                за сделки между пользователями, качество рекламируемых услуг 
                или ущерб от использования платформы.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Апелляции</h2>
              <p className="leading-relaxed">
                При несогласии с действиями модерации пользователи могут подать 
                апелляцию через официальные каналы связи. Апелляции рассматриваются 
                в течение 7 рабочих дней.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Изменения правил</h2>
              <p className="leading-relaxed">
                Правила могут изменяться без предварительного уведомления. 
                Актуальная версия всегда доступна на сайте. Продолжение использования 
                платформы после изменения правил означает согласие с новой версией.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">11. Контактная информация</h2>
              <p className="leading-relaxed">
                По вопросам применения правил, подачи жалоб или апелляций 
                обращайтесь через Discord сервер или официальные каналы связи. 
                Мы стремимся рассмотреть все обращения в кратчайшие сроки.
              </p>
            </section>
              </div>
            )}

            {/* Privacy Policy Tab */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-3">1. Введение</h2>
                  <p className="leading-relaxed">
                    Данная политика конфиденциальности описывает, как мы собираем, 
                    используем и защищаем вашу персональную информацию при использовании 
                    платформы Discord Ads Board (adcord.net). Мы серьезно относимся к 
                    защите ваших данных и соблюдаем все применимые законы о защите персональных данных.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">2. Какие данные мы собираем</h2>
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold mb-2">Регистрационные данные:</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Discord ID и имя пользователя</li>
                        <li>Аватар пользователя Discord</li>
                        <li>Email адрес (при добровольном предоставлении)</li>
                        <li>Дата регистрации на платформе</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Данные активности:</h3>
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
                  <h2 className="text-xl font-semibold mb-3">3. Как мы используем ваши данные</h2>
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
                  <h2 className="text-xl font-semibold mb-3">4. Передача данных третьим лицам</h2>
                  <p className="mb-3">Мы не продаем ваши персональные данные. Передача данных происходит только в следующих случаях:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>При получении согласия от пользователя</li>
                    <li>Поставщикам услуг для обеспечения работы платформы (хостинг, аналитика)</li>
                    <li>При выполнении требований законодательства</li>
                    <li>Для защиты прав и безопасности пользователей</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">5. Cookies и технологии отслеживания</h2>
                  <p className="leading-relaxed">
                    Мы используем cookies и аналогичные технологии для улучшения работы сайта, 
                    аналитики посещений и персонализации контента. Вы можете управлять 
                    настройками cookies в своем браузере, однако это может ограничить 
                    функциональность платформы.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">6. Безопасность данных</h2>
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
                  <h2 className="text-xl font-semibold mb-3">7. Ваши права</h2>
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
                  <h2 className="text-xl font-semibold mb-3">8. Хранение данных</h2>
                  <p className="leading-relaxed">
                    Мы храним ваши данные только в течение необходимого времени для 
                    выполнения целей, указанных в данной политике, или в соответствии 
                    с требованиями законодательства. Неактивные аккаунты могут быть 
                    удалены через 24 месяца неактивности.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">9. Несовершеннолетние</h2>
                  <p className="leading-relaxed">
                    Наша платформа предназначена для пользователей старше 13 лет в соответствии 
                    с правилами Discord. Мы не собираем персональные данные детей младше 13 лет. 
                    Если нам станет известно о сборе данных ребенка младше 13 лет, 
                    мы немедленно удалим такую информацию.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">10. Изменения политики</h2>
                  <p className="leading-relaxed">
                    Мы можем обновлять данную политику конфиденциальности. Существенные 
                    изменения будут объявлены на платформе. Продолжение использования 
                    сервиса после внесения изменений означает согласие с новой версией политики.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">11. Контактная информация</h2>
                  <p className="leading-relaxed">
                    По вопросам, связанным с обработкой персональных данных или данной 
                    политикой конфиденциальности, обращайтесь к нам через Discord сервер 
                    или официальные каналы связи. Мы ответим на ваш запрос в течение 30 дней.
                  </p>
                </section>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default Terms;