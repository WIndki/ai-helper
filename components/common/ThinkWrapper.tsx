import { useState } from "react";
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { useAppContext  } from "../AppContext";
import { ActionType } from "@/reducers/AppReducer";

interface ThinkWrapperProps {
    children: React.ReactNode;
}

const ThinkWrapper = ({ children }: ThinkWrapperProps) => {
    const { state: { isExpanded }, dispatch } = useAppContext();

    return (
        <div className="my-4 border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700 overflow-hidden min-w-[300px]">
            <div
                className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-700 cursor-pointer"
                onClick={() => dispatch({ type: ActionType.UPDATE, field: 'isExpanded', value: !isExpanded })}
            >
                <h3 className="text-base font-medium m-0">思考过程</h3>
                {isExpanded ?
                    <FiChevronDown className="text-gray-600 dark:text-gray-300" /> : 
                    <FiChevronRight className="text-gray-600 dark:text-gray-300" />
                }
            </div>
            <div className={`transition-all duration-200 ${isExpanded ? 'block p-4' : 'hidden'}`}>
                {children}
            </div>
        </div>
    );
};

export default ThinkWrapper;
