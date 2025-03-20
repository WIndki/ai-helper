import { Chat } from "@/types/chat"
import { PiChatBold, PiTrashBold, PiPenBold } from "react-icons/pi"
import { AiOutlineEdit } from "react-icons/ai"
import { MdCheck, MdClose, MdDeleteOutline} from "react-icons/md"
import { useEffect, useState } from "react"
import { useEventContext } from "@/components/EventBusContext"
import { useAppContext } from "@/components/AppContext"
import { ActionType } from "@/reducers/AppReducer"

export default function ChatItem( { item, selected, onSelect } : { item: Chat, selected: boolean ,onSelect: (chat: Chat) => void } ) {
    const [editing, setEditing] = useState(false)
    const [Deleting, setDeleting] = useState(false)
    const [title, setTitle] = useState(item.title)
    const { publish } = useEventContext()
    const { state: { selectedChat }, dispatch } = useAppContext()

    useEffect(() => {
        setEditing(false)
        setDeleting(false)
    }, [selected])

    async function updateChat() {
        const response = await fetch(`/api/chat/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: item.id, title: title})
        })
        if (!response.ok) {
            console.error("Failed to update chat")
            return
        }
        const { code } = await response.json()
        if (code === 0) {
            publish("fetchChatList")
        }
    }

    async function deleteChat() {
        const response = await fetch(`/api/chat/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: item.id})
        })
        if (!response.ok) {
            console.error("Failed to delete chat")
            return
        }
        const { code } = await response.json()
        if (code === 0) {
            publish("fetchChatList")
            if (selectedChat?.id === item.id) {
                dispatch({ type: ActionType.UPDATE, field: "messageList", value: [] })
                dispatch({ type: ActionType.UPDATE, field: "selectedChat", value: null })
                console.log("selectedChat", selectedChat)
            }
        }
    }

    return (
        <li
            key={item.id}
            className={`group flex items-center p-3 mt-1 mb-1 space-x-3 cursor-pointer rounded-md hover:bg-gray-800 ${selected ? "bg-gray-800" : ""} `}
            onClick={() => onSelect(item)}>
            <div>
                {Deleting ? <PiTrashBold /> : editing ? <PiPenBold /> : <PiChatBold />}
            </div>
            {editing
                ? (<input className="flex-1 min-w-0 bg-transparent outline-none" autoFocus={true} value={title} onChange={(e) => {
                    setTitle(e.target.value)
                }} />)
                : (<div className="relative flex-1 whitespace-nowrap overflow-hidden">
                    {item.title}
                    <span className={`group-hover:from-gray-800 absolute right-0 inset-y-0 w-8 bg-gradient-to-l ${selected ? "from-gray-800" : "from-gray-900"} `}></span>
                 </div>
                )
            }
            {selected ?
                (<div className="right-0 flex   ">
                    {editing || Deleting
                        ? (<>
                            <button className="p-1 hover:text-white"
                                onClick={(e) => {
                                    if (Deleting) {
                                        deleteChat()
                                    } else if (editing) {
                                        updateChat()
                                    }
                                    setDeleting(false)
                                    setEditing(false)
                                    e.stopPropagation()
                                }}
                            >
                                <MdCheck/>
                            </button>
                            <button className="p-1 hover:text-white"
                                onClick={(e) => {
                                    setDeleting(false)
                                    setEditing(false)
                                    e.stopPropagation()
                                }}
                            >
                                <MdClose/>
                            </button>
                        </>)
                        : (<>
                            <button className="p-1 hover:text-white"
                                onClick={(e) => {
                                    setEditing(true)
                                    e.stopPropagation()
                                }}
                            >
                                <AiOutlineEdit/>
                            </button>
                            <button className="p-1 hover:text-white"
                                onClick={(e) => {
                                    setDeleting(true)
                                    e.stopPropagation()
                                }}
                            >
                                <MdDeleteOutline/>
                            </button>
                        </>)
                    }
                </div>
                )
                : null
            }
        </li>
    )
}