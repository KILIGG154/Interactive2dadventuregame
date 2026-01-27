import { motion } from 'motion/react';
import { BookOpen } from 'lucide-react';
import { Theory } from '../types/game';

interface TheoryCardProps {
  theory: Theory;
  compact?: boolean;
}

export function TheoryCard({ theory, compact = false }: TheoryCardProps) {
  const paragraphs = theory.content.split('\n').filter(Boolean);

  return (
    <motion.div
      className="rounded-xl overflow-hidden border border-amber-300/80 bg-white shadow-lg"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className={`${compact ? 'p-4' : 'p-6'}`}>
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0 bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg p-2 shadow-sm">
            <BookOpen className="size-5 text-white" />
          </div>
          <h3
            className={`font-bold text-amber-900 ${compact ? 'text-base' : 'text-lg'} leading-tight`}
          >
            {theory.title}
          </h3>
        </div>
        <div className="text-gray-900 space-y-2">
          {paragraphs.length > 0 ? (
            paragraphs.map((p, i) => (
              <p
                key={i}
                className={`leading-relaxed ${compact ? 'text-sm' : 'text-base'}`}
              >
                {p.trim()}
              </p>
            ))
          ) : (
            <p className={`leading-relaxed ${compact ? 'text-sm' : 'text-base'}`}>{theory.content}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
