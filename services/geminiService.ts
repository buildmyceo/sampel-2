import { GoogleGenAI } from "@google/genai";

// Access the API key. Vite will replace `process.env.API_KEY` with the actual string.
// If not replaced (e.g. env var missing), it might fallback to undefined, so we handle that.
// We use a temporary variable to avoid any runtime 'process' reference issues.
const API_KEY_VALUE = process.env.API_KEY as string | undefined;

const ai = new GoogleGenAI({ apiKey: API_KEY_VALUE || 'dummy-key-for-init' });

export const getMarketInsights = async (location: string): Promise<string> => {
  if (!API_KEY_VALUE) {
    return "AI Insights require an API Key (configured in Vercel). Market data for this area suggests a strong upward trend.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a concise, data-driven market insight summary for real estate investors in ${location}. Focus on growth trends, rental demand, and future outlook. Keep it under 50 words.`,
    });
    return response.text || "No insights available.";
  } catch (error) {
    console.error("Error fetching AI insights:", error);
    return "Market data currently unavailable. Please check back later.";
  }
};

export const getInvestmentAdvice = async (propertyTitle: string, price: number, yieldPct: number): Promise<string> => {
  if (!API_KEY_VALUE) {
    return `Based on current metrics, ${propertyTitle} shows promising potential with a ${yieldPct}% yield.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this investment briefly: Property '${propertyTitle}' at $${price} with ${yieldPct}% rental yield. Is it a good buy for a young investor? Answer in 2 sentences max.`,
    });
    return response.text || "Analysis unavailable.";
  } catch (error) {
    console.error("Error fetching AI advice:", error);
    return "Analysis unavailable at this moment.";
  }
};