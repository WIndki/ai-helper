import { useAppContext } from "@/components/AppContext"
import Markdown from "@/components/common/Markdown"
import { ActionType } from "@/reducers/AppReducer"
import { Message } from "@/types/chat"
import { useState } from "react"
import { MdCopyAll, MdDelete } from "react-icons/md"

export default function MessageBox({ item }: { item: Message }) {
    const { state: { streamingId }, dispatch } = useAppContext()
    const [hover, setHover] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(item.content)
    }

    async function deleteMessage() {
        dispatch({ type: ActionType.REMOVE_MESSAGE, message: item })
        const response = await fetch(`/api/message/delete?id=${item.id}`, {
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

    return (
        <div className={`flex ${item.role === "user" ? "justify-end" : "justify-start"} relative group`}>
            {item.role === "assistant" && (
                <div className="flex h-full items-end ml-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-sm dark:text-gray-300">AI</span>
                    </div>
                </div>
            )}
            <div
                className={`max-w-[80%]  m-2 p-4 relative ${
                    item.role === "user"
                        ? "bg-gray-300 dark:bg-blue-500 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-sm" 
                        : "bg-gray-400 dark:bg-gray-900 dark:text-gray-300 rounded-tr-lg rounded-bl-sm rounded-br-lg rounded-tl-lg"
                }`}
                onMouseEnter={hover ? undefined : () => setHover(true)}
                onMouseLeave={hover ? () => setHover(false) : undefined}
            >
                <Markdown>{`${item.content}${
                    item.id === streamingId ? "▍" : ""
                }`}</Markdown>
                {hover && (
                    <div className="absolute top-[-15px] right-[-25px] flex space-x-2 p-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                        <button
                            onClick={handleCopy}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            aria-label="复制消息"
                        >
                            <MdCopyAll />
                        </button>
                        <button
                            onClick={() => deleteMessage() }
                            className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                            aria-label="删除消息"
                        >
                            <MdDelete />
                        </button>
                    </div>
                )}
            </div>
            {item.role === "user" && (
                <div className="flex h-full items-end mr-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-sm dark:text-gray-300">You</span>
                    </div>
                </div>
            )}
        </div>
    )
}