import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import Icon from "@/components/ui/icon";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Language } from "@/types/listing";
import { translations } from "@/constants/translations";
import AddListingDialog from "./AddListingDialog";

interface AppHeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  hasGradient: boolean;
  setHasGradient: (value: boolean) => void;
  language: Language;
  setLanguage: (value: Language) => void;
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  showAddForm: boolean;
  setShowAddForm: (value: boolean) => void;
}

const AppHeader = ({
  isDarkMode,
  setIsDarkMode,
  hasGradient,
  setHasGradient,
  language,
  setLanguage,
  isAdmin,
  setIsAdmin,
  showAddForm,
  setShowAddForm,
}: AppHeaderProps) => {
  const t = translations[language];

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
          <a href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm">
                Ad
              </span>
            </div>
            <div className="hidden sm:block">
              <h1
                className={`text-lg sm:text-xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {t.title}
              </h1>
            </div>
          </a>

          {/* Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Language Selector */}
            <Select
              value={language}
              onValueChange={(value: Language) => setLanguage(value)}
            >
              <SelectTrigger className="w-12 sm:w-16 h-8 sm:h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ru">RU</SelectItem>
                <SelectItem value="en">EN</SelectItem>
              </SelectContent>
            </Select>

            {/* Theme Controls */}
            <Button
              variant={isDarkMode ? "default" : "outline"}
              size="sm"
              className="h-8 w-8 sm:h-9 sm:w-auto p-1 sm:px-3"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              <Icon name={isDarkMode ? "Sun" : "Moon"} size={14} />
            </Button>

            <Button
              variant={hasGradient ? "default" : "outline"}
              size="sm"
              className="h-8 w-8 sm:h-9 sm:w-auto p-1 sm:px-3"
              onClick={() => setHasGradient(!hasGradient)}
              title={hasGradient ? "Отключить градиент" : "Включить градиент"}
            >
              <Icon name={hasGradient ? "Palette" : "Square"} size={14} />
            </Button>

            {/* Admin Toggle */}
            {isAdmin && (
              <Button
                variant="outline"
                size="sm"
                className={`h-8 w-8 sm:h-9 sm:w-auto p-1 sm:px-3 ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
                    : ""
                }`}
                onClick={() => setIsAdmin(!isAdmin)}
              >
                <Icon name="Shield" size={14} />
              </Button>
            )}

            {/* Add Listing Button */}
            <AddListingDialog
              open={showAddForm}
              onOpenChange={setShowAddForm}
              isDarkMode={isDarkMode}
              language={language}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;