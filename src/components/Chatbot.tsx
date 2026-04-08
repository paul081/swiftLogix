"use client";

import { useState, useRef, useEffect } from "react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'bot' | 'user', text: string}[]>([
    { role: 'bot', text: 'Hello! I am SwiftBot 🚚. How can I help you today?' }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages as any);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      let responseText = "Thank you for your message! Our support team will get back to you shortly.";
      
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes("track") || lowerInput.includes("where is my")) {
        responseText = "You can track your package by entering your tracking number in the 'Track' section on our homepage!";
      } else if (lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("quote")) {
        responseText = "For pricing details and shipping quotes, please click the 'Get a Free Quote' button on our website.";
      } else if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
        responseText = "Hi there! How can I assist you with your logistics needs?";
      }

      setMessages(prev => [
        ...prev,
        { role: 'bot', text: responseText }
      ]);
    }, 800);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-sky-500 hover:bg-sky-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-sky-200 transition-all z-50 ${isOpen ? 'scale-0' : 'scale-100'}`}
        aria-label="Open chat"
      >
        <i className="fa-solid fa-comment-dots fa-xl"></i>
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 w-80 md:w-[360px] bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden transition-all duration-300 z-50 ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto shadow-sky-900/10' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        style={{ height: '500px', maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="bg-slate-800 text-white p-4 flex justify-between items-center z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-sky-500 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-robot"></i>
            </div>
            <div>
              <h3 className="font-bold text-sm">SwiftBot Support</h3>
              <p className="text-xs text-sky-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block"></span>
                Online
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
          >
            <i className="fa-solid fa-xmark fa-lg"></i>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-slate-50 flex flex-col gap-4">
           <div className="text-center text-xs text-slate-400 mb-2">Today, {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'bot' && (
                <div className="w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center mr-2 mt-1 shrink-0">
                  <i className="fa-solid fa-robot text-white text-[10px]"></i>
                </div>
              )}
              <div className={`max-w-[80%] p-3 text-sm shadow-sm ${msg.role === 'user' ? 'bg-sky-500 text-white rounded-2xl rounded-br-sm' : 'bg-white border border-slate-100 text-slate-700 rounded-2xl rounded-bl-sm'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex gap-2 items-center">
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow"
          />
          <button 
            type="submit" 
            className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            disabled={!input.trim()}
          >
            <i className="fa-solid fa-paper-plane text-sm"></i>
          </button>
        </form>
      </div>
    </>
  );
}
