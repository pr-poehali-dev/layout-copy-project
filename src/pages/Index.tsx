import { useState } from "react";
import SocialBanner from "@/components/SocialBanner";
import Footer from "@/components/Footer";
import PromoBanner from "@/components/PromoBanner";
import Filters from "@/components/Filters";
import ListingCard from "@/components/ListingCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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



  const t = translations[language];

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
                </SelectContent>
              </Select>

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

              {isAdmin && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 sm:h-9 sm:w-auto p-1 sm:px-3"
                >
                  <Icon name="Shield" size={14} />
                </Button>
              )}

              <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 h-8 sm:h-9 px-2 sm:px-4 text-xs sm:text-sm">
                    <Icon name="Plus" size={14} className="sm:mr-2" />
                    <span className="hidden sm:inline">{t.addListing}</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{t.addListing}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Заголовок</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        placeholder="Краткое описание предложения"
                        maxLength={100}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Описание</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        placeholder="Подробное описание рекламного предложения"
                        maxLength={1000}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="serverLink">Ссылка на сервер</Label>
                      <Input
                        id="serverLink"
                        value={formData.serverLink}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            serverLink: e.target.value,
                          })
                        }
                        placeholder="https://discord.gg/server"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="category">Категория</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          setFormData({ ...formData, category: value })
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Gaming, IT, Finance" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Label htmlFor="price">Цена</Label>
                        <Input
                          id="price"
                          type="number"
                          value={formData.price}
                          onChange={(e) =>
                            setFormData({ ...formData, price: e.target.value })
                          }
                          placeholder="5,000"
                          max={9999999999}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="currency">Валюта</Label>
                        <Select
                          value={formData.currency}
                          onValueChange={(
                            value: "RUB" | "USD" | "EUR" | "LTC",
                          ) => setFormData({ ...formData, currency: value })}
                        >
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {currencies.map((curr) => (
                              <SelectItem key={curr} value={curr}>
                                {curr}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
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
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 sm:py-3">
        <div className="container mx-auto px-3 sm:px-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Badge
              variant="secondary"
              className="bg-white/20 text-white text-xs sm:text-sm px-2 py-1"
            >
              {t.promo}
            </Badge>
            <span className="font-medium text-sm sm:text-base">
              {t.discount}
            </span>
          </div>
          <div className="text-right">
            <span className="font-bold text-lg sm:text-2xl">-35%</span>
            <div className="text-xs sm:text-sm">{t.limitedTime}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-1 sm:gap-2 mb-4 sm:mb-6 overflow-x-auto">
          {["public", "my", "favorites"].map((tab) => (
            <Button
              key={tab}
              variant={currentTab === tab ? "default" : "outline"}
              onClick={() => setCurrentTab(tab as any)}
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
          } backdrop-blur-sm rounded-lg p-3 sm:p-4 mb-4 sm:mb-6`}
        >
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
            <div className="flex items-center gap-2">
              <Select
                value={sortBy}
                onValueChange={(value: any) => setSortBy(value)}
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

            <div className="flex items-center gap-2 sm:ml-auto">
              <Button
                variant="outline"
                size="sm"
                className={`h-8 w-8 sm:h-9 sm:w-9 p-0 ${
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

        {/* Listings */}
        <div
          className={`grid gap-3 sm:gap-4 ${
            viewMode === "gallery"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {sampleListings.map((listing) => (
            <Card
              key={listing.id}
              className={`${
                isDarkMode
                  ? "bg-gray-800/95 border-gray-700 text-white"
                  : "bg-white/95"
              } backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]`}
            >
              <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Icon
                        name="Users"
                        size={16}
                        className="sm:w-5 sm:h-5 text-white"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle
                        className={`text-base sm:text-lg font-bold truncate ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {listing.title}
                      </CardTitle>
                      <div
                        className={`flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <Icon
                          name="Users"
                          size={12}
                          className="sm:w-3.5 sm:h-3.5"
                        />
                        <span className="truncate">
                          {listing.memberCount.toLocaleString()} {t.members}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-8 w-8 p-0 ${
                      isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }`}
                  >
                    <Icon
                      name="Heart"
                      size={14}
                      className={
                        listing.isFavorite
                          ? "fill-red-500 text-red-500"
                          : isDarkMode
                            ? "text-gray-400"
                            : "text-gray-500"
                      }
                    />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-3 sm:p-6 pt-0">
                <p
                  className={`text-sm sm:text-base mb-3 sm:mb-4 line-clamp-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {listing.description}
                </p>

                <div
                  className={`flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm mb-3 sm:mb-4 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <Icon name="Eye" size={12} className="sm:w-3.5 sm:h-3.5" />
                    <span>
                      {listing.views.toLocaleString()} {t.views}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon
                      name="MousePointer"
                      size={12}
                      className="sm:w-3.5 sm:h-3.5"
                    />
                    <span>
                      {listing.clicks.toLocaleString()} {t.clicks}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon
                      name="Heart"
                      size={12}
                      className="sm:w-3.5 sm:h-3.5"
                    />
                    <span>
                      {listing.favorites} {t.favorites}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`text-xl sm:text-2xl font-bold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {formatPrice(listing.price, listing.currency)}
                    </div>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        isDarkMode
                          ? "bg-gray-700 text-gray-200 border-gray-600"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {listing.category}
                    </Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className={`h-8 px-2 sm:h-9 sm:px-3 text-xs sm:text-sm ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
                          : ""
                      }`}
                    >
                      <Icon
                        name="ExternalLink"
                        size={12}
                        className="sm:w-3.5 sm:h-3.5 sm:mr-1"
                      />
                      <span className="hidden sm:inline">{t.visitServer}</span>
                    </Button>
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 h-8 px-2 sm:h-9 sm:px-3 text-xs sm:text-sm"
                    >
                      {t.contact}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className={`h-8 w-8 p-0 border-red-500 text-red-500 hover:bg-red-50 ${
                        isDarkMode
                          ? "border-red-500 text-red-400 hover:bg-red-950/20"
                          : "border-red-500 text-red-500 hover:bg-red-50"
                      }`}
                      title={t.report}
                    >
                      <Icon
                        name="Flag"
                        size={14}
                      />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <SocialBanner isDarkMode={isDarkMode} hasGradient={hasGradient} />
      </div>
      
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default Index;