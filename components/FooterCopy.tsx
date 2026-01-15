import React from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FooterCopyProps {
  lines: string[];
  tags: string[];
}

export const FooterCopy: React.FC<FooterCopyProps> = ({ lines, tags }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = React.useState(false);
  const [tagsCopied, setTagsCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyTags = () => {
    navigator.clipboard.writeText(tags.join(' '));
    setTagsCopied(true);
    setTimeout(() => setTagsCopied(false), 2000);
  };

  return (
    <div className="relative mt-20 max-w-4xl mx-auto animate-fade-in-up">
       <div className="flex items-center gap-4 mb-6 opacity-60">
          <div className="h-px bg-amber-900/50 flex-1"></div>
          <div className="flex items-center gap-2 text-amber-500/50 text-xs font-bold uppercase tracking-[0.2em]">
             <Terminal className="w-3.5 h-3.5" />
             <span>{t.publishTitle}</span>
          </div>
          <div className="h-px bg-amber-900/50 flex-1"></div>
       </div>

      <div className="bg-[#2a0b0b] border border-amber-500/20 rounded-xl p-8 md:p-12 relative overflow-hidden group shadow-2xl">
        {/* Festive Light Leak */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 text-center space-y-8">
          <div className="space-y-3">
            {lines.map((line, idx) => (
              <p key={idx} className={`tracking-wide transition-all duration-300 ${idx === 0 ? 'text-amber-50 font-black text-2xl md:text-4xl drop-shadow-md' : 'text-red-200/70 text-lg font-medium'}`}>
                {line}
              </p>
            ))}
          </div>
          
          <div className="flex flex-col items-center gap-4 pt-4">
             <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-6 py-2 bg-amber-50 text-amber-950 hover:bg-white rounded-full text-sm font-bold transition-colors shadow-lg shadow-amber-900/20"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{t.copyPublish}</span>
              </button>
          </div>

          {tags.length > 0 && (
            <div className="pt-8 border-t border-amber-500/10">
               <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4 max-w-2xl mx-auto">
                  {tags.map((tag, i) => (
                  <span key={i} className="text-sm font-mono text-amber-500/70 hover:text-amber-400 transition-colors cursor-default">
                     {tag}
                  </span>
                  ))}
               </div>
               <button
                  onClick={handleCopyTags}
                  className="text-[10px] text-red-300/50 hover:text-amber-400 uppercase tracking-wider font-bold transition-colors flex items-center gap-1 mx-auto"
               >
                  {tagsCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{t.copyTags}</span>
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};