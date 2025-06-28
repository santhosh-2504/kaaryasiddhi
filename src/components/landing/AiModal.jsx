"use client";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "@/store/slices/chatSlice";
import ReactMarkdown from "react-markdown";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";

export default function AIModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(true);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [autoOpenedByFAQ, setAutoOpenedByFAQ] = useState(false);
  const [isInFAQSection, setIsInFAQSection] = useState(false);
  const [userManuallyClosed, setUserManuallyClosed] = useState(false); // New state to track manual close
  const dispatch = useDispatch();
  const { messages, loading } = useSelector((state) => state.chat);
  const bottomRef = useRef(null);

  // Inviting messages that rotate
  const invitingMessages = [
    "More doubts?",
    "Need info?",
    "Ask me anything!",
    "I'm here to help!",
    "Questions? Fire away!",
    "Confused? Let's chat!"
  ];

  // Rotate inviting messages every 3 seconds
  useEffect(() => {
    if (!isOpen) {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % invitingMessages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isOpen, invitingMessages.length]);

  // Auto-open/close when FAQ section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === 'faqs') {
            setIsInFAQSection(entry.isIntersecting);
            
            if (entry.isIntersecting) {
              // Auto-open when entering FAQ section (only if user hasn't manually closed it)
              if (!isOpen && !hasUserInteracted && !userManuallyClosed) {
                setIsOpen(true);
                setAutoOpenedByFAQ(true);
              }
            } else {
              // Auto-close when leaving FAQ section (only if no user interaction and wasn't manually closed)
              if (isOpen && autoOpenedByFAQ && !hasUserInteracted && !userManuallyClosed) {
                setIsOpen(false);
                setAutoOpenedByFAQ(false);
              }
              // Reset manual close state when leaving FAQ section
              if (!entry.isIntersecting) {
                setUserManuallyClosed(false);
              }
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const faqSection = document.getElementById('faqs');
    if (faqSection) {
      observer.observe(faqSection);
    }

    return () => {
      if (faqSection) {
        observer.unobserve(faqSection);
      }
    };
  }, [isOpen, hasUserInteracted, autoOpenedByFAQ, userManuallyClosed]);

  // Hide bubble when modal is open
  useEffect(() => {
    if (isOpen) {
      setShowBubble(false);
    } else {
      // Show bubble after a short delay when modal closes
      const timeout = setTimeout(() => setShowBubble(true), 500);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Mark user as interacted when they send a message
    setHasUserInteracted(true);
    setAutoOpenedByFAQ(false); // No longer auto-opened since user interacted
    
    dispatch(sendMessage(input));
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleOpenModal = () => {
    setIsOpen(true);
    setShowBubble(false);
    setHasUserInteracted(true); // Mark as interacted when manually opened
    setAutoOpenedByFAQ(false);
    setUserManuallyClosed(false); // Reset manual close state when manually opened
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setUserManuallyClosed(true); // Mark that user manually closed the modal
    
    // Reset interaction state when manually closed (only if not in FAQ section)
    if (!isInFAQSection) {
      setHasUserInteracted(false);
      setAutoOpenedByFAQ(false);
      setUserManuallyClosed(false); // Reset manual close state when leaving FAQ
    }
  };

  const handleQuickAction = (message) => {
    setInput(message);
    setHasUserInteracted(true); // Mark as interacted when using quick actions
    setAutoOpenedByFAQ(false);
  };

  return (
    <>
      {/* Floating Chat Icon with Bubble */}
      <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
        {/* Chat Bubble */}
        {!isOpen && showBubble && (
          <div className="relative animate-fadeInUp">
            <div className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-4 py-3 rounded-2xl rounded-br-md shadow-xl border border-slate-200 dark:border-slate-700 max-w-[200px] transform transition-all duration-300 hover:scale-105 relative">
              <p className="text-sm font-medium leading-relaxed">
                {invitingMessages[currentMessageIndex]}
              </p>
              {/* Speech bubble tail (points right) */}
              <div className="absolute top-1/2 -right-1.5 w-3 h-3 bg-white dark:bg-slate-800 border-t border-r border-slate-200 dark:border-slate-700 transform -translate-y-1/2 rotate-45"></div>
            </div>
            {/* Pulse animation ring */}
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500/20 rounded-full animate-ping"></div>
          </div>
        )}

        {/* Chat Icon Button */}
        <button
          onClick={handleOpenModal}
          className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white p-4 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-emerald-500/25 group relative"
          aria-label="Chat with Kaarya AI"
        >
          <MessageCircle size={24} className="group-hover:animate-pulse" />
          
          {/* Notification dot */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          
          {/* Ripple effect */}
          <div className="absolute inset-0 rounded-full bg-emerald-400/30 scale-0 group-hover:scale-150 transition-transform duration-300"></div>
        </button>
      </div>

      {/* Chat Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={handleCloseModal}
          />
          
          <div className="fixed bottom-4 right-4 md:bottom-20 md:right-6 w-[calc(100vw-2rem)] md:w-[420px] h-[calc(100vh-2rem)] md:h-[600px] z-50 shadow-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden backdrop-blur-lg animate-slideInUp">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-emerald-50 to-slate-50 dark:from-slate-800 dark:to-slate-900 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white">Kaarya AI (Beta)</h3>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    Online
                  </p>
                </div>
              </div>
              <button 
                onClick={handleCloseModal} 
                className="text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-full transition-all duration-200"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-900/50 dark:to-slate-900">
              <div className="px-4 py-4 space-y-4">
                
                {/* Welcome Message */}
                {messages.length === 0 && (
                  <div className="text-center py-8 animate-fadeInUp">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
                      <Sparkles size={24} className="text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                      Welcome to Kaarya AI! 👋
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xs mx-auto">
                      I'm here to help you with your learning journey. Ask me anything about KaaryaSiddhi!
                    </p>
                  </div>
                )}

                {/* Messages */}
                {messages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`flex items-start gap-3 animate-fadeInUp ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === "user" 
                        ? "bg-gradient-to-br from-blue-500 to-blue-600" 
                        : "bg-gradient-to-br from-emerald-500 to-emerald-600"
                    }`}>
                      {msg.role === "user" ? (
                        <User size={16} className="text-white" />
                      ) : (
                        <Bot size={16} className="text-white" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div className={`max-w-[85%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
                      <div className={`rounded-2xl px-4 py-3 shadow-sm transition-all duration-300 hover:shadow-md ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-md"
                          : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-md"
                      }`}>
                        {msg.role === "assistant" ? (
                          <ReactMarkdown
                            components={{
                              h3: ({ children }) => (
                                <h3 className="text-base font-semibold mt-2 mb-1 text-slate-800 dark:text-white">
                                  {children}
                                </h3>
                              ),
                              strong: ({ children }) => (
                                <strong className="font-semibold text-emerald-600 dark:text-emerald-400">
                                  {children}
                                </strong>
                              ),
                              em: ({ children }) => (
                                <em className="italic text-slate-600 dark:text-slate-300">
                                  {children}
                                </em>
                              ),
                              ul: ({ children }) => (
                                <ul className="list-disc pl-4 my-2 space-y-1">
                                  {children}
                                </ul>
                              ),
                              li: ({ children }) => (
                                <li className="text-slate-700 dark:text-slate-300">
                                  {children}
                                </li>
                              ),
                              p: ({ children }) => (
                                <p className="leading-relaxed text-sm my-1 text-slate-700 dark:text-slate-300">
                                  {children}
                                </p>
                              ),
                              code: ({ children }) => (
                                <code className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 px-1 py-0.5 rounded text-xs">
                                  {children}
                                </code>
                              ),
                            }}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        ) : (
                          <span className="text-sm leading-relaxed">{msg.content}</span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 mt-1 px-2">
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Loading indicator */}
                {loading && (
                  <div className="flex items-start gap-3 animate-fadeInUp">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                      <Bot size={16} className="text-white" />
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-md px-4 py-3 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400">Kaarya AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={bottomRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
              <div className="flex items-end gap-3">
                <div className="flex-1 relative">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                    rows={1}
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none transition-all duration-200"
                    style={{ 
                      minHeight: '48px',
                      maxHeight: '120px',
                      height: 'auto'
                    }}
                  />
                </div>
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-slate-400 disabled:to-slate-500 text-white p-3 mb-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </div>
              
              {/* Quick Actions */}
              <div className="flex gap-2 mt-3 flex-wrap">
                <button
                  onClick={() => handleQuickAction("What is KaaryaSiddhi?")}
                  className="px-3 py-1.5 text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-all duration-200 transform hover:scale-105"
                >
                  What is KaaryaSiddhi?
                </button>
                <button
                  onClick={() => handleQuickAction("How does the mentorship work?")}
                  className="px-3 py-1.5 text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-all duration-200 transform hover:scale-105"
                >
                  How it works?
                </button>
                <button
                  onClick={() => handleQuickAction("Tell me about pricing")}
                  className="px-3 py-1.5 text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-all duration-200 transform hover:scale-105"
                >
                  Pricing info
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(100px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.4s ease-out forwards;
        }
      `}</style>
    </>
  );
}