"use client"
import { Dispatch, createContext, useContext, useMemo, useReducer, useState } from "react"
import { Action, State, initState, reducer } from "../reducers/AppReducer"
// type State = {
//     displayNavigation: boolean
//     themeMode: "light" | "dark"
// }

type AppContextProps = {
    state: State
    dispatch: Dispatch<Action>
}

const AppContext = createContext<AppContextProps>(null!)

export function useAppContext() {
    return useContext(AppContext)
}

export default function AppContextProvider({children}: {children: React.ReactNode}) {
    const [state, dispatch] = useReducer(reducer, initState)
    const contextValue = useMemo(() => {
            return {state, dispatch}
    }, [state, dispatch])
    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}