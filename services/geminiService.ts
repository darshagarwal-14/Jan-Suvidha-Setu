import { GoogleGenAI } from "@google/genai";
import { UserProfile } from '../types';

// Initialize the API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// Helper function to get simple advice
export const getDocumentAdvice = async (
  docName: string, 
  userProfile: UserProfile, 
  lang: 'en' | 'hi'
): Promise<string> => {
  if (!process.env.API_KEY) {
    return lang === 'en' 
      ? "AI Assistant is offline. Please visit your Gram Panchayat office." 
      : "एआई सहायक ऑफ़लाइन है। कृपया अपनी ग्राम पंचायत कार्यालय पर जाएँ।";
  }

  try {
    const prompt = `
      You are a helpful village assistant in India. 
      A user needs help with a document: "${docName}".
      
      User Profile:
      - Residence: ${userProfile.residence}
      - Occupation: ${userProfile.occupation}
      
      Explain in 2 simple sentences where to go and what to do to get this document. 
      Language: ${lang === 'hi' ? 'Hindi (Devanagari script)' : 'English'}.
      Tone: Respectful, simple, non-bureaucratic.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || (lang === 'en' ? "Could not retrieve info." : "जानकारी प्राप्त नहीं हो सकी।");
  } catch (error) {
    console.error("Gemini Error:", error);
    return lang === 'en' 
      ? "Sorry, I cannot help right now. Please check with your local office." 
      : "क्षमा करें, मैं अभी मदद नहीं कर सकता। कृपया अपने स्थानीय कार्यालय से संपर्क करें।";
  }
};
