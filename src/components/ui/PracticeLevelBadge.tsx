import { motion } from 'motion/react';
import { getPracticeLevelForEra } from '../../game/progression';

interface PracticeLevelBadgeProps {
  eraName: string;
  progressPercent?: number;
}

export function PracticeLevelBadge({ eraName, progressPercent }: PracticeLevelBadgeProps) {
  const level = getPracticeLevelForEra(eraName);

  return (
    <motion.div
      className="bg-white rounded-full px-6 py-2 border-2 border-amber-300 shadow-md"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5, type: 'spring' }}
    >
      <p className="text-xs text-amber-700 font-medium">{level}</p>
      {typeof progressPercent === 'number' && (
        <motion.p
          className="text-xl font-bold text-amber-900"
          key={Math.round(progressPercent)}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
        >
          {Math.round(progressPercent)}%
        </motion.p>
      )}
    </motion.div>
  );
}

