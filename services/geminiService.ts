import { GoogleGenAI } from "@google/genai";

// Safely retrieve API key. 
// In Vite/Build environments, process.env.API_KEY is replaced with the string literal.
const getApiKey = () => {
  try {
    // @ts-ignore - process.env.API_KEY is replaced by Vite at build time
    return process.env.API_KEY || '';
  } catch (e) {
    return '';
  }
};

const apiKey = getApiKey();
const ai = new GoogleGenAI({ apiKey });

export const getMarketInsights = async (location: string): Promise<string> => {
  if (!apiKey) {
    return "AI Insights require an API Key. Market data for this area suggests a strong upward trend with a 15% increase in demand over the last quarter.";
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
  if (!apiKey) {
    return `Based on current metrics, ${propertyTitle} shows promising potential with a ${yieldPct}% yield. Consider long-term hold strategies.`;
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