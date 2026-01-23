import { motion, AnimatePresence } from 'motion/react';
import { Lock, Flower2, Bell, BookOpen, Check } from 'lucide-react';
import { Checkpoint as CheckpointType } from '../types/game';
import { useState } from 'react';

interface CheckpointProps {
  checkpoint: CheckpointType;
  onClick: () => void;
  onUnlockComplete?: () => void;
}

export function Checkpoint({ checkpoint, onClick, onUnlockComplete }: CheckpointProps) {
  const [isUnlocking, setIsUnlocking] = useState(false);

  const getIcon = () => {
    switch (checkpoint.icon) {
      case 'lotus':
        return <Flower2 className="size-6" />;
      case 'bell':
        return <Bell className="size-6" />;
      case 'sutra':
        return <BookOpen className="size-6" />;
    }
  };

  const getColors = () => {
    const eraColors: Record<string, { main: string; glow: string }> = {
      'ly-tran': { main: '#4A7C59', glow: '#D4A574' },
      'tay-son': { main: '#C4302B', glow: '#D4A574' },
      'can-dai': { main: '#9370DB', glow: '#E6E6FA' },
      'hien-dai': { main: '#4169E1', glow: '#87CEEB' },
    };
    return eraColors[checkpoint.era] || { main: '#D4A574', glow: '#FFD700' };
  };

  const colors = getColors();

  const handleClick = () => {
    console.log('Checkpoint handleClick called!', checkpoint.title, checkpoint.status);
    if (checkpoint.status === 'locked') {
      console.log('Checkpoint is locked, returning');
      return;
    }
    console.log('Calling parent onClick');
    onClick();
  };

  const triggerUnlock = () => {
    setIsUnlocking(true);
    setTimeout(() => {
      setIsUnlocking(false);
      onUnlockComplete?.();
    }, 3000);
  };

  return (
    <div
      className="absolute cursor-pointer group"
      style={{ left: `${checkpoint.x}%`, top: `${checkpoint.y}%` }}
      onClick={handleClick}
    >
      <motion.div
        className="relative"
        whileHover={checkpoint.status !== 'locked' ? { scale: 1.1 } : {}}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Checkpoint base - Rectangle with rounded corners */}
        <motion.div
          className="relative flex items-center justify-center px-6 py-4 rounded-xl"
          style={{
            backgroundColor: '#F5E6D3',
            border: `3px solid ${colors.main}`,
            boxShadow: `0 4px 12px rgba(0,0,0,0.15)`,
            opacity: checkpoint.status === 'locked' ? 0.4 : 1,
            minWidth: '80px',
          }}
          animate={
            checkpoint.status === 'active'
              ? {
                  borderColor: [colors.main, colors.glow, colors.main],
                  boxShadow: [
                    `0 4px 12px rgba(0,0,0,0.15)`,
                    `0 4px 20px ${colors.glow}80`,
                    `0 4px 12px rgba(0,0,0,0.15)`,
                  ],
                }
              : checkpoint.status === 'completed'
              ? {
                  backgroundColor: colors.main,
                }
              : {}
          }
          transition={{ duration: 2, repeat: checkpoint.status === 'active' ? Infinity : 0 }}
        >
          {/* Icon */}
          <div
            className="relative z-10"
            style={{ color: checkpoint.status === 'completed' ? '#F5E6D3' : colors.main }}
          >
            {checkpoint.status === 'locked' ? (
              <Lock className="size-6 text-gray-400" />
            ) : checkpoint.status === 'completed' ? (
              <Check className="size-6" />
            ) : (
              getIcon()
            )}
          </div>

          {/* Active glow effect */}
          {checkpoint.status === 'active' && (
            <>
              <motion.div
                className="absolute inset-0 rounded-xl blur-xl"
                style={{ backgroundColor: colors.glow }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {/* Floating particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute size-1 rounded-full"
                  style={{ backgroundColor: colors.glow }}
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 0,
                  }}
                  animate={{
                    x: Math.cos((i * Math.PI) / 4) * 30,
                    y: Math.sin((i * Math.PI) / 4) * 30 - 20,
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </>
          )}

          {/* Completed check glow */}
          {checkpoint.status === 'completed' && (
            <motion.div
              className="absolute inset-0 rounded-full blur-lg"
              style={{ backgroundColor: '#D4A574' }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          )}

          {/* Lock rotation animation */}
          {checkpoint.status === 'locked' && (
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="bg-yellow-500 rounded-full p-1">
                <Lock className="size-3 text-yellow-900" />
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Unlock animation overlay */}
        <AnimatePresence>
          {isUnlocking && (
            <motion.div className="absolute inset-0 pointer-events-none">
              {/* Lock shake and glow */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 1 }}
                animate={{
                  scale: [1, 1.2, 1.1, 1.2, 1],
                  rotate: [0, -10, 10, -10, 0],
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="bg-yellow-400 rounded-full p-4"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(250, 204, 21, 0.8)',
                      '0 0 40px rgba(250, 204, 21, 1)',
                      '0 0 20px rgba(250, 204, 21, 0.8)',
                    ],
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Lock className="size-8 text-yellow-900" />
                </motion.div>
              </motion.div>

              {/* Lotus petals explosion */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={`petal-${i}`}
                  className="absolute left-1/2 top-1/2"
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0,
                    opacity: 1,
                  }}
                  animate={{
                    x: Math.cos((i * 2 * Math.PI) / 15) * 80,
                    y: Math.sin((i * 2 * Math.PI) / 15) * 80,
                    scale: [0, 1.5, 0],
                    opacity: [1, 1, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 0.5,
                    ease: 'easeOut',
                  }}
                >
                  <Flower2 className="size-4 text-yellow-400" />
                </motion.div>
              ))}

              {/* Radial light burst */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, opacity: 1 }}
                animate={{
                  scale: [0, 3, 4],
                  opacity: [1, 0.5, 0],
                }}
                transition={{ duration: 1.5, delay: 0.5 }}
                style={{
                  background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
                  width: '100px',
                  height: '100px',
                }}
              />

              {/* Color transformation flash */}
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  backgroundColor: ['#gray', colors.glow, '#ffffff', colors.main],
                }}
                transition={{
                  duration: 2,
                  delay: 0.8,
                  times: [0, 0.3, 0.6, 1],
                }}
              />

              {/* Energy particles along path */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`energy-${i}`}
                  className="absolute left-1/2 top-1/2 size-2 rounded-full"
                  style={{ backgroundColor: colors.glow }}
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 0,
                  }}
                  animate={{
                    x: 100,
                    y: 0,
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 1,
                    delay: 2 + i * 0.1,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tooltip */}
        <AnimatePresence>
          <motion.div
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-gray-900/90 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100"
            initial={{ opacity: 0, y: -5 }}
            whileHover={{ opacity: 1, y: 0 }}
            style={{ zIndex: 100 }}
          >
            <div className="font-semibold">{checkpoint.title}</div>
            <div className="text-gray-300 text-[10px]">{checkpoint.description}</div>
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 size-2 bg-gray-900/90"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}