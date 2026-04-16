import { Anthropic } from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { company, industry } = await request.json();

    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const message = await client.messages.create({
      model: "claude-opus-4-1",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: `Generate a brief ESG gap assessment for ${company} in ${industry}. Keep it concise.`,
        },
      ],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "No response";

    return NextResponse.json({ success: true, result: text });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
