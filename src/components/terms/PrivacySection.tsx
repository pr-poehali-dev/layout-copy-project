import { SectionProps } from "@/types/terms";

const PrivacySection = ({ isDarkMode }: SectionProps) => {
  return (
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
        <h2 className="text-xl font-semibold mb-3">4. Безопасность данных</h2>
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
        <h2 className="text-xl font-semibold mb-3">5. Ваши права</h2>
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
        <h2 className="text-xl font-semibold mb-3">6. Контактная информация</h2>
        <p className="leading-relaxed">
          По вопросам, связанным с обработкой персональных данных или данной 
          политикой конфиденциальности, обращайтесь к нам через Discord сервер 
          или официальные каналы связи. Мы ответим на ваш запрос в течение 30 дней.
        </p>
      </section>
    </div>
  );
};

export default PrivacySection;