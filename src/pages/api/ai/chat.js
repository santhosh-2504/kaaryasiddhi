import { systemPrompt } from "@/utils/prompt";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const messages = Array.isArray(req.body.messages) ? req.body.messages : [];
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

  const finalMessages = [
    { role: "system", content: systemPrompt },
    ...messages,
  ];

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-small-3.2-24b-instruct-2506:free",
          messages: finalMessages,
        }),
      },
    );

    const data = await response.json();
    const assistantReply = data?.choices?.[0]?.message?.content;

    return res.status(200).json({ reply: assistantReply });
  } catch (err) {
    console.error("OpenRouter error:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
