export type TabType = 'menu' | 'terms' | 'privacy';

export interface TermsProps {
  isDarkMode: boolean;
  hasGradient: boolean;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onNavigateHome: () => void;
}

export interface SectionProps {
  isDarkMode: boolean;
}