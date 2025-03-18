import { sleep } from '@/common/util'
import { MessageRequestBody } from '@/types/chat'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest){
    const { messages } = (await request.json()) as MessageRequestBody
    const enconder = new TextEncoder()
    const stream = new ReadableStream({
        async start(controller){
            const messageText = messages[messages.length - 1].content
            for await (const chunk of messageText){
                await sleep(100)
                controller.enqueue(enconder.encode(chunk))
            }
            controller.close()
        }
    })
    return new Response(stream)
}