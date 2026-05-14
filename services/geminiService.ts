import { GoogleGenAI } from "@google/genai";

// We create a singleton instance lazily to ensure process.env is fully available
let aiInstance: GoogleGenAI | null = null;

const getAIClient = () => {
  if (!aiInstance) {
    // Initialize the client using process.env.API_KEY directly as per guidelines
    // The polyfill in index.html ensures process.env exists
    const apiKey = process.env.API_KEY || '';
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

/**
 * Generates an image using the Gemini Nano Banana model (gemini-2.5-flash-image)
 * This is used to dynamically create assets for the landing page.
 */
export const generateAssetImage = async (prompt: string): Promise<string | null> => {
  // Check if API key is effectively empty before trying
  if (!process.env.API_KEY) {
    console.warn("API Key is missing, skipping image generation");
    return null;
  }

  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
            const base64EncodeString: string = part.inlineData.data;
            return `data:image/png;base64,${base64EncodeString}`;
        }
    }
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};