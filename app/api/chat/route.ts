import { Message, MessageRequestBody } from '@/types/chat'
import { NextRequest } from 'next/server'
import openai from '@/lib/openai'

export async function POST(request: NextRequest){
    const { messages, model } = (await request.json()) as MessageRequestBody
    const createOpenAIStream = async (messages: Message[], model: string) => {
        const stream = new ReadableStream({
            async start(controller) {
                const completion = await openai.chat.completions.create({
                    model: model,
                    messages: [
                        {"role": "system", "content": "You are a helpful assistant.Respond using markdown."},
                        ...messages,
                    ],
                    stream: true,
                });
                let first = false;
                let isAnswer = false;
                for await (const chunk of completion) {
                    const delta = chunk.choices[0].delta;
                    if (delta.reasoning_content) {
                        if (!first) {
                            first = !first;
                            controller.enqueue("<think>")
                        }
                        controller.enqueue(delta.reasoning_content);
                    } else if (delta.content) {
                        if (first && !isAnswer) {
                            isAnswer = !isAnswer;
                            controller.enqueue("</think>")
                        }
                        controller.enqueue(delta.content);
                    }
                }
                controller.close();
            }
        });
        return stream;
    };
    const stream = await createOpenAIStream(messages, model);
    return new Response(stream)
}