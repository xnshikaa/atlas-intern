import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json();

    const apiKey = process.env.NVIDIA_API_KEY; // or OPENAI_API_KEY depending on provider
    if (!apiKey) {
      return NextResponse.json({
        error: "Missing API Key",
        message: "Add NVIDIA_API_KEY in .env.local"
      }, { status: 401 });
    }

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    const userMessage = messages[messages.length - 1]?.content || "";

    // 👉 Structured prompt
    const prompt = `
You are Atlas AI — an academic planning intelligence system.

You must:
- Analyze academic data
- Suggest actions
- Return structured output

### CONTEXT:
${JSON.stringify(context, null, 2)}

### USER QUERY:
${userMessage}

### OUTPUT FORMAT (STRICT JSON):
{
  "message": "short explanation",
  "action": "none | reschedule | adjust | fix",
  "suggested_changes": [],
  "reasoning": "why this decision"
}
`;

    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "meta/llama3-70b-instruct",
        messages: [
          {
            role: "system",
            content: "You are a precise academic planning AI."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000
      })
    });

    const data = await response.json();

    console.log("Llama response:", data);

    if (!response.ok) {
      return NextResponse.json({
        error: data.error?.message || "Execution failed"
      }, { status: response.status });
    }

    const rawText = data.choices?.[0]?.message?.content;

    if (!rawText) throw new Error("Empty AI response");

    // 👉 Parse JSON safely
    let parsed;
    try {
      const cleanedText = rawText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();

      parsed = JSON.parse(cleanedText);
    } catch {
      parsed = {
        message: rawText,
        action: "none",
        suggested_changes: [],
        reasoning: "Fallback response"
      };
    }

    return NextResponse.json(parsed);

  } catch (error: any) {
    console.error("Route Error:", error);
    return NextResponse.json({
      message: `Runtime error: ${error.message}`,
      action: "none"
    }, { status: 500 });
  }
}