import { useEffect, useMemo, useRef, useState } from "react";
import { Chat } from "../../../types/chat";
import { groupByDate } from "@/common/util";
import ChatItem from "./ChatItem";
import { useEventContext } from "@/components/EventBusContext";
import { useAppContext } from "@/components/AppContext";
import { ActionType } from "@/reducers/AppReducer";
import { userAgent } from "next/server";

export default function ChatList() {
    const [chatList, setChatList] = useState<Chat[]>([])
    const pageRef = useRef(1)
    const groupList = useMemo(() => {
        return groupByDate(chatList)
    }, [chatList])
    const { subscribe, unsubscribe } = useEventContext()
    const { state: { selectedChat }, dispatch } = useAppContext()
    const loadMoreRef = useRef(null)
    const hasMoreRef = useRef(false)
    const loadingRef = useRef(false)

    async function getData() {
        if (loadingRef.current) return
        loadingRef.current = true
        const response = await fetch(`/api/chat/list?page=${pageRef.current}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!response.ok) {
            console.error("Failed to fetch data")
            loadingRef.current = false
            return
        }
        const {data} = await response.json()
        hasMoreRef.current = data.hasMore
        if (pageRef.current === 1) {
            setChatList(data.list)
        } else {
            setChatList((list) => list.concat(data.list))
        }
        pageRef.current++
        loadingRef.current = false
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        const callback: EventListener = () => {
            pageRef.current = 1
            getData()
        }
        subscribe("chat-select", callback)
        return () => {
            unsubscribe("chat-select", callback)
        }
    }, [])

    useEffect(() => {
        let observer: IntersectionObserver | null = null
        let div = loadMoreRef.current
        if (div) {
            observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMoreRef.current) {
                    getData()
                }
            })
            observer.observe(div)
        }
        return () => {
            if (observer && div) {
                observer.unobserve(div)
            }
        }
    }, [])

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
                                                        dispatch({type: ActionType.UPDATE, field: "selectedChat", value: chat})
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
            <div ref={loadMoreRef}>&nbsp;</div>
        </div>
    )
}