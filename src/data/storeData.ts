import { StoreCategory } from "@/types/store";

export const storeCategories: StoreCategory[] = [
  {
    id: "effects",
    name: "Эффекты",
    description: "Сияние, блики и магические эффекты",
    icon: "Sparkles",
    items: [
      {
        id: "golden-glow",
        name: "Золотое сияние",
        description: "Роскошное золотое свечение вокруг карточки",
        price: 199,
        currency: "RUB",
        category: "effects",
        preview: "✨",
        rarity: "epic",
        isPermanent: true,
        cssClass: "golden-glow-effect",
        gradient: "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)",
        animation: "glow-pulse"
      },
      {
        id: "diamond-sparkle",
        name: "Алмазные искры",
        description: "Переливающиеся алмазные частицы",
        price: 299,
        currency: "RUB",
        category: "effects",
        preview: "💎",
        rarity: "legendary",
        isPermanent: true,
        cssClass: "diamond-sparkle-effect",
        animation: "sparkle-animation"
      },
      {
        id: "rainbow-aura",
        name: "Радужная аура",
        description: "Мерцающие радужные переливы",
        price: 149,
        currency: "RUB",
        category: "effects",
        preview: "🌈",
        rarity: "rare",
        isPermanent: true,
        cssClass: "rainbow-aura-effect",
        gradient: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7)",
        animation: "rainbow-flow"
      },
      {
        id: "fire-border",
        name: "Огненная рамка",
        description: "Пылающая огненная окантовка",
        price: 249,
        currency: "RUB",
        category: "effects",
        preview: "🔥",
        rarity: "epic",
        isPermanent: true,
        cssClass: "fire-border-effect",
        gradient: "linear-gradient(45deg, #ff4757, #ff6348, #ff9f43)",
        animation: "fire-flicker"
      }
    ]
  },
  {
    id: "frames",
    name: "Рамки",
    description: "Элегантные рамки и обрамления",
    icon: "Frame",
    items: [
      {
        id: "premium-gold",
        name: "Премиум золото",
        description: "Роскошная золотая рамка с узорами",
        price: 399,
        currency: "RUB",
        category: "frames",
        preview: "🏆",
        rarity: "legendary",
        isPermanent: true,
        cssClass: "premium-gold-frame"
      },
      {
        id: "crystal-frame",
        name: "Кристальная рамка",
        description: "Прозрачная кристальная окантовка",
        price: 199,
        currency: "RUB",
        category: "frames",
        preview: "💠",
        rarity: "rare",
        isPermanent: true,
        cssClass: "crystal-frame"
      },
      {
        id: "neon-cyber",
        name: "Неоновый киберпанк",
        description: "Футуристическая неоновая рамка",
        price: 299,
        currency: "RUB",
        category: "frames",
        preview: "⚡",
        rarity: "epic",
        isPermanent: true,
        cssClass: "neon-cyber-frame",
        gradient: "linear-gradient(45deg, #00f5ff, #ff00ff)",
        animation: "neon-glow"
      },
      {
        id: "vintage-bronze",
        name: "Винтажная бронза",
        description: "Антикварная бронзовая рамка",
        price: 149,
        currency: "RUB",
        category: "frames",
        preview: "🎖️",
        rarity: "common",
        isPermanent: true,
        cssClass: "vintage-bronze-frame"
      }
    ]
  },
  {
    id: "badges",
    name: "Значки",
    description: "Статусные значки и метки",
    icon: "Award",
    items: [
      {
        id: "vip-crown",
        name: "VIP Корона",
        description: "Эксклюзивная корона для VIP пользователей",
        price: 499,
        currency: "RUB",
        category: "badges",
        preview: "👑",
        rarity: "legendary",
        isPermanent: true,
        cssClass: "vip-crown-badge"
      },
      {
        id: "verified-check",
        name: "Проверенный",
        description: "Значок проверенного пользователя",
        price: 99,
        currency: "RUB",
        category: "badges",
        preview: "✅",
        rarity: "common",
        isPermanent: true,
        cssClass: "verified-badge"
      },
      {
        id: "trending-fire",
        name: "В тренде",
        description: "Значок популярного объявления",
        price: 199,
        currency: "RUB",
        category: "badges",
        preview: "🔥",
        rarity: "rare",
        duration: 7,
        isPermanent: false,
        cssClass: "trending-badge"
      },
      {
        id: "exclusive-star",
        name: "Эксклюзив",
        description: "Звезда эксклюзивного контента",
        price: 299,
        currency: "RUB",
        category: "badges",
        preview: "⭐",
        rarity: "epic",
        isPermanent: true,
        cssClass: "exclusive-star-badge"
      }
    ]
  },
  {
    id: "animations",
    name: "Анимации",
    description: "Динамические анимационные эффекты",
    icon: "Zap",
    items: [
      {
        id: "floating-particles",
        name: "Летящие частицы",
        description: "Анимированные светящиеся частицы",
        price: 249,
        currency: "RUB",
        category: "animations",
        preview: "✨",
        rarity: "epic",
        isPermanent: true,
        cssClass: "floating-particles-animation",
        animation: "floating-particles"
      },
      {
        id: "pulse-glow",
        name: "Пульсирующее свечение",
        description: "Мягкое пульсирующее освещение",
        price: 149,
        currency: "RUB",
        category: "animations",
        preview: "💫",
        rarity: "rare",
        isPermanent: true,
        cssClass: "pulse-glow-animation",
        animation: "pulse-glow"
      },
      {
        id: "matrix-rain",
        name: "Матричный дождь",
        description: "Эффект падающих символов как в Матрице",
        price: 399,
        currency: "RUB",
        category: "animations",
        preview: "🤖",
        rarity: "legendary",
        isPermanent: true,
        cssClass: "matrix-rain-animation",
        animation: "matrix-rain"
      },
      {
        id: "shake-attention",
        name: "Привлечение внимания",
        description: "Легкое покачивание для привлечения внимания",
        price: 99,
        currency: "RUB",
        category: "animations",
        preview: "📢",
        rarity: "common",
        duration: 3,
        isPermanent: false,
        cssClass: "shake-attention-animation",
        animation: "shake-attention"
      }
    ]
  },
  {
    id: "themes",
    name: "Темы",
    description: "Полные тематические стили",
    icon: "Palette",
    items: [
      {
        id: "dark-premium",
        name: "Премиум темная",
        description: "Элегантная темная тема с золотыми акцентами",
        price: 599,
        currency: "RUB",
        category: "themes",
        preview: "🌙",
        rarity: "legendary",
        isPermanent: true,
        cssClass: "dark-premium-theme"
      },
      {
        id: "crypto-green",
        name: "Крипто зеленая",
        description: "Стиль для криптотрейдеров",
        price: 299,
        currency: "RUB",
        category: "themes",
        preview: "📈",
        rarity: "epic",
        isPermanent: true,
        cssClass: "crypto-green-theme"
      },
      {
        id: "pastel-dream",
        name: "Пастельная мечта",
        description: "Нежные пастельные тона",
        price: 199,
        currency: "RUB",
        category: "themes",
        preview: "🌸",
        rarity: "rare",
        isPermanent: true,
        cssClass: "pastel-dream-theme"
      },
      {
        id: "minimalist-white",
        name: "Минималистичная белая",
        description: "Чистый минималистичный стиль",
        price: 149,
        currency: "RUB",
        category: "themes",
        preview: "⚪",
        rarity: "common",
        isPermanent: true,
        cssClass: "minimalist-white-theme"
      }
    ]
  }
];