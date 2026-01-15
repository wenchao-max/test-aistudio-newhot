import React from 'react';
import { Clapperboard, Timer, Zap, Music, MonitorPlay, ListOrdered } from 'lucide-react';
import { EditingGuide as EditingGuideType } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface EditingGuideProps {
  guide: EditingGuideType;
}

export const EditingGuide: React.FC<EditingGuideProps> = ({ guide }) => {
  const { t } = useLanguage();

  const Item = ({ icon: Icon, title, content }: { icon: any, title: string, content: string }) => (
    <div className="space-y-1.5 group">
      <div className="flex items-center gap-2 text-amber-500/70 text-[10px] font-bold uppercase tracking-wider group-hover:text-amber-400 transition-colors">
        <Icon className="w-3 h-3" />
        <span>{title}</span>
      </div>
      <p className="text-sm text-rose-100/90 font-medium border-l border-amber-900/30 pl-3 py-1 group-hover:border-amber-500/50 transition-colors">
        {content}
      </p>
    </div>
  );

  return (
    <div className="mt-12 bg-[#2a0b0b] border border-amber-500/20 rounded-xl p-8 relative overflow-hidden shadow-lg shadow-red-950/30 hover:border-amber-500/40 transition-all duration-500 animate-fade-in-up">
      {/* Background Decor */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center gap-3 mb-8 relative z-10">
        <div className="p-2 bg-gradient-to-br from-red-900 to-amber-900 rounded-lg text-amber-100 border border-amber-500/20 shadow-inner shadow-red-950">
          <Clapperboard className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-amber-50 font-bold text-sm uppercase tracking-wide">{t.editingGuide}</h3>
          <p className="text-[10px] text-amber-500/60 font-mono mt-0.5 tracking-wider">{t.directorCut}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative z-10">
        <Item icon={Timer} title={t.pace} content={guide.pace} />
        <Item icon={Zap} title={t.opening} content={guide.opening} />
        <Item icon={Music} title={t.bgm} content={guide.bgm} />
        <Item icon={MonitorPlay} title={t.visuals} content={guide.visuals} />
      </div>

      {guide.steps && guide.steps.length > 0 && (
        <div className="pt-6 border-t border-amber-500/10 relative z-10">
          <div className="flex items-center gap-2 mb-4 text-amber-500/60 text-[10px] font-bold uppercase tracking-wider">
             <ListOrdered className="w-3 h-3" />
             <span>{t.steps}</span>
          </div>
          <div className="space-y-3">
             {guide.steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 group/step">
                   <div className="w-5 h-5 rounded-full bg-red-950 text-amber-500/80 border border-amber-500/10 flex items-center justify-center text-[10px] font-bold shrink-0 group-hover/step:bg-amber-900 group-hover/step:text-amber-100 transition-colors">
                      {idx + 1}
                   </div>
                   <p className="text-red-100/70 text-sm leading-relaxed group-hover/step:text-rose-50 transition-colors">
                      {step}
                   </p>
                </div>
             ))}
          </div>
        </div>
      )}
    </div>
  );
};