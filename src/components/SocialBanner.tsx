import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface SocialBannerProps {
  isDarkMode: boolean;
  hasGradient: boolean;
}

const SocialBanner = ({ isDarkMode, hasGradient }: SocialBannerProps) => {
  const getBannerClasses = () => {
    if (hasGradient) {
      return isDarkMode
        ? "bg-gradient-to-r from-gray-800 via-slate-700 to-gray-800 border-gray-600"
        : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 border-white/30";
    }
    return isDarkMode
      ? "bg-gray-800 border-gray-600"
      : "bg-white/90 backdrop-blur-sm border-gray-300";
  };

  const getTextColor = () => {
    if (!hasGradient && !isDarkMode) return "text-gray-800";
    return "text-white";
  };

  return (
    <div
      className={`mt-16 p-6 rounded-lg border ${getBannerClasses()} shadow-lg`}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h3 className={`text-lg sm:text-xl font-bold ${getTextColor()}`}>
            🚀 Маркетплейс Услуг
          </h3>
          <p
            className={`text-sm sm:text-base ${getTextColor()} opacity-90 mt-1`}
          >
            Найди исполнителя или предложи свои услуги
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            size="sm"
            variant={hasGradient ? "outline" : "default"}
            className={`
              ${
                hasGradient
                  ? isDarkMode
                    ? "border-white/40 text-white hover:bg-white/10"
                    : "border-white/60 text-white hover:bg-white/20"
                  : isDarkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
              }
            `}
          >
            <Icon name="Share2" size={16} className="mr-2" />
            Поделиться
          </Button>

          <Button
            size="sm"
            variant={hasGradient ? "outline" : "secondary"}
            className={`
              ${
                hasGradient
                  ? isDarkMode
                    ? "border-white/40 text-white hover:bg-white/10"
                    : "border-white/60 text-white hover:bg-white/20"
                  : ""
              }
            `}
          >
            <Icon name="ExternalLink" size={16} className="mr-2" />
            Открыть
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SocialBanner;
