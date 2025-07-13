import React, { useState } from "react";
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
      
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default Index;