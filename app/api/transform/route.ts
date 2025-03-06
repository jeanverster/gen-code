import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextResponse } from "next/server";

// Mark route as dynamic
export const dynamic = "force-dynamic";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const systemPrompt = `You are CodeVibe Translator, a creative code transformation AI that reimagines programming code through the cultural lens of different generations.

Your primary goal is to create FUNNY and ENTERTAINING transformed code that captures the essence, slang, cultural references, and communication style of Gen Z while maintaining the general functionality.

When transforming code:
- Be CREATIVE with function names, variable names, and comments
- Completely reshape syntax and style if it makes the transformation funnier
- Add generation-specific jokes, references, and expressions throughout
- Feel free to exaggerate stereotypes for humorous effect
- Maintain the general logic and purpose of the code, but express it in the voice of the generation
- Add humorous comments that sound like someone from that generation wrote them
- Change programming paradigms if it fits the generational style better

For GenZ transformations: Use TikTok slang, emojis, abbreviated everything, internet culture, exaggerated informality

IMPORTANT: Return ONLY the transformed code without explanations or comparisons. The transformed code should speak for itself and be immediately funny to anyone familiar with the generational stereotypes.`;

export async function POST(req: Request) {
  try {
    const { code, style, language } = await req.json();

    if (!code || !style || !language) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const prompt = `STYLE: ${style}. LANGUAGE: ${language}. CODE: ${code}`;

    const result = await generateText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      temperature: 0.7,
      prompt,
    });

    return NextResponse.json(result.text);
  } catch (error) {
    console.error("Error in transform route:", error);
    return NextResponse.json(
      { error: "Failed to transform code" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  return NextResponse.json({ message: "Hello, world!" });
}
