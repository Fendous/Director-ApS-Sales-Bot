import { Message, FileAttachment } from "../types";

async function sendMessage(messages) {
  const response = await fetch("/.netlify/functions/openai-chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });

  const data = await response.json();
  return data;
}  
const OPENAI_API_URL = "https://api.openai.com/v1/threads";
export async function sendMessageToOpenAI(
  messages: Message[],
  attachments: FileAttachment[]
): Promise<string> {
  try {
    // Prepare the conversation history
    const formattedMessages = messages.map(m => ({
      role: m.role,
      content: m.content,
    }));

    // Create a thread (only needed if you're managing sessions)
    const threadResponse = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: formattedMessages }),
    });

    const threadData = await threadResponse.json();
    const threadId = threadData.id;

    // Run the assistant on the created thread
    const runResponse = await fetch(`${OPENAI_API_URL}/${threadId}/runs`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ assistant_id: ASSISTANT_ID }),
    });

    const runData = await runResponse.json();
    
    // Fetch the response from OpenAI
    const messagesResponse = await fetch(`${OPENAI_API_URL}/${threadId}/messages`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const messagesData = await messagesResponse.json();
    const assistantMessage = messagesData.data.find(m => m.role === "assistant");

    return assistantMessage?.content || "I didn't receive a response from the AI.";
  } catch (error) {
    console.error("Error communicating with OpenAI:", error);
    return "There was an error processing your request. Please try again.";
  }
}
