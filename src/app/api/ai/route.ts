import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { content } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert in writing educational tutorials. 
            Format your response in HTML instead of markdown.
            Use proper HTML tags like <h1>, <h2>, <p>, <code>, <pre>, etc.
            For code blocks, wrap them in <pre><code> tags.
            Make content engaging and educational.
            Keep the original content's intent but enhance it.`,
        },
        {
          role: "user",
          content: `Enhance this topic: ${content}`,
        },
      ],
    });

    const enhancedContent = completion.choices[0].message.content;

    // Clean up any markdown-style formatting that might remain

    return NextResponse.json({
      content: enhancedContent,
    });
  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json(
      { error: "Failed to process content" },
      { status: 500 }
    );
  }
}
