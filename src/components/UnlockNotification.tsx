import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';

interface UnlockNotificationProps {
  periodName: string;
  isVisible: boolean;
  onClose: () => void;
}

export function UnlockNotification({ periodName, isVisible, onClose }: UnlockNotificationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-32 right-8 z-50 bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 rounded-xl shadow-2xl border-2 border-white max-w-sm"
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-2 rounded-full">
              <Trophy size={20} className="text-yellow-300" />
            </div>
            <h3 className="font-bold text-lg">Mở khóa giai đoạn mới!</h3>
          </div>
          
          <p className="text-green-100 mb-3">
            🏛️ <strong>{periodName}</strong> đã được thêm vào thư viện hành trình
          </p>
          
          <div className="flex items-center gap-2 text-sm text-green-100">
            <BookOpen size={16} />
            <span>Khám phá chi tiết trong thư viện</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
