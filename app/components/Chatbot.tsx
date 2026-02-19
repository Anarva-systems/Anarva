"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, User, Bot, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import chatbotData from "./chatbotData.json";

// Types
type Message = {
    id: string;
    role: "user" | "bot";
    content: string;
    options?: string[]; // Quick replies
};

type LeadState = {
    active: boolean;
    step: "name" | "email" | "phone" | "company" | "projectType" | "budget" | "details" | "done";
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    projectType?: string;
    budget?: string;
};

const PROJECT_TYPES = ["Web Design", "Web App", "Mobile App", "Custom Dev", "AI / ML", "Other"];
const BUDGET_RANGES = ["$0 - $5k", "$5k - $10k", "$10k - $25k", "$25k - $50k", "$50k+", "Undisclosed"];

// Response matching engine
type CategoryData = {
    keywords: string[];
    responses: string[];
    options: string[];
};

const data = chatbotData as Record<string, CategoryData>;

function findBestMatch(input: string): CategoryData {
    const lower = input.toLowerCase().trim();
    let bestCategory: string | null = null;
    let bestScore = 0;

    for (const [category, catData] of Object.entries(data)) {
        if (category === "fallback") continue;
        for (const keyword of catData.keywords) {
            const kw = keyword.toLowerCase();
            if (lower === kw) return catData; // Exact match = instant win
            if (lower.includes(kw)) {
                const score = kw.length;
                if (score > bestScore) {
                    bestScore = score;
                    bestCategory = category;
                }
            }
        }
    }
    return bestCategory ? data[bestCategory] : data.fallback;
}

