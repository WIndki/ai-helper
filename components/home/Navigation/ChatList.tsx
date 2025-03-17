import { useMemo, useState } from "react";
import { Chat } from "../../../types/chat";
import { groupByDate } from "@/common/util";
import ChatItem from "./ChatItem";

export default function ChatList() {
    const [chatList, setChatList] = useState<Chat[]>([
        {
            id: "1",
            title: "React入门实战教程",
            updateTime: Date.now()
        },
        {
            id: "2",
            title: "如何使用Next.js创建React项目",
            updateTime: Date.now() + 1
        },
        {
            id: "3",
            title: "知行小课",
            updateTime: Date.now() + 2
        },
        {
            id: "1",
            title: "React入门实战教程",
            updateTime: Date.now()
        },
        {
            id: "2",
            title: "如何使用Next.js创建React项目",
            updateTime: Date.now() + 1
        },
        {
            id: "3",
            title: "知行小课",
            updateTime: Date.now() + 2
        },
        {
            id: "1",
            title: "React入门实战教程",
            updateTime: Date.now()
        },
        {
            id: "2",
            title: "如何使用Next.js创建React项目",
            updateTime: Date.now() + 1
        },
        {
            id: "3",
            title: "知行小课",
            updateTime: Date.now() + 2
        },
        {
            id: "1",
            title: "React入门实战教程",
            updateTime: Date.now()
        },
        {
            id: "2",
            title: "如何使用Next.js创建React项目",
            updateTime: Date.now() + 1
        },
        {
            id: "3",
            title: "知行小课",
            updateTime: Date.now() + 2
        },
        {
            id: "1",
            title: "React入门实战教程",
            updateTime: Date.now()
        },
        {
            id: "2",
            title: "如何使用Next.js创建React项目",
            updateTime: Date.now() + 1
        },
        {
            id: "3",
            title: "知行小课",
            updateTime: Date.now() + 2
        },
        {
            id: "1",
            title: "React入门实战教程",
            updateTime: Date.now()
        },
        {
            id: "2",
            title: "如何使用Next.js创建React项目",
            updateTime: Date.now() + 1
        },
        {
            id: "3",
            title: "知行小课",
            updateTime: Date.now() + 2
        },
        {
            id: "1",
            title: "React入门实战教程",
            updateTime: Date.now()
        },
        {
            id: "2",
            title: "如何使用Next.js创建React项目",
            updateTime: Date.now() + 1
        },
        {
            id: "3",
            title: "知行小课",
            updateTime: Date.now() + 2
        },
        {
            id: "1",
            title: "React入门实战教程",
            updateTime: Date.now()
        },
        {
            id: "2",
            title: "如何使用Next.js创建React项目",
            updateTime: Date.now() + 1
        },
        {
            id: "3",
            title: "知行小课",
            updateTime: Date.now() + 2
        }
    ])
    const groupList = useMemo(() => {
        return groupByDate(chatList)
    }, [chatList])
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
    return (
        <div className="flex-1 mt-2 flex flex-col overflow-y-auto mb-[38px]">
            {
                groupList.map(([date, list]) => {
                    return (
                        <div key={date} className="mt-2">
                            <div className="sticky top-0 z-10 p-3 text-sm bg-gray-900 text-gray-500">{date}</div>
                            <ul>
                                {
                                    list.map((item) => {
                                        const selected = selectedChat?.id === item.id
                                        return (
                                            <ChatItem
                                                key={item.id}
                                                item={item}
                                                selected={selected}
                                                onSelect={(chat) => {
                                                    setSelectedChat(chat)
                                                }}
                                            />
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    )
                }).reverse()
            }
        </div>
    )
}