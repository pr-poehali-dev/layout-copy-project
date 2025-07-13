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
      <Header
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        hasGradient={hasGradient}
        setHasGradient={setHasGradient}
        language={language}
        setLanguage={setLanguage}
        showAddForm={showAddForm}
        setShowAddForm={setShowAddForm}
        formData={formData}
        setFormData={setFormData}
        onFormSubmit={handleFormSubmit}
      />

      {/* Main Content */}
      {activeInfoSection === "none" && (
        <MainContent
          language={language}
          isDarkMode={isDarkMode}
          hasGradient={hasGradient}
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
          formatPrice={formatPrice}
        />
      )}

      {/* Info Section */}
      <InfoSection
        activeSection={activeInfoSection}
        onClose={() => setActiveInfoSection("none")}
        onSectionChange={setActiveInfoSection}
        isDarkMode={isDarkMode}
        language={language}
      />

      {/* Footer */}
      <Footer isDarkMode={isDarkMode} onShowInfo={setActiveInfoSection} />

    </div>
  );
};

export default Index;