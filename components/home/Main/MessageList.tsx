import { useAppContext } from "@/components/AppContext"
import MessageBox from "./MessageBox"
import { Chat } from "@/types/chat"
import { ActionType } from "@/reducers/AppReducer"
import { use, useEffect } from "react"

export default function MessageList() {
    const { state: { messageList, selectedChat }, dispatch } = useAppContext()
    async function getData(chatId: Chat["id"]) {
        const response = await fetch(`/api/message/list?chatId=${chatId}`, {
            method: "GET",
        })
        if (!response.ok) {
            console.error("Failed to fetch data")
            return
        }
        const { data } = await response.json()
        dispatch({ type: ActionType.UPDATE, field: "messageList", value: data.list })
    }

    useEffect(() => {
        if (selectedChat) {
            getData(selectedChat.id)
        } else {
            dispatch({ type: ActionType.UPDATE, field: "messageList", value: [] })
        }
    }, [selectedChat])

    return (
        <div className="w-full pt-10 pb-48 dark:text-gray-300">

            <ul>
                {messageList.map((message) => {
                    return (
                        <li key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}>
                            <MessageBox item={message} />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}