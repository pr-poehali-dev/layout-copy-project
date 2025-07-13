export const formatPrice = (price: number, currency: string) => {
  const symbols = { RUB: "₽", USD: "$", EUR: "€", LTC: "LTC", USDT: "USDT" };
  return `${price} ${symbols[currency as keyof typeof symbols]}`;
};

export const getBackgroundClasses = (isDarkMode: boolean, hasGradient: boolean) => {
  if (hasGradient) {
    return isDarkMode
      ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
      : "bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500";
  }
  return isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50";
};