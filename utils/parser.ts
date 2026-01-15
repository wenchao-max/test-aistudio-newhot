import { GeneratedResult, TitleOption, EditingGuide } from '../types';

export const parseGeminiOutput = (text: string): GeneratedResult => {
  try {
    const data = JSON.parse(text);

    // Map JSON fields to internal types safely
    const options: TitleOption[] = (data.options || []).map((opt: any, index: number) => ({
      id: opt.id || index + 1,
      viralScore: opt.viralScore || "90%",
      titleTop: opt.titleTop || "标题生成中...",
      titleMiddle: opt.titleMiddle || "...",
      titleBottom: opt.titleBottom || "...",
      description: "", 
      tickerSegments: opt.tickerSegments || [],
      longTicker: opt.longTicker || []
    }));

    const editingGuide: EditingGuide = {
      pace: data.editingGuide?.pace || "根据画面节奏自然剪辑",
      opening: data.editingGuide?.opening || "前3秒设置视觉钩子",
      bgm: data.editingGuide?.bgm || "使用快节奏新闻卡点音乐",
      visuals: data.editingGuide?.visuals || "添加关键信息字幕",
      steps: data.editingGuide?.steps || []
    };

    // Construct the formatted string for Trend Analysis display
    const trendText = data.trendAnalysis 
      ? `画像匹配度：${data.trendAnalysis.matchScore}\n${data.trendAnalysis.content}`
      : "暂无数据";

    return {
      rawText: text,
      trendAnalysis: trendText,
      visualKeywords: data.visualKeywords || [],
      options: options,
      footerCopy: data.footerCopy || [],
      tags: data.tags || [],
      editingGuide: editingGuide
    };

  } catch (e) {
    console.error("JSON Parsing Failed:", e);
    // Fallback or empty result if JSON is invalid (rare with responseSchema)
    return {
      rawText: text,
      trendAnalysis: "解析失败，请重试",
      visualKeywords: [],
      options: [],
      footerCopy: [],
      tags: [],
      editingGuide: { pace: "", opening: "", bgm: "", visuals: "", steps: [] }
    };
  }
};