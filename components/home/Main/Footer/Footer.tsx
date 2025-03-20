export default function Footer() {
    return (
        <footer className="w-full max-w-4xl mx-auto flex flex-col items-center px-4 pb-2 ">
            <div className="flex items-center space-x-4">
                <a href="https://www.windki.com" target="_blank" rel="noreferrer" className="animated-underline text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                    首页
                </a>
                <span className="text-gray-500 dark:text-gray-400">•</span>
                <a href="https://www.windki.com" target="_blank" rel="noreferrer" className="animated-underline text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                    关于
                </a>
                <span className="text-gray-500 dark:text-gray-400">•</span>
                <a className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 animated-underline">
                    © 2025 Windki
                </a>
            </div>
        </footer>
    )
}