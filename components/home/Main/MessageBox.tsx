import Markdown from "@/components/common/Markdown"
import { Message } from "@/types/chat"

export default function MessageBox({ item }: { item: Message }) {
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
                className={`max-w-[80%] m-2 p-4 relative ${
                    item.role === "user" 
                        ? "bg-blue-800 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-sm" 
                        : "bg-gray-100 dark:bg-gray-900 dark:text-gray-300 rounded-tr-lg rounded-bl-sm rounded-br-lg rounded-tl-lg"
                }`}
            >
                <Markdown>{item.content}</Markdown>
                <button
                    onClick={() => navigator.clipboard.writeText(item.content)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Copy message"
                >
                    <></>
                </button>
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