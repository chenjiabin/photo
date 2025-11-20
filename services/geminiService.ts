import { GoogleGenAI, Type } from "@google/genai";
import { AiAnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Converts a URL to base64 string (simulated for this demo as we use remote URLs)
 * In a real scenario, you might upload the file directly or send the bytes.
 * For this demo, we will fetch the image blob and convert.
 */
async function urlToBase64(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove data url prefix (e.g. "data:image/jpeg;base64,")
      resolve(base64String.split(',')[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export const analyzePhoto = async (photoUrl: string): Promise<AiAnalysisResult> => {
  try {
    const base64Data = await urlToBase64(photoUrl);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Data
            }
          },
          {
            text: "Generate a fun, short, social media caption for this photo booth picture. Also provide 3 hashtags."
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            caption: { type: Type.STRING },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["caption", "tags"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No response from AI");
    
    return JSON.parse(jsonText) as AiAnalysisResult;

  } catch (error) {
    console.error("Error analyzing photo:", error);
    return {
      caption: "Looks like a great time!",
      tags: ["#photobooth", "#fun", "#memories"]
    };
  }
};