import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Bot, Send, AlertCircle } from 'lucide-react';
import { canUsePhilosophyAI, askPhilosophyAI } from '../services/geminiPhilosophy';

export function AskAISection() {
  const [userMessage, setUserMessage] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submittingRef = useRef(false);

  const hasKey = canUsePhilosophyAI();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = userMessage.trim();
    if (!trimmed || !hasKey) return;
    if (submittingRef.current) return;
    submittingRef.current = true;
    setError(null);
    setLoading(true);
    setAiResponse('');
    try {
      const text = await askPhilosophyAI(trimmed);
      setAiResponse(text);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể kết nối. Kiểm tra API key hoặc mạng.');
    } finally {
      setLoading(false);
      submittingRef.current = false;
    }
  };

  if (!hasKey) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-amber-900 mb-2">Hỏi AI về triết học</h3>
          <p className="text-gray-600">Đặt câu hỏi về triết học Phật giáo Việt Nam, AI sẽ trả lời ngắn gọn.</p>
        </div>
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 text-center">
          <AlertCircle className="size-10 text-amber-600 mx-auto mb-3" />
          <p className="text-amber-900 font-medium">
            Thêm <code className="bg-amber-200 px-1 rounded">VITE_GOOGLE_AI_API_KEY</code> vào file <code className="bg-amber-200 px-1 rounded">.env</code> để sử dụng Hỏi AI.
          </p>
          <p className="text-sm text-amber-800 mt-2">
            Lấy API key tại: <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline">Google AI Studio</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Bot className="size-8 text-amber-700" />
          <h3 className="text-2xl font-bold text-amber-900">Hỏi AI về triết học</h3>
        </div>
        <p className="text-gray-600">Đặt câu hỏi về triết học Phật giáo Việt Nam, AI sẽ trả lời ngắn gọn bằng tiếng Việt.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="ask-ai-input" className="block text-sm font-semibold text-amber-900 mb-2">Câu hỏi của bạn</label>
          <textarea
            id="ask-ai-input"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Ví dụ: Tư tưởng nhập thế của Phật giáo Việt Nam là gì?"
            className="w-full px-4 py-3 rounded-lg border-2 border-amber-200 bg-white text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-y min-h-[100px]"
            rows={3}
            disabled={loading}
          />
        </div>
        <motion.button
          type="submit"
          disabled={loading || !userMessage.trim()}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-600 text-white font-semibold shadow-md hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Send className="size-5" />
          {loading ? 'Đang xử lý...' : 'Gửi'}
        </motion.button>
      </form>

      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="size-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {loading && !aiResponse && (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 text-amber-800">
          Đang tải câu trả lời...
        </div>
      )}

      {aiResponse && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-2 border-amber-300 rounded-xl p-5 shadow-md"
        >
          <h4 className="text-lg font-bold text-amber-900 mb-3 flex items-center gap-2">
            <Bot className="size-5" />
            Câu trả lời
          </h4>
          <div className="text-gray-800 whitespace-pre-line leading-relaxed">{aiResponse}</div>
        </motion.div>
      )}
    </div>
  );
}
