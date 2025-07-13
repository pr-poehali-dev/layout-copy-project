import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import { FormData, Language } from "@/types/listing";
import { translations } from "@/constants/translations";

interface AddListingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isDarkMode: boolean;
  language: Language;
  formData?: FormData;
  setFormData?: (data: FormData) => void;
  onSubmit?: (e: React.FormEvent) => void;
}

const AddListingDialog = ({
  open,
  onOpenChange,
  isDarkMode,
  language,
  formData,
  setFormData,
  onSubmit,
}: AddListingDialogProps) => {
  const t = translations[language];

  const defaultFormData: FormData = {
    title: "",
    description: "",
    price: "",
    currency: "RUB",
    category: "",
    serverLink: "",
  };

  const currentFormData = formData || defaultFormData;

  const handleFormChange = (field: keyof FormData, value: string) => {
    if (setFormData) {
      setFormData({ ...currentFormData, [field]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              value={currentFormData.title}
              onChange={(e) => handleFormChange("title", e.target.value)}
              className={isDarkMode ? "bg-gray-700 border-gray-600" : ""}
            />
          </div>
          <div>
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              value={currentFormData.description}
              onChange={(e) => handleFormChange("description", e.target.value)}
              className={`resize-none ${
                isDarkMode ? "bg-gray-700 border-gray-600" : ""
              }`}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Цена</Label>
              <Input
                id="price"
                type="number"
                value={currentFormData.price}
                onChange={(e) => handleFormChange("price", e.target.value)}
                className={isDarkMode ? "bg-gray-700 border-gray-600" : ""}
              />
            </div>
            <div>
              <Label htmlFor="currency">Валюта</Label>
              <Select
                value={currentFormData.currency}
                onValueChange={(value) => handleFormChange("currency", value)}
              >
                <SelectTrigger
                  className={isDarkMode ? "bg-gray-700 border-gray-600" : ""}
                >
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
          <div>
            <Label htmlFor="category">Категория</Label>
            <Select
              value={currentFormData.category}
              onValueChange={(value) => handleFormChange("category", value)}
            >
              <SelectTrigger
                className={isDarkMode ? "bg-gray-700 border-gray-600" : ""}
              >
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Игры">Игры</SelectItem>
                <SelectItem value="Развлечения">Развлечения</SelectItem>
                <SelectItem value="Финансы">Финансы</SelectItem>
                <SelectItem value="Образование">Образование</SelectItem>
                <SelectItem value="Технологии">Технологии</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="serverLink">Ссылка на сервер</Label>
            <Input
              id="serverLink"
              value={currentFormData.serverLink}
              onChange={(e) => handleFormChange("serverLink", e.target.value)}
              placeholder="https://discord.gg/..."
              className={isDarkMode ? "bg-gray-700 border-gray-600" : ""}
            />
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
  );
};

export default AddListingDialog;