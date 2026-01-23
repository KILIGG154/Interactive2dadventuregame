import { motion } from 'motion/react';
import { Flower2 } from 'lucide-react';

interface ProgressBarProps {
  completionPercentage: number;
  currentEra: string;
}

export function ProgressBar({ completionPercentage, currentEra }: ProgressBarProps) {
  const eras = [
    { name: 'Lý - Trần', period: '11-14' },
    { name: 'Tây Sơn', period: '18' },
    { name: 'Cận đại', period: '19-20' },
    { name: 'Hiện đại', period: '21' },
  ];

  return (
    <div className="w-full h-20 bg-gradient-to-b from-amber-100 to-amber-50 border-b-4 border-amber-700 shadow-lg">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center gap-6">
        {/* Title */}
        <motion.div
          className="flex items-center gap-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <Flower2 className="size-6 text-amber-700" />
          <div>
            <h1 className="text-sm font-bold text-amber-900">Hành Trình Phật Giáo</h1>
            <p className="text-xs text-amber-700">Việt Nam qua các thời kỳ</p>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="flex-1 relative">
          <div className="flex items-center justify-between relative">
            {/* Progress line */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-amber-200 rounded-full">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>

            {/* Era markers */}
            {eras.map((era, index) => {
              const isCurrent = era.name === currentEra;
              const progress = (index / (eras.length - 1)) * 100;
              const isPassed = completionPercentage >= progress;

              return (
                <motion.div
                  key={era.name}
                  className="relative z-10 flex flex-col items-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1, type: 'spring' }}
                >
                  {/* Marker */}
                  <motion.div
                    className={`size-8 rounded-full border-3 flex items-center justify-center ${
                      isPassed
                        ? 'bg-gradient-to-br from-amber-500 to-orange-500 border-white'
                        : 'bg-white border-amber-300'
                    }`}
                    animate={
                      isCurrent
                        ? {
                            scale: [1, 1.1, 1],
                            boxShadow: [
                              '0 0 0 0 rgba(251, 191, 36, 0.7)',
                              '0 0 0 10px rgba(251, 191, 36, 0)',
                              '0 0 0 0 rgba(251, 191, 36, 0)',
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {isCurrent && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      >
                        <Flower2 className="size-4 text-white" />
                      </motion.div>
                    )}
                    {isPassed && !isCurrent && <div className="size-3 bg-white rounded-full" />}
                  </motion.div>

                  {/* Label */}
                  <div className="mt-2 text-center">
                    <p className={`text-xs font-semibold ${isCurrent ? 'text-amber-900' : 'text-amber-700'}`}>
                      {era.name}
                    </p>
                    <p className="text-[10px] text-amber-600">TK {era.period}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Completion percentage */}
        <motion.div
          className="bg-white rounded-full px-6 py-2 border-2 border-amber-300 shadow-md"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
        >
          <p className="text-xs text-amber-700 font-medium">Giác ngộ</p>
          <motion.p
            className="text-xl font-bold text-amber-900"
            key={completionPercentage}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
          >
            {Math.round(completionPercentage)}%
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
