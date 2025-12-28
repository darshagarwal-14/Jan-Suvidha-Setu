import React, { useState } from 'react';
import { EligibilityResult, Scheme, Language, UserProfile } from '../types';
import { APP_TEXT } from '../constants';
import { CheckCircle2, XCircle, AlertCircle, FileText, ChevronDown, ChevronUp, Bot, ExternalLink, ShieldCheck, MapPin, Globe } from 'lucide-react';
import { getDocumentAdvice } from '../services/geminiService';

interface Props {
  results: EligibilityResult[];
  schemes: Scheme[];
  profile: UserProfile;
  lang: Language;
  onReset: () => void;
}

export const Results: React.FC<Props> = ({ results, schemes, profile, lang, onReset }) => {
  const eligibleSchemes = results.filter(r => r.isEligible);
  const ineligibleSchemes = results.filter(r => !r.isEligible);

  const [expandedScheme, setExpandedScheme] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState<string | null>(null); // document name
  const [aiAdvice, setAiAdvice] = useState<{doc: string, text: string} | null>(null);

  const handleAskAI = async (docName: string) => {
    setAiLoading(docName);
    setAiAdvice(null);
    const advice = await getDocumentAdvice(docName, profile, lang);
    setAiAdvice({ doc: docName, text: advice });
    setAiLoading(null);
  };

  const renderSchemeCard = (result: EligibilityResult, isSuccess: boolean) => {
    const scheme = schemes.find(s => s.id === result.schemeId)!;
    const isExpanded = expandedScheme === scheme.id;
    const isLiveVerified = !!scheme.lastUpdated;

    return (
      <div 
        key={scheme.id} 
        className={`mb-4 rounded-xl border-l-8 overflow-hidden shadow-sm transition-all
          ${isSuccess ? 'border-green-500 bg-white' : 'border-slate-300 bg-slate-50'}
        `}
      >
        <div 
          onClick={() => setExpandedScheme(isExpanded ? null : scheme.id)}
          className="p-5 flex items-start justify-between cursor-pointer"
        >
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 mb-1 flex items-center flex-wrap gap-2">
              {scheme.benefitShort[lang]}
              {isLiveVerified && (
                 <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 uppercase tracking-wide">
                   <ShieldCheck size={10} className="mr-1" />
                   {lang === 'en' ? 'Live Verified' : 'सत्यापित'}
                 </span>
              )}
            </h3>
            <p className="text-sm font-medium text-slate-600 mb-2 uppercase tracking-wide">
              {scheme.name[lang]}
            </p>
            <div className="flex items-center text-sm">
              {isSuccess ? (
                 <span className="flex items-center text-green-700 font-bold bg-green-100 px-2 py-1 rounded">
                   <CheckCircle2 size={16} className="mr-1" /> Eligible / पात्र
                 </span>
              ) : (
                <span className="flex items-center text-slate-500 font-medium">
                  <XCircle size={16} className="mr-1" /> Not Eligible / पात्र नहीं
                </span>
              )}
            </div>
          </div>
          <div className="text-slate-400">
            {isExpanded ? <ChevronUp /> : <ChevronDown />}
          </div>
        </div>

        {isExpanded && (
          <div className="px-5 pb-5 pt-0 border-t border-slate-100 mt-2 bg-slate-50/50">
            <div className="mt-4">
              <p className="text-slate-700 leading-relaxed mb-4">{scheme.description[lang]}</p>
              
              {/* Source Attribution for Live Data */}
              {scheme.sourceUrls && scheme.sourceUrls.length > 0 && (
                <div className="mb-4 text-xs text-slate-500 flex flex-wrap gap-2">
                  <span className="font-semibold">{lang === 'en' ? 'Source:' : 'स्रोत:'}</span>
                  {scheme.sourceUrls.map((url, i) => (
                    <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline">
                      {new URL(url).hostname} <ExternalLink size={10} className="ml-0.5" />
                    </a>
                  ))}
                </div>
              )}

              {!isSuccess && (
                <div className="bg-red-50 p-3 rounded-lg border border-red-100 mb-4">
                   <h4 className="font-semibold text-red-800 text-sm mb-1">{APP_TEXT.whyNotEligible[lang]}</h4>
                   <ul className="list-disc ml-4 text-red-700 text-sm">
                     {result.reasons.map((r, i) => (
                       <li key={i}>{r[lang]}</li>
                     ))}
                   </ul>
                </div>
              )}

              {isSuccess && (
                <div className="space-y-4">
                   {/* Application Instructions */}
                   <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <h4 className="font-semibold text-yellow-900 mb-2 flex items-center">
                        <MapPin size={18} className="mr-2" />
                        {APP_TEXT.howToApply[lang]}
                      </h4>
                      <p className="text-yellow-900 mb-3 text-sm">
                        {scheme.applicationInstructions[lang]}
                      </p>
                      {scheme.applicationUrl && (
                        <a 
                          href={scheme.applicationUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center bg-yellow-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-yellow-700 transition-colors shadow-sm"
                        >
                          <Globe size={16} className="mr-2" />
                          {APP_TEXT.applyOnlineBtn[lang]}
                        </a>
                      )}
                   </div>

                  <div className="bg-white p-4 rounded-lg border border-indigo-100">
                    <h4 className="font-semibold text-indigo-900 mb-3 flex items-center">
                      <FileText size={18} className="mr-2" />
                      {APP_TEXT.documentsNeeded[lang]}
                    </h4>
                    <div className="space-y-3">
                      {scheme.documents.map((doc, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-50 p-3 rounded border border-slate-200">
                          <div className="mb-2 sm:mb-0">
                            <p className="font-medium text-slate-800">{doc.name[lang]}</p>
                            <p className="text-xs text-slate-500">{doc.description[lang]}</p>
                          </div>
                          
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleAskAI(doc.name[lang]); }}
                            disabled={!!aiLoading}
                            className="flex items-center justify-center bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-1.5 rounded text-xs font-semibold transition-colors shrink-0"
                          >
                            <Bot size={14} className="mr-1" />
                            {lang === 'en' ? 'How to get?' : 'कैसे प्राप्त करें?'}
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    {/* AI Advice Display */}
                    {aiAdvice && scheme.documents.some(d => d.name[lang] === aiAdvice.doc) && (
                       <div className="mt-3 bg-blue-50 p-3 rounded-lg border border-blue-200 text-sm animate-in fade-in slide-in-from-top-2">
                          <p className="font-bold text-blue-800 mb-1 flex items-center">
                            <Bot size={16} className="mr-2"/> Assistant says about {aiAdvice.doc}:
                          </p>
                          <p className="text-blue-900">{aiAdvice.text}</p>
                       </div>
                    )}
                     {aiLoading && scheme.documents.some(d => d.name[lang] === aiLoading) && (
                       <div className="mt-3 p-2 text-center text-xs text-indigo-500">
                         Thinking... / सोच रहा है...
                       </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-xl mx-auto pb-20">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 px-4">Result / परिणाम</h2>

      {eligibleSchemes.length > 0 && (
        <div className="mb-8">
           <h3 className="text-lg font-semibold text-green-700 px-4 mb-3 flex items-center">
             <CheckCircle2 className="mr-2" /> {APP_TEXT.eligibleTitle[lang]}
           </h3>
           <div className="space-y-1">
             {eligibleSchemes.map(r => renderSchemeCard(r, true))}
           </div>
        </div>
      )}

      <div className="mb-8 opacity-80">
        <h3 className="text-lg font-semibold text-slate-600 px-4 mb-3 flex items-center">
          <AlertCircle className="mr-2" /> {APP_TEXT.notEligibleTitle[lang]}
        </h3>
        <div className="space-y-1">
           {ineligibleSchemes.map(r => renderSchemeCard(r, false))}
        </div>
      </div>

      <div className="p-4 text-center">
         <p className="text-xs text-slate-400 mb-4">{APP_TEXT.disclaimer[lang]}</p>
         <button 
           onClick={onReset}
           className="bg-indigo-600 text-white w-full py-4 rounded-xl font-bold shadow-lg hover:bg-indigo-700 active:scale-95 transition-transform"
         >
           Check for Another Person
         </button>
      </div>
    </div>
  );
};
