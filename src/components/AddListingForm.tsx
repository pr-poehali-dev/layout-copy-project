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
import type { FormData } from "@/hooks/useAppState";

interface AddListingFormProps {
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  isDarkMode: boolean;
}

const AddListingForm = ({
  showForm,
  setShowForm,
  formData,
  setFormData,
  onSubmit,
  isDarkMode,
}: AddListingFormProps) => {
  const currencies = ["RUB", "USD", "EUR", "LTC", "USDT"];

  return (
    <Dialog open={showForm} onOpenChange={setShowForm}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 text-white border-0"
        >
          <Icon name="Plus" size={14} className="mr-1.5" />
          <span className="hidden sm:inline">Добавить объявление</span>
          <span className="sm:hidden">Добавить</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`sm:max-w-md ${
          isDarkMode
            ? "bg-gray-800 border-gray-700 text-white"
            : "bg-white border-gray-200"
        }`}
      >
        <DialogHeader>
          <DialogTitle
            className={`text-lg font-semibold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Добавить объявление
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label
              htmlFor="title"
              className={`text-sm font-medium ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Название сервера
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Введите название сервера"
              className={
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : ""
              }
              required
            />
          </div>
          <div>
            <Label
              htmlFor="description"
              className={`text-sm font-medium ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Описание
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Опишите ваш сервер"
              className={
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : ""
              }
              rows={3}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label
                htmlFor="price"
                className={`text-sm font-medium ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Цена
              </Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                placeholder="0"
                className={
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : ""
                }
                required
              />
            </div>
            <div>
              <Label
                htmlFor="currency"
                className={`text-sm font-medium ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Валюта
              </Label>
              <Select
                value={formData.currency}
                onValueChange={(value) =>
                  setFormData({ ...formData, currency: value })
                }
              >
                <SelectTrigger
                  className={
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : ""
                  }
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  className={
                    isDarkMode ? "bg-gray-700 border-gray-600" : ""
                  }
                >
                  {currencies.map((currency) => (
                    <SelectItem
                      key={currency}
                      value={currency}
                      className={
                        isDarkMode
                          ? "text-white hover:bg-gray-600 focus:bg-gray-600"
                          : ""
                      }
                    >
                      {currency}
                    </SelectItem>
                  ))}
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
  );
};

export default AddListingForm;