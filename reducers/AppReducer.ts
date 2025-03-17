export type State = {
    displayNavigation: boolean;
    themeMode: "dark" | "light";
    selectedModelId: string;
    showAllExamples: boolean;
}

export enum ActionType {
    UPDATE = "UPDATE"
}

type UpdateAction = {
    type: ActionType.UPDATE;
    field: string
    value: any
}

export type Action = UpdateAction

export const initState: State = {
    displayNavigation: true,
    themeMode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light",
    selectedModelId: "gpt-3.5-turbo",
    showAllExamples: false
}


export function reducer(state: State, action: Action){
    switch (action.type) {
        case ActionType.UPDATE:
            return {
                ...state,
                [action.field]: action.value
            }
        default:
            throw new Error("Invalid action type")
    }
}