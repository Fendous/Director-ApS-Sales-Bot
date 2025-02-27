import express from "express";
import cors from "cors";
import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config(); // Load environment variablesconst app = express();const port = 5000;

app.use(cors());
app.use(express.json());
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
    });
    res.json({ reply: response.choices[0]?.message?.content || "No response." });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
 