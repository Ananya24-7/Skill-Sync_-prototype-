import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { ChatBubbleIcon, CloseIcon, SendIcon } from './icons/Icons';

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'ai', text: "Hi there! I'm your AI Career Assistant. How can I help you with your career goals today?" }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        // Initialize chat only when the chatbot is opened for the first time
        if (isOpen && !chatRef.current) {
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                chatRef.current = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: 'You are a friendly and helpful AI career assistant for an app called SkillSync. Your goal is to provide concise, actionable career advice, answer questions about job skills, resumes, and interview preparation. Keep your answers helpful and encouraging.',
                    },
                });
            } catch (error) {
                console.error("Failed to initialize chatbot:", error);
                setMessages(prev => [...prev, { sender: 'ai', text: 'Sorry, I am having trouble connecting right now. Please try again later.' }]);
            }
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    
    useEffect(() => {
        if(isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading || !chatRef.current) return;

        const userMessage: Message = { sender: 'user', text: userInput };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = userInput;
        setUserInput('');
        setIsLoading(true);

        try {
            const response = await chatRef.current.sendMessage({ message: currentInput });
            const aiMessage: Message = { sender: 'ai', text: response.text };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage: Message = { sender: 'ai', text: 'Oops! Something went wrong. Please try again.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
            inputRef.current?.focus();
        }
    };

    return (
        <>
            <div
                aria-live="polite"
                aria-atomic="true"
                className={`fixed bottom-24 right-4 sm:right-8 w-[calc(100%-2rem)] max-w-sm h-[70vh] max-h-[600px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out z-50 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
                role="dialog"
                aria-labelledby="chatbot-header"
            >
                {/* Header */}
                <header className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 id="chatbot-header" className="text-lg font-bold">AI Career Assistant</h3>
                    <button onClick={() => setIsOpen(false)} className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600" aria-label="Close chat">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </header>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender === 'ai' && <div className="w-6 h-6 rounded-full bg-primary flex-shrink-0"></div>}
                            <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${msg.sender === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none'}`}>
                                <p style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-end gap-2 justify-start">
                             <div className="w-6 h-6 rounded-full bg-primary flex-shrink-0"></div>
                             <div className="max-w-[80%] rounded-lg px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-bl-none">
                                <div className="flex items-center justify-center space-x-1">
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse"></span>
                                </div>
                             </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Form */}
                <form onSubmit={handleSendMessage} className="p-2 border-t border-gray-200 dark:border-gray-700 flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-b-xl">
                    <input
                        ref={inputRef}
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Ask a question..."
                        disabled={isLoading}
                        className="flex-1 w-full px-3 py-2 text-sm bg-transparent border-none rounded-md focus:outline-none focus:ring-0 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                        aria-label="Your message"
                    />
                    <button type="submit" disabled={isLoading || !userInput.trim()} className="p-2 rounded-full text-white bg-primary hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors" aria-label="Send message">
                        <SendIcon className="w-5 h-5" />
                    </button>
                </form>
            </div>

            {/* FAB */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 sm:right-8 bg-primary hover:bg-primary-dark text-white rounded-full p-3 shadow-lg transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light z-50"
                aria-label={isOpen ? 'Close chat' : 'Open chat assistant'}
            >
                {isOpen ? <CloseIcon className="w-7 h-7" /> : <ChatBubbleIcon className="w-7 h-7" />}
            </button>
        </>
    );
};

export default Chatbot;