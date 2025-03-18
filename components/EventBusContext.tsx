"use client"
import { Dispatch, createContext, useCallback, useContext, useMemo, useState } from "react"
// type State = {
//     displayNavigation: boolean
//     themeMode: "light" | "dark"
// }

export type EventListener = (data?: any) => void

type EventContextProps = {
    subscribe: (event: string, callback: EventListener) => void
    unsubscribe: (event: string, callback: EventListener) => void
    publish: (event: string, data?: any) => void
}

const EventContext = createContext<EventContextProps>(null!)

export function useEventContext() {
    return useContext(EventContext)
}

export default function EventContextProvider({children}: {children: React.ReactNode}) {
    const [listeners, setListeners] = useState<Record<string, EventListener[]>>({})
    const subscribe = useCallback((event: string, callback: EventListener) => {
        if (!listeners[event]) {
            listeners[event] = []
        }
        listeners[event].push(callback)
        setListeners({...listeners})
    },[listeners])
    const unsubscribe = useCallback((event: string, callback: EventListener) => {
        if (!listeners[event]) return
        listeners[event] = listeners[event].filter((cb) => cb !== callback)
        setListeners({...listeners})
    },[listeners])

    const publish = useCallback((event: string, data?: any) => {
        if (!listeners[event]) return
        listeners[event].forEach((cb) => cb(data))
    },[listeners])

    const contextValue = useMemo(() => {
            return { subscribe , unsubscribe, publish }
    }, [subscribe, unsubscribe, publish])

    return (
        <EventContext.Provider value={contextValue}>
            {children}
        </EventContext.Provider>
    )
}