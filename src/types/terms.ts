export type TabType = 'menu' | 'terms' | 'privacy';

export interface TermsHeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  hasGradient: boolean;
  setHasGradient: (value: boolean) => void;
  navigateHome: () => void;
}

export interface TabNavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isDarkMode: boolean;
}

export interface SectionProps {
  isDarkMode: boolean;
}