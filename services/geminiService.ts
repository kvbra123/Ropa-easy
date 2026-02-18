
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
