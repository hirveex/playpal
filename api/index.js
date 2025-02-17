const { OpenAI } = require("openai");

// Haetaan ympäristömuuttujista API-avain ja endpoint
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
  baseURL: process.env.OPENAI_ENDPOINT, 
});

module.exports = async function (context, req) {
  try {
    const userInput = req.body?.question || "Mikä on PlayPal?";

    // OpenAI API -kutsu
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: userInput }],
    });

    context.res = {
      status: 200,
      body: response.choices[0].message.content,
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: `Error: ${error.message}`,
    };
  }
};
