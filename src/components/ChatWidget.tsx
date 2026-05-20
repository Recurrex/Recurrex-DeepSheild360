"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// IMPORTANT: To run this directly in the browser on Vercel, your environment variable 
// MUST be prefixed with NEXT_PUBLIC_. If you only use DS_Gemini_API_Key, Next.js will hide it from the client.
// Rename your GitHub/Vercel secret to: NEXT_PUBLIC_DS_Gemini_API_Key
const apiKey = process.env.NEXT_PUBLIC_DS_Gemini_API_Key || process.env.DS_Gemini_API_Key || "";

const SYSTEM_PROMPT = `
You are Shield AI, the official intelligent assistant for Deep Shield 360, created by Team Recurrex. 
Strict Rules:
1. NEVER disclose that you are an AI model created by Google, Gemini, OpenAI, or ChatGPT. You are solely "Shield AI".
2. You must only answer questions related to:
   - Deep Shield 360 features, dashboard navigation, and capabilities.
   - General physical security, CCTV surveillance, finding IP addresses of cameras, and detecting spy cameras,anything related to security.
3. If a user asks a question unrelated to security, surveillance, or the website, politely but firmly decline to answer and guide them back to security topics.
4. Keep answers concise, professional, and helpful.
`;

type Msg = { role: "user" | "bot"; text: string };

const intro: Msg = {
  role: "bot",
  text: "Hi, I'm Shield AI. Ask me anything about Deep Shield 360 or general security operations.",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([intro]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [msgs, open]);

  const send = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    // Add user message instantly
    const newMsgs: Msg[] = [...msgs, { role: "user", text: trimmed }];
    setMsgs(newMsgs);
    setInput("");
    setIsLoading(true);

    try {
      if (!apiKey) throw new Error("API key missing");

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Format history for Gemini
      const history = [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "Understood. I am Shield AI. I am ready to assist with security and Deep Shield 360 inquiries." }] },
        ...msgs.filter((m) => m !== intro).map((msg) => ({
          role: msg.role === "bot" ? "model" : "user",
          parts: [{ text: msg.text }],
        })),
      ];

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(trimmed);
      const responseText = await result.response.text();

      setMsgs([...newMsgs, { role: "bot", text: responseText }]);
    } catch (error) {
      console.error("Shield AI Error:", error);
      setMsgs([
        ...newMsgs,
        { role: "bot", text: "System error: Unable to connect to Shield AI servers. Please check your API key or network." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      send();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="mb-4 w-[360px] max-w-[calc(100vw-3rem)] h-[480px] bg-[#0a0a0a] border border-gray-700 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.05)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#111111] border-b border-gray-800">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Sparkles className="h-5 w-5 text-gray-300" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 bg-blue-500 rounded-full border border-gray-900 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-100 tracking-wide">Shield AI</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                    Deep Shield 360
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700"
            >
              {msgs.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-md ${
                      m.role === "user"
                        ? "bg-gray-200 text-black rounded-tr-sm"
                        : "bg-[#1a1a1a] border border-gray-800 text-gray-200 rounded-tl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl rounded-tl-sm px-4 py-3 flex space-x-1.5 items-center h-9">
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-[#111111] border-t border-gray-800">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about surveillance..."
                  className="w-full bg-[#0a0a0a] border border-gray-700 text-sm text-gray-100 rounded-full pl-4 pr-10 py-2.5 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all placeholder:text-gray-600 shadow-inner"
                  disabled={isLoading}
                />
                <button
                  onClick={send}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 text-gray-400 hover:text-white disabled:text-gray-700 transition-colors p-1"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="bg-gradient-to-br from-gray-200 to-gray-400 hover:from-white hover:to-gray-300 text-black rounded-full p-4 shadow-[0_0_15px_rgba(255,255,255,0.2)] border border-gray-300 flex items-center justify-center transition-all"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>
    </div>
  );
    }
              
