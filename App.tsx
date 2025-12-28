import React, { useState, useEffect } from 'react';
import { QUESTIONS, SCHEMES as INITIAL_SCHEMES, APP_TEXT } from './constants';
import { UserProfile, Language, EligibilityResult, Scheme } from './types';
import { evaluateEligibility } from './services/engine';
import { checkForSchemeUpdates } from './services/updateService';
import { QuestionCard } from './components/QuestionCard';
import { Results } from './components/Results';
import { LanguageToggle } from './components/LanguageToggle';
import { ArrowLeft, ArrowRight, Activity, Database, RefreshCw } from 'lucide-react';

const INITIAL_PROFILE: UserProfile = {
  age: 0,
  gender: null,
  residence: null,
  caste: null,
  occupation: null,
  landOwner: null,
  houseType: null,
  rationCard: null,
  annualIncome: 0,
  disability: null
};

export default function App() {
  const [lang, setLang] = useState<Language>('hi');
  const [step, setStep] = useState<number>(-1);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [results, setResults] = useState<EligibilityResult[]>([]);
  
  // Scheme Database State
  const [schemes, setSchemes] = useState<Scheme[]>(INITIAL_SCHEMES);
  const [isDbUpdating, setIsDbUpdating] = useState(false);
  const [lastDbUpdate, setLastDbUpdate] = useState<Date | null>(null);

  const [isCalculating, setIsCalculating] = useState(false);

  const currentQuestion = QUESTIONS[step];

  // Auto-update database on load
  useEffect(() => {
    refreshDatabase();
  }, []);

  const refreshDatabase = async () => {
    setIsDbUpdating(true);
    const result = await checkForSchemeUpdates(schemes);
    if (result.updated) {
      setSchemes(result.schemes);
      setLastDbUpdate(new Date());
    }
    setIsDbUpdating(false);
  };

  const handleAnswer = (id: keyof UserProfile, value: any) => {
    setProfile(prev => ({ ...prev, [id]: value }));
  };

  const nextStep = () => {
    if (step < QUESTIONS.length - 1) {
      setStep(prev => prev + 1);
    } else {
      finish();
    }
  };

  const prevStep = () => {
    if (step > -1) {
      setStep(prev => prev - 1);
    }
  };

  const finish = () => {
    setIsCalculating(true);
    setTimeout(() => {
      // Use the dynamic `schemes` state, not the static constant
      const res = evaluateEligibility(profile, schemes);
      setResults(res);
      setStep(999);
      setIsCalculating(false);
    }, 800);
  };

  const reset = () => {
    setProfile(INITIAL_PROFILE);
    setStep(-1);
    setResults([]);
  };

  // --- Intro Screen ---
  if (step === -1) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center shadow-indigo-200 shadow-xl mb-6">
           <Activity className="text-white" size={40} />
        </div>
        
        <h1 className="text-3xl font-bold text-slate-800 mb-2">{APP_TEXT.title[lang]}</h1>
        <p className="text-slate-500 mb-8 max-w-xs mx-auto text-lg leading-relaxed">
          {lang === 'en' 
            ? "Find government schemes for you and your family in 2 minutes." 
            : "सिर्फ 2 मिनट में अपने और अपने परिवार के लिए सरकारी योजनाएं खोजें।"}
        </p>

        {/* Database Status Badge */}
        <div className="mb-8 flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-200 text-xs text-slate-500">
           <Database size={14} className={isDbUpdating ? "animate-pulse text-indigo-500" : "text-green-500"} />
           {isDbUpdating ? (
             <span>{lang === 'en' ? "Updating scheme database..." : "योजना डेटाबेस अपडेट हो रहा है..."}</span>
           ) : lastDbUpdate ? (
             <span className="text-green-700 font-medium">
               {lang === 'en' ? "Data Verified: Just now" : "डेटा सत्यापित: अभी"}
             </span>
           ) : (
             <span>{lang === 'en' ? "Using Offline Database" : "ऑफलाइन डेटाबेस का उपयोग"}</span>
           )}
        </div>

        <div className="mb-10">
          <LanguageToggle current={lang} onToggle={setLang} />
        </div>

        <button
          onClick={() => setStep(0)}
          className="bg-indigo-600 text-white w-full max-w-xs py-4 rounded-2xl text-xl font-bold shadow-xl hover:bg-indigo-700 active:scale-95 transition-all"
        >
          {APP_TEXT.startBtn[lang]}
        </button>
        
        <p className="mt-8 text-xs text-slate-400 px-8">
           {lang === 'en' ? "Works offline. No data saved." : "इंटरनेट के बिना काम करता है। कोई डेटा सेव नहीं होता।"}
        </p>
      </div>
    );
  }

  // --- Loading Screen ---
  if (isCalculating) {
     return (
       <div className="min-h-screen bg-white flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mb-6"></div>
          <h2 className="text-xl font-semibold text-slate-700">{APP_TEXT.loading[lang]}</h2>
       </div>
     );
  }

  // --- Results Screen ---
  if (step === 999) {
    return (
      <div className="min-h-screen bg-slate-100">
        <header className="bg-white p-4 shadow-sm flex justify-between items-center sticky top-0 z-10">
          <h1 className="font-bold text-slate-800">{APP_TEXT.title[lang]}</h1>
          <LanguageToggle current={lang} onToggle={setLang} />
        </header>
        <div className="p-4">
          <Results 
            results={results} 
            schemes={schemes} 
            profile={profile} 
            lang={lang} 
            onReset={reset} 
          />
        </div>
      </div>
    );
  }

  // --- Question Flow ---
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <button onClick={reset} className="text-slate-400 font-bold text-sm">
           {lang === 'en' ? 'EXIT' : 'बंद करें'}
        </button>
        <LanguageToggle current={lang} onToggle={setLang} />
      </header>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-200 mt-2">
        <div 
          className="h-full bg-indigo-600 transition-all duration-300" 
          style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
        />
      </div>

      {/* Question Card Area */}
      <main className="flex-1 flex flex-col items-center justify-start pt-8 px-4 pb-32">
        <QuestionCard
          question={currentQuestion}
          value={profile[currentQuestion.id]}
          onChange={handleAnswer}
          lang={lang}
        />
      </main>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="max-w-lg mx-auto flex gap-4">
          <button
            onClick={prevStep}
            className="flex-1 py-4 bg-slate-100 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-colors flex items-center justify-center"
          >
            <ArrowLeft className="mr-2" size={20}/>
            {APP_TEXT.backBtn[lang]}
          </button>
          
          <button
            onClick={nextStep}
            disabled={profile[currentQuestion.id] === null || profile[currentQuestion.id] === undefined || (currentQuestion.type === 'number' && !profile[currentQuestion.id])}
            className={`
              flex-[2] py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-all shadow-lg
              ${(profile[currentQuestion.id] === null || profile[currentQuestion.id] === undefined)
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95'
              }
            `}
          >
            {step === QUESTIONS.length - 1 ? APP_TEXT.submitBtn[lang] : APP_TEXT.nextBtn[lang]}
            {step !== QUESTIONS.length - 1 && <ArrowRight className="ml-2" size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}
