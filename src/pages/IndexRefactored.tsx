import { useState } from "react";
import SocialBanner from "@/components/SocialBanner";
import Footer from "@/components/Footer";
import AppHeader from "@/components/layout/AppHeader";
import PromoBanner from "@/components/PromoBanner";
import Filters from "@/components/Filters";
import ListingCard from "@/components/ListingCard";
import { Language, SortBy, ViewMode, TabType, FormData } from "@/types/listing";
import { translations } from "@/constants/translations";
import { sampleListings } from "@/data/sampleListings";
import { formatPrice, getBackgroundClasses } from "@/utils/formatters";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hasGradient, setHasGradient] = useState(true);
  const [language, setLanguage] = useState<Language>("ru");
  const [isAdmin, setIsAdmin] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [sortBy, setSortBy] = useState<SortBy>("newest");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [currencyFilter, setCurrencyFilter] = useState<string>("USDT");
  const [currentTab, setCurrentTab] = useState<TabType>("public");
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    price: "",
    currency: "RUB",
    category: "",
    serverLink: "",
  });

  const categories = ["Игры", "Развлечения", "Финансы", "Образование", "Технологии"];
  const currencies = ["USDT", "RUB", "USD", "EUR", "LTC"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setShowAddForm(false);
    setFormData({
      title: "",
      description: "",
      price: "",
      currency: "RUB",
      category: "",
      serverLink: "",
    });
  };

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${getBackgroundClasses(isDarkMode, hasGradient)}`}
    >
      {/* Header */}
      <AppHeader 
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        hasGradient={hasGradient}
        setHasGradient={setHasGradient}
        language={language}
        setLanguage={setLanguage}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        showAddForm={showAddForm}
        setShowAddForm={setShowAddForm}
      />

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