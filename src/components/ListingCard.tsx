import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Listing, Language } from "@/types/listing";
import { translations } from "@/constants/translations";

interface ListingCardProps {
  listing: Listing;
  isDarkMode: boolean;
  language: Language;
  formatPrice: (price: number, currency: string) => string;
  isSharedView?: boolean;
  currentUser?: string;
}

const ListingCard = ({ listing, isDarkMode, language, formatPrice, isSharedView, currentUser }: ListingCardProps) => {
  const t = translations[language];
  
  // Check if current user is the owner of the listing
  const isOwner = currentUser && listing.owner === currentUser;
  const showEditButtons = isOwner && !isSharedView;

  return (
    <Card
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
            
            {/* Edit/Delete buttons - only show for owner and not in shared view */}
            {showEditButtons && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  className={`h-8 w-8 p-0 ${
                    isDarkMode
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                      : "border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                  title="Редактировать"
                >
                  <Icon
                    name="Edit"
                    size={14}
                  />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className={`h-8 w-8 p-0 border-red-500 text-red-500 hover:bg-red-50 ${
                    isDarkMode
                      ? "border-red-500 text-red-400 hover:bg-red-950/20"
                      : "border-red-500 text-red-500 hover:bg-red-50"
                  }`}
                  title="Удалить"
                >
                  <Icon
                    name="Trash"
                    size={14}
                  />
                </Button>
              </>
            )}
            
            {/* Report button - only show if not owner or in shared view */}
            {(!isOwner || isSharedView) && (
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
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingCard;