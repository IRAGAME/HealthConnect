import React from 'react';
import { Button } from '@/app/components/ui/button';
import { Moon, Sun, Globe, Menu, X } from 'lucide-react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage, Language } from '@/app/contexts/LanguageContext';
import { useState } from 'react';

interface HeaderMenuProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  backIcon?: React.ReactNode;
}

export const HeaderMenu: React.FC<HeaderMenuProps> = ({
  title,
  subtitle,
  onBack,
  backIcon,
}) => {
  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border-b shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className={isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
              >
                {backIcon}
              </Button>
            )}
            <div>
              <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {title}
              </h1>
              {subtitle && (
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className={isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
              title={isDark ? 'Mode clair' : 'Mode sombre'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {/* Language Selector */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className={isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
              >
                <Globe className="w-5 h-5" />
              </Button>

              {showLanguageMenu && (
                <div
                  className={`absolute right-0 mt-2 w-40 ${isDark ? 'bg-slate-700' : 'bg-white'} rounded-lg shadow-lg z-50 border ${isDark ? 'border-slate-600' : 'border-gray-200'}`}
                >
                  {(['fr', 'en', 'ki'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setShowLanguageMenu(false);
                      }}
                      className={`block w-full text-left px-4 py-2 first:rounded-t-lg last:rounded-b-lg ${
                        language === lang
                          ? 'bg-primary text-white'
                          : `${isDark ? 'text-gray-300 hover:bg-slate-600' : 'text-gray-700 hover:bg-gray-100'}`
                      }`}
                    >
                      {lang === 'fr' ? 'Français' : lang === 'en' ? 'English' : 'Kirundi'}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className={isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
            >
              {showMobileMenu ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className={`mt-4 p-4 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-gray-50'} flex gap-2`}>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className={isDark ? 'text-gray-400 hover:text-white flex-1' : 'text-gray-600 hover:text-gray-900 flex-1'}
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 mr-2" />
                  {t('theme.light')}
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 mr-2" />
                  {t('theme.dark')}
                </>
              )}
            </Button>

            <div className="flex-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className={isDark ? 'text-gray-400 hover:text-white w-full' : 'text-gray-600 hover:text-gray-900 w-full'}
              >
                <Globe className="w-4 h-4 mr-2" />
                {language.toUpperCase()}
              </Button>

              {showLanguageMenu && (
                <div className={`mt-2 rounded-lg ${isDark ? 'bg-slate-600' : 'bg-white'} border ${isDark ? 'border-slate-500' : 'border-gray-200'}`}>
                  {(['fr', 'en', 'ki'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setShowLanguageMenu(false);
                      }}
                      className={`block w-full text-left px-3 py-2 text-sm first:rounded-t-lg last:rounded-b-lg ${
                        language === lang
                          ? 'bg-primary text-white'
                          : `${isDark ? 'text-gray-300 hover:bg-slate-500' : 'text-gray-700 hover:bg-gray-100'}`
                      }`}
                    >
                      {lang === 'fr' ? 'Français' : lang === 'en' ? 'English' : 'Kirundi'}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
