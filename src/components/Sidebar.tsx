import { motion } from 'motion/react';
import { Flame, Award, User } from 'lucide-react';
import { PlayerProgress } from '../types/game';
import { achievements } from '../data/gameData';

interface SidebarProps {
  progress: PlayerProgress;
}

export function Sidebar({ progress }: SidebarProps) {
  const experiencePercentage = (progress.score % 500) / 5;
  
  const earnedAchievements = achievements.filter((achievement) =>
    progress.achievements.includes(achievement.id)
  );

  return (
    <div className="w-80 h-full bg-gradient-to-b from-amber-50 to-orange-50 border-l-4 border-amber-700 shadow-2xl overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Player Avatar */}
        <motion.div
          className="text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <div className="relative inline-block">
            <motion.div
              className="size-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(251, 191, 36, 0.5)',
                  '0 0 30px rgba(251, 191, 36, 0.8)',
                  '0 0 20px rgba(251, 191, 36, 0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <User className="size-12 text-white" />
            </motion.div>
            {/* Level badge */}
            <motion.div
              className="absolute -bottom-2 -right-2 bg-gradient-to-r from-red-600 to-red-700 text-white size-10 rounded-full flex items-center justify-center border-3 border-white font-bold shadow-lg"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              {progress.level}
            </motion.div>
          </div>
          <motion.h3
            className="mt-4 text-xl font-bold text-amber-900"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Hành Giả
          </motion.h3>
          <p className="text-sm text-amber-700">Cấp độ {progress.level}</p>
        </motion.div>

        {/* Experience Bar */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-amber-800 font-semibold">Kinh nghiệm</span>
            <span className="text-amber-600">{progress.score % 500}/500</span>
          </div>
          <div className="h-3 bg-amber-200 rounded-full overflow-hidden border-2 border-amber-300">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500"
              initial={{ width: 0 }}
              animate={{ width: `${experiencePercentage}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        {/* Wisdom Points */}
        <motion.div
          className="bg-white/70 rounded-lg p-4 border-2 border-amber-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-3">
              <Flame className="size-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600">Điểm trí tuệ</p>
              <motion.p
                className="text-2xl font-bold text-amber-900"
                key={progress.score}
                initial={{ scale: 1.5, color: '#FFD700' }}
                animate={{ scale: 1, color: '#78350F' }}
                transition={{ duration: 0.5 }}
              >
                {progress.score}
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Recent Achievements */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h4 className="text-sm font-bold text-amber-900 flex items-center gap-2">
            <Award className="size-4" />
            Thành tựu gần nhất
          </h4>
          <div className="space-y-2">
            {earnedAchievements.slice(-3).map((achievement, index) => (
              <motion.div
                key={achievement.id}
                className="bg-white/70 rounded-lg p-3 border-2 border-green-200 flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02, borderColor: '#22c55e' }}
              >
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-800">{achievement.name}</p>
                  <p className="text-[10px] text-gray-600">{achievement.description}</p>
                </div>
              </motion.div>
            ))}
            {earnedAchievements.length === 0 && (
              <p className="text-xs text-gray-500 text-center py-4">
                Chưa có thành tựu nào. Hãy bắt đầu hành trình!
              </p>
            )}
          </div>
        </motion.div>

        {/* Mini Map */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h4 className="text-sm font-bold text-amber-900">Bản đồ tổng quan</h4>
          <div className="bg-white/70 rounded-lg p-4 border-2 border-amber-200">
            <div className="space-y-2">
              {['Lý - Trần', 'Tây Sơn', 'Cận đại', 'Hiện đại'].map((era, index) => {
                const isActive = index === 0;
                const isCompleted = false;
                
                return (
                  <div key={era} className="flex items-center gap-2">
                    <div
                      className={`size-3 rounded-full ${
                        isCompleted
                          ? 'bg-green-500'
                          : isActive
                          ? 'bg-amber-500 animate-pulse'
                          : 'bg-gray-300'
                      }`}
                    />
                    <span className={`text-xs ${isActive ? 'font-bold text-amber-900' : 'text-gray-600'}`}>
                      {era}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-3 border-2 border-blue-300">
            <p className="text-xs text-blue-800">Đã hoàn thành</p>
            <p className="text-2xl font-bold text-blue-900">{progress.completedCheckpoints.length}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg p-3 border-2 border-purple-300">
            <p className="text-xs text-purple-800">Thành tựu</p>
            <p className="text-2xl font-bold text-purple-900">{earnedAchievements.length}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
