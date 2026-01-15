import React from 'react';
import { Target, Copy, Check, MousePointer2, FileText } from 'lucide-react';

interface RetentionHooksProps {
  hooks: string[];
}

export const RetentionHooks: React.FC<RetentionHooksProps> = ({ hooks }) => {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getStrategyLabel = (idx: number) => {
    if (idx === 0) return "新闻纪实 / 全貌还原 (Fact Based)";
    if (idx === 1) return "深度科普 / 细节拆解 (Deep Dive)";
    return "情感故事 / 沉浸叙述 (Storytelling)";
  };

  return (
    <div className="mt-8 animate-fade-in-up delay-100">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-gradient-to-b from-orange-400 to-red-600 w-1.5 h-8 rounded-full"></div>
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            沉浸式滚屏 · 深度解说文案
            <Target className="w-4 h-4 text-orange-500" />
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">参考媒体号策略 · 40-80字高密度信息流 · 填补信息差</p>
        </div>
      </div>
      
      {/* Changed grid to 1 column for better readability of long text */}
      <div className="flex flex-col gap-5">
        {hooks.map((hook, idx) => (
          <div 
            key={idx}
            className="group relative bg-slate-800/60 border border-slate-700/60 rounded-xl p-5 hover:border-orange-500/50 transition-all cursor-pointer hover:bg-slate-800 hover:shadow-lg hover:shadow-orange-900/10"
            onClick={() => handleCopy(hook, idx)}
          >
            <div className="flex justify-between items-start mb-3 border-b border-slate-700/50 pb-3">
              <span className="text-[11px] font-bold text-orange-400/90 uppercase tracking-widest border border-orange-500/20 px-2 py-1 rounded bg-orange-500/10 flex items-center gap-2">
                <FileText className="w-3 h-3" />
                {getStrategyLabel(idx)}
              </span>
              <div className="text-slate-600 group-hover:text-orange-400 transition-colors bg-slate-900 p-1.5 rounded-lg">
                {copiedIndex === idx ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </div>
            </div>
            
            <p className="text-base text-slate-300 font-medium leading-7 tracking-wide text-justify">
              {hook}
            </p>

            <div className="mt-3 flex justify-end">
               <div className="flex items-center gap-1.5 text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                <MousePointer2 className="w-3 h-3" />
                <span>点击复制长文案</span>
              </div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity pointer-events-none"></div>
          </div>
        ))}
      </div>
    </div>
  );
};