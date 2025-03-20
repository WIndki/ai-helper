import { memo } from "react"
import ReactMarkdown, { Options } from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import rehypeRaw from 'rehype-raw'
import ThinkWrapper from './ThinkWrapper'

function Markdown({ children, className = "", ...props }: Options & {className?: string}) {
    // 预处理内容，确保<think>标签内容被正确处理
    let processedContent = children;
    if (typeof children === 'string') {
        // 首先处理正常的<think></think>对
        processedContent = children.replace(
            /<think>([\s\S]*?)<\/think>/g, 
            (match, content) => `<div class="think-wrapper">${content}</div>`
        );
        // 处理只有开始标签<think>但没有结束标签的情况
        // 如果处理后的内容中仍然存在<think>标签，则将其后面的所有内容包装到think-wrapper中
        if (processedContent.includes('<think>')) {
            processedContent = processedContent.replace(
                /<think>([\s\S]*)/g,
                (match, content) => `<div class="think-wrapper">${content}</div>`
            );
        }
    }

    return (
        <div className={`markdown prose dark:prose-invert ${className}`}>
        <ReactMarkdown
            components={{
                code({ node, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "")
                    return match ? (
                        <SyntaxHighlighter
                            style={a11yDark}
                            language={match?.[1] ?? ""}
                            PreTag='div'
                        >
                            {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                    ) : (
                        <code
                            {...props}
                            className={className}
                        >
                            {children}
                        </code>
                    )
                },
                div: ({ node, className, children, ...props }) => {
                    if (className === 'think-wrapper') {
                        return <ThinkWrapper>{children}</ThinkWrapper>;
                    }
                    return <div className={className} {...props}>{children}</div>;
                }
            }}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            {...props}
        >
            {processedContent}
        </ReactMarkdown>
        </div>
    )
}

export default memo(Markdown)