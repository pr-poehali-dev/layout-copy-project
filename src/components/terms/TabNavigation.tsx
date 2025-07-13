import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { TabNavigationProps } from "@/types/terms";

interface ExtendedTabNavigationProps extends TabNavigationProps {
  navigateHome: () => void;
}

const TabNavigation = ({ activeTab, setActiveTab, isDarkMode, navigateHome }: ExtendedTabNavigationProps) => {
  return (
    <div>
      {/* Back Button */}
      <div className="flex items-center gap-3 mb-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={navigateHome}
          className={isDarkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : ""}
        >
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          Назад
        </Button>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={activeTab === 'menu' ? "default" : "outline"}
        size="sm"
        onClick={() => setActiveTab('menu')}
        className={`${activeTab === 'menu' ? '' : (isDarkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "")}`}
      >
        <Icon name="Menu" size={16} className="mr-2" />
        Главное меню
      </Button>
      <Button
        variant={activeTab === 'terms' ? "default" : "outline"}
        size="sm"
        onClick={() => setActiveTab('terms')}
        className={`${activeTab === 'terms' ? '' : (isDarkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "")}`}
      >
        <Icon name="FileText" size={16} className="mr-2" />
        Правила площадки
      </Button>
      <Button
        variant={activeTab === 'privacy' ? "default" : "outline"}
        size="sm"
        onClick={() => setActiveTab('privacy')}
        className={`${activeTab === 'privacy' ? '' : (isDarkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "")}`}
      >
        <Icon name="Shield" size={16} className="mr-2" />
        Политика конфиденциальности
      </Button>
      </div>
    </div>
  );
};

export default TabNavigation;