import { google } from "@ai-sdk/google";
import { generateText } from "ai";

import { type NextRequest, NextResponse } from "next/server";

import { GAME_PROMPTS } from "@/lib/prompts";
import { GAME_CONFIG } from "@/lib/constants";
import { GenerateStoryRequest } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const { userMessage, conversationHistory, isStart }: GenerateStoryRequest =
      await request.json();

    let prompt: string = GAME_PROMPTS.INITIAL_STORY;

    if (!isStart) {
      const historyText = conversationHistory
        .map((msg) => `${msg.role}: ${msg.content}`)
        .join("\n");
      prompt = GAME_PROMPTS.CONTINUE_STORY(historyText, userMessage);
    }

    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt,
    });

    const [narrative, imagePrompt] = text.split(GAME_CONFIG.IMAGE.SEPARATOR);
    return NextResponse.json({ narrative, imagePrompt });
  } catch (error) {
    console.error("Error generating story:", error);
    return NextResponse.json(
      { error: "Failed to generate story" },
      { status: 500 }
    );
  }
}
