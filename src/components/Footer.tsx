import { useState } from "react";
import Icon from "@/components/ui/icon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FooterProps {
  isDarkMode: boolean;
}

const Footer = ({ isDarkMode }: FooterProps) => {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  return (
    <footer
      className={`border-t mt-16 py-6 ${
        isDarkMode
          ? "bg-gray-900/95 border-gray-700 text-gray-300"
          : "bg-white/95 border-gray-200 text-gray-600"
      } backdrop-blur-sm`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright and Links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
            <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
              © 2025–2025 adcord.net
            </span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowPrivacyPolicy(true)}
                className={`hover:underline ${
                  isDarkMode
                    ? "text-blue-400 hover:text-blue-300"
                    : "text-blue-600 hover:text-blue-700"
                }`}
              >
                Политика конфиденциальности
              </button>
              <button
                onClick={() => setShowTerms(true)}
                className={`hover:underline ${
                  isDarkMode
                    ? "text-blue-400 hover:text-blue-300"
                    : "text-blue-600 hover:text-blue-700"
                }`}
              >
                Правила площадки
              </button>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? "hover:bg-gray-700 text-gray-400 hover:text-blue-400"
                  : "hover:bg-gray-100 text-gray-500 hover:text-blue-600"
              }`}
              title="Telegram"
            >
              <Icon name="Send" size={18} />
            </a>
            <a
              href="#"
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? "hover:bg-gray-700 text-gray-400 hover:text-red-400"
                  : "hover:bg-gray-100 text-gray-500 hover:text-red-600"
              }`}
              title="YouTube"
            >
              <Icon name="Youtube" size={18} />
            </a>
            <a
              href="#"
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? "hover:bg-gray-700 text-gray-400 hover:text-blue-400"
                  : "hover:bg-gray-100 text-gray-500 hover:text-blue-600"
              }`}
              title="VK"
            >
              <div className="w-[18px] h-[18px] flex items-center justify-center">
                <span className="text-sm font-bold">VK</span>
              </div>
            </a>
            <a
              href="#"
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? "hover:bg-gray-700 text-gray-400 hover:text-blue-400"
                  : "hover:bg-gray-100 text-gray-500 hover:text-blue-600"
              }`}
              title="Facebook"
            >
              <Icon name="Facebook" size={18} />
            </a>
            <a
              href="#"
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? "hover:bg-gray-700 text-gray-400 hover:text-indigo-400"
                  : "hover:bg-gray-100 text-gray-500 hover:text-indigo-600"
              }`}
              title="Discord"
            >
              <div className="w-[18px] h-[18px] flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.010c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      <Dialog open={showPrivacyPolicy} onOpenChange={setShowPrivacyPolicy}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Политика конфиденциальности</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">1. Общие положения</h3>
              <p className="text-sm leading-relaxed">
                Настоящая Политика конфиденциальности определяет порядок обработки 
                персональных данных пользователей сервиса adcord.net. Мы обязуемся 
                защищать конфиденциальность пользователей и обеспечивать безопасность 
                предоставляемой информации.
              </p>

              <h3 className="text-lg font-semibold">2. Собираемая информация</h3>
              <p className="text-sm leading-relaxed">
                Мы можем собирать следующие данные:
              </p>
              <ul className="text-sm list-disc list-inside space-y-1 ml-4">
                <li>Контактная информация (email, никнейм)</li>
                <li>Информация о Discord серверах</li>
                <li>Данные об активности на платформе</li>
                <li>Техническая информация (IP-адрес, браузер, устройство)</li>
              </ul>

              <h3 className="text-lg font-semibold">3. Использование данных</h3>
              <p className="text-sm leading-relaxed">
                Собранная информация используется для:
              </p>
              <ul className="text-sm list-disc list-inside space-y-1 ml-4">
                <li>Предоставления услуг платформы</li>
                <li>Улучшения качества сервиса</li>
                <li>Обеспечения безопасности</li>
                <li>Связи с пользователями</li>
              </ul>

              <h3 className="text-lg font-semibold">4. Защита данных</h3>
              <p className="text-sm leading-relaxed">
                Мы применяем современные методы защиты для обеспечения безопасности 
                ваших данных. Доступ к персональной информации имеют только 
                уполномоченные сотрудники.
              </p>

              <h3 className="text-lg font-semibold">5. Права пользователей</h3>
              <p className="text-sm leading-relaxed">
                Вы имеете право на доступ, исправление, удаление своих персональных 
                данных, а также на ограничение их обработки.
              </p>

              <h3 className="text-lg font-semibold">6. Контактная информация</h3>
              <p className="text-sm leading-relaxed">
                По вопросам обработки персональных данных обращайтесь к нам через 
                Discord сервер или официальные каналы связи.
              </p>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Terms Modal */}
      <Dialog open={showTerms} onOpenChange={setShowTerms}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Правила площадки</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">1. Общие правила</h3>
              <p className="text-sm leading-relaxed">
                Используя платформу adcord.net, вы соглашаетесь соблюдать данные правила. 
                Нарушение правил может привести к блокировке аккаунта.
              </p>

              <h3 className="text-lg font-semibold">2. Размещение объявлений</h3>
              <ul className="text-sm list-disc list-inside space-y-1 ml-4">
                <li>Запрещено размещение ложной или вводящей в заблуждение информации</li>
                <li>Описания должны соответствовать содержанию сервера</li>
                <li>Цены должны быть указаны честно и корректно</li>
                <li>Запрещена реклама серверов с незаконным контентом</li>
              </ul>

              <h3 className="text-lg font-semibold">3. Запрещенный контент</h3>
              <p className="text-sm leading-relaxed">Запрещается размещение объявлений, содержащих:</p>
              <ul className="text-sm list-disc list-inside space-y-1 ml-4">
                <li>Материалы для взрослых (18+)</li>
                <li>Пропаганду экстремизма и терроризма</li>
                <li>Продажу наркотических средств</li>
                <li>Мошеннические схемы</li>
                <li>Спам и массовые рассылки</li>
              </ul>

              <h3 className="text-lg font-semibold">4. Поведение пользователей</h3>
              <ul className="text-sm list-disc list-inside space-y-1 ml-4">
                <li>Уважительное отношение к другим пользователям</li>
                <li>Запрет на оскорбления и угрозы</li>
                <li>Недопустимость накрутки показателей</li>
                <li>Честные отзывы и оценки</li>
              </ul>

              <h3 className="text-lg font-semibold">5. Модерация</h3>
              <p className="text-sm leading-relaxed">
                Администрация оставляет за собой право модерировать контент, 
                блокировать пользователей и удалять объявления без предварительного 
                уведомления при нарушении правил.
              </p>

              <h3 className="text-lg font-semibold">6. Ответственность</h3>
              <p className="text-sm leading-relaxed">
                Пользователи несут полную ответственность за размещаемый контент. 
                Администрация не несет ответственности за сделки между пользователями.
              </p>

              <h3 className="text-lg font-semibold">7. Изменения правил</h3>
              <p className="text-sm leading-relaxed">
                Правила могут изменяться без предварительного уведомления. 
                Актуальная версия всегда доступна на сайте.
              </p>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;