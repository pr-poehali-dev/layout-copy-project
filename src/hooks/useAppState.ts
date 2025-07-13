import { useState, useEffect } from "react";
import type { Language } from "@/types";

export type InfoSection = "none" | "menu" | "terms" | "privacy";

export interface FormData {
  title: string;
  description: string;
  price: string;
  currency: string;
}

export const useAppState = () => {
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

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    price: "",
    currency: "RUB",
  });

  // Auto scroll to top when opening info sections
  useEffect(() => {
    if (activeInfoSection !== "none") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeInfoSection]);

  const resetForm = () => {
    setFormData({ title: "", description: "", price: "", currency: "RUB" });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setShowAddForm(false);
    resetForm();
  };

  return {
    // Theme & Display
    isDarkMode,
    setIsDarkMode,
    hasGradient,
    setHasGradient,
    language,
    setLanguage,
    
    // Listings & Filters
    currentTab,
    setCurrentTab,
    sortBy,
    setSortBy,
    categoryFilter,
    setCategoryFilter,
    currencyFilter,
    setCurrencyFilter,
    viewMode,
    setViewMode,
    
    // Forms & Modals
    showAddForm,
    setShowAddForm,
    formData,
    setFormData,
    resetForm,
    handleFormSubmit,
    
    // Info Sections
    activeInfoSection,
    setActiveInfoSection,
  };
};