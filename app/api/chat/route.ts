import { streamText, convertToModelMessages, type UIMessage } from "ai"
import { createOpenAI } from "@ai-sdk/openai"

export const maxDuration = 30

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json()

    const modelMessages = await convertToModelMessages(messages)

    const result = await streamText({
      model: openai("gpt-4o-mini"),
      messages: modelMessages,
      abortSignal: req.signal,
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response("Error generating response", { status: 500 })
  }
}
