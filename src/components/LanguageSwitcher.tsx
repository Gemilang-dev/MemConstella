import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'pill' | 'toggle' | 'minimal';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  className = '',
  variant = 'pill' 
}) => {
  const { language, setLanguage, t } = useLanguage();

  if (variant === 'toggle') {
    return (
      <button
        onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 ${
          language === 'id'
            ? 'bg-red-500/10 border-red-500/30 text-red-200 hover:bg-red-500/20'
            : 'bg-blue-500/10 border-blue-500/30 text-blue-200 hover:bg-blue-500/20'
        } ${className}`}
        title={t.common.switchLanguage}
        aria-label={t.common.switchLanguage}
      >
        <Globe className="w-3.5 h-3.5 opacity-80" />
        <span className="font-bold">{language === 'id' ? '🇮🇩 ID' : '🇬🇧 EN'}</span>
      </button>
    );
  }

  return (
    <div 
      className={`inline-flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-700/60 backdrop-blur-md shadow-inner text-xs ${className}`}
      role="group"
      aria-label="Language Selector"
    >
      <button
        type="button"
        onClick={() => setLanguage('id')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold transition-all duration-200 ${
          language === 'id'
            ? 'bg-gradient-to-r from-red-600/90 to-rose-700 text-white shadow-md shadow-red-500/20 scale-[1.02]'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
        }`}
        title="Bahasa Indonesia"
      >
        <span>🇮🇩</span>
        <span>ID</span>
      </button>

      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold transition-all duration-200 ${
          language === 'en'
            ? 'bg-gradient-to-r from-blue-600/90 to-indigo-700 text-white shadow-md shadow-blue-500/20 scale-[1.02]'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
        }`}
        title="English"
      >
        <span>🇬🇧</span>
        <span>EN</span>
      </button>
    </div>
  );
};
