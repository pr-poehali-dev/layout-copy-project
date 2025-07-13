import { Badge } from "@/components/ui/badge";
import { Language } from "@/types/listing";
import { translations } from "@/constants/translations";

interface PromoBannerProps {
  language: Language;
}

const PromoBanner = ({ language }: PromoBannerProps) => {
  const t = translations[language];

  return (
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
  );
};

export default PromoBanner;