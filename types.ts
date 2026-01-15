
export type Language = 'zh' | 'en';

export interface TitleOption {
  id: number;
  viralScore: string;
  titleTop: string;    // Line 1: Main Title (Visual Hook - Optimized for width)
  titleMiddle: string; // Line 2: Sub Title (Core Fact - Optimized for balance)
  titleBottom: string; // Line 3: Third Title (Emotion - Punchy)
  description: string; 
  tickerSegments: string[]; // 3rd Line Title Options (Short)
  longTicker: string[]; // New: 3-part Narrative Ticker (130-150 chars)
}

export interface EditingGuide {
  pace: string;
  opening: string;
  bgm: string;
  visuals: string;
  steps: string[];
}

export interface GeneratedResult {
  rawText: string;
  trendAnalysis: string; 
  visualKeywords: string[]; 
  options: TitleOption[];
  footerCopy: string[]; 
  tags: string[]; 
  editingGuide?: EditingGuide;
}

export interface Message {
  role: 'user' | 'model';
  content: string;
}

export interface MediaData {
  mimeType: string;
  data: string; // base64
}

export interface AppState {
  inputText: string;
  mediaData: MediaData | null;
  isLoading: boolean;
  result: GeneratedResult | null;
  history: string[]; // User feedback history for "evolution"
  showFeedback: boolean;
}