import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Icon from "@/components/ui/icon";
import Footer from "@/components/Footer";

const Terms = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hasGradient, setHasGradient] = useState(true);

  const navigateHome = () => {
    window.location.href = '/';
  };

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
            <CardTitle className="text-2xl sm:text-3xl">
              Правила площадки
            </CardTitle>
            <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Последнее обновление: 13 июля 2025 года
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
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
          </CardContent>
        </Card>
      </div>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default Terms;