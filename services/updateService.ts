import { GoogleGenAI, Type } from "@google/genai";
import { Scheme } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

interface SchemeUpdate {
  id: string;
  benefitShort: { en: string; hi: string };
  description: { en: string; hi: string };
  applicationUrl?: string; // New field for application link
}

/**
 * Checks for the latest updates on government schemes using Live Google Search.
 * Ensures the app "database" is constantly updated with real-world changes.
 */
export const checkForSchemeUpdates = async (currentSchemes: Scheme[]): Promise<{ schemes: Scheme[], updated: boolean }> => {
  if (!process.env.API_KEY) {
    console.log("No API Key available for live updates.");
    return { schemes: currentSchemes, updated: false };
  }

  const schemeNames = currentSchemes.map(s => `${s.id} (${s.name.en})`).join(', ');

  const prompt = `
    You are a government data verification system.
    Target Schemes: ${schemeNames}.

    Task:
    1. Search for the absolute latest 2024-2025 benefit amounts, subsidy limits, and key changes for these schemes in India.
    2. Search for the OFFICIAL application website URL (gov.in or nic.in) if online application is available.
    3. Extract the current benefit summary and a short 1-sentence description.
    4. Return a JSON array.

    Output Schema (JSON):
    [
      {
        "id": "scheme-id-matching-input",
        "benefitShort": { "en": "...", "hi": "..." },
        "description": { "en": "...", "hi": "..." },
        "applicationUrl": "https://..." 
      }
    ]
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              benefitShort: {
                type: Type.OBJECT,
                properties: {
                  en: { type: Type.STRING },
                  hi: { type: Type.STRING }
                },
                required: ["en", "hi"]
              },
              description: {
                type: Type.OBJECT,
                properties: {
                  en: { type: Type.STRING },
                  hi: { type: Type.STRING }
                },
                required: ["en", "hi"]
              },
              applicationUrl: { type: Type.STRING, description: "Official application URL if found, else null" }
            },
            required: ["id", "benefitShort", "description"]
          }
        }
      }
    });

    const updates = JSON.parse(response.text || '[]') as SchemeUpdate[];
    
    // Extract grounding URLs (Sources)
    const sources: string[] = [];
    if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
      response.candidates[0].groundingMetadata.groundingChunks.forEach(chunk => {
        if (chunk.web?.uri) {
          sources.push(chunk.web.uri);
        }
      });
    }

    // Merge updates into schemes with STRICT validation
    const updatedSchemes = currentSchemes.map(scheme => {
      const update = updates.find(u => u.id === scheme.id);
      
      if (
        update && 
        update.benefitShort && 
        update.benefitShort.en && 
        update.benefitShort.hi &&
        update.description && 
        update.description.en && 
        update.description.hi
      ) {
        return {
          ...scheme,
          benefitShort: update.benefitShort,
          description: update.description,
          // Only update URL if AI found a valid one, otherwise keep existing static one
          applicationUrl: update.applicationUrl || scheme.applicationUrl,
          lastUpdated: Date.now(),
          sourceUrls: sources.slice(0, 3) 
        };
      }
      return scheme;
    });

    return { schemes: updatedSchemes, updated: updates.length > 0 };

  } catch (error) {
    console.error("Failed to update schemes database:", error);
    return { schemes: currentSchemes, updated: false };
  }
};
