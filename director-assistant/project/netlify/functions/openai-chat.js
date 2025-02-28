require("dotenv").config();
const fetch = require("node-fetch");

exports.handler = async function (event) {
  try {
    const { messages } = JSON.parse(event.body);

    const response = await fetch("https://api.openai.com/v1/threads", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assistant_id: process.env.OPENAI_ASSISTANT_ID, // Use the Assistant ID
        messages,
      }),
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch response" }),
    };
  }
};
