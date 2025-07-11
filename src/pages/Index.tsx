import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import Icon from "@/components/ui/icon";

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: "RUB" | "USD" | "EUR" | "LTC";
  category: string;
  serverLink: string;
  memberCount: number;
  views: number;
  clicks: number;
  favorites: number;
  isFavorite: boolean;
  createdAt: Date;
}

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<"ru" | "en">("ru");
  const [isAdmin, setIsAdmin] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "gallery">("list");
  const [sortBy, setSortBy] = useState<"newest" | "cheapest" | "expensive">(
    "newest",
  );
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [currentTab, setCurrentTab] = useState<"public" | "my" | "favorites">(
    "public",
  );
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    currency: "RUB" as const,
    category: "",
    serverLink: "",
  });

  const categories = [
    "Gaming",
    "IT",
    "Finance",
    "Entertainment",
    "Education",
    "Business",
  ];
  const currencies = ["RUB", "USD", "EUR", "LTC"];

  const sampleListings: Listing[] = [
    {
      id: "1",
      title: "Elite Gaming Hub",
      description:
        "Join our premium Discord server with exclusive gaming content, tournaments, and active community of 50K+ members!",
      price: 1625,
      currency: "RUB",
      category: "Gaming",
      serverLink: "https://discord.gg/sample",
      memberCount: 52847,
      views: 15420,
      clicks: 2380,
      favorites: 847,
      isFavorite: false,
      createdAt: new Date("2025-01-10"),
    },
    {
      id: "2",
      title: "Crypto Trading Community",
      description:
        "Professional cryptocurrency trading signals and market analysis. Daily insights from experienced traders.",
      price: 50,
      currency: "USD",
      category: "Finance",
      serverLink: "https://discord.gg/crypto",
      memberCount: 28450,
      views: 8920,
      clicks: 1240,
      favorites: 326,
      isFavorite: true,
      createdAt: new Date("2025-01-09"),
    },
    {
      id: "3",
      title: "Tech Startup Network",
      description:
        "Connect with entrepreneurs, developers, and investors in the tech industry. Weekly networking events.",
      price: 25,
      currency: "EUR",
      category: "IT",
      serverLink: "https://discord.gg/tech",
      memberCount: 15680,
      views: 6540,
      clicks: 890,
      favorites: 203,
      isFavorite: false,
      createdAt: new Date("2025-01-08"),
    },
  ];

  const text = {
    ru: {
      title: "Discord Ads Board",
      subtitle: "Площадка для размещения рекламы Discord серверов",
      addListing: "Добавить объявление",
      public: "Публичная лента",
      my: "Мои объявления",
      favorites: "Избранное",
      sortBy: "Сортировка",
      newest: "Сначала новые",
      cheapest: "Сначала дешевые",
      expensive: "Сначала дорогие",
      category: "Категория",
      all: "Все",
      reset: "Сбросить фильтры",
      members: "участников",
      views: "просмотров",
      clicks: "кликов",
      favorites: "в избранном",
      visitServer: "Посетить сервер",
      contact: "Связаться",
      promo: "СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ",
      discount: "35% скидка на все размещения!",
      limitedTime: "Ограниченное время",
    },
    en: {
      title: "Discord Ads Board",
      subtitle: "Platform for Discord server advertising",
      addListing: "Add Listing",
      public: "Public Feed",
      my: "My Listings",
      favorites: "Favorites",
      sortBy: "Sort by",
      newest: "Newest",
      cheapest: "Cheapest",
      expensive: "Most Expensive",
      category: "Category",
      all: "All",
      reset: "Reset Filters",
      members: "members",
      views: "views",
      clicks: "clicks",
      favorites: "favorites",
      visitServer: "Visit Server",
      contact: "Contact Owner",
      promo: "SPECIAL PROMO",
      discount: "35% OFF All Ad Placements!",
      limitedTime: "Limited Time",
    },
  };

  const t = text[language];

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

  const formatPrice = (price: number, currency: string) => {
    const symbols = { RUB: "₽", USD: "$", EUR: "€", LTC: "LTC" };
    return `${price} ${symbols[currency as keyof typeof symbols]}`;
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500"
      }`}
    >
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Ad</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{t.title}</h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Select
                value={language}
                onValueChange={(value: "ru" | "en") => setLanguage(value)}
              >
                <SelectTrigger className="w-16">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ru">RU</SelectItem>
                  <SelectItem value="en">EN</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant={isDarkMode ? "default" : "outline"}
                size="sm"
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                <Icon name={isDarkMode ? "Sun" : "Moon"} size={16} />
              </Button>

              {isAdmin && (
                <Button variant="outline" size="sm">
                  <Icon name="Shield" size={16} />
                </Button>
              )}

              <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Icon name="Plus" size={16} className="mr-2" />
                    {t.addListing}
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
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-white/20 text-white">
              {t.promo}
            </Badge>
            <span className="font-medium">{t.discount}</span>
          </div>
          <div className="text-sm">
            <span className="font-bold text-2xl">-35%</span>
            <div className="text-xs">{t.limitedTime}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6">
          {["public", "my", "favorites"].map((tab) => (
            <Button
              key={tab}
              variant={currentTab === tab ? "default" : "outline"}
              onClick={() => setCurrentTab(tab as any)}
              className="bg-white/90 hover:bg-white"
            >
              {t[tab as keyof typeof t]}
            </Button>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Label>{t.sortBy}:</Label>
              <Select
                value={sortBy}
                onValueChange={(value: any) => setSortBy(value)}
              >
                <SelectTrigger className="w-40">
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
              <Label>{t.category}:</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.all}</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setViewMode(viewMode === "list" ? "gallery" : "list")
                }
              >
                <Icon
                  name={viewMode === "list" ? "Grid3X3" : "List"}
                  size={16}
                />
              </Button>
            </div>

            <Button variant="outline" size="sm">
              {t.reset}
            </Button>
          </div>
        </div>

        {/* Listings */}
        <div
          className={`grid gap-4 ${
            viewMode === "gallery"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {sampleListings.map((listing) => (
            <Card
              key={listing.id}
              className="bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Icon name="Users" size={20} className="text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{listing.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Icon name="Users" size={14} />
                        <span>
                          {listing.memberCount.toLocaleString()} {t.members}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Icon
                      name={listing.isFavorite ? "Heart" : "Heart"}
                      size={16}
                      className={
                        listing.isFavorite ? "fill-red-500 text-red-500" : ""
                      }
                    />
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-700 mb-4 line-clamp-2">
                  {listing.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Icon name="Eye" size={14} />
                    <span>
                      {listing.views.toLocaleString()} {t.views}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="MousePointer" size={14} />
                    <span>
                      {listing.clicks.toLocaleString()} {t.clicks}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Heart" size={14} />
                    <span>
                      {listing.favorites} {t.favorites}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold text-gray-900">
                      {formatPrice(listing.price, listing.currency)}
                    </div>
                    <Badge variant="secondary">{listing.category}</Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Icon name="ExternalLink" size={14} className="mr-1" />
                      {t.visitServer}
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      {t.contact}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
