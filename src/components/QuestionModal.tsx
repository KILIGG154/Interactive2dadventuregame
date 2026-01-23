import { motion, AnimatePresence } from 'motion/react';
import { X, Lightbulb, BookOpen, Flower2 } from 'lucide-react';
import { Question } from '../types/game';
import { useState } from 'react';
import { MonkCharacter } from './MonkCharacter';

interface QuestionModalProps {
  question: Question;
  isOpen: boolean;
  onClose: () => void;
  onAnswer: (correct: boolean) => void;
}

export function QuestionModal({ question, isOpen, onClose, onAnswer }: QuestionModalProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [monkEmotion, setMonkEmotion] = useState<'idle' | 'happy' | 'sad'>('idle');
  const [wrongAttempts, setWrongAttempts] = useState(0); // Track số lần trả lời sai

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    if (isCorrect) {
      // Trả lời đúng
      setShowResult(true);
      setMonkEmotion('happy');
      setTimeout(() => {
        onAnswer(true);
        handleClose();
      }, 2500);
    } else {
      // Trả lời sai
      setWrongAttempts(prev => prev + 1);
      
      if (wrongAttempts === 0) {
        // Lần sai đầu tiên - hiển thị gợi ý
        setShowResult(true);
        setMonkEmotion('sad');
        setShowHint(true);
        
        // Reset sau 3s để người chơi thử lại
        setTimeout(() => {
          setShowResult(false);
          setSelectedAnswer(null);
          setMonkEmotion('idle');
        }, 3000);
      } else {
        // Lần sai thứ 2 - reset câu hỏi
        setShowResult(true);
        setMonkEmotion('sad');
        
        setTimeout(() => {
          // Reset hoàn toàn
          setWrongAttempts(0);
          setSelectedAnswer(null);
          setShowResult(false);
          setShowHint(false);
          setMonkEmotion('idle');
        }, 3000);
      }
    }
  };

  const handleClose = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setShowHint(false);
    setMonkEmotion('idle');
    setWrongAttempts(0);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              className="relative max-w-2xl w-full"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Monk character */}
              <div className="absolute -left-24 top-1/2 -translate-y-1/2 z-10">
                <MonkCharacter x={50} y={50} emotion={monkEmotion} size="large" />
                
                {/* Speech bubble hint from monk - positioned to the LEFT of monk */}
                <AnimatePresence>
                  {showHint && question.hint && (
                    <motion.div
                      className="absolute right-full mr-6 top-1/2 -translate-y-1/2 w-72"
                      initial={{ opacity: 0, x: 20, scale: 0.8 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 20, scale: 0.8 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    >
                      {/* Speech bubble */}
                      <div className="relative bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-4 shadow-xl border-2 border-blue-300">
                        {/* Triangle pointer - pointing to the monk on the RIGHT */}
                        <div className="absolute left-full top-1/2 -translate-y-1/2">
                          <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-blue-300" />
                          <div className="absolute top-1/2 -translate-y-1/2 right-0.5 w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-l-[7px] border-l-blue-100" />
                        </div>
                        
                        {/* Content */}
                        <div className="flex items-start gap-2">
                          <Lightbulb className="size-5 text-blue-600 flex-shrink-0 mt-0.5 animate-pulse" />
                          <div>
                            <p className="text-xs text-blue-900 font-bold mb-1">🧘 Thiền sư gợi ý:</p>
                            <p className="text-sm text-blue-800 leading-snug">{question.hint}</p>
                          </div>
                        </div>
                        
                        {/* Sparkle effects */}
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute size-1.5 bg-yellow-400 rounded-full"
                            style={{
                              top: `${20 + i * 30}%`,
                              left: `${-5 + i * 2}%`,
                            }}
                            animate={{
                              scale: [0, 1, 0],
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.3,
                            }}
                          />
                        ))}
                        
                        {/* Monk's hand pointing gesture */}
                        <motion.div
                          className="absolute left-full top-1/2 -translate-y-1/2 ml-2 text-4xl"
                          initial={{ x: 0 }}
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          👉
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Scroll paper background */}
              <div
                className="relative rounded-lg shadow-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(to bottom, #F5E6D3 0%, #FAF0E6 50%, #F5E6D3 100%)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)',
                }}
              >
                {/* Decorative top border - Dragon */}
                <div className="relative h-16 overflow-hidden border-b-4 border-amber-700/30">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 100">
                    <pattern id="dragon-pattern" x="0" y="0" width="200" height="100" patternUnits="userSpaceOnUse">
                      <motion.path
                        d="M 10 50 Q 40 20, 70 50 T 130 50 Q 160 80, 190 50"
                        stroke="#C4302B"
                        strokeWidth="3"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: 'easeInOut' }}
                      />
                    </pattern>
                    <rect width="800" height="100" fill="url(#dragon-pattern)" opacity="0.3" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-100/50 to-transparent" />
                </div>

                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 z-10 bg-red-100 hover:bg-red-200 rounded-full p-2 transition-colors"
                >
                  <X className="size-5 text-red-800" />
                </button>

                {/* Content */}
                <div className="p-8">
                  {/* Title section */}
                  <div className="text-center mb-6">
                    <motion.div
                      className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-amber-700 to-amber-600 rounded-full text-white mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                    >
                      <Flower2 className="size-5" />
                      <span className="font-bold text-lg">{question.title}</span>
                    </motion.div>

                    {question.historicalFigure && (
                      <motion.div
                        className="text-sm text-amber-800 italic"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        Nhân vật: {question.historicalFigure}
                      </motion.div>
                    )}
                  </div>

                  {/* Question */}
                  <motion.div
                    className="bg-white/50 rounded-lg p-6 mb-6 border-2 border-amber-200"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-lg text-gray-800 font-medium text-center">
                      {question.question}
                    </p>
                  </motion.div>

                  {/* Options */}
                  <div className="space-y-3 mb-6">
                    {question.options.map((option, index) => {
                      const isSelected = selectedAnswer === index;
                      const isCorrect = index === question.correctAnswer;
                      const showCorrect = showResult && isCorrect;
                      const showWrong = showResult && isSelected && !isCorrect;

                      return (
                        <motion.button
                          key={index}
                          onClick={() => !showResult && setSelectedAnswer(index)}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            showCorrect
                              ? 'bg-green-100 border-green-500'
                              : showWrong
                              ? 'bg-red-100 border-red-500'
                              : isSelected
                              ? 'bg-amber-100 border-amber-500'
                              : 'bg-white/70 border-amber-200 hover:border-amber-400 hover:bg-amber-50'
                          }`}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{
                            x: 0,
                            opacity: 1,
                            scale: showWrong ? [1, 1.02, 0.98, 1.02, 1] : 1,
                          }}
                          transition={{
                            delay: 0.5 + index * 0.1,
                            scale: { duration: 0.5 },
                          }}
                          disabled={showResult}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex-shrink-0 size-6 rounded-full border-2 flex items-center justify-center ${
                                showCorrect
                                  ? 'border-green-500 bg-green-500'
                                  : showWrong
                                  ? 'border-red-500 bg-red-500'
                                  : isSelected
                                  ? 'border-amber-500 bg-amber-500'
                                  : 'border-gray-300'
                              }`}
                            >
                              {showCorrect && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: 'spring' }}
                                >
                                  <Flower2 className="size-4 text-white" />
                                </motion.div>
                              )}
                              {showWrong && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: 'spring' }}
                                >
                                  <X className="size-4 text-white" />
                                </motion.div>
                              )}
                              {!showResult && isSelected && (
                                <Flower2 className="size-3 text-white" />
                              )}
                            </div>
                            <span className="flex-1 text-gray-800">{option}</span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Result explanation */}
                  <AnimatePresence>
                    {showResult && (
                      <motion.div
                        className={`border-2 rounded-lg p-4 mb-6 ${
                          selectedAnswer === question.correctAnswer
                            ? 'bg-green-50 border-green-300'
                            : 'bg-orange-50 border-orange-300'
                        }`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        {selectedAnswer === question.correctAnswer ? (
                          <>
                            <motion.div
                              className="flex items-center gap-2 mb-2"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring' }}
                            >
                              <div className="bg-green-500 rounded-full p-2">
                                <Flower2 className="size-6 text-white" />
                              </div>
                              <span className="text-green-800 font-bold text-lg">Chính xác!</span>
                            </motion.div>
                            <p className="text-sm text-green-800">{question.explanation}</p>
                            {/* Halo effect */}
                            <motion.div
                              className="absolute -top-10 left-1/2 -translate-x-1/2"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ type: 'spring' }}
                            >
                              <div className="relative">
                                {[...Array(8)].map((_, i) => (
                                  <motion.div
                                    key={i}
                                    className="absolute size-2 bg-yellow-400 rounded-full"
                                    style={{
                                      left: '50%',
                                      top: '50%',
                                    }}
                                    animate={{
                                      x: Math.cos((i * Math.PI) / 4) * 40,
                                      y: Math.sin((i * Math.PI) / 4) * 40,
                                      opacity: [0, 1, 0],
                                    }}
                                    transition={{
                                      duration: 1.5,
                                      repeat: Infinity,
                                      delay: i * 0.1,
                                    }}
                                  />
                                ))}
                              </div>
                            </motion.div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="bg-orange-500 rounded-full p-2">
                                <BookOpen className="size-6 text-white" />
                              </div>
                              <span className="text-orange-800 font-bold text-lg">Học hỏi thêm!</span>
                            </div>
                            <p className="text-sm text-orange-800">{question.explanation}</p>
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Action buttons */}
                  {!showResult && (
                    <div className="flex gap-3">
                      <motion.button
                        onClick={handleSubmit}
                        disabled={selectedAnswer === null}
                        className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                        whileHover={{ scale: selectedAnswer !== null ? 1.02 : 1 }}
                        whileTap={{ scale: selectedAnswer !== null ? 0.98 : 1 }}
                      >
                        Xác nhận
                      </motion.button>
                      <motion.button
                        onClick={() => setShowHint(!showHint)}
                        className="px-6 py-3 bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold rounded-lg transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Lightbulb className="size-5" />
                      </motion.button>
                      <motion.button
                        onClick={handleClose}
                        className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <BookOpen className="size-5" />
                      </motion.button>
                    </div>
                  )}
                </div>

                {/* Decorative bottom border */}
                <div className="h-4 bg-gradient-to-r from-amber-700 via-red-800 to-amber-700" />
              </div>

              {/* Floating lotus petals around modal */}
              {showResult && selectedAnswer === question.correctAnswer && (
                <>
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={`float-${i}`}
                      className="absolute"
                      style={{
                        left: `${50 + Math.cos((i * 2 * Math.PI) / 12) * 60}%`,
                        top: `${50 + Math.sin((i * 2 * Math.PI) / 12) * 60}%`,
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 1, 1, 0],
                        opacity: [0, 1, 1, 0],
                        rotate: [0, 180, 360],
                        y: [0, -20, -40],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.1,
                      }}
                    >
                      <Flower2 className="size-6 text-yellow-400" />
                    </motion.div>
                  ))}
                </>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}