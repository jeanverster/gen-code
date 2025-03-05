import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { code, style, language } = await req.json();

    if (!code || !style || !language) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const prompt = `Transform this ${language} code into ${style} generational speaking style. 
    Maintain the same functionality and formatting, but add comments and variable names that reflect the speaking style of ${style}.
    Original code:
    ${code}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      stream: true,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('Error in transform route:', error);
    return NextResponse.json(
      { error: 'Failed to transform code' },
      { status: 500 }
    );
  }
}