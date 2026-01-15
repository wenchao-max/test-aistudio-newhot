import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedResult } from "../types";

// Define the schema for strict JSON output
const outputSchema = {
  type: Type.OBJECT,
  properties: {
    trendAnalysis: {
      type: Type.OBJECT,
      properties: {
        matchScore: { type: Type.STRING, description: "Composite score of Compliance Safety + Audience Match (e.g., '92%')." },
        content: { type: Type.STRING, description: "Dual Audit Report in CHINESE: 1. Compliance risks (Keywords). 2. Deep psychological match for Women 30-50." }
      },
      required: ["matchScore", "content"]
    },
    visualKeywords: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "5-8 visual keywords extracted from frames in CHINESE (e.g., '暖光', '泪眼')."
    },
    options: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.INTEGER },
          viralScore: { type: Type.STRING },
          titleTop: { type: Type.STRING, description: "Line 1 (Visual Hook): High contrast, shocking or intriguing. Optimized for 9:16 screen width (avoid wrapping). E.g., 'Flashy', 'Question', 'Conflict'." },
          titleMiddle: { type: Type.STRING, description: "Line 2 (Core Fact): The substance/context. Information dense. Balanced width with Line 1." },
          titleBottom: { type: Type.STRING, description: "Line 3 (Emotional Anchor): Short, punchy, resonant. The 'soul' of the copy." },
          tickerSegments: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "3 short news-style lower thirds / visual anchors."
          },
          longTicker: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "3 segments of 'Anchor Commentary'. Seg 1: The Phenomenon (Hook). Seg 2: The Deep Analysis (Truth). Seg 3: The Sublimation (Value). Each segment MUST be STRICTLY 50-55 Chinese characters."
          }
        },
        required: ["id", "viralScore", "titleTop", "titleMiddle", "titleBottom", "tickerSegments", "longTicker"]
      }
    },
    footerCopy: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3 lines of high-engagement comment section interaction starters in CHINESE."
    },
    editingGuide: {
      type: Type.OBJECT,
      properties: {
        pace: { type: Type.STRING, description: "Editing rhythm advice in CHINESE." },
        opening: { type: Type.STRING, description: "First 3 seconds hook strategy in CHINESE." },
        bgm: { type: Type.STRING, description: "Specific music style AND volume curve in CHINESE (e.g., '人声100%, BGM 15%')." },
        visuals: { type: Type.STRING, description: "Color grading (e.g., '低饱和, +10 锐度') and layout in CHINESE." },
        steps: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Step-by-step CapCut/Jianying instructions in CHINESE."
        }
      },
      required: ["pace", "opening", "bgm", "visuals", "steps"]
    },
    tags: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "10 Mixed tags in CHINESE: Niche + Traffic + Long-tail."
    }
  },
  required: ["trendAnalysis", "visualKeywords", "options", "footerCopy", "editingGuide", "tags"]
};

const SYSTEM_INSTRUCTION = `
You are the **Douyin Viral Algorithm Architect V4.0 (Rong-Media Ultimate)**.
Your core expertise is creating **News-Grade / Deep-Dive Social Commentary** content for **Women aged 30-50**.
You MUST Output strictly in **Simplified Chinese** (Simplified Chinese).

**CORE PROTOCOLS:**

1.  **DEEP ANALYSIS (Context Tree)**:
    - Analyze every frame/sentence. Do not hallucinate.
    - **Tone**: **News Commentary / Social Observation** (Rational, Insightful, Empathetic). 
    - **Target**: Hit pain points (Parenting anxiety, Marriage reality, Self-growth) with dignity and depth.

2.  **VISUAL HIERARCHY (9:16 Golden Ratio)**:
    - Do not count characters rigidly. Instead, focus on **Visual Weight** and **Readability** on a phone screen.
    - **Line 1 (The Hook)**: Big, Bold, Impactful. Must fit on one line without cramping. (e.g. "为什么越懂事的女人越苦？")
    - **Line 2 (The Core)**: Stabilizing, Informative. (e.g. "心理学家揭秘讨好型人格真相")
    - **Line 3 (The Anchor)**: Emotional, Short, Punchy. (e.g. "别再委屈自己")
    - **Layout Logic**: The 3 lines should form an inverted pyramid or a stable block. Ensure the visual center of gravity is balanced.

3.  **LONG TICKER (Deep Commentary)**:
    - Structure: **Phase 1 (The Hook/Phenomenon)** -> **Phase 2 (The Analysis/Truth)** -> **Phase 3 (The Sublimation/Value)**.
    - **LENGTH**: Each segment must be **STRICTLY 50-55 Chinese characters**. Count them.

**OUTPUT LOGIC**:
- **Trend Analysis**: Combine "Compliance Audit" (Safety Check) + "Audience Match" (Psychology Profile).
- **Options**:
    - Option 1: **Social Observation** (News Angle).
    - Option 2: **Emotional Resonance** (Deep Dive).
    - Option 3: **Suspense/Contrast** (Storytelling).

Return ONLY valid JSON matching the provided schema.
`;

export const generateViralCopy = async (
  content: string, 
  mediaData: { mimeType: string, data: string } | null,
  evolutionHistory: string[]
): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API Key not found");

  const ai = new GoogleGenAI({ apiKey });

  let memoryContext = "";
  if (evolutionHistory.length > 0) {
    memoryContext = `\n[ALGORITHM EVOLUTION DATA - ADJUST BASED ON FEEDBACK]:\n${evolutionHistory.join('\n')}\n`;
  }

  const parts: any[] = [];

  if (mediaData) {
    parts.push({
      inlineData: {
        mimeType: mediaData.mimeType,
        data: mediaData.data
      }
    });
  }

  const textPrompt = `
  Analyze this content for Douyin/TikTok (Target: Women 30-50).
  OUTPUT LANGUAGE: SIMPLIFIED CHINESE ONLY.
  
  User Context/Script: "${content || "Analyze the video visuals directly."}"
  ${memoryContext}
  
  Task: Generate 3 Viral Strategy Options (News/Commentary Style).
  
  CRITICAL CONSTRAINTS:
  1. **3-Line Title Stack**: Optimize for 9:16 Vertical Screen.
     - Focus on visual impact and hierarchy (Hook -> Core -> Emotion).
     - No strict character count, but ensure it fits comfortably on screen (approx 8-14 chars is usually best, but prioritize meaning).
  2. **LongTicker segments**: STRICTLY 50-55 chars each.
  `;
  
  parts.push({ text: textPrompt });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: outputSchema,
        temperature: 0.7, // Lower temperature for more stable/professional output
      }
    });

    return response.text || "{}";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};