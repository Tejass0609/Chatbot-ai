const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: "YOUR_OPENAI_API_KEY"
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful chatbot for SwaadBite." },
        { role: "user", content: message }
      ]
    });
    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ reply: "Error connecting to AI service." });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
