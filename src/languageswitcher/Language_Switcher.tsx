// src/components/LanguageSwitcher.tsx
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Languages, Check } from 'lucide-react';

interface Language {
  code: string;
  flag: string;
  label: string;
}

const languages: Language[] = [
  { code: 'en', flag: '🇺🇸', label: 'English' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
  { code: 'hi', flag: '🇮🇳', label: 'हिन्दी' },
];

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  // ✅ Load saved language from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('lang') || 'en';
    i18n.changeLanguage(savedLang);
  }, [i18n]);

  // ✅ Change language dynamically
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng);
  };

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Languages className="h-4 w-4" />
          <span>{currentLanguage.flag}</span>
          <span className="hidden md:inline">{currentLanguage.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`flex items-center justify-between cursor-pointer ${
              i18n.language === language.code ? 'bg-muted font-semibold' : ''
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-lg">{language.flag}</span>
              <span>{language.label}</span>
            </span>
            {i18n.language === language.code && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
