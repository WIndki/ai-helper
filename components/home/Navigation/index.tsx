"use client";
import { useAppContext }  from '../../AppContext'
import Menubar from './Menubar'
import Toolbar from './Toolbar';
import ChatList from './ChatList';

export default function Navigation() {
    const {
        state: { displayNavigation }
    } = useAppContext()
    return (
        <nav className={` flex flex-col relative h-full w-[260px] dark bg-gray-900 text-gray-500 p-2 ${displayNavigation ? '' : 'hidden'}`}>
            <Menubar />
            <ChatList />
            <Toolbar />
        </nav>
    )
}