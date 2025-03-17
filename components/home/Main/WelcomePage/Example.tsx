import { MdOutlineTipsAndUpdates, MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import examples from "@/data/examples.json";
import Button from "@/components/common/Button";
import { useAppContext } from "@/components/AppContext";
import { ActionType } from "@/reducers/AppReducer";
import { motion, AnimatePresence } from "framer-motion";

export default function Example() {
    const { state: { showAllExamples }, dispatch } = useAppContext()
    return (
        <>
            <div className="mt-20 mb-4 text-4xl">
                <MdOutlineTipsAndUpdates />
            </div>
            <motion.ul
                className="flex justify-center flex-wrap gap-3.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
            >
                <AnimatePresence initial={false}>
                    {
                        examples.map((item, index) => {
                            if (!showAllExamples && index >= 5) return null;
                            return (
                                <motion.li
                                    key={item.act}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.3, delay: index * 0.02 }}
                                >
                                    <Button className="bg-gray-300 hover:bg-gray-500 hover:font-bold dark:bg-gray-700 dark:hover:bg-gray-600">
                                        {item.act}
                                    </Button>
                                </motion.li>
                            )
                        })
                    }
                </AnimatePresence>
            </motion.ul>
            <motion.div
                className="mt-3 flex items-center w-full space-x-2"
                layout  // 添加布局动画，使其跟随上面元素的变化
                initial={false}  // 初始不需要动画，只在后续更新时使用
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                    mass: 1
                }}
            >
                <hr className="flex-1 border-t border-dotted border-gray-200 dark:border-gray-600" />
                <Button className="flex-col" variant="text"
                    onClick={() => dispatch({ type: ActionType.UPDATE, field: "showAllExamples", value: !showAllExamples })}
                >
                    {showAllExamples ? <MdKeyboardArrowUp className="text-3xl" /> : <MdKeyboardArrowDown className="text-3xl" />}
                </Button>
                <hr className="flex-1 border-t border-dotted border-gray-200 dark:border-gray-600" />
            </motion.div>
        </>
    )
}