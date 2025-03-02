import fetch from 'node-fetch'; // Importing node-fetch using ESM syntax

export const handler = async function(event, context) {
  try {
    // Access your OpenAI API key from environment variables
    const apiKey = process.env.OPENAI_API_KEY;
    const assistantId = process.env.OPENAI_ASSISTANT_ID; // Use the Assistant ID from environment variables

    // Construct your API request
    const response = await fetch("https://api.openai.com/v1/threads", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`, // Use the API key securely
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assistant_id: assistantId, // Use the Assistant ID
        messages: event.body.messages, // Assuming you're passing messages in the request body
      }),
    });

    const data = await response.json(); // Parse the response

    // Return the result from OpenAI API
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("OpenAI API error:", error); // Log any errors for debugging
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch response" }),
    };
  }
};
