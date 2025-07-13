import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { SortBy, ViewMode, Language, TabType } from "@/types/listing";
import { translations } from "@/constants/translations";

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
}: FiltersProps) => {
  const t = translations[language];

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