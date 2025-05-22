"use client";
import React, { useState, useRef, useEffect } from "react";
import { FcAssistant } from "react-icons/fc";
import { IoClose } from "react-icons/io5";
import { AiOutlineSend } from "react-icons/ai";
import Bubble from "../ui/Bubble";

const apiUrl = process.env.NEXT_PUBLIC_API_URL

type Message = {
    id: number;
    text: string;
    sender: "user" | "bot";
    timestamp?: string;
    delivered?: boolean;
};

interface GeminiRequest {
    prompt: string;
    sessionId?: string;
}

type GeminiResponse = {
    result: string;
    sessionId: string;
};

const Assistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hello! I am CES Assistant, How can I help you today?",
            sender: "bot",
            timestamp: new Date().toLocaleTimeString(),
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [apiStatus, setApiStatus] = useState<"unknown" | "connected" | "error">(
        "unknown"
    );
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // Test API connection when component mounts
    useEffect(() => {
        const testApiConnection = async () => {
            try {
                const apiUrl = getApiUrl();
                console.log(`Testing API connection to: ${apiUrl}`);

                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ prompt: "test connection" }),
                });

                if (response.ok) {
                    console.log("API connection successful");
                    setApiStatus("connected");
                } else {
                    console.error("API connection failed:", response.status);
                    setApiStatus("error");
                }
            } catch (error) {
                console.error("API connection error:", error);
                setApiStatus("error");
            }
        };

        testApiConnection();
    }, []);

    const toggleAssistant = () => {
        setIsOpen((prev) => !prev);
    };

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    // Get API URL from environment or use a fallback
    const getApiUrl = () => {
        // In a Next.js application, we need to use NEXT_PUBLIC_ prefix for client-side env variables
        return `${apiUrl}/gemini`;
    };

    const handleSend = async () => {
        const prompt = inputValue.trim();
        if (!prompt) return;

        // Add user message
        const userMsg: Message = {
            id: Date.now(),
            text: prompt,
            sender: "user",
            timestamp: new Date().toLocaleTimeString(),
            delivered: true,
        };
        setMessages((prev) => [...prev, userMsg]);
        setInputValue("");

        // Call API
        setIsLoading(true);
        try {
            const requestBody: GeminiRequest = { prompt };

            // Include sessionId if we have one from previous interactions
            if (sessionId) {
                requestBody.sessionId = sessionId;
            }

            const apiUrl = getApiUrl();
            console.log(`Sending request to: ${apiUrl}`);

            const res = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Add CORS headers if needed
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(requestBody),
            });

            const data = (await res.json()) as GeminiResponse;

            // Store sessionId for future requests
            if (data.sessionId) {
                setSessionId(data.sessionId);
            }

            const botMsg: Message = {
                id: Date.now() + 1,
                text: data.result || "No response received",
                sender: "bot",
                timestamp: new Date().toLocaleTimeString(),
            };
            setMessages((prev) => [...prev, botMsg]);
        } catch (err) {
            console.error("API error:", err);
            setApiStatus("error");

            let errorMessage = "Sorry, something went wrong.";

            // Provide more specific error messages
            if (err instanceof TypeError && err.message.includes("fetch")) {
                errorMessage =
                    "Unable to connect to the assistant API. Please check that the API server is running on port " +
                    (apiUrl) + ".";
            } else if (err instanceof Error) {
                errorMessage = `Error: ${err.message}`;
            }

            const errorMsg: Message = {
                id: Date.now() + 2,
                text: errorMessage,
                sender: "bot",
                timestamp: new Date().toLocaleTimeString(),
            };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            <button
                onClick={toggleAssistant}
                aria-label="Toggle Assistant"
                className="fixed bottom-0 right-0 z-50 m-4 flex items-center justify-center gap-1 p-4 rounded-2xl border-2 border-slate-500 shadow-2xl shadow-slate-700/30 cursor-pointer bg-gradient-to-r from-slate-500 to-slate-700 text-slate-100 transition-transform duration-300 hover:scale-110"
            >
                {isOpen ? <IoClose size={24} /> : <FcAssistant size={24} />}
                <h2 className="hidden md:block">{isOpen ? "Close" : "Assistant"}</h2>
            </button>

            {isOpen && (
                <div className="fixed bottom-0 right-0 z-50 m-4 w-[9  0vw] md:w-[460px] h-[600px] flex flex-col bg-white border border-slate-200 rounded-2xl shadow-xl">
                    <div className="flex justify-between items-center p-4 border-b border-slate-200">
                        <div className="flex items-center">
                            <h3 className="font-medium">CES BOT</h3>
                            {apiStatus === "connected" && (
                                <span
                                    className="ml-2 inline-block w-2 h-2 bg-green-500 rounded-full"
                                    title="API Connected"
                                ></span>
                            )}
                            {apiStatus === "error" && (
                                <span
                                    className="ml-2 inline-block w-2 h-2 bg-red-500 rounded-full"
                                    title="API Connection Error"
                                ></span>
                            )}
                            {apiStatus === "unknown" && (
                                <span
                                    className="ml-2 inline-block w-2 h-2 bg-yellow-500 rounded-full"
                                    title="Checking API Connection..."
                                ></span>
                            )}
                        </div>
                        <IoClose
                            size={24}
                            className="cursor-pointer text-black"
                            onClick={toggleAssistant}
                        />
                    </div>

                    {/* Message List */}
                    <div className="flex-1 px-4 py-2 overflow-y-auto space-y-2">
                        {messages.map((msg) => (
                            <Bubble
                                key={msg.id}
                                text={msg.text}
                                sender={msg.sender}
                                timestamp={msg.timestamp}
                                id={msg.id}
                            />
                        ))}
                        {isLoading && (
                            <div className="text-sm italic text-slate-500 my-2">
                                Assistant is thinking...
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="flex items-center p-4 border-t border-slate-300">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask me anything..."
                            className="flex-1 text-sm font-medium p-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-300"
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading}
                            className={`p-3 ml-2 rounded-full ${
                                isLoading ? "bg-slate-300" : "bg-indigo-500 hover:bg-indigo-600"
                            } text-white`}
                        >
                            <AiOutlineSend size={20} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Assistant;
