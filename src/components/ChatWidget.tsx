import { AlertCircle, Bot, MessageCircle, Send, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useRef, useState } from 'react';
import { askPhilosophyAI } from '../services/geminiPhilosophy';

type ChatRole = 'user' | 'ai';
type ChatMessage = { id: string; role: ChatRole; text: string };
const TYPING_ID = 'ai-typing';

interface ChatWidgetProps {
  inline?: boolean;
}

export function ChatWidget({ inline = false }: ChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'ai-welcome',
      role: 'ai',
      text: 'Chào bạn! Bạn có thể hỏi mình về triết học Phật giáo Việt Nam (Trúc Lâm, nhập thế, nhân vật, lễ hội, ca dao...).',
    },
  ]);

  const sendingRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const canSend = useMemo(() => !!input.trim() && !loading, [input, loading]);

  const scrollToBottom = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    if (sendingRef.current) return;
    sendingRef.current = true;

    setError(null);
    setLoading(true);
    setInput('');

    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: 'user', text: trimmed };
    const typingMsg: ChatMessage = { id: TYPING_ID, role: 'ai', text: 'Đang suy nghĩ…' };
    setMessages((prev) => [...prev.filter((m) => m.id !== TYPING_ID), userMsg, typingMsg]);
    // Let state flush then scroll.
    setTimeout(scrollToBottom, 0);

    try {
      const answer = await askPhilosophyAI(trimmed);
      const aiMsg: ChatMessage = { id: `a-${Date.now()}`, role: 'ai', text: answer };
      setMessages((prev) => [...prev.filter((m) => m.id !== TYPING_ID), aiMsg]);
      setTimeout(scrollToBottom, 0);
    } catch (err) {
      // Remove typing bubble on error
      setMessages((prev) => prev.filter((m) => m.id !== TYPING_ID));
      setError(err instanceof Error ? err.message : 'Không thể gửi câu hỏi. Vui lòng thử lại.');
    } finally {
      setLoading(false);
      sendingRef.current = false;
      setTimeout(scrollToBottom, 0);
    }
  };

  const handleToggle = () => {
    setOpen((v) => !v);
    setTimeout(scrollToBottom, 0);
  };

  const handleClear = () => {
    setError(null);
    setMessages([
      {
        id: 'ai-welcome',
        role: 'ai',
        text: 'Chào bạn! Bạn có thể hỏi mình về triết học Phật giáo Việt Nam (Trúc Lâm, nhập thế, nhân vật, lễ hội, ca dao...).',
      },
    ]);
    setTimeout(scrollToBottom, 0);
  };

  return (
    // Hard-force fixed positioning above all layers (avoid stacking-context quirks)
    <div
      className="pointer-events-auto"
      style={inline ? {} : {
        position: 'fixed',
        right: 24,
        bottom: 24,
        zIndex: 2147483647,
      }}
    >
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              key="chat-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              style={{ zIndex: 2147483646 }}
              onClick={() => setOpen(false)}
            />
            {/* Centered chat panel */}
            <motion.div
              key="chat-panel"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-2xl overflow-hidden border-2 border-amber-200 bg-white flex flex-col"
              style={{ width: 420, height: '78vh', maxHeight: 680, zIndex: 2147483647 }}
            >
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-3 flex items-center justify-between text-[12px]">
              {/* Left spacer for balance */}
              <div className="w-9" />
              
              {/* Center content */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="size-9 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot className="size-5" />
                  </div>
                </div>
                <div className="leading-tight text-center">
                  <div className="font-extrabold text-[13px]">Trợ lý AI</div>
                  <div className="text-[10px] text-white/90">Online</div>
                </div>
              </div>
              
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 hover:bg-white/15 transition-colors"
                aria-label="Đóng"
                title="Đóng"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-3 py-3 bg-gradient-to-b from-amber-50 to-white text-[11px]"
            >
              <div className="space-y-3">
                {messages.map((m) => {
                  const isUser = m.role === 'user';
                  // Với AI, loại bỏ các ký hiệu **...** cho gọn nội dung
                  const cleanedText = isUser ? m.text : m.text.replace(/\*\*/g, '');

                  return (
                    <div
                      key={m.id}
                      className={isUser ? 'w-full pr-4 pl-1' : 'w-full pl-4 pr-3'}
                    >
                      <div
                        className={
                          isUser
                            ? 'flex items-start gap-2 justify-end'
                            : 'flex items-start gap-2 justify-start'
                        }
                      >
                        {/* AI avatar (left) */}
                        {!isUser && (
                          <div className="mt-0.5 size-8 rounded-full flex items-center justify-center border shrink-0 bg-white border-slate-200 text-amber-700">
                            <Bot className="size-4" />
                          </div>
                        )}

                        {/* Bubble */}
                        <div
                          className={
                            isUser
                              ? 'max-w-[70%] rounded-2xl px-4 py-2 text-[11px] leading-snug shadow-sm border bg-gradient-to-r from-amber-600 to-orange-600 text-white border-amber-500/30'
                              : 'max-w-[88%] rounded-xl px-6 py-3.5 text-[11px] leading-relaxed shadow-sm border bg-white text-slate-800 border-slate-200'
                          }
                        >
                          {m.id === TYPING_ID ? (
                            <div className="flex items-center gap-2 whitespace-nowrap text-[11px]">
                              <span className="inline-block size-3 rounded-full border-2 border-slate-300 border-t-amber-600 animate-spin" />
                              <span className={isUser ? 'text-white' : 'text-slate-700'}>{m.text}</span>
                            </div>
                          ) : isUser ? (
                            <div className="whitespace-pre-wrap break-words text-white leading-snug text-left">
                              {cleanedText}
                            </div>
                          ) : (
                            <div className="whitespace-normal break-words text-slate-800 leading-relaxed text-left">
                              {cleanedText
                                // ép mỗi mục đánh số (1. 2. 3.) xuống dòng mới cho dễ đọc
                                .replace(/\s*(\d\.)\s+/g, '\n$1 ')
                                .split('\n')
                                .map((line) => line.trim())
                                .filter((line) => line.length > 0)
                                .map((line, idx) => (
                                  <p key={idx} className={idx > 0 ? 'mt-1.5' : undefined}>
                                    {line}
                                  </p>
                                ))}
                            </div>
                          )}
                        </div>

                        {/* User avatar (right) */}
                        {isUser && (
                          <div className="mt-0.5 size-8 rounded-full flex items-center justify-center border shrink-0 bg-white border-slate-200 text-amber-700">
                            <span className="text-[11px] font-semibold">U</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {error && (
                <div className="mt-3 bg-red-50 border-2 border-red-200 rounded-xl p-3 flex items-start gap-2 text-[11px]">
                  <AlertCircle className="size-4 text-red-600 mt-0.5" />
                  <p className="text-red-800">{error}</p>
                </div>
              )}
            </div>

            {/* Quick suggestions (near input, like Artemis) */}
            {messages.length <= 1 && !loading && (
              <div className="px-3 pt-3 bg-white border-t border-amber-200 text-[11px]">
                <div className="flex flex-wrap gap-2">
                  {[
                    'Tư tưởng nhập thế là gì?',
                    'Thiền Trúc Lâm khác gì thiền Trung Hoa?',
                    'Chánh niệm ứng dụng trong đời sống như thế nào?',
                  ].map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setInput(q)}
                      className="text-left text-[10px] px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="px-3 py-3 bg-white border-t border-amber-200">
              <div className="flex items-center gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 resize-none rounded-xl border-2 border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 px-3 py-2 text-[11px] leading-snug h-10"
                  rows={1}
                  disabled={loading}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      void handleSend();
                    }
                  }}
                />
                <motion.button
                  type="button"
                  onClick={() => void handleSend()}
                  disabled={!canSend}
                  className="shrink-0 rounded-xl w-10 h-10 bg-gradient-to-r from-amber-600 to-orange-600 text-white flex items-center justify-center shadow-md hover:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-[11px]"
                  whileHover={{ scale: canSend ? 1.04 : 1 }}
                  whileTap={{ scale: canSend ? 0.96 : 1 }}
                  aria-label="Gửi"
                >
                  {loading ? <div className="size-4 border-2 border-white/50 border-t-white rounded-full animate-spin" /> : <Send className="size-4" />}
                </motion.button>
              </div>
              <div className="mt-1 text-[9px] text-gray-600 px-1">
                Enter để gửi • Shift+Enter để xuống dòng
              </div>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating button (only khi chat đang đóng) */}
      {!open && (
        <motion.button
          type="button"
          onClick={handleToggle}
          className="relative rounded-full p-4 bg-gradient-to-br from-amber-600 to-orange-600 text-white shadow-2xl hover:shadow-amber-500/50 transition-all inline-flex items-center justify-center group"
          style={inline ? {} : {
            position: 'fixed',
            right: 24,
            bottom: 24,
            zIndex: 2147483647,
          }}
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              '0 10px 30px rgba(251, 191, 36, 0.3)',
              '0 10px 40px rgba(251, 191, 36, 0.5)',
              '0 10px 30px rgba(251, 191, 36, 0.3)',
            ],
          }}
          transition={{
            boxShadow: { duration: 2, repeat: Infinity },
          }}
          aria-label="Mở AI chat"
        >
          {/* Outer pulse ring */}
          <motion.span
            className="absolute inset-0 rounded-full bg-amber-400/30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: [0, 0.7, 0], scale: [0.9, 1.2, 1.3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          />

          <span className="absolute -top-1 -right-1 size-3 rounded-full bg-emerald-400 border-2 border-white" />
          <span className="relative">
            <MessageCircle size={60} className="group-hover:rotate-12 transition-transform" />
          </span>
        </motion.button>
      )}
    </div>
  );
}

