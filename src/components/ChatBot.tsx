"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/ui/icon";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  content: "Hi! 👋 I'm Mahin's AI assistant. Ask me anything about his skills, projects, availability, or how to hire him!",
};

const SUGGESTIONS = ["What can you build?", "Are you available?", "How to hire you?"];

let msgCounter = 0;
const uid = () => `msg-${++msgCounter}-${Date.now()}`;

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  /* scroll to bottom */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  /* focus input on open */
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 280);
    }
  }, [isOpen]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isStreaming) return;

    const userMsg: Message = { id: uid(), role: "user", content: text };
    const assistantId = uid();

    setMessages((prev) => [
      ...prev,
      userMsg,
      { id: assistantId, role: "assistant", content: "" },
    ]);
    setInput("");
    setIsStreaming(true);

    const history = [...messages, userMsg].map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const ctrl = new AbortController();
      abortRef.current = ctrl;

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: ctrl.signal,
      });

      const data = await res.json() as { message?: string; error?: string };

      if (!res.ok || data.error) {
        const msg =
          data.error === "quota_exceeded"
            ? "API quota exceeded for today. Please contact Mahin directly via email or WhatsApp! 📩"
            : (data.error ?? "Something went wrong. Please try again.");
        throw new Error(msg);
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, content: data.message ?? "" } : m
        )
      );
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: "Sorry, something went wrong. Please try again." }
            : m
        )
      );
    } finally {
      setIsStreaming(false);
    }
  }, [messages, isStreaming]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestion = (text: string) => sendMessage(text);

  const handleClose = () => {
    abortRef.current?.abort();
    setIsOpen(false);
  };

  return (
    <>
      {/* ── Floating Button ── */}
      <motion.button
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-dark text-white shadow-2xl shadow-brand/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        aria-label={isOpen ? "Close chat" : "Open AI assistant"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.16 }}
            >
              <Icon name="x" size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.16 }}
            >
              <Icon name="messages" size={22} />
            </motion.span>
          )}
        </AnimatePresence>

        {/* unread badge */}
        {hasUnread && !isOpen && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-bg-primary">
            1
          </span>
        )}
      </motion.button>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 right-4 z-50 flex w-[92vw] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-bg-secondary shadow-2xl sm:right-6"
            style={{ height: "min(520px, 80dvh)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-brand to-brand-dark px-4 py-3 text-white">
              <div className="flex items-center gap-3">
                <motion.div
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                >
                  <Icon name="sparkles" size={18} />
                </motion.div>
                <div>
                  <p className="text-sm font-bold leading-tight">Mahin&apos;s Assistant</p>
                  <p className="flex items-center gap-1.5 text-[11px] opacity-85">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400" />
                    AI Powered · Always Online
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="rounded-lg p-1.5 opacity-70 transition hover:opacity-100"
                aria-label="Close chat"
              >
                <Icon name="x" size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "assistant" && (
                    <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                      <Icon name="sparkles" size={13} />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-sm bg-brand text-white"
                        : "rounded-bl-sm border border-border bg-bg-primary text-text-primary"
                    }`}
                  >
                    {m.content || (
                      /* typing dots for empty streaming message */
                      <span className="flex gap-1.5 py-0.5">
                        {[0, 0.18, 0.36].map((d, i) => (
                          <span
                            key={i}
                            className="h-2 w-2 rounded-full bg-brand/60 animate-bounce"
                            style={{ animationDelay: `${d}s` }}
                          />
                        ))}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && !isStreaming && (
              <div className="flex flex-wrap gap-2 border-t border-border px-4 py-2.5">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSuggestion(s)}
                    className="rounded-full border border-brand/30 bg-brand/5 px-3 py-1 text-xs font-medium text-brand transition hover:bg-brand hover:text-white"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-border bg-bg-secondary px-3 py-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                disabled={isStreaming}
                className="flex-1 rounded-xl border border-border bg-bg-primary px-4 py-2 text-sm text-text-primary outline-none transition focus:border-brand disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isStreaming || !input.trim()}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand text-white transition hover:bg-brand-dark disabled:opacity-50"
                aria-label="Send message"
              >
                {isStreaming ? (
                  <Icon name="loader" size={15} className="animate-spin" />
                ) : (
                  <Icon name="send" size={15} />
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
