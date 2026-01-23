import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface MonkCharacterProps {
  x: number;
  y: number;
  emotion?: 'idle' | 'happy' | 'sad' | 'walking';
  size?: 'small' | 'large';
}

export function MonkCharacter({ x, y, emotion = 'idle', size = 'small' }: MonkCharacterProps) {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  const scale = size === 'large' ? 2.5 : 1;

  // Chibi monk colors
  const robeColor = '#C4302B';
  const skinColor = '#FFD4A3';

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        zIndex: 100,
      }}
      initial={{ scale: 0 }}
      animate={{ scale }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <svg width="50" height="60" viewBox="0 0 50 60" className="filter drop-shadow-lg">
        {/* Shadow */}
        <ellipse cx="25" cy="56" rx="15" ry="3" fill="rgba(0,0,0,0.15)" />

        {/* Main character group with bounce */}
        <motion.g
          animate={
            emotion === 'idle' || emotion === 'happy'
              ? {
                  y: [0, -2, 0],
                }
              : emotion === 'walking'
              ? {
                  rotate: [-1, 1, -1],
                }
              : {}
          }
          transition={{
            duration: emotion === 'walking' ? 0.5 : 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Body - Simple robe */}
          <motion.path
            d="M 25 28 Q 18 30 16 48 Q 16 52 18 54 L 32 54 Q 34 52 34 48 Q 32 30 25 28 Z"
            fill={robeColor}
            stroke="#8B1A1A"
            strokeWidth="1.5"
            strokeLinejoin="round"
            animate={
              emotion === 'happy'
                ? {
                    scale: [1, 1.03, 1],
                  }
                : {}
            }
            transition={{ duration: 0.5, repeat: Infinity }}
            style={{ transformOrigin: '25px 40px' }}
          />

          {/* Robe collar */}
          <path
            d="M 20 28 Q 25 30 30 28"
            stroke="#8B1A1A"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Left arm - cute and stubby */}
          <motion.g
            animate={
              emotion === 'walking'
                ? {
                    rotate: [-20, 20, -20],
                  }
                : emotion === 'happy'
                ? {
                    rotate: [0, -30, 0],
                  }
                : {}
            }
            style={{ transformOrigin: '16px 35px' }}
            transition={{ duration: emotion === 'walking' ? 0.5 : 0.7, repeat: Infinity }}
          >
            <ellipse cx="14" cy="38" rx="3.5" ry="6" fill={robeColor} />
            <circle cx="13" cy="43" r="3" fill={skinColor} stroke="#D4A574" strokeWidth="1" />
          </motion.g>

          {/* Right arm - cute and stubby */}
          <motion.g
            animate={
              emotion === 'walking'
                ? {
                    rotate: [20, -20, 20],
                  }
                : emotion === 'happy'
                ? {
                    rotate: [0, 30, 0],
                  }
                : {}
            }
            style={{ transformOrigin: '34px 35px' }}
            transition={{ duration: emotion === 'walking' ? 0.5 : 0.7, repeat: Infinity }}
          >
            <ellipse cx="36" cy="38" rx="3.5" ry="6" fill={robeColor} />
            <circle cx="37" cy="43" r="3" fill={skinColor} stroke="#D4A574" strokeWidth="1" />
          </motion.g>

          {/* Head - large and round (chibi style) */}
          <circle cx="25" cy="18" r="11" fill={skinColor} stroke="#D4A574" strokeWidth="1.5" />

          {/* Cute ears */}
          <ellipse cx="14" cy="18" rx="2.5" ry="3.5" fill={skinColor} stroke="#D4A574" strokeWidth="1" />
          <ellipse cx="36" cy="18" rx="2.5" ry="3.5" fill={skinColor} stroke="#D4A574" strokeWidth="1" />
          
          {/* Inner ear detail */}
          <ellipse cx="14.5" cy="18" rx="1" ry="2" fill="#FFB88C" opacity="0.6" />
          <ellipse cx="35.5" cy="18" rx="1" ry="2" fill="#FFB88C" opacity="0.6" />

          {/* Eyes - big and cute */}
          <motion.g
            animate={
              isBlinking
                ? {
                    scaleY: [1, 0.1, 1],
                  }
                : {}
            }
            transition={{ duration: 0.15 }}
            style={{ transformOrigin: '25px 17px' }}
          >
            {emotion === 'happy' ? (
              <>
                {/* Happy eyes - cute curves */}
                <path
                  d="M 19 16 Q 21 18.5 23 16"
                  stroke="#000"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M 27 16 Q 29 18.5 31 16"
                  stroke="#000"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </>
            ) : emotion === 'sad' ? (
              <>
                {/* Sad eyes */}
                <circle cx="21" cy="17" r="2.5" fill="#000" />
                <circle cx="29" cy="17" r="2.5" fill="#000" />
                <path
                  d="M 19 15 Q 21 13.5 23 15"
                  stroke="#000"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M 27 15 Q 29 13.5 31 15"
                  stroke="#000"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </>
            ) : (
              <>
                {/* Normal eyes - big and sparkly */}
                <circle cx="21" cy="17" r="2.5" fill="#000" />
                <circle cx="29" cy="17" r="2.5" fill="#000" />
                <circle cx="21.8" cy="16.3" r="1" fill="#fff" />
                <circle cx="29.8" cy="16.3" r="1" fill="#fff" />
              </>
            )}
          </motion.g>

          {/* Cute blush */}
          {(emotion === 'happy' || emotion === 'idle') && (
            <>
              <ellipse cx="16" cy="20" rx="2" ry="1.5" fill="#FFB6C1" opacity="0.4" />
              <ellipse cx="34" cy="20" rx="2" ry="1.5" fill="#FFB6C1" opacity="0.4" />
            </>
          )}

          {/* Mouth */}
          {emotion === 'happy' ? (
            <motion.path
              d="M 20 22 Q 25 26 30 22"
              stroke="#000"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              animate={{
                d: ['M 20 22 Q 25 26 30 22', 'M 20 22 Q 25 27 30 22', 'M 20 22 Q 25 26 30 22'],
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          ) : emotion === 'sad' ? (
            <path
              d="M 20 25 Q 25 23 30 25"
              stroke="#000"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          ) : (
            <ellipse cx="25" cy="23" rx="2" ry="1" fill="#000" opacity="0.5" />
          )}

          {/* Bald head shine - chibi style */}
          <motion.ellipse
            cx="23"
            cy="12"
            rx="4"
            ry="3"
            fill="#fff"
            opacity="0.4"
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Small cute dots on head (stubble) */}
          <circle cx="20" cy="14" r="0.5" fill="#000" opacity="0.2" />
          <circle cx="23" cy="13.5" r="0.5" fill="#000" opacity="0.2" />
          <circle cx="26" cy="14" r="0.5" fill="#000" opacity="0.2" />
          <circle cx="30" cy="14" r="0.5" fill="#000" opacity="0.2" />

          {/* Prayer beads - smaller and on chest, not covering face */}
          <g>
            {[...Array(7)].map((_, i) => {
              const angle = (i * Math.PI * 2) / 7 - Math.PI / 2;
              const radius = 5;
              const cx = 25 + Math.cos(angle) * radius;
              const cy = 30 + Math.sin(angle) * radius * 0.6;
              return <circle key={i} cx={cx} cy={cy} r="1" fill="#8B4513" stroke="#654321" strokeWidth="0.5" />;
            })}
          </g>

          {/* Tears when sad */}
          {emotion === 'sad' && (
            <motion.g>
              <motion.ellipse
                cx="20"
                cy="20"
                rx="1"
                ry="2"
                fill="#87CEEB"
                opacity="0.8"
                animate={{
                  cy: [20, 28],
                  opacity: [0.8, 0],
                }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <motion.ellipse
                cx="30"
                cy="20"
                rx="1"
                ry="2"
                fill="#87CEEB"
                opacity="0.8"
                animate={{
                  cy: [20, 28],
                  opacity: [0.8, 0],
                }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
              />
            </motion.g>
          )}
        </motion.g>

        {/* Sparkles when happy */}
        {emotion === 'happy' && (
          <motion.g>
            {[...Array(6)].map((_, i) => (
              <motion.g key={i}>
                <motion.path
                  d={`M ${15 + i * 7} ${8 + (i % 2) * 3} l 1 3 l 1 -3 l 3 1 l -3 1 l 3 1 l -3 -1 l -1 3 l -1 -3 l -3 -1 l 3 -1 z`}
                  fill="#FFD700"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                />
              </motion.g>
            ))}
          </motion.g>
        )}

        {/* Happy aura */}
        {emotion === 'happy' && (
          <motion.circle
            cx="25"
            cy="30"
            r="20"
            fill="none"
            stroke="#FFD700"
            strokeWidth="2"
            opacity="0"
            animate={{
              r: [15, 25],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        )}
      </svg>
    </motion.div>
  );
}
