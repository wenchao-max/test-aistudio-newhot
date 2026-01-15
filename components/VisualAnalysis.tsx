import React from 'react';
import { Eye, Check, Aperture } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface VisualAnalysisProps {
  keywords: string[];
}

export const VisualAnalysis: React.FC<VisualAnalysisProps> = ({ keywords }) => {
  const { t } = useLanguage();
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  const handleCopy = (word: string) => {
    navigator.clipboard.writeText(word);
    setCopiedKey(word);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div className="bg-[#2a0b0b] border border-amber-500/20 rounded-2xl p-6 shadow-lg shadow-red-950/30">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-1.5 bg-red-900/40 rounded border border-amber-500/20">
            <Aperture className="w-4 h-4 text-amber-500" />
        </div>
        <span className="text-xs font-bold tracking-widest text-amber-500/70 uppercase">
          {t.visualKeywords} <span className="text-red-800 mx-1">/</span> EXTRACTION
        </span>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {keywords.map((word, idx) => (
          <button
            key={idx}
            onClick={() => handleCopy(word)}
            className="group relative flex items-center gap-2 px-4 py-2 bg-red-950/40 hover:bg-red-900/60 border border-amber-500/20 hover:border-amber-400/60 rounded-lg transition-all duration-300"
          >
             <div className={`w-1.5 h-1.5 rounded-full transition-colors ${copiedKey === word ? 'bg-emerald-500' : 'bg-amber-500 group-hover:shadow-[0_0_8px_#f59e0b]'}`}></div>
            <span className="text-sm font-medium text-rose-200/80 group-hover:text-amber-50 transition-colors tracking-wide">{word}</span>
            
            {copiedKey === word && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-900 rounded-lg border border-emerald-500/30 animate-fade-in">
                  <Check className="w-4 h-4 text-emerald-500" />
              </div>
            )}
          </button>
        ))}
        {keywords.length === 0 && (
          <span className="text-xs text-red-300/50 font-mono italic px-2">
            Waiting for video input signal...
          </span>
        )}
      </div>
    </div>
  );
};