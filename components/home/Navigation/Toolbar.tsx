import Button from "../../common/Button"
import { MdLightMode, MdDarkMode, MdInfo } from "react-icons/md"
import { HiPlus } from "react-icons/hi"
import { useAppContext } from "../../AppContext"
import { ActionType } from "@/reducers/AppReducer"

export default function Navigation() {
    const { state: {themeMode}, dispatch } = useAppContext()
    return (
        <div className="absolute bottom-0 left-0 right-0 justify-between bg-gray-800 flex">
            <Button
                icon={themeMode === "dark" ? MdDarkMode : MdLightMode}
                variant="text"
                className=""
                onClick={() => {
                    dispatch({
                        type: ActionType.UPDATE,
                        field: "themeMode",
                        value: themeMode === "dark" ? "light" : "dark"
                    })
                }}
            >
            </Button>
            <Button
                icon={MdInfo}
                variant="text"
            >
            </Button>
        </div>
    )
}