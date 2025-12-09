import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// We use a singleton-like pattern or check key validity before calls
const getAI = () => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please set process.env.API_KEY");
  }
  return new GoogleGenAI({ apiKey });
};

export const editImageWithGemini = async (
  base64Image: string,
  prompt: string
): Promise<string> => {
  const ai = getAI();
  
  // Clean base64 string if it contains metadata prefix
  const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: prompt,
          },
          {
            inlineData: {
              mimeType: 'image/png', // Standardize on PNG for transmission if possible, or detect from input
              data: cleanBase64,
            },
          },
        ],
      },
    });

    // Parse response for image
    const parts = response.candidates?.[0]?.content?.parts;
    if (!parts) {
      throw new Error("No content generated");
    }

    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    // Fallback if no image found directly in parts (unlikely for this specific task but good practice)
    throw new Error("No image data received from Gemini.");

  } catch (error) {
    console.error("Gemini Image Edit Error:", error);
    throw error;
  }
};
