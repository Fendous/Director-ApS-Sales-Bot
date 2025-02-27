import { OpenAI } from "openai";
 
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Use environment variables
  dangerouslyAllowBrowser: true, // Only for client-side use (not recommended for production)
});
 
export const fetchAssistantResponse = async (message) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
    });
 
    return response.choices[0]?.message?.content || "No response.";
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return "Sorry, I couldn't process your request.";
  }
};