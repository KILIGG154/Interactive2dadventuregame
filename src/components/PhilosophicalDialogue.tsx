import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Users, Scale, Lightbulb } from 'lucide-react';
import { dialogueQuestions, dialogueExchanges } from '../data/dialogueData';

export function PhilosophicalDialogue() {
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(
    dialogueQuestions[0]?.id || null
  );

  const selectedExchange = selectedQuestionId
    ? dialogueExchanges.find((exchange) => exchange.questionId === selectedQuestionId)
    : null;

  const selectedQuestion = selectedQuestionId
    ? dialogueQuestions.find((q) => q.id === selectedQuestionId)
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Users className="size-8 text-amber-700" />
          <h3 className="text-2xl font-bold text-amber-900">
            Tư tưởng đối thoại xuyên thời gian
          </h3>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Khám phá cuộc đối thoại giữa <span className="font-semibold">Trần Nhân Tông</span> và{' '}
          <span className="font-semibold">Thích Nhất Hạnh</span> về các vấn đề triết học cốt lõi.
          Không có đúng/sai tuyệt đối - mà là những cách tiếp cận khác nhau cùng hướng tới giác ngộ.
        </p>
      </div>

      {/* Question buttons */}
      <div className="bg-white/80 rounded-xl p-4 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="size-5 text-amber-700" />
          <h4 className="text-lg font-semibold text-amber-900">Chọn câu hỏi để xem đối thoại</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {dialogueQuestions.map((question) => {
            const isSelected = selectedQuestionId === question.id;
            return (
              <motion.button
                key={question.id}
                onClick={() => setSelectedQuestionId(question.id)}
                className={`px-4 py-3 rounded-lg text-sm font-medium text-left transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40 ${
                  isSelected
                    ? 'bg-amber-200 text-amber-900 border-amber-500 shadow-sm'
                    : 'bg-white text-amber-900 hover:bg-amber-50 border-amber-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {question.question}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Dialogue display */}
      <AnimatePresence mode="wait">
        {selectedExchange && selectedQuestion && (
          <motion.div
            key={selectedQuestionId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Question header */}
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl p-5 text-white shadow-lg">
              <div className="flex items-center gap-3">
                <Lightbulb className="size-6" />
                <h4 className="text-xl font-bold">{selectedQuestion.question}</h4>
              </div>
            </div>

            {/* Two-column dialogue */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Trần Nhân Tông */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg border-2 border-blue-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-600 rounded-full p-3">
                    <Users className="size-6 text-white" />
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-blue-900">Trần Nhân Tông</h5>
                    <p className="text-sm text-blue-700">(1258-1308) - Thiền phái Trúc Lâm</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                    {selectedExchange.tnTongAnswer}
                  </p>
                </div>
              </motion.div>

              {/* Thích Nhất Hạnh */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 shadow-lg border-2 border-green-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-600 rounded-full p-3">
                    <Users className="size-6 text-white" />
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-green-900">Thích Nhất Hạnh</h5>
                    <p className="text-sm text-green-700">(1926-2022) - Thiền chánh niệm</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                    {selectedExchange.nhatHanhAnswer}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Similarities and Differences */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Similarities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-lg border-2 border-purple-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Scale className="size-6 text-purple-700" />
                  <h5 className="text-xl font-bold text-purple-900">
                    Họ giống nhau ở đâu?
                  </h5>
                </div>
                <ul className="space-y-2">
                  {selectedExchange.summarySimilarities.map((similarity, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold mt-1">•</span>
                      <span className="text-gray-800 leading-relaxed">{similarity}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Differences */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 shadow-lg border-2 border-orange-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="size-6 text-orange-700" />
                  <h5 className="text-xl font-bold text-orange-900">
                    Khác nhau ở đâu?
                  </h5>
                </div>
                <ul className="space-y-2">
                  {selectedExchange.summaryDifferences.map((difference, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold mt-1">•</span>
                      <span className="text-gray-800 leading-relaxed">{difference}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-500"
            >
              <p className="text-sm text-amber-900 italic">
                <strong>Lưu ý:</strong> Đây không phải là một cuộc tranh luận về đúng/sai, mà là
                một cuộc đối thoại giữa hai cách tiếp cận khác nhau cùng hướng tới mục tiêu giác
                ngộ. Cả hai đều có giá trị và đóng góp riêng cho sự phát triển của Phật giáo Việt
                Nam.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
