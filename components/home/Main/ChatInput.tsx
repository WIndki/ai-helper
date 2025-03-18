import Button from "@/components/common/Button";
import { FiSend } from "react-icons/fi";
import { MdRefresh } from "react-icons/md";
import { PiLightningFill, PiStopBold } from "react-icons/pi";
import TextareaAutoSize from "react-textarea-autosize";
import Footer from "./Footer/Footer";
import { useEffect, useRef, useState } from "react";
import { Message, MessageRequestBody } from "@/types/chat";
import { useAppContext } from "@/components/AppContext";
import { ActionType } from "@/reducers/AppReducer";
import { useEventContext } from "@/components/EventBusContext";

export default function ChatInput() {
    const [messageText, setMessageText] = useState('')
    const stopRef = useRef(false)
    const chatIdRef = useRef('')
    const { state: { messageList, selectedModelId, streamingId, selectedChat }, dispatch } = useAppContext()
    const { publish } = useEventContext()

    useEffect(() => {
        if (selectedChat?.id === chatIdRef.current) return
        chatIdRef.current = selectedChat?.id ?? ""
        stopRef.current = true
        setMessageText('')
    }, [selectedChat])

    async function createOrUpdateMessage(message: Message) {
        const response = await fetch('/api/message/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        })
        if (!response.ok || !response.body) {
            console.error(response.statusText)
            return
        }
        const { data } = await response.json()
        if (!chatIdRef.current) {
            chatIdRef.current = data.message.chatId
            publish("chat-select")
            dispatch({ type: ActionType.UPDATE, field: 'selectedChat', value: { id: chatIdRef.current } })
        }
        return data.message
    }

    async function deleteMessage(id: string) {
        const response = await fetch(`/api/message/delete?id=${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (!response.ok || !response.body) {
            console.error(response.statusText)
            return
        }
        const { code } = await response.json()
        return code === 0
    }

    async function reSendMessage() {
        const lastMessage: Message = messageList.filter((m) => { return m.role === "user" }).slice(-1)[0]
        if (!lastMessage) return
        setMessageText(lastMessage.content)
    }

    async function sendMessage() {
        stopRef.current = false
        const message = await createOrUpdateMessage({
            id: "",
            role: "user",
            content: messageText,
            chatId: chatIdRef.current
        })
        const messages = messageList.concat([message])
        const body: MessageRequestBody = {
            messages, model: selectedModelId
        }
        dispatch({ type: ActionType.ADD_MESSAGE, message })
        setMessageText('')
        const controller = new AbortController()
        if (!messageText) return
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            signal: controller.signal,
            body: JSON.stringify(body)
        })
        if (!response.ok || !response.body) {
            console.error(response.statusText)
            return
        }
        const responseMessage: Message = await createOrUpdateMessage({
            id: '',
            role: "assistant",
            content: '',
            chatId: chatIdRef.current
        })
        dispatch({ type: ActionType.ADD_MESSAGE, message: responseMessage })
        dispatch({ type: ActionType.UPDATE, field: 'streamingId', value: responseMessage.id })
        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let done = false
        let content = ''
        while (!done) {
            if (stopRef.current) {
                controller.abort()
                break
            }
            const result = await reader.read()
            done = result.done
            const chunk = decoder.decode(result.value, { stream: !done })
            content += chunk
            dispatch({ type: ActionType.UPDATE_MESSAGE, message: { ...responseMessage, content } })
        }
        createOrUpdateMessage({ ...responseMessage, content })
        dispatch({ type: ActionType.UPDATE, field: 'streamingId', value: '' })
    }

    return (
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-b from-[rgba(255,255,255,0)] from-[13.94%] to-[#fff] to-[54.73%] pt-10 dark:from-[rgba(53,55,64,0)] dark:to-[#353740] dark:to-[58.85%]">
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center px-4 space-y-4">
                {messageList.length > 0 &&
                    (streamingId !== '' ? (
                        <Button icon={PiStopBold} className="font-medium" variant="primary" onClick={() => stopRef.current = true}>
                            停止生成
                        </Button>
                    ) : (
                        <Button icon={MdRefresh} className="font-medium" variant="primary" onClick={reSendMessage}>
                            重新开始
                        </Button>

                    ))}
                <div className="flex items-end w-full border border-black/10 dark:border-gray-800/50 bg-white dark:bg-gray-700 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)] py-4">
                    <div className="mx-3 mb-2.5 ">
                        <PiLightningFill />
                    </div>
                    <TextareaAutoSize className="outline-none flex-1 max-h-64 mb-1.5 bg-transparent text-black dark:text-white resize-none border-0" placeholder="输入一条消息..." rows={1} value={messageText} onChange={(e) => { setMessageText(e.target.value) }} />
                    <Button className="mx-3 !rounded-lg" icon={FiSend} variant="primary" onClick={sendMessage} disabled={messageText.trim() === "" || streamingId !== ''}></Button>
                </div>
                <Footer />
            </div>
        </div>
    )
}


