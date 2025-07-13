import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import PromoBanner from "@/components/PromoBanner";
import Filters from "@/components/Filters";
import ListingCard from "@/components/ListingCard";
import SocialBanner from "@/components/SocialBanner";
import Footer from "@/components/Footer";
import { sampleListings } from "@/data/sampleListings";
import { translations } from "@/data/translations";
import type { Language } from "@/types";

type InfoSection = "none" | "menu" | "terms" | "privacy";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hasGradient, setHasGradient] = useState(true);
  const [language, setLanguage] = useState<Language>("ru");
  const [currentTab, setCurrentTab] = useState("public");
  const [sortBy, setSortBy] = useState("newest");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currencyFilter, setCurrencyFilter] = useState("ALL");
  const [viewMode, setViewMode] = useState<"list" | "gallery">("gallery");
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeInfoSection, setActiveInfoSection] = useState<InfoSection>("none");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    currency: "RUB",
  });

  const t = translations[language];
  const categories = ["Gaming", "Finance", "IT", "Education", "Entertainment"];
  const currencies = ["ALL", "RUB", "USD", "EUR", "LTC", "USDT"];

  const formatPrice = (price: number, currency: string) => {
    return `${price.toLocaleString()} ${currency}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setShowAddForm(false);
    setFormData({ title: "", description: "", price: "", currency: "RUB" });
  };

  // Auto scroll to top when opening info sections
  useEffect(() => {
    if (activeInfoSection !== "none") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeInfoSection]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? hasGradient
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
            : "bg-gray-900"
          : hasGradient
            ? "bg-gradient-to-br from-blue-50 via-white to-purple-50"
            : "bg-gray-50"
      }`}
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
              >
                <Icon name={hasGradient ? "Palette" : "Square"} size={14} />
              </Button>

              {/* Add Listing Button */}
              <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm"
                  >
                    <Icon name="Plus" size={14} className="sm:mr-1" />
                    <span className="hidden sm:inline">{t.addListing}</span>
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className={`max-w-md ${
                    isDarkMode ? "bg-gray-800 border-gray-700 text-white" : ""
                  }`}
                >
                  <DialogHeader>
                    <DialogTitle>{t.addListing}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Название сервера</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className={isDarkMode ? "bg-gray-700 border-gray-600" : ""}
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Описание</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className={isDarkMode ? "bg-gray-700 border-gray-600" : ""}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Цена</Label>
                        <Input
                          id="price"
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          className={isDarkMode ? "bg-gray-700 border-gray-600" : ""}
                        />
                      </div>
                      <div>
                        <Label htmlFor="currency">Валюта</Label>
                        <Select
                          value={formData.currency}
                          onValueChange={(value) => setFormData({ ...formData, currency: value })}
                        >
                          <SelectTrigger className={isDarkMode ? "bg-gray-700 border-gray-600" : ""}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="RUB">RUB</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="LTC">LTC</SelectItem>
                            <SelectItem value="USDT">USDT</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      Опубликовать
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {activeInfoSection === "none" && (
        <div className="animate-in fade-in duration-300">
          {/* Promo Banner */}
          <PromoBanner language={language} />

          {/* Main Content */}
          <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
            {/* Filters */}
            <Filters 
              isDarkMode={isDarkMode}
              language={language}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              sortBy={sortBy}
              setSortBy={setSortBy}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              currencyFilter={currencyFilter}
              setCurrencyFilter={setCurrencyFilter}
              viewMode={viewMode}
              setViewMode={setViewMode}
              categories={categories}
              currencies={currencies}
            />

            {/* Listings */}
            <div
              className={`grid gap-3 sm:gap-4 ${
                viewMode === "gallery"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {sampleListings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  isDarkMode={isDarkMode}
                  language={language}
                  formatPrice={formatPrice}
                />
              ))}
            </div>

            <SocialBanner isDarkMode={isDarkMode} hasGradient={hasGradient} />
          </div>
        </div>
      )}

      {/* Info Sections - Full Screen */}
      {activeInfoSection !== "none" && (
        <div className={`min-h-screen animate-in fade-in duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
          <div className="container mx-auto px-4 py-8">
            <div className={`max-w-4xl mx-auto ${isDarkMode ? "bg-gray-800/95 border-gray-700 text-white" : "bg-white/95"} backdrop-blur-sm rounded-lg border shadow-lg`}>
              {/* Header */}
              <div className="p-6 border-b">
                <div className="flex items-center gap-3 mb-6">
                  <Button 
                    variant="default" 
                    size="sm"
                    onClick={() => setActiveInfoSection("none")}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Icon name="ArrowLeft" size={16} className="mr-2" />
                    Вернуться к объявлениям
                  </Button>
                </div>
                
                {/* Navigation Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <Button
                    variant={activeInfoSection === 'menu' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveInfoSection('menu')}
                    className={`${activeInfoSection === 'menu' ? '' : (isDarkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "")}`}
                  >
                    <Icon name="Menu" size={16} className="mr-2" />
                    {t.mainMenu}
                  </Button>
                  <Button
                    variant={activeInfoSection === 'terms' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveInfoSection('terms')}
                    className={`${activeInfoSection === 'terms' ? '' : (isDarkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "")}`}
                  >
                    <Icon name="FileText" size={16} className="mr-2" />
                    {t.termsOfService}
                  </Button>
                  <Button
                    variant={activeInfoSection === 'privacy' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveInfoSection('privacy')}
                    className={`${activeInfoSection === 'privacy' ? '' : (isDarkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "")}`}
                  >
                    <Icon name="Shield" size={16} className="mr-2" />
                    {t.privacyPolicy}
                  </Button>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold">
                  {activeInfoSection === 'menu' && t.mainMenu}
                  {activeInfoSection === 'terms' && t.termsOfService}
                  {activeInfoSection === 'privacy' && t.privacyPolicy}
                </h2>
                <p className={`mt-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Последнее обновление: 13 июля 2025 года
                </p>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Basic content for each section */}
                {activeInfoSection === 'menu' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">{t.aboutPlatform}</h3>
                    <p>{t.aboutText}</p>
                  </div>
                )}
                {activeInfoSection === 'terms' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Правила использования</h3>
                    <p>Основные правила использования платформы...</p>
                  </div>
                )}
                {activeInfoSection === 'privacy' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Политика конфиденциальности</h3>
                    <p>Как мы защищаем ваши данные...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer isDarkMode={isDarkMode} onShowInfo={setActiveInfoSection} />

    </div>
  );
};

export default Index;