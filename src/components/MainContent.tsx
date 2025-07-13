import PromoBanner from "@/components/PromoBanner";
import Filters from "@/components/Filters";
import ListingCard from "@/components/ListingCard";
import SocialBanner from "@/components/SocialBanner";
import { sampleListings } from "@/data/sampleListings";
import type { Language } from "@/types";

interface MainContentProps {
  language: Language;
  isDarkMode: boolean;
  hasGradient: boolean;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  currencyFilter: string;
  setCurrencyFilter: (currency: string) => void;
  viewMode: "list" | "gallery";
  setViewMode: (mode: "list" | "gallery") => void;
  formatPrice: (price: number, currency: string) => string;
}

const MainContent = ({
  language,
  isDarkMode,
  hasGradient,
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
  formatPrice,
}: MainContentProps) => {
  const categories = ["Gaming", "Finance", "IT", "Education", "Entertainment"];
  const currencies = ["ALL", "RUB", "USD", "EUR", "LTC", "USDT"];

  return (
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
  );
};

export default MainContent;