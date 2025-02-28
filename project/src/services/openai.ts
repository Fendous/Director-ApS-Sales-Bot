import { Message, FileAttachment } from "../types";

const OPENAI_API_KEY = "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";  // Replace with your OpenAI API key
const ASSISTANT_ID = "asst_vhNKnEXKMrsSdYs4OJw3NYq5";  
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
