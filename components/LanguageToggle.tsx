import React from 'react';
import { Language } from '../types';

interface Props {
  current: Language;
  onToggle: (lang: Language) => void;
}

export const LanguageToggle: React.FC<Props> = ({ current, onToggle }) => {
  return (
    <div className="flex bg-white rounded-full p-1 shadow-sm border border-slate-200">
      <button
        onClick={() => onToggle('en')}
        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
          current === 'en' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'
        }`}
      >
        English
      </button>
      <button
        onClick={() => onToggle('hi')}
        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
          current === 'hi' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'
        }`}
      >
        हिंदी
      </button>
    </div>
  );
};
