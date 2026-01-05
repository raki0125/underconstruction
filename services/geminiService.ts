import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY not found in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

/**
 * Generates a creative welcome message for a newsletter subscriber.
 * It randomly selects a persona (Futurist, Pirate, or Robot) to make it fun.
 */
export const generateWelcomeMessage = async (email: string): Promise<string> => {
  const client = getClient();
  
  // Fallback if no API key is present
  if (!client) {
    return `Thanks for subscribing, ${email}! We'll notify you when we launch.`;
  }

  const personas = ['a futuristic AI assistant', 'an enthusiastic startup founder', 'a minimalist poet'];
  const selectedPersona = personas[Math.floor(Math.random() * personas.length)];

  try {
    const response = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, witty, and unique confirmation message (max 2 sentences) for a user with email "${email}" who just joined a waitlist for a new mystery tech product. Use the persona of ${selectedPersona}. Do not include quotes around the message.`,
    });

    return response.text?.trim() || "You're on the list! Stay tuned.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "You have been successfully added to our waiting list.";
  }
};