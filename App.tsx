import React, { useState } from 'react';
import { generateViralCopy } from './services/geminiService';
import { parseGeminiOutput } from './utils/parser';
import { InputSection } from './components/InputSection';
import { ResultCard } from './components/ResultCard';
import { FooterCopy } from './components/FooterCopy';
import { EvolutionPanel } from './components/EvolutionPanel';
import { TrendAnalysis } from './components/TrendAnalysis';
import { EditingGuide } from './components/EditingGuide';
import { AppState, MediaData } from './types';
import { Zap, Globe, Flame } from 'lucide-react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const AppContent: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [state, setState] = useState<AppState>({
    inputText: '',
    mediaData: null,
    isLoading: false,
    result: null,
    history: [],
    showFeedback: false,
  });

  const handleGenerate = async () => {
    if (!state.inputText.trim() && !state.mediaData) return;

    setState(prev => ({ ...prev, isLoading: true, result: null }));

    try {
      const rawText = await generateViralCopy(state.inputText, state.mediaData, state.history);
      const parsedResult = parseGeminiOutput(rawText);
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        result: parsedResult,
        showFeedback: false 
      }));
    } catch (error) {
      console.error(error);
      alert("Algorithm connection failed. Please check network or API Key.");
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleFeedback = (feedback: string) => {
    setState(prev => ({
      ...prev,
      history: [...prev.history, feedback],
    }));
  };

  const handleMediaUpload = (media: MediaData) => {
    setState(prev => ({ ...prev, mediaData: media }));
  };

  const handleMediaClear = () => {
    setState(prev => ({ ...prev, mediaData: null }));
  };

  return (
    <div className="min-h-screen text-amber-50 pb-32 font-sans selection:bg-amber-500/30">
      
      {/* Festive Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#2a0404]/80 backdrop-blur-md border-b border-amber-500/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-default">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-orange-600 text-white rounded-xl shadow-lg shadow-orange-900/50 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
              <Flame className="w-5 h-5 fill-current animate-pulse" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-amber-400 leading-none">
                {t.appTitle}
              </h1>
              <span className="text-[10px] text-amber-500/80 font-mono mt-1 tracking-[0.2em] uppercase">
                {t.appSubtitle}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <button 
               onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
               className="flex items-center gap-2 text-xs font-bold text-amber-500/60 hover:text-amber-300 transition-colors px-3 py-1.5 rounded-full hover:bg-amber-500/10 border border-transparent hover:border-amber-500/20"
             >
               <Globe className="w-3.5 h-3.5" />
               <span className="uppercase tracking-wider">{language === 'zh' ? 'EN' : '中文'}</span>
             </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-36">
        
        {/* Festive Hero Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto space-y-6 animate-fade-in-up">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/50 border border-red-800/50 text-red-300 text-[10px] font-bold tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
              2026 Year of the Horse Special Edition
           </div>
          <h2 className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-orange-600 tracking-tight leading-tight drop-shadow-sm">
            {t.heroTitle}
          </h2>
          <p className="text-red-200/60 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
             {t.heroDesc}
          </p>
        </div>

        {/* Input */}
        <InputSection 
          value={state.inputText}
          mediaData={state.mediaData}
          onChange={(val) => setState(prev => ({ ...prev, inputText: val }))}
          onMediaUpload={handleMediaUpload}
          onMediaClear={handleMediaClear}
          onSubmit={handleGenerate}
          isLoading={state.isLoading}
        />

        {/* Results */}
        {state.result && (
          <div className="animate-fade-in space-y-16 mt-20">
            
            {/* Trend Analysis Section */}
            {state.result.trendAnalysis && (
              <TrendAnalysis 
                analysisText={state.result.trendAnalysis}
                visualKeywords={state.result.visualKeywords}
              />
            )}

            {/* Grid for Titles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {state.result.options.map((option) => (
                <ResultCard key={option.id} option={option} />
              ))}
            </div>

            {/* Editing Guide */}
            {state.result.editingGuide && (
               <EditingGuide guide={state.result.editingGuide} />
            )}

            {/* Emotional Copy Section + Tags */}
            {(state.result.footerCopy.length > 0 || state.result.tags.length > 0) && (
              <FooterCopy 
                lines={state.result.footerCopy} 
                tags={state.result.tags}
              />
            )}

            {/* Evolution Panel */}
            <EvolutionPanel 
              onFeedback={handleFeedback}
              evolutionLevel={state.history.length}
            />

          </div>
        )}
      </main>
    </div>
  );
};

const App: React.FC = () => (
  <LanguageProvider>
    <AppContent />
  </LanguageProvider>
);

export default App;