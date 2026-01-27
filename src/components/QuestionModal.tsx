import { motion, AnimatePresence } from 'motion/react';
import { X, Lightbulb, BookOpen, Flower2, Clock } from 'lucide-react';
import { Question, Theory, DecisionMoment } from '../types/game';
import { useState, useEffect, useRef } from 'react';
import { MonkCharacter } from './MonkCharacter';
import { TheoryCard } from './TheoryCard';

const TIMER_SECONDS = 60;

interface QuestionModalProps {
  question: Question;
  isOpen: boolean;
  onClose: () => void;
  onAnswer: (correct: boolean) => void;
  theory?: Theory;
  // Nếu có DecisionMoment → chế độ câu hỏi tình huống, không đúng/sai tuyệt đối
  decisionMoment?: DecisionMoment;
}

export function QuestionModal({
  question,
  isOpen,
  onClose,
  onAnswer,
  theory,
  decisionMoment,
}: QuestionModalProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [monkEmotion, setMonkEmotion] = useState<'idle' | 'happy' | 'sad'>('idle');
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(TIMER_SECONDS);
  const [showTheoryPanel, setShowTheoryPanel] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const timeoutFiredRef = useRef(false);
  const timerPausedRef = useRef(false);
  const [decisionScore, setDecisionScore] = useState<number | null>(null);

  // Countdown timer: 60s, pause when theory panel open or result shown; on 0 → onAnswer(false) once
  useEffect(() => {
    if (!isOpen) return;
    setSecondsLeft(TIMER_SECONDS);
    setTimeUp(false);
    timeoutFiredRef.current = false;
    timerPausedRef.current = false;
    setDecisionScore(null);
  }, [isOpen, question.title]);

  useEffect(() => {
    if (!isOpen) return;
    const shouldTick = !showResult && !showTheoryPanel && !timeUp;
    timerPausedRef.current = !shouldTick;
    if (!shouldTick) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (!timeoutFiredRef.current) {
            timeoutFiredRef.current = true;
            setTimeUp(true);
            setShowResult(true);
            setMonkEmotion('sad');
            setTimeout(() => {
              onAnswer(false);
              onClose();
            }, 2000);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, showResult, showTheoryPanel, timeUp]);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    // Chế độ Decision Moment: không có đúng/sai tuyệt đối, chỉ có mức độ phù hợp + điểm
    if (decisionMoment) {
      const option = decisionMoment.options[selectedAnswer];
      const analysis = option ? decisionMoment.philosophicalAnalysis[option.id] : undefined;
      if (!analysis) return;

      setDecisionScore(analysis.score);
      setShowResult(true);

      if (analysis.score >= 80) {
        setMonkEmotion('happy');
      } else if (analysis.score >= 50) {
        setMonkEmotion('idle');
      } else {
        setMonkEmotion('sad');
      }

      // Báo về App: coi như “trả lời đúng” để mở tiến trình, nhưng App sẽ dùng score để tính điểm
      setTimeout(() => {
        onAnswer(true);
        handleClose();
      }, 3000);
      return;
    }

    // Chế độ câu hỏi trắc nghiệm thông thường
    const isCorrect = selectedAnswer === question.correctAnswer;

    if (isCorrect) {
      setShowResult(true);
      setMonkEmotion('happy');
      setTimeout(() => {
        onAnswer(true);
        handleClose();
      }, 2500);
    } else {
      setWrongAttempts((prev) => prev + 1);

      if (wrongAttempts === 0) {
        setShowResult(true);
        setMonkEmotion('sad');
        setShowHint(true);
        setTimeout(() => {
          setShowResult(false);
          setSelectedAnswer(null);
          setMonkEmotion('idle');
        }, 3000);
      } else {
        setShowResult(true);
        setMonkEmotion('sad');
        setTimeout(() => {
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
    setShowTheoryPanel(false);
    setTimeUp(false);
    setSecondsLeft(TIMER_SECONDS);
    setDecisionScore(null);
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

                {/* Timer */}
                <div
                  className={`absolute top-4 right-14 z-10 flex items-center gap-1.5 px-3 py-2 rounded-full font-mono font-bold ${
                    secondsLeft <= 10 ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  <Clock className="size-4" />
                  <span>
                    {Math.floor(secondsLeft / 60)}
                    :{(secondsLeft % 60).toString().padStart(2, '0')}
                  </span>
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

                  {/* Question / Scenario */}
                  <motion.div
                    className="bg-white/50 rounded-lg p-6 mb-6 border-2 border-amber-200"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-lg text-gray-800 font-medium text-center">
                      {decisionMoment ? decisionMoment.scenario : question.question}
                    </p>
                  </motion.div>

                  {/* Options */}
                  <div className="space-y-3 mb-6">
                    {(decisionMoment ? decisionMoment.options.map((o) => o.text) : question.options).map((option, index) => {
                      const isSelected = selectedAnswer === index;
                      const isCorrect = !decisionMoment && index === question.correctAnswer;
                      const showCorrect = showResult && isCorrect && !decisionMoment;
                      const showWrong = showResult && isSelected && !isCorrect && !decisionMoment;

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
                          decisionMoment
                            ? 'bg-blue-50 border-blue-300'
                            : selectedAnswer === question.correctAnswer
                            ? 'bg-green-50 border-green-300'
                            : 'bg-orange-50 border-orange-300'
                        }`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        {decisionMoment && decisionScore !== null ? (
                          <>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="bg-blue-500 rounded-full p-2">
                                <BookOpen className="size-6 text-white" />
                              </div>
                              <span className="text-blue-900 font-bold text-lg">
                                Phân tích lựa chọn của bạn
                              </span>
                            </div>
                            {(() => {
                              const option = decisionMoment.options[selectedAnswer!];
                              const analysis = option
                                ? decisionMoment.philosophicalAnalysis[option.id]
                                : undefined;
                              if (!analysis) return null;
                              return (
                                <>
                                  <p className="text-sm text-blue-900 mb-2">
                                    Độ phù hợp với tinh thần Trúc Lâm:{' '}
                                    <span className="font-semibold uppercase">
                                      {analysis.fitLevel === 'high'
                                        ? 'Rất phù hợp'
                                        : analysis.fitLevel === 'medium'
                                        ? 'Khá phù hợp'
                                        : 'Chưa phù hợp'}
                                    </span>
                                  </p>
                                  <p className="text-sm text-blue-900 mb-2">
                                    Điểm triết học (partial credit):{' '}
                                    <span className="font-semibold">{analysis.score}/100</span>
                                  </p>
                                  <p className="text-sm text-blue-900 leading-relaxed">
                                    {analysis.explanation}
                                  </p>
                                </>
                              );
                            })()}
                          </>
                        ) : selectedAnswer === question.correctAnswer ? (
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
                        ) : timeUp ? (
                          <>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="bg-red-500 rounded-full p-2">
                                <Clock className="size-6 text-white" />
                              </div>
                              <span className="text-red-800 font-bold text-lg">Hết thời gian!</span>
                            </div>
                            <p className="text-sm text-red-800">
                              Bạn có thể bấm lại checkpoint để thử lại.
                            </p>
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
                    <div className="flex flex-wrap gap-3">
                      <motion.button
                        onClick={handleSubmit}
                        disabled={selectedAnswer === null}
                        className="flex-1 min-w-[120px] bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                        whileHover={{ scale: selectedAnswer !== null ? 1.02 : 1 }}
                        whileTap={{ scale: selectedAnswer !== null ? 0.98 : 1 }}
                      >
                        Xác nhận
                      </motion.button>
                      {theory && (
                        <motion.button
                          onClick={() => setShowTheoryPanel(true)}
                          className="px-4 py-3 bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold rounded-lg transition-colors flex items-center gap-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <BookOpen className="size-5" />
                          Đọc lý thuyết
                        </motion.button>
                      )}
                      <motion.button
                        onClick={() => setShowHint(!showHint)}
                        className="px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold rounded-lg transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Lightbulb className="size-5" />
                      </motion.button>
                      <motion.button
                        onClick={handleClose}
                        className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Đóng
                      </motion.button>
                    </div>
                  )}
                </div>

                {/* Decorative bottom border */}
                <div className="h-4 bg-gradient-to-r from-amber-700 via-red-800 to-amber-700" />
              </div>

              {/* Theory panel overlay - timer pauses while open */}
              <AnimatePresence>
                {showTheoryPanel && theory && (
                  <>
                    <motion.div
                      className="fixed inset-0 bg-black/50 z-[60]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setShowTheoryPanel(false)}
                    />
                    <motion.div
                      className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] p-4 w-[min(88vmin,400px)] aspect-square flex flex-col"
                      initial={{ opacity: 0, scale: 0.96, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: 8 }}
                    >
                      <div
                        className="rounded-2xl shadow-2xl overflow-hidden border border-amber-200 flex flex-col flex-1 min-h-0"
                        style={{
                          background: 'linear-gradient(to bottom, #FFFBEB 0%, #FEF3C7 12%, #FFF 24%, #FFF 100%)',
                          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(251,191,36,0.2)',
                        }}
                      >
                        <div className="flex items-center justify-between px-4 py-3 border-b border-amber-200/80 bg-amber-50/80 flex-shrink-0">
                          <span className="text-xs font-medium uppercase tracking-wide text-amber-700/90">
                            Đang tạm dừng đồng hồ
                          </span>
                          <button
                            onClick={() => setShowTheoryPanel(false)}
                            className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm shadow-sm transition-colors"
                          >
                            Đóng
                          </button>
                        </div>
                        <div className="overflow-y-auto flex-1 min-h-0 p-4">
                          <TheoryCard theory={theory} compact />
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

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