import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface CompletionCelebrationProps {
  isVisible: boolean;
}

export function CompletionCelebration({ isVisible }: CompletionCelebrationProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    if (isVisible) {
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2
      }));
      setParticles(newParticles);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-4 h-4 text-yellow-400 text-2xl"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          initial={{ opacity: 0, scale: 0, y: 50 }}
          animate={{ 
            opacity: [0, 1, 1, 0], 
            scale: [0, 1.5, 1, 0],
            y: [50, -100],
            rotate: [0, 360]
          }}
          transition={{
            duration: 4,
            delay: particle.delay,
            ease: "easeOut"
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Lotus petals */}
      {Array.from({ length: 12 }, (_, i) => (
        <motion.div
          key={`lotus-${i}`}
          className="absolute text-6xl text-pink-300 opacity-70"
          style={{
            left: '50%',
            top: '50%',
          }}
          initial={{ 
            scale: 0,
            x: -24,
            y: -24
          }}
          animate={{
            scale: [0, 1, 0],
            x: [
              -24,
              -24 + Math.cos((i / 12) * 2 * Math.PI) * 200,
            ],
            y: [
              -24,
              -24 + Math.sin((i / 12) * 2 * Math.PI) * 200,
            ],
            rotate: [0, 360]
          }}
          transition={{
            duration: 3,
            delay: i * 0.1,
            ease: "easeOut"
          }}
        >
          🌸
        </motion.div>
      ))}

      {/* Golden light rays */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute left-1/2 top-1/2 origin-bottom"
          style={{
            width: '2px',
            height: '400px',
            background: 'linear-gradient(to top, transparent, #fbbf24, transparent)',
            transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ 
            scaleY: [0, 1, 0], 
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: 2,
            delay: 0.5 + i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
