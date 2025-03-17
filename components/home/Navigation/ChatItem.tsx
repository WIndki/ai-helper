import { Chat } from "@/types/chat"
import { PiChatBold, PiTrashBold, PiPenBold } from "react-icons/pi"
import { AiOutlineEdit } from "react-icons/ai"
import { MdCheck, MdClose, MdDeleteOutline} from "react-icons/md"
import { useEffect, useState } from "react"

export default function ChatItem( { item, selected, onSelect } : { item: Chat, selected: boolean ,onSelect: (chat: Chat) => void } ) {
    const [editing, setEditing] = useState(false)
    const [Deleting, setDeleting] = useState(false)
    useEffect(() => {
        setEditing(false)
        setDeleting(false)
    }, [selected])
    return (
        <li
            key={item.id}
            className={`group flex items-center p-3 mt-1 mb-1 space-x-3 cursor-pointer rounded-md hover:bg-gray-800 ${selected ? "bg-gray-800" : ""} `}
            onClick={() => onSelect(item)}>
            <div>
                {Deleting ? <PiTrashBold /> : editing ? <PiPenBold /> : <PiChatBold />}
            </div>
            {editing
                ? (<input className="flex-1 min-w-0 bg-transparent outline-none" defaultValue={item.title} />)
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
                                        console.log("delete", item.id)
                                    } else if (editing) {
                                        console.log("edit", item.id)
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