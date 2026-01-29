import { motion } from 'motion/react';
import { Check, Lock, Trophy, Star, Award } from 'lucide-react';
import type { LeaderboardEntry } from '../types/game';

interface Era {
  name: string;
  period: string;
  color: string;
  icon: string;
  startCheckpoint: number;
  endCheckpoint: number;
}

interface EraProgressTrackerProps {
  eras: Era[];
  selectedEra: string | null;
  completedCheckpoints: string[];
  allCheckpoints: any[];
  onEraSelect: (eraName: string) => void;
  score: number;
  level: number;
  achievements: string[];
  leaderboard?: LeaderboardEntry[];
}

export function EraProgressTracker({
  eras,
  selectedEra,
  completedCheckpoints,
  allCheckpoints,
  onEraSelect,
  score,
  level,
  achievements,
  leaderboard,
}: EraProgressTrackerProps) {
  const getEraProgress = (era: Era) => {
    const eraCheckpoints = allCheckpoints.slice(era.startCheckpoint, era.endCheckpoint + 1);
    const completed = eraCheckpoints.filter((cp) => completedCheckpoints.includes(cp.id)).length;
    const total = eraCheckpoints.length;
    const percentage = (completed / total) * 100;
    const isCompleted = completed === total;
    const isLocked = era.startCheckpoint > 0 && !isEraUnlocked(era);
    
    return { completed, total, percentage, isCompleted, isLocked };
  };

  const isEraUnlocked = (era: Era) => {
    if (era.startCheckpoint === 0) return true;
    
    const previousEraIndex = eras.findIndex(e => e.name === era.name) - 1;
    if (previousEraIndex < 0) return true;
    
    const previousEra = eras[previousEraIndex];
    const previousProgress = getEraProgress(previousEra);
    return previousProgress.isCompleted;
  };

  return (
    <div className="absolute right-8 top-[114px] z-30 w-80">{/* top-[114px] = 1cm + 2cm = 3cm cách header */}
      <motion.div 
        className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border-4"
        style={{ 
          borderColor: '#8B4513',
          maxHeight: 'calc(100vh - 120px)', // Giảm từ 64px xuống 120px để ngắn hơn
          overflowY: 'auto',
        }}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', delay: 0.3 }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-br from-amber-50 to-orange-50 p-6 border-b-4 border-[#8B4513]/20 z-10">
          <h2 className="text-2xl font-serif font-bold text-[#8B4513] mb-4 text-center">
            🙏 Hành Trình Tu Tập
          </h2>
          
          {/* Score & Level */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white/80 rounded-xl p-3 border-2 border-[#C4302B]/30">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="size-4 text-[#C4302B]" />
                <span className="text-xs text-gray-600">Điểm số</span>
              </div>
              <div className="text-2xl font-bold text-[#C4302B]">{score}</div>
            </div>
            
            <div className="bg-white/80 rounded-xl p-3 border-2 border-[#4A7C59]/30">
              <div className="flex items-center gap-2 mb-1">
                <Star className="size-4 text-[#4A7C59]" />
                <span className="text-xs text-gray-600">Cấp độ</span>
              </div>
              <div className="text-2xl font-bold text-[#4A7C59]">{level}</div>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="bg-white/80 rounded-xl p-3 border-2 border-[#8B4513]/30">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-[#8B4513]">Tổng tiến độ</span>
              <span className="text-xs font-bold text-[#8B4513]">
                {completedCheckpoints.length}/{allCheckpoints.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <motion.div
                className="h-2.5 rounded-full bg-gradient-to-r from-[#4A7C59] via-[#C4302B] to-[#4169E1]"
                initial={{ width: 0 }}
                animate={{ width: `${(completedCheckpoints.length / allCheckpoints.length) * 100}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </div>

        {/* Era Chain */}
        <div className="p-6">
          <h3 className="text-lg font-serif font-bold text-[#8B4513] mb-4 flex items-center gap-2">
            <span className="text-xl">📿</span>
            Chuỗi Giai Đoạn Lịch Sử
          </h3>
          
          <div className="space-y-4">
            {eras.map((era, index) => {
              const progress = getEraProgress(era);
              const isSelected = selectedEra === era.name;
              const isUnlocked = isEraUnlocked(era);

              return (
                <div key={era.name}>
                  {/* Connection line */}
                  {index > 0 && (
                    <div className="flex justify-center my-2">
                      <motion.div
                        className="w-1 h-8 rounded-full relative"
                        style={{
                          backgroundColor: progress.isCompleted ? era.color : '#E5D4C1',
                        }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: index * 0.2 }}
                      >
                        {/* Flowing animation */}
                        {progress.isCompleted && (
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: `linear-gradient(to bottom, transparent, ${era.color}, transparent)`,
                            }}
                            animate={{
                              y: ['-100%', '100%'],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                          />
                        )}
                      </motion.div>
                    </div>
                  )}

                  {/* Era card */}
                  <motion.button
                    onClick={() => {
                      if (!progress.isLocked) {
                        onEraSelect(era.name);
                      }
                    }}
                    className="w-full relative"
                    disabled={progress.isLocked}
                    whileHover={!progress.isLocked ? { scale: 1.02, x: 4 } : {}}
                    whileTap={!progress.isLocked ? { scale: 0.98 } : {}}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 }}
                  >
                    <div
                      className="relative p-4 rounded-xl border-3 transition-all"
                      style={{
                        backgroundColor: isSelected ? `${era.color}15` : '#F5E6D3',
                        borderColor: isSelected ? era.color : '#D4A574',
                        borderWidth: isSelected ? '3px' : '2px',
                        opacity: progress.isLocked ? 0.5 : 1,
                        cursor: progress.isLocked ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {/* Lock overlay */}
                      {progress.isLocked && (
                        <div className="absolute top-3 right-3">
                          <div className="bg-gray-500 rounded-full p-1.5">
                            <Lock className="size-3 text-white" />
                          </div>
                        </div>
                      )}

                      {/* Completed badge */}
                      {progress.isCompleted && (
                        <motion.div
                          className="absolute -top-2 -right-2"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', delay: index * 0.2 + 0.5 }}
                        >
                          <div 
                            className="rounded-full p-2 shadow-lg"
                            style={{ backgroundColor: era.color }}
                          >
                            <Check className="size-4 text-white" />
                          </div>
                        </motion.div>
                      )}

                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className="text-5xl flex-shrink-0">{era.icon}</div>

                        {/* Info */}
                        <div className="flex-1">
                          <h3 
                            className="font-serif font-bold text-lg mb-1"
                            style={{ color: era.color }}
                          >
                            {era.name}
                          </h3>
                          <p 
                            className="text-xs mb-3"
                            style={{ color: era.color, opacity: 0.7 }}
                          >
                            {era.period}
                          </p>

                          {/* Progress bar */}
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <motion.div
                              className="h-2 rounded-full relative overflow-hidden"
                              style={{ backgroundColor: era.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${progress.percentage}%` }}
                              transition={{ duration: 0.8, delay: index * 0.2 }}
                            >
                              {/* Shimmer effect */}
                              <motion.div
                                className="absolute inset-0"
                                style={{
                                  background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)`,
                                }}
                                animate={{
                                  x: ['-100%', '200%'],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  repeatDelay: 1,
                                }}
                              />
                            </motion.div>
                          </div>

                          {/* Progress text */}
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600">
                              {progress.completed}/{progress.total} hoàn thành
                            </span>
                            {isSelected && (
                              <motion.span 
                                className="text-xs font-bold"
                                style={{ color: era.color }}
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                ● Đang chơi
                              </motion.span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Active glow */}
                      {isSelected && !progress.isLocked && (
                        <motion.div
                          className="absolute inset-0 rounded-xl pointer-events-none"
                          style={{
                            border: `2px solid ${era.color}`,
                            boxShadow: `0 0 20px ${era.color}40, inset 0 0 20px ${era.color}10`,
                          }}
                          animate={{
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </div>
                  </motion.button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements section */}
        {achievements.length > 0 && (
          <div className="p-6 pt-0">
            <h3 className="text-lg font-serif font-bold text-[#8B4513] mb-3 flex items-center gap-2">
              <Award className="size-5 text-[#C4302B]" />
              Thành Tựu
            </h3>
            <div className="flex flex-wrap gap-2">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement}
                  className="px-3 py-1.5 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full border-2 border-[#C4302B]/30 text-xs font-bold text-[#8B4513]"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.1, type: 'spring' }}
                >
                  🏆 {achievement}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Leaderboard */}
        {leaderboard && leaderboard.length > 0 && (
          <div className="p-6 pt-0">
            <h3 className="text-lg font-serif font-bold text-[#8B4513] mb-3 flex items-center gap-2 whitespace-nowrap">
              <Trophy className="size-5 text-[#C4302B]" />
              Bảng Xếp Hạng
            </h3>
            <div className="space-y-2">
              {leaderboard.slice(0, 5).map((e, idx) => (
                <div
                  key={`${e.name}-${e.timestamp}-${idx}`}
                  className="bg-white/80 rounded-xl p-3 border-2 border-[#8B4513]/20 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-7 text-center font-bold text-[#8B4513]">{idx + 1}</div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-gray-900 truncate">{e.name}</div>
                      <div className="text-[11px] text-gray-600">Cấp độ {e.level}</div>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-[#C4302B]">{e.score}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}