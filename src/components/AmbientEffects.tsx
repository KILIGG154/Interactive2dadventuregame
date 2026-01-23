import { motion } from 'motion/react';

export function AmbientEffects() {
  return (
    <>
      {/* Floating candles */}
      <div className="absolute top-20 left-20">
        <motion.div
          className="relative"
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Candle */}
          <div className="w-3 h-12 bg-gradient-to-b from-amber-200 to-amber-400 rounded-sm" />
          {/* Flame */}
          <motion.div
            className="absolute -top-4 left-1/2 -translate-x-1/2"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
            }}
          >
            <svg width="16" height="20" viewBox="0 0 16 20">
              <path
                d="M8,2 Q10,8 8,18 Q6,8 8,2 Z"
                fill="url(#flame-gradient)"
              />
              <defs>
                <linearGradient id="flame-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFF4E6" />
                  <stop offset="50%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#FF8C00" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
          {/* Glow */}
          <motion.div
            className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full blur-md"
            style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.6) 0%, transparent 70%)' }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
            }}
          />
        </motion.div>
      </div>

      {/* Prayer flags */}
      <div className="absolute top-10 right-40">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="inline-block w-8 h-6 mx-1"
            style={{
              background: ['#C4302B', '#D4A574', '#4A7C59', '#4169E1', '#9370DB'][i],
              opacity: 0.7,
            }}
            animate={{
              rotateY: [0, 10, 0, -10, 0],
              scaleY: [1, 0.95, 1],
            }}
            transition={{
              duration: 2 + i * 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Incense smoke */}
      <div className="absolute bottom-40 right-20">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 left-0 w-1 h-20 bg-gradient-to-t from-gray-400/40 to-transparent rounded-full blur-sm"
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: -60,
              x: [0, 10, -10, 0],
              opacity: [0, 0.6, 0],
              scaleX: [1, 1.5, 2],
            }}
            transition={{
              duration: 4,
              delay: i * 1.3,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Floating lotus leaves in water */}
      <div className="absolute bottom-10 left-1/4">
        <motion.svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          animate={{
            rotate: [0, 5, 0, -5, 0],
            y: [0, -3, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ellipse cx="30" cy="30" rx="25" ry="20" fill="#4A7C59" opacity="0.6" />
          <path
            d="M30,10 Q35,20 30,30 Q25,20 30,10 Z"
            fill="#6B8E6F"
            opacity="0.7"
          />
        </motion.svg>
      </div>

      {/* Sparkles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute size-1 bg-yellow-300 rounded-full"
          style={{
            left: `${10 + (i * 6)}%`,
            top: `${20 + Math.sin(i) * 30}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Ripples in water */}
      <div className="absolute bottom-5 left-1/3">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`ripple-${i}`}
            className="absolute w-20 h-4 border-2 border-blue-300/30 rounded-full"
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              scale: [0, 2, 3],
              opacity: [0.5, 0.3, 0],
            }}
            transition={{
              duration: 3,
              delay: i * 1,
              repeat: Infinity,
            }}
          />
        ))}
      </div>
    </>
  );
}
