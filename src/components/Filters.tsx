import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { SortBy, ViewMode, Language, TabType } from "@/types/listing";
import { translations } from "@/constants/translations";
import { useState, useRef, useEffect } from "react";

interface FiltersProps {
  isDarkMode: boolean;
  language: Language;
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
  sortBy: SortBy;
  setSortBy: (sort: SortBy) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  currencyFilter: string;
  setCurrencyFilter: (currency: string) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  categories: string[];
  currencies: string[];
  sellerFilter: string;
  setSellerFilter: (seller: string) => void;
  availableSellers: string[];
}

const Filters = ({
  isDarkMode,
  language,
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
  categories,
  currencies,
  sellerFilter,
  setSellerFilter,
  availableSellers,
}: FiltersProps) => {
  const t = translations[language];
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSellers, setFilteredSellers] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sellerFilter.trim()) {
      const filtered = availableSellers.filter(seller => 
        seller.toLowerCase().includes(sellerFilter.toLowerCase())
      );
      setFilteredSellers(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [sellerFilter, availableSellers]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        suggestionsRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSellerSelect = (seller: string) => {
    setSellerFilter(seller);
    setShowSuggestions(false);
  };

  const clearSellerFilter = () => {
    setSellerFilter('');
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Navigation Tabs */}
      <div className="flex gap-1 sm:gap-2 overflow-x-auto">
        {(["public", "my", "favorites"] as TabType[]).map((tab) => (
          <Button
            key={tab}
            variant={currentTab === tab ? "default" : "outline"}
            onClick={() => setCurrentTab(tab)}
            className={`whitespace-nowrap text-xs sm:text-sm px-3 sm:px-4 h-8 sm:h-9 ${
              isDarkMode
                ? currentTab === tab
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-700/90 text-gray-200 hover:bg-gray-600 border-gray-600"
                : "bg-white/90 hover:bg-white text-gray-900"
            }`}
          >
            {t[tab as keyof typeof t]}
          </Button>
        ))}
      </div>

      {/* Seller Search - Show only on public tab */}
      {currentTab === "public" && (
        <div
          className={`${
            isDarkMode ? "bg-gray-800/90 border border-gray-700" : "bg-white/90"
          } backdrop-blur-sm rounded-lg p-3 sm:p-4`}
        >
          <div className="relative">
            <div className="flex items-center gap-2">
              <Icon name="Search" size={16} className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
              <div className="relative flex-1">
                <Input
                  ref={inputRef}
                  placeholder="Поиск продавца..."
                  value={sellerFilter}
                  onChange={(e) => setSellerFilter(e.target.value)}
                  onFocus={() => {
                    if (filteredSellers.length > 0) {
                      setShowSuggestions(true);
                    }
                  }}
                  className={`${
                    isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white"
                  } h-8 sm:h-9 text-xs sm:text-sm`}
                />
                {sellerFilter && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearSellerFilter}
                    className="absolute right-1 top-0 h-full px-2 hover:bg-transparent"
                  >
                    <Icon name="X" size={14} />
                  </Button>
                )}
                
                {/* Suggestions dropdown */}
                {showSuggestions && filteredSellers.length > 0 && (
                  <div
                    ref={suggestionsRef}
                    className={`absolute top-full left-0 right-0 z-50 mt-1 max-h-48 overflow-y-auto rounded-md border shadow-lg ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-600"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    {filteredSellers.map((seller) => (
                      <div
                        key={seller}
                        onClick={() => handleSellerSelect(seller)}
                        className={`px-3 py-2 cursor-pointer text-sm transition-colors ${
                          isDarkMode
                            ? "hover:bg-gray-700 text-gray-200"
                            : "hover:bg-gray-100 text-gray-900"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon name="User" size={14} />
                          {seller}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div
        className={`${
          isDarkMode ? "bg-gray-800/90 border border-gray-700" : "bg-white/90"
        } backdrop-blur-sm rounded-lg p-3 sm:p-4`}
      >
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
          {/* Sort */}
          <div className="flex items-center gap-2">
            <Select
              value={sortBy}
              onValueChange={(value: SortBy) => setSortBy(value)}
            >
              <SelectTrigger className="w-32 sm:w-40 h-8 sm:h-9 text-xs sm:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">{t.newest}</SelectItem>
                <SelectItem value="cheapest">{t.cheapest}</SelectItem>
                <SelectItem value="expensive">{t.expensive}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-32 sm:w-36 h-8 sm:h-9 text-xs sm:text-sm">
                <SelectValue placeholder={t.category} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.category}</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Currency Filter */}
          <div className="flex items-center gap-2">
            <Select value={currencyFilter} onValueChange={setCurrencyFilter}>
              <SelectTrigger className="w-24 sm:w-28 h-8 sm:h-9 text-xs sm:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency} value={currency}>
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 ml-auto">
            <Button
              variant="outline"
              size="sm"
              className={`h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
                  : ""
              }`}
              onClick={() =>
                setViewMode(viewMode === "list" ? "gallery" : "list")
              }
            >
              <Icon
                name={viewMode === "list" ? "Grid3X3" : "List"}
                size={14}
              />
            </Button>

            <Button
              variant="outline"
              size="sm"
              className={`h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
                  : ""
              }`}
            >
              {t.reset}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;