function pickRandom(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)];
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [leadState, setLeadState] = useState<LeadState>({ active: false, step: "name" });
    const [hasGreeted, setHasGreeted] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    // Initial Greeting
    useEffect(() => {
        if (isOpen && !hasGreeted) {
            setIsTyping(true);
            setTimeout(() => {
                addBotMessage("Greetings, traveler. Welcome to ANARVA. How can we help you defy gravity today?", [
                    "Our Services",
                    "View Our Work",
                    "Start a Project",
                    "How We Work",
                ]);
                setIsTyping(false);
                setHasGreeted(true);
            }, 1000);
        }
    }, [isOpen, hasGreeted]);

    const addBotMessage = (content: string, options?: string[]) => {
        setMessages((prev) => [
            ...prev,
            {
                id: Date.now().toString(),
                role: "bot",
                content,
                options,
            },
        ]);
    };

    const addUserMessage = (content: string) => {
        setMessages((prev) => [
            ...prev,
            {
                id: Date.now().toString(),
                role: "user",
                content,
            },
        ]);
    };

    const handleSendMessage = async (text: string) => {
        if (!text.trim()) return;

        addUserMessage(text);
        setInputValue("");
        setIsTyping(true);

        // Simulate network delay
        const delay = 400 + Math.random() * 600;
        setTimeout(() => {
            processInput(text);
            setIsTyping(false);
        }, delay);
    };

    const processInput = (text: string) => {
        const lower = text.toLowerCase().trim();

        // Handle lead generation flow
        if (leadState.active) {
            handleLeadFlow(text);
            return;
        }

        // Check if user wants to start a project
        if (
            lower.includes("start a project") ||
            lower.includes("start project") ||
            lower.includes("hire") ||
            lower.includes("let's build") ||
            lower.includes("get started") ||
            lower.includes("work together") ||
            lower.includes("start a similar project") ||
            lower.includes("start an ai project") ||
            lower.includes("start a web3 project")
        ) {
            addBotMessage("A new mission. Exciting. Let's initialize your profile. What is your name?");
            setLeadState({ active: true, step: "name" });
            return;
        }

        // JSON keyword matching
        const match = findBestMatch(lower);
        const response = pickRandom(match.responses);
        addBotMessage(response, match.options.length > 0 ? match.options : undefined);
    };

    const handleLeadFlow = (text: string) => {
        switch (leadState.step) {
            case "name":
                setLeadState({ ...leadState, step: "email", name: text.trim() });
                addBotMessage(`Acknowledged, **${text.trim()}**. To establish comms, please provide your **email address**.`);
                break;

            case "email": {
                const email = text.trim();
                if (!email.includes("@") || !email.includes(".")) {
                    addBotMessage("Signal malformed. Please provide a valid email address. (e.g. name@company.com)");
                    return;
                }
                setLeadState({ ...leadState, step: "phone", email });
                addBotMessage("Email locked. Now provide your **phone number** so we can reach you faster.");
                break;
            }

            case "phone": {
                const phone = text.trim().replace(/[^0-9+\-\s]/g, "");
                if (phone.length < 7) {
                    addBotMessage("That doesn't look right. Please enter a valid phone number. (e.g. +91 7989909756)");
                    return;
                }
                setLeadState({ ...leadState, step: "company", phone });
                addBotMessage("Phone registered. What is your **company/organization** name? (Type 'skip' if individual)");
                break;
            }

            case "company":
                setLeadState({ ...leadState, step: "projectType", company: text.trim().toLowerCase() === "skip" ? "Individual" : text.trim() });
                addBotMessage("What **type of project** are you looking for?", PROJECT_TYPES);
                break;

            case "projectType":
                setLeadState({ ...leadState, step: "budget", projectType: text.trim() });
                addBotMessage("What is your estimated **budget range**?", BUDGET_RANGES);
                break;

            case "budget":
                setLeadState({ ...leadState, step: "details", budget: text.trim() });
                addBotMessage("Final step \u2014 briefly **describe your project vision**. What are you looking to build?");
                break;

            case "details": {
                const finalLead = {
                    name: leadState.name || "",
                    email: leadState.email || "",
                    phone: leadState.phone || "N/A",
                    company: leadState.company || "N/A",
                    projectType: leadState.projectType || "N/A",
                    budget: leadState.budget || "N/A",
                    details: text.trim(),
                };

                // Send to API
                fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(finalLead),
                }).catch((err) => console.error("Lead API error:", err));

                // Open WhatsApp with properly formatted message
                const waLines = [
                    "*New ANARVA Lead*",
                    "",
                    `*Name:* ${finalLead.name}`,
                    `*Email:* ${finalLead.email}`,
                    `*Phone:* ${finalLead.phone}`,
                    `*Company:* ${finalLead.company}`,
                    `*Project Type:* ${finalLead.projectType}`,
                    `*Budget:* ${finalLead.budget}`,
                    "",
                    `*Project Vision:*`,
                    finalLead.details,
                ];
                const waUrl = `https://wa.me/917989909756?text=${encodeURIComponent(waLines.join("\n"))}`;
                window.open(waUrl, "_blank");

                addBotMessage(
                    `Transmission complete!\n\n\u2022 **Name:** ${finalLead.name}\n\u2022 **Email:** ${finalLead.email}\n\u2022 **Phone:** ${finalLead.phone}\n\u2022 **Company:** ${finalLead.company}\n\u2022 **Project:** ${finalLead.projectType}\n\u2022 **Budget:** ${finalLead.budget}\n\u2022 **Vision:** ${finalLead.details}\n\nOur architects will analyze your request and contact you within **24 hours**. A WhatsApp message has also been initiated for faster response.`,
                    ["View Our Work", "Our Services", "Our Process"]
                );
                setLeadState({ active: false, step: "done" });
                break;
            }

            default:
                setLeadState({ active: false, step: "name" });
                break;
        }
    };

    // Render structured content from markdown-like text
    const renderContent = (text: string) => {
        const lines = text.split("\n");
        return (
            <div className="space-y-1.5">
                {lines.map((line, i) => {
                    const trimmed = line.trim();
                    if (!trimmed) return <div key={i} className="h-1" />; // blank line spacer

                    // Bullet point lines (• or -)
                    const isBullet = trimmed.startsWith("•") || trimmed.startsWith("-");
                    const bulletContent = isBullet ? trimmed.slice(1).trim() : trimmed;

                    // Parse **bold** segments
                    const parts = bulletContent.split(/(\*\*[^*]+\*\*)/g);
                    const rendered = parts.map((part, j) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                            return <strong key={j} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
                        }
                        return <span key={j}>{part}</span>;
                    });

                    if (isBullet) {
                        return (
                            <div key={i} className="flex items-start gap-2 pl-1">
                                <span className="text-brand-neon/60 mt-1 text-[8px]">●</span>
                                <span className="flex-1">{rendered}</span>
                            </div>
                        );
                    }

                    return <div key={i}>{rendered}</div>;
                })}
            </div>
        );
    };

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] flex flex-col items-end pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="pointer-events-auto mb-2 w-[calc(100vw-2rem)] sm:w-[400px] h-[70vh] sm:h-[600px] max-h-[80vh] flex flex-col rounded-2xl overflow-hidden shadow-glow-blue border border-white/10 bg-cosmic-black/80 backdrop-blur-xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-neon to-brand-accent flex items-center justify-center shadow-lg shadow-brand-neon/20">
                                    <Sparkles className="w-4 h-4 text-white animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white tracking-wide">ANARVA AI</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[10px] text-gray-400 uppercase tracking-wider">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={cn(
                                            "max-w-[90%] p-3.5 rounded-2xl text-[13px] leading-relaxed",
                                            msg.role === "user"
                                                ? "bg-gradient-to-br from-brand-neon/15 to-brand-accent/10 border border-brand-neon/25 text-white rounded-br-none ml-auto"
                                                : "bg-white/5 border border-white/10 text-gray-200 rounded-bl-none"
                                        )}
                                    >
                                        {msg.role === "user" && (
                                            <div className="flex items-center justify-end gap-1.5 mb-1 text-[10px] text-brand-neon/60 uppercase tracking-widest font-bold">
                                                You <User className="w-3 h-3" />
                                            </div>
                                        )}
                                        {msg.role === "bot" && (
                                            <div className="flex items-center gap-2 mb-1 text-[10px] text-brand-neon/80 uppercase tracking-widest font-bold">
                                                <Bot className="w-3 h-3" /> System
                                            </div>
                                        )}
                                        {msg.role === "bot" ? renderContent(msg.content) : <p>{msg.content}</p>}

                                        {/* Quick Replies */}
                                        {msg.options && (
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {msg.options.map((option) => (
                                                    <button
                                                        key={option}
                                                        onClick={() => handleSendMessage(option)}
                                                        className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-brand-neon/20 border border-white/10 hover:border-brand-neon/50 text-gray-300 hover:text-white transition-all cursor-pointer flex items-center gap-1 group"
                                                    >
                                                        {option}
                                                        <ChevronRight className="w-3 h-3 text-gray-500 group-hover:text-brand-neon" />
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-bl-none flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSendMessage(inputValue);
                            }}
                            className="p-4 border-t border-white/10 bg-white/5 flex gap-2"
                        >
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={leadState.active ? (
                                    leadState.step === "name" ? "Your full name..." :
                                        leadState.step === "email" ? "your@email.com" :
                                            leadState.step === "phone" ? "+91 XXXXXXXXXX" :
                                                leadState.step === "company" ? "Company name or 'skip'..." :
                                                    leadState.step === "details" ? "Describe your vision..." :
                                                        "Type your message..."
                                ) : "Type your message..."}
                                className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-neon/50 transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim()}
                                className="p-2 rounded-xl bg-brand-neon/20 text-brand-neon hover:bg-brand-neon hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="pointer-events-auto w-14 h-14 rounded-full bg-gradient-to-r from-brand-neon to-brand-accent shadow-glow-blue flex items-center justify-center text-white relative group overflow-hidden"
            >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
                {isOpen ? <X className="w-6 h-6 relative z-10" /> : <MessageCircle className="w-6 h-6 relative z-10" />}
            </motion.button>
        </div>
    );
}