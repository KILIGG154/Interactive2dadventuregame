import { motion } from 'motion/react';
import { Checkpoint } from '../types/game';

interface PathConnectionProps {
  from: Checkpoint;
  to: Checkpoint;
  isActive: boolean;
}

export function PathConnection({ from, to, isActive }: PathConnectionProps) {
  const fromX = from.x;
  const fromY = from.y;
  const toX = to.x;
  const toY = to.y;

  // Calculate control points for curved path
  const midX = (fromX + toX) / 2;
  const midY = (fromY + toY) / 2;
  const offset = 5; // Curve offset
  
  const controlX = midX + offset;
  const controlY = midY - offset;

  const pathD = `M ${fromX} ${fromY} Q ${controlX} ${controlY} ${toX} ${toY}`;

  const getStrokeColor = () => {
    if (to.status === 'completed') return '#D4A574';
    if (isActive) return '#D4A574';
    return '#E5D4C1';
  };

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {/* Main path */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={getStrokeColor()}
        strokeWidth="0.3"
        strokeDasharray={isActive ? '2 2' : '0'}
        initial={{ pathLength: to.status === 'locked' ? 0 : 1 }}
        animate={{ pathLength: to.status === 'locked' ? 0 : 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />

      {/* Animated particles along path */}
      {isActive && to.status !== 'locked' && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.circle
              key={i}
              r="0.4"
              fill="#FFD700"
              initial={{ offsetDistance: '0%', opacity: 0 }}
              animate={{
                offsetDistance: '100%',
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.6,
                ease: 'linear',
              }}
              style={{
                offsetPath: `path('${pathD}')`,
              }}
            >
              <animateMotion dur="2s" repeatCount="indefinite" begin={`${i * 0.6}s`}>
                <mpath href={`#path-${from.id}-${to.id}`} />
              </animateMotion>
            </motion.circle>
          ))}
        </>
      )}

      {/* Hidden path for animation */}
      <path id={`path-${from.id}-${to.id}`} d={pathD} fill="none" />
    </svg>
  );
}
