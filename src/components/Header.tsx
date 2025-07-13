import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Icon from "@/components/ui/icon";
import AddListingForm from "@/components/AddListingForm";
import { translations } from "@/data/translations";
import type { Language } from "@/types";
import type { FormData } from "@/hooks/useAppState";

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  hasGradient: boolean;
  setHasGradient: (value: boolean) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  showAddForm: boolean;
  setShowAddForm: (show: boolean) => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
  onFormSubmit: (e: React.FormEvent) => void;
}

const Header = ({
  isDarkMode,
  setIsDarkMode,
  hasGradient,
  setHasGradient,
  language,
  setLanguage,
  showAddForm,
  setShowAddForm,
  formData,
  setFormData,
  onFormSubmit,
}: HeaderProps) => {
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
          <a
            href="/"
            className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity"
          >
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
            {/* Language Switcher */}
            <div className="flex items-center gap-1">
              <Button
                variant={language === "ru" ? "default" : "ghost"}
                size="sm"
                onClick={() => setLanguage("ru")}
                className={`h-7 px-2 text-xs ${
                  language === "ru"
                    ? "bg-blue-600 text-white"
                    : isDarkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                RU
              </Button>
              <Button
                variant={language === "en" ? "default" : "ghost"}
                size="sm"
                onClick={() => setLanguage("en")}
                className={`h-7 px-2 text-xs ${
                  language === "en"
                    ? "bg-blue-600 text-white"
                    : isDarkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                EN
              </Button>
            </div>

            {/* Add Listing Button */}
            <AddListingForm
              showForm={showAddForm}
              setShowForm={setShowAddForm}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onFormSubmit}
              isDarkMode={isDarkMode}
            />

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
      </div>
    </header>
  );
};

export default Header;