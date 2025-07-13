import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Icon from "@/components/ui/icon";
import { TermsHeaderProps } from "@/types/terms";

const TermsHeader = ({ 
  isDarkMode, 
  setIsDarkMode, 
  hasGradient, 
  setHasGradient, 
  navigateHome 
}: TermsHeaderProps) => {
  return (
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
  );
};

export default TermsHeader;