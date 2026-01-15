import React, { useState } from 'react';
import { Database, ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface EvolutionPanelProps {
  onFeedback: (feedback: string) => void;
  evolutionLevel: number;
}

export const EvolutionPanel: React.FC<EvolutionPanelProps> = ({ onFeedback, evolutionLevel }) => {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = () => {
    if (!input.trim()) return;
    setStatus('submitting');
    setTimeout(() => {
      onFeedback(input);
      setStatus('success');
      setInput('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 800);
  };

  return (
    <div className="mt-20 border-t border-amber-500/10 pt-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 max-w-5xl mx-auto">
            <div className="space-y-2 max-w-md">
               <h3 className="text-amber-50 font-bold text-lg flex items-center gap-2">
                 <Database className="w-4 h-4 text-amber-500" />
                 {t.evolutionTitle}
                 <span className="text-[10px] text-amber-400 bg-red-950/50 border border-amber-500/20 px-2 py-0.5 rounded font-mono">v4.0</span>
               </h3>
               <p className="text-red-200/50 text-sm leading-relaxed">
                  {t.evolutionDesc}
               </p>
            </div>
            
            <div className="flex-1 w-full relative group">
                <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Feedback..."
                    className="w-full bg-red-950/30 border border-amber-900/50 rounded-full py-3 pl-6 pr-36 text-sm text-amber-100 focus:border-amber-500/50 outline-none transition-colors placeholder-red-900/50"
                />
                <button 
                    onClick={handleSubmit}
                    disabled={!input.trim() || status !== 'idle'}
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-amber-700/80 hover:bg-amber-600 text-white rounded-full text-xs font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 border border-amber-500/20"
                >
                    {status === 'submitting' ? (
                       <span>{t.calibrating}</span>
                    ) : status === 'success' ? (
                       <span className="text-emerald-300">{t.success}</span>
                    ) : (
                       <>
                         <span>{t.submitEvolution}</span>
                         <ArrowRight className="w-3 h-3" />
                       </>
                    )}
                </button>
            </div>
            
            <div className="hidden md:block text-right">
               <div className="text-[10px] text-amber-500/50 font-bold uppercase tracking-wider mb-1">{t.evolutionLevel}</div>
               <div className="flex gap-1 justify-end">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < evolutionLevel ? 'bg-amber-500' : 'bg-red-950'}`}></div>
                  ))}
               </div>
            </div>
        </div>
    </div>
  );
};