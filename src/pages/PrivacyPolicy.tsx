import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Icon from "@/components/ui/icon";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
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
              Политика конфиденциальности
            </CardTitle>
            <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Последнее обновление: 13 июля 2025 года
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Общие положения</h2>
              <p className="leading-relaxed">
                Настоящая Политика конфиденциальности определяет порядок обработки 
                персональных данных пользователей сервиса adcord.net. Мы обязуемся 
                защищать конфиденциальность пользователей и обеспечивать безопасность 
                предоставляемой информации.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Собираемая информация</h2>
              <p className="mb-3">Мы можем собирать следующие данные:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Контактная информация (email, никнейм)</li>
                <li>Информация о Discord серверах</li>
                <li>Данные об активности на платформе</li>
                <li>Техническая информация (IP-адрес, браузер, устройство)</li>
                <li>Файлы cookie и аналогичные технологии</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Использование данных</h2>
              <p className="mb-3">Собранная информация используется для:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Предоставления услуг платформы</li>
                <li>Улучшения качества сервиса</li>
                <li>Обеспечения безопасности</li>
                <li>Связи с пользователями</li>
                <li>Персонализации контента</li>
                <li>Аналитики и статистики</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Передача данных третьим лицам</h2>
              <p className="leading-relaxed">
                Мы не продаем, не арендуем и не передаем ваши персональные данные 
                третьим лицам без вашего согласия, за исключением случаев, 
                предусмотренных законодательством или для обеспечения работы сервиса.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Защита данных</h2>
              <p className="leading-relaxed">
                Мы применяем современные методы защиты для обеспечения безопасности 
                ваших данных. Доступ к персональной информации имеют только 
                уполномоченные сотрудники. Используются технологии шифрования 
                и защищенные каналы передачи данных.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Cookies и аналогичные технологии</h2>
              <p className="leading-relaxed">
                Мы используем cookies для улучшения функциональности сайта, 
                запоминания ваших предпочтений и анализа трафика. Вы можете 
                управлять cookies через настройки браузера.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Права пользователей</h2>
              <p className="mb-3">Вы имеете право на:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Доступ к своим персональным данным</li>
                <li>Исправление неточных данных</li>
                <li>Удаление персональных данных</li>
                <li>Ограничение обработки данных</li>
                <li>Портируемость данных</li>
                <li>Отзыв согласия на обработку</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Хранение данных</h2>
              <p className="leading-relaxed">
                Персональные данные хранятся только в течение времени, необходимого 
                для достижения целей обработки, или в соответствии с требованиями 
                законодательства.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Изменения в политике</h2>
              <p className="leading-relaxed">
                Мы можем обновлять данную политику конфиденциальности. 
                О существенных изменениях мы уведомим пользователей через сайт 
                или по электронной почте.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Контактная информация</h2>
              <p className="leading-relaxed">
                По вопросам обработки персональных данных обращайтесь к нам через 
                Discord сервер или официальные каналы связи. Мы рассматриваем 
                все обращения в течение 30 дней.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default PrivacyPolicy;