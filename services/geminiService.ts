
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getAIFashionAdvice = async (query: string) => {
  if (!API_KEY) return "Configura tu API_KEY para probar el buscador inteligente.";
  
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Eres el Asistente de IA de "Ropa Easy", una tienda conectada a Shopify. 
      El usuario busca: "${query}". 
      Tu objetivo es responder como un estilista personal de lujo. 
      Menciona que pronto podrás añadir automáticamente productos como 'Nikita Body' o 'Kiddo Pant' al carrito basándote en esta búsqueda.
      Sé inspirador, breve y usa un tono editorial (estilo revista Vogue). Máximo 50 palabras.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Nuestra IA está analizando el catálogo de la tienda para ti.";
  }
};

export const editImageWithGemini = async (base64Image: string, prompt: string, mimeType: string) => {
  if (!API_KEY) throw new Error("API_KEY no configurada");

  const ai = new GoogleGenAI({ apiKey: API_KEY });
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
            text: `Eres un experto en retoque fotográfico de moda para "Ropa Easy". 
            Modifica la imagen siguiendo esta instrucción: "${prompt}". 
            Mantén la estética editorial, limpia y de alta costura. 
            Si el usuario pide un filtro, aplícalo con elegancia. 
            Si pide quitar algo, hazlo de forma invisible. 
            Devuelve solo la imagen editada.`,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No se generó ninguna imagen en la respuesta.");
  } catch (error) {
    console.error("Gemini Image Error:", error);
    throw error;
  }
};
