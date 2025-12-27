
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private static ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  static async analyzeRoom(base64Image: string, prompt: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          {
            parts: [
              { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
              { text: `You are an interior design assistant. Analyze this room and recommend wallpaper styles. User says: ${prompt}` }
            ]
          }
        ]
      });
      return response.text;
    } catch (error) {
      console.error('Error analyzing room:', error);
      throw error;
    }
  }

  static async generateVisualizedRoom(base64Image: string, wallpaperDescription: string, pickedColor?: string) {
    try {
      const colorContext = pickedColor ? ` The user has selected the color ${pickedColor} from their existing decor as a reference point. Please suggest and apply a wallpaper that is complementary to this color while following the style description.` : "";
      
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
            { text: `Re-wallpaper the primary walls in this room with a design that matches this description: ${wallpaperDescription}.${colorContext} Maintain the furniture, lighting, and layout exactly as they are.` }
          ]
        }
      });

      let imageUrl = '';
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
        }
      }
      
      return {
        imageUrl,
        description: response.text || ''
      };
    } catch (error) {
      console.error('Error generating visualization:', error);
      throw error;
    }
  }
}
