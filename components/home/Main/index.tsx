import { useAppContext } from '@/components/AppContext'
import ChatInput from './ChatInput'
import Menu from './Menu'
import MessageList from './MessageList'
import Welcome from './WelcomePage/Welcome'

export default function Main() {
    const { state: { selectedChat } } = useAppContext()

    return(
        <div className='relative flex-1'>
            <main className="overflow-y-auto w-full h-full bg-gray-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">
                <Menu />
                { !selectedChat ? <Welcome /> : null }
                <MessageList />
                <ChatInput />
            </main>
        </div>
    )

}