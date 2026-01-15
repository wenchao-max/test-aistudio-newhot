import React from 'react';
import { TitleOption } from '../types';
import { Copy, Check, TrendingUp, AlignLeft, Smartphone, AlignCenter, ArrowDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ResultCardProps {
  option: TitleOption;
}

export const ResultCard: React.FC<ResultCardProps> = ({ option }) => {
  const { t } = useLanguage();
  const [copiedPart, setCopiedPart] = React.useState<string | null>(null);

  const handleCopyPart = (text: string, part: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedPart(part);
    setTimeout(() => setCopiedPart(null), 1500);
  };

  const scoreNum = parseInt(option.viralScore.replace('%', '')) || 90;
  
  return (
    <div className="group relative bg-[#2a0b0b] border border-amber-500/20 rounded-2xl hover:border-amber-400/50 transition-all duration-500 flex flex-col h-full overflow-hidden hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]">
      
      {/* Header */}
      <div className="px-6 py-5 border-b border-amber-500/10 flex justify-between items-center bg-gradient-to-r from-red-950/20 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-red-900/50 flex items-center justify-center border border-amber-500/20 text-amber-500">
            <span className="text-xs font-bold font-mono">{option.id}</span>
          </div>
          <span className="text-[10px] font-bold text-red-300 uppercase tracking-widest">{t.option}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <TrendingUp className={`w-3.5 h-3.5 ${scoreNum >= 95 ? 'text-red-500' : 'text-emerald-500'}`} />
          <span className="text-sm font-black font-mono text-amber-50">{option.viralScore}</span>
        </div>
      </div>
      
      <div className="p-6 space-y-8 flex-grow flex flex-col relative z-10">
        
        {/* 9:16 Title Stack Simulation */}
        <div>
           <div className="flex items-center gap-2 mb-4 opacity-70">
              <Smartphone className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-amber-500/80">{t.titleStack}</span>
           </div>
           
           {/* The Container simulating the vertical layout area */}
           <div className="bg-black/40 border border-amber-500/10 rounded-xl p-6 relative overflow-hidden flex flex-col items-center justify-center gap-3 text-center shadow-inner shadow-black/50">
              {/* Background guidelines to hint at 9:16 center */}
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-amber-500/5 -translate-x-1/2"></div>
              
              {/* Top Title - Hook (Main Title: 12 Chars - Adjusted font to fit) */}
              <div 
                className="relative w-full cursor-pointer group/line"
                onClick={(e) => handleCopyPart(option.titleTop, 'top', e)}
              >
                  <p className="font-black text-lg md:text-xl text-yellow-400 drop-shadow-[0_2px_0_rgba(0,0,0,0.8)] stroke-black tracking-tighter leading-none transform group-hover/line:scale-105 transition-transform">
                    {option.titleTop}
                  </p>
                  <span className="absolute -left-4 top-1/2 -translate-y-1/2 text-[9px] text-amber-500/30 font-mono -rotate-90 origin-center opacity-0 group-hover/line:opacity-100 transition-opacity">HOOK</span>
                  {copiedPart === 'top' && <div className="absolute top-0 right-0"><Check className="w-4 h-4 text-emerald-500" /></div>}
              </div>

              {/* Middle Title - Core (Sub Title: 10 Chars) */}
              <div 
                className="relative w-full cursor-pointer group/line"
                onClick={(e) => handleCopyPart(option.titleMiddle, 'mid', e)}
              >
                  <p className="font-black text-base md:text-lg text-white drop-shadow-[0_2px_0_rgba(0,0,0,0.8)] tracking-wide bg-red-600/80 px-2 py-0.5 inline-block rotate-1 group-hover/line:rotate-0 transition-transform rounded-sm">
                     {option.titleMiddle}
                  </p>
                  <span className="absolute -right-4 top-1/2 -translate-y-1/2 text-[9px] text-amber-500/30 font-mono rotate-90 origin-center opacity-0 group-hover/line:opacity-100 transition-opacity">CORE</span>
                  {copiedPart === 'mid' && <div className="absolute top-0 right-0"><Check className="w-4 h-4 text-emerald-500" /></div>}
              </div>

              {/* Bottom Title - Emotion (Third Title: 8 Chars) */}
              <div 
                className="relative w-full cursor-pointer group/line"
                onClick={(e) => handleCopyPart(option.titleBottom, 'bot', e)}
              >
                  <p className="font-bold text-sm md:text-base text-amber-100 drop-shadow-md tracking-widest uppercase border-b-2 border-amber-500/50 pb-1 inline-block group-hover/line:text-amber-300 transition-colors">
                     {option.titleBottom}
                  </p>
                  {copiedPart === 'bot' && <div className="absolute top-0 right-0"><Check className="w-4 h-4 text-emerald-500" /></div>}
              </div>
           </div>
        </div>

        {/* Visual Hooks (Ticker Segments) */}
        <div className="pt-2">
           <div className="flex items-center gap-2 mb-3 opacity-50">
             <div className="h-px bg-amber-900 flex-1"></div>
             <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest">{t.visualHooks}</span>
             <div className="h-px bg-amber-900 flex-1"></div>
           </div>

           <div className="space-y-2">
              {option.tickerSegments.map((segment, idx) => (
                 <div 
                   key={idx}
                   className="cursor-pointer p-3 rounded-lg border border-transparent hover:border-amber-500/20 hover:bg-red-900/20 transition-all flex items-start gap-3 group/item"
                   onClick={(e) => handleCopyPart(segment, `seg-${idx}`, e)}
                 >
                    <div className="mt-1 w-1 h-1 rounded-full bg-amber-800 group-hover/item:bg-amber-400 transition-colors"></div>
                    <div className="flex-1 text-sm text-red-200/60 font-medium leading-relaxed group-hover/item:text-amber-100">
                      {segment}
                    </div>
                    {copiedPart === `seg-${idx}` && <Check className="w-3 h-3 text-emerald-500" />}
                 </div>
               ))}
           </div>
        </div>

        {/* Long Narrative Ticker */}
        {option.longTicker && option.longTicker.length > 0 && (
          <div className="mt-auto pt-4">
             <div className="flex items-center gap-2 mb-3">
                <AlignLeft className="w-3 h-3 text-amber-600" />
                <span className="text-[9px] font-bold text-amber-500/60 uppercase tracking-widest">{t.longTicker}</span>
             </div>
             
             <div className="bg-black/30 rounded-xl border border-amber-500/10 p-4 space-y-3 relative group/ticker">
                {/* Scroll Indicator Hint */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 opacity-20">
                    <ArrowDown className="w-3 h-3 text-amber-500 animate-bounce" />
                </div>

                {option.longTicker.map((para, idx) => (
                  <div 
                    key={`long-${idx}`}
                    className="cursor-pointer hover:text-white text-red-200/50 text-xs leading-relaxed text-justify transition-colors relative"
                    onClick={(e) => handleCopyPart(para, `long-${idx}`, e)}
                  >
                     <p>{para}</p>
                     {copiedPart === `long-${idx}` && <span className="absolute -right-2 top-0 text-emerald-500"><Check className="w-3 h-3"/></span>}
                  </div>
                ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};