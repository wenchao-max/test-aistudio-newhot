import React from 'react';
import { Target, ShieldCheck, BrainCircuit, Activity, Sparkles, ScanEye, Zap } from 'lucide-react';
import { VisualAnalysis } from './VisualAnalysis';
import { useLanguage } from '../contexts/LanguageContext';

interface TrendAnalysisProps {
  analysisText: string;
  visualKeywords: string[];
}

export const TrendAnalysis: React.FC<TrendAnalysisProps> = ({ analysisText, visualKeywords }) => {
  const { t } = useLanguage();
  const matchScore = parseInt(analysisText.match(/匹配度.*?(\d+)%/)?.[1] || '0');
  
  // Clean up the text for display
  const displayContent = analysisText.replace(/画像匹配度：\d+%/g, '').trim();

  // Helper for segmented progress bars (Red/Gold Theme)
  const SegmentedBar = ({ value, max = 5, colorClass = "bg-amber-500" }: { value: number, max?: number, colorClass?: string }) => (
    <div className="flex gap-1.5 h-1.5">
      {[...Array(max)].map((_, i) => (
        <div 
          key={i} 
          className={`flex-1 rounded-full transition-all duration-500 ${
            i < value 
              ? `${colorClass} shadow-[0_0_8px_currentColor]` 
              : 'bg-red-950/30'
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in-up">
      
      {/* LEFT COLUMN: Deep Insight (Dual Profile) */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        
        {/* Main Analysis Card */}
        <div className="relative bg-[#2a0b0b] border border-amber-500/20 rounded-2xl p-6 md:p-8 overflow-hidden group shadow-lg shadow-red-950/50">
            {/* Background Decor - Golden Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-red-800/40 to-amber-700/40 rounded-lg border border-amber-500/20 shadow-inner shadow-red-900">
                  <ScanEye className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-amber-50 tracking-wide flex items-center gap-2">
                    {t.trendTitle}
                  </h3>
                  <p className="text-[10px] text-amber-500/60 font-mono uppercase tracking-wider">
                    AI DEEP DIVE · V4.0 CORE
                  </p>
                </div>
              </div>

              {/* Dual Logic Visualizers */}
              <div className="flex gap-4 mb-5">
                 <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-600/30 text-emerald-400 text-xs font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Compliance Audit Passed</span>
                 </div>
                 <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-400 text-xs font-bold">
                    <BrainCircuit className="w-3.5 h-3.5" />
                    <span>Psych Profile Matched</span>
                 </div>
              </div>

              <div className="bg-red-950/20 border border-amber-500/10 rounded-xl p-5 relative">
                 <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-600 to-transparent rounded-l-xl opacity-70"></div>
                 <p className="text-rose-100/90 text-sm md:text-base leading-7 font-medium text-justify">
                    {displayContent}
                 </p>
              </div>
            </div>
        </div>

        {/* Visual Keywords Section */}
        {visualKeywords.length > 0 && (
           <VisualAnalysis keywords={visualKeywords} />
        )}
      </div>

      {/* RIGHT COLUMN: Metrics Radar */}
      <div className="lg:col-span-4 flex flex-col h-full">
        <div className="bg-[#2a0b0b] border border-amber-500/20 rounded-2xl p-6 md:p-8 flex-1 relative overflow-hidden flex flex-col justify-between shadow-lg shadow-red-950/50">
           
           {/* Top: Score Display */}
           <div className="text-center relative py-6">
              <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                 <div className="w-40 h-40 border border-amber-500/30 rounded-full animate-spin-slow-reverse border-dashed"></div>
              </div>
              
              <div className="relative z-10 flex flex-col items-center">
                 <span className="text-[10px] text-amber-500/80 font-bold uppercase tracking-[0.2em] mb-2">{t.matchScore}</span>
                 <div className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-400 to-red-500 leading-none tracking-tight drop-shadow-sm">
                    {matchScore}
                    <span className="text-2xl text-amber-700/80 align-top ml-1">%</span>
                 </div>
                 <div className="mt-3 flex items-center gap-1.5 text-emerald-400 text-xs font-bold bg-emerald-950/30 border border-emerald-900/50 px-3 py-1 rounded-full">
                    <Activity className="w-3 h-3" />
                    <span>Algorithm Optimized</span>
                 </div>
              </div>
           </div>

           {/* Middle: Detailed Metrics */}
           <div className="space-y-6 mt-6 pt-6 border-t border-amber-500/10">
              
              {/* Metric 1 */}
              <div className="space-y-2">
                 <div className="flex justify-between items-end text-xs font-bold">
                    <span className="text-amber-500/70">{t.emotionalValue}</span>
                    <span className="text-amber-400">High</span>
                 </div>
                 <SegmentedBar value={5} colorClass="bg-amber-500" />
              </div>

              {/* Metric 2 */}
              <div className="space-y-2">
                 <div className="flex justify-between items-end text-xs font-bold">
                    <span className="text-amber-500/70">{t.resonance}</span>
                    <span className="text-red-400">{matchScore > 85 ? 'High' : 'Med'}</span>
                 </div>
                 <SegmentedBar value={matchScore > 85 ? 5 : 4} colorClass="bg-red-500" />
              </div>

               {/* Metric 3 */}
               <div className="space-y-2">
                 <div className="flex justify-between items-end text-xs font-bold">
                    <span className="text-amber-500/70">{t.utility}</span>
                    <span className="text-orange-400">Med</span>
                 </div>
                 <SegmentedBar value={4} colorClass="bg-orange-500" />
              </div>

           </div>

           {/* Bottom: Advice */}
           <div className="mt-8 bg-gradient-to-r from-red-950 to-transparent border-l-2 border-amber-500 pl-4 py-1">
              <div className="flex items-center gap-2 mb-1 text-amber-400 text-[10px] font-bold uppercase">
                  <Zap className="w-3 h-3" />
                  <span>{t.aiAdvice}</span>
              </div>
              <p className="text-[10px] text-rose-200/60 leading-relaxed font-mono">
                  建议增强前3秒视觉钩子，提升完播率。
              </p>
           </div>

        </div>
      </div>
    </div>
  );
};