"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect, MouseEvent } from "react";

export type BubbleProps = {
    id: number;
    text: string;
    sender: "user" | "bot";
    timestamp?: string;
    onAction?: (action: string, messageId: number) => void;
    // Replace animateTyping with isNewMessage
    isNewMessage?: boolean;
};

const Bubble: React.FC<BubbleProps> = ({
                                           id,
                                           text,
                                           sender,
                                           timestamp,
                                           onAction,
                                           // By default, messages are not new and won't animate
                                           isNewMessage = false,
                                       }) => {
    const [open, setOpen] = useState(false);
    const [displayedText, setDisplayedText] = useState(
        isNewMessage && sender === "bot" ? "" : text
    );
    const [isTyping, setIsTyping] = useState(isNewMessage && sender === "bot");
    const [animationComplete, setAnimationComplete] = useState(!isNewMessage);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // Typing animation effect
    useEffect(() => {
        // Only animate for bot messages that are new
        if (sender === "bot" && isNewMessage && !animationComplete) {
            setIsTyping(true);
            setDisplayedText("");

            const typingSpeed = 15; // milliseconds per character
            let currentIndex = 0;

            const typingInterval = setInterval(() => {
                if (currentIndex < text.length) {
                    setDisplayedText((prev) => prev + text.charAt(currentIndex));
                    currentIndex++;
                } else {
                    clearInterval(typingInterval);
                    setIsTyping(false);
                    setAnimationComplete(true);
                }
            }, typingSpeed);

            return () => clearInterval(typingInterval);
        } else if (!isNewMessage) {
            // For existing messages, just show the text immediately
            setDisplayedText(text);
            setIsTyping(false);
        }
    }, [text, sender, isNewMessage, animationComplete]);

    // Toggle dropdown visibility
    const toggleDropdown = () => setOpen((prev) => !prev);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent<Document>) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside as any);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside as any);
    }, []);

    const isUser = sender === "user";
    const containerClasses = isUser
        ? "justify-end flex-row-reverse"
        : "justify-start";
    const bubbleBg = isUser
        ? "bg-indigo-500 text-white"
        : "bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-white";

    const actions = ["Reply", "Forward", "Copy", "Report", "Delete"];

    const handleAction = (action: string) => {
        setOpen(false);
        onAction?.(action, id);
    };

    return (
        <div
            role="listitem"
            aria-label={`${sender === "user" ? "You" : "Assistant"} said: ${text}`}
            className={`relative flex ${containerClasses} items-start gap-2.5 my-2`}
        >
            <Image
                src={isUser ? "/images/user.png" : "/images/logo.png"}
                alt={sender === "user" ? "Your avatar" : "Assistant avatar"}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
            />

            <div
                role="group"
                aria-label="chat bubble"
                className={`flex flex-col max-w-[320px] leading-6 p-4 rounded-2xl ${bubbleBg}`}
            >
                <div className="flex items-center justify-between mb-1">
                    {timestamp && <time className="text-xs opacity-70">{timestamp}</time>}
                    <button
                        onClick={toggleDropdown}
                        aria-haspopup="menu"
                        aria-expanded={open}
                        className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 focus:outline-none"
                    >
                        <svg
                            className="w-4 h-4 opacity-70"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 4 15"
                        >
                            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                        </svg>
                    </button>
                </div>

                <div className="text-sm break-words">
                    {displayedText}
                    {isTyping && (
                        <span className="typing-indicator ml-1 inline-flex">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </span>
                    )}
                </div>

                <div
                    ref={dropdownRef}
                    role="menu"
                    aria-label="Message options"
                    className={`z-10 absolute top-0 ${
                        isUser ? "right-0" : "left-0"
                    } mt-8 w-40 bg-white divide-y divide-slate-100 rounded-lg shadow-sm
            dark:bg-slate-700 dark:divide-slate-600 ${open ? "" : "hidden"}`}
                >
                    <ul className="py-2 text-sm text-slate-700 dark:text-slate-200">
                        {actions.map((action) => (
                            <li key={action}>
                                <button
                                    role="menuitem"
                                    onClick={() => handleAction(action)}
                                    className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:text-white"
                                >
                                    {action}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Bubble;