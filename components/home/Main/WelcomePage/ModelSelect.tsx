import { fetchAvailableModel } from "@/common/fetchAvailableModel"
import { useAppContext } from "@/components/AppContext"
import { ActionType } from "@/reducers/AppReducer"
import { use, useEffect, useState } from "react"
import { PiLightning, PiShootingStarFill } from "react-icons/pi"

export default function ModelSelect() {
    const models = [
        {
            id: "qwen-plus",
            name: "通义千问",
            icon: PiLightning
        },
        {
            id: "deepseek-r1",
            name: "DeepSeek R1",
            icon: PiShootingStarFill
        }
    ]
    const { state: { selectedModelId }, dispatch } = useAppContext()
    // const [modelList, setModelList] = useState<{id : string}[]>([])
    // async function fetchAvailableModel() {
    //     const response = await fetch('/api/model/list')
    //     if (!response.ok || !response.body) {
    //         console.error(response.statusText)
    //         return
    //     }
    //     const { body } = await response.json()
    //     setModelList(body.data.map((item: { id: string }) => item.id))
    // }
    // useEffect(() => {
    //     fetchAvailableModel()
    // }, [])
    // console.log(modelList)
    return (
        <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-xl">
            {
                models.map((item) => {
                    const isActive = selectedModelId === item.id
                    const Icon = item.icon
                    return (
                        <button key={item.id} className={` ${isActive
                                ? "border-gray-200 bg-white text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                                : "border-transparent text-gray-500"
                            }
                            flex items-center justify-center p-1 min-w-[150px] text-sm font-medium rounded-lg border-2 group hover:bg-gray-300 hover:border-gray-200 dark:hover:bg-gray-800 dark:hover:border-gray-600`}
                            onClick={() => dispatch({ type: ActionType.UPDATE, field: "selectedModelId", value: item.id })}
                        >
                            <span className={`group-hover:text-[#26cf8] transition-colors duration-100 ${isActive ? "text-[#26cf8e]" : ""}`}>
                                <Icon className="w-6 h-6" />
                            </span>
                            <span className="ml-2 transition-colors duration-100">{item.name}</span>
                        </button>
                    )
                })
            }
        </div>
    )
}
