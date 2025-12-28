import React from 'react';
import { Question, UserProfile, Language } from '../types';
import * as Icons from 'lucide-react';

interface Props {
  question: Question;
  value: any;
  onChange: (id: keyof UserProfile, val: any) => void;
  lang: Language;
}

export const QuestionCard: React.FC<Props> = ({ question, value, onChange, lang }) => {
  
  const renderInput = () => {
    if (question.type === 'select' || question.type === 'boolean') {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {question.options?.map((opt) => {
            const isSelected = value === opt.value;
            // Dynamic Icon Loading
            const IconComponent = opt.icon ? (Icons as any)[opt.icon] : null;

            return (
              <button
                key={String(opt.value)}
                onClick={() => onChange(question.id, opt.value)}
                className={`
                  flex items-center p-4 rounded-xl border-2 transition-all text-left
                  ${isSelected 
                    ? 'border-indigo-600 bg-indigo-50 shadow-md ring-1 ring-indigo-600' 
                    : 'border-slate-200 bg-white hover:border-indigo-300'
                  }
                `}
              >
                {IconComponent && (
                  <div className={`mr-4 p-2 rounded-full ${isSelected ? 'bg-indigo-200' : 'bg-slate-100'}`}>
                    <IconComponent size={24} className={isSelected ? 'text-indigo-700' : 'text-slate-500'} />
                  </div>
                )}
                <div>
                  <span className={`block text-lg font-medium ${isSelected ? 'text-indigo-900' : 'text-slate-700'}`}>
                    {opt.label[lang]}
                  </span>
                </div>
                {isSelected && <Icons.CheckCircle2 className="ml-auto text-indigo-600" />}
              </button>
            );
          })}
        </div>
      );
    }

    if (question.type === 'number') {
      return (
        <div className="mt-8">
          <input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(question.id, parseInt(e.target.value))}
            className="w-full text-center text-4xl p-4 border-2 border-slate-300 rounded-xl focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none"
            placeholder="0"
            min={question.min}
            max={question.max}
          />
          {question.min && value && value < question.min && (
             <p className="text-red-500 mt-2 text-center text-sm">Age is too low</p>
          )}
        </div>
      );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg mx-auto border-b-4 border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800 leading-tight mb-2">
        {question.text[lang]}
      </h2>
      {question.subText && (
        <p className="text-slate-500 text-lg mb-4">{question.subText[lang]}</p>
      )}
      {renderInput()}
    </div>
  );
};
