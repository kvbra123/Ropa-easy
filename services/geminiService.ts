
import { GoogleGenAI } from "@google/genai";

export const getAIFashionAdvice = async (query: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Eres el Asistente Stylist de "Ropa Easy". 
      Usuario busca: "${query}". 
      Responde como un editor de moda de lujo. 
      Estructura tu respuesta en JSON para que pueda extraer:
      1. "advice": Un párrafo breve e inspirador (máx 40 palabras).
      2. "keywords": 3 etiquetas de estilo.
      3. "recommendedProduct": Elige uno de estos que mejor encaje: 'NIKITA BODY', 'KIDDO PANT', 'BEATRIX COAT'.`,
      config: {
        responseMimeType: "application/json"
      }
    });
    
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Error:", error);
    return { advice: "Nuestra IA está analizando las tendencias para ti.", keywords: ["Tech", "Fashion"], recommendedProduct: null };
  }
};

export const editImageWithGemini = async (base64Image: string, prompt: string, mimeType: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1] || base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: `Retoque editorial de alta costura: "${prompt}". 
            Mantén el realismo fotográfico, ajusta la iluminación para que parezca de estudio profesional. 
            Devuelve exclusivamente la imagen procesada.`,
          },
        ],
      },
    });

    const parts = response.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image generated");
  } catch (error) {
    console.error("Gemini Image Error:", error);
    throw error;
  }
};
