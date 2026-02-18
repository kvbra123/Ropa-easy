
import { GoogleGenAI } from "@google/genai";

export const getAIFashionAdvice = async (query: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Eres el Asistente Stylist de "Ropa Easy" integrado en Shopify. 
      Usuario busca: "${query}". 
      Responde como un editor de moda profesional. 
      Estructura tu respuesta en JSON para que pueda extraer:
      1. "advice": Un párrafo breve (máx 30 palabras) que recomiende un estilo.
      2. "keywords": 3 etiquetas de estilo para metadatos de Shopify.
      3. "recommendedProduct": Elige uno de estos handles: 'nikita-body-olive', 'kiddo-pant-kaki', 'beatrix-coat'.`,
      config: {
        responseMimeType: "application/json"
      }
    });
    
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Error:", error);
    return { advice: "Nuestra IA está analizando las tendencias para tu tienda.", keywords: ["New Arrivals", "Premium"], recommendedProduct: 'nikita-body-olive' };
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
            text: `GENERACIÓN DE ASSET PARA SHOPIFY: "${prompt}". 
            Contexto: Esta imagen es para un catálogo de eCommerce. 
            Requisito crítico: La prenda debe estar perfectamente centrada. 
            El fondo debe ser limpio y profesional. 
            La salida DEBE ser un cuadrado perfecto con relación de aspecto 1:1.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    const parts = response.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No se pudo generar la imagen cuadrada 1:1");
  } catch (error) {
    console.error("Gemini Image Error:", error);
    throw error;
  }
};
