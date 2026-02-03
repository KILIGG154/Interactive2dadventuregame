import { ShieldAlert, User, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { validatePlayerName, type NameValidationErrorCode } from '../game/nameValidation';
import type { LeaderboardEntry } from '../types/game';

interface NameEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  existingEntries: LeaderboardEntry[];
}

export function NameEntryModal({ isOpen, onClose, onSubmit, existingEntries }: NameEntryModalProps) {
  const [name, setName] = useState('');
  const [touched, setTouched] = useState(false);
  const [errorCode, setErrorCode] = useState<NameValidationErrorCode | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setTouched(false);
      setErrorCode(null);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    setTouched(true);
    const result = validatePlayerName(name, existingEntries);
    if (!result.valid) {
      setErrorCode(result.errorCode ?? null);
      return;
    }
    setErrorCode(null);
    onSubmit(result.normalizedName ?? name.trim());
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const renderErrorMessage = () => {
    if (!touched || !errorCode) return null;
    let message = '';
    switch (errorCode) {
      case 'too_short':
        message = 'Tên cần dài ít nhất 2 ký tự.';
        break;
      case 'too_long':
        message = 'Tên không được dài quá 20 ký tự.';
        break;
      case 'duplicate':
        message = 'Tên này đã có trong bảng xếp hạng, hãy chọn tên khác.';
        break;
      case 'profanity':
        message = 'Vui lòng chọn tên lịch sự, không chứa từ ngữ nhạy cảm.';
        break;
      default:
        message = 'Tên không hợp lệ, vui lòng thử lại.';
    }
    return (
      <div className="mt-2 flex items-start gap-2 text-xs text-red-700">
        <ShieldAlert className="size-4 mt-0.5" />
        <p>{message}</p>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              className="relative max-w-sm sm:max-w-md"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            >
              <div
                className="relative rounded-2xl shadow-2xl overflow-hidden border-4 bg-white"
                style={{ borderColor: '#8B4513' }}
              >
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 px-4 sm:px-5 py-4 border-b-4 border-[#8B4513]/20 relative">
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-red-100 hover:bg-red-200 rounded-full p-1.5 sm:p-2 transition-colors flex-shrink-0"
                    aria-label="Đóng"
                  >
                    <X className="size-4 sm:size-5 text-red-800" />
                  </button>
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-full p-2 sm:p-2.5 shadow-lg">
                      <User className="size-5 sm:size-6 text-white" />
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-base sm:text-lg font-bold text-[#8B4513]">
                        Đặt tên người chơi
                      </h2>
                      <p className="text-[10px] sm:text-[11px] text-[#8B4513]/70 leading-snug">
                        Tên này sẽ dùng để xếp hạng trên máy của bạn.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-5 py-4 bg-[#F5E6D3]">
                  <div className="bg-white/90 rounded-xl p-4 border-2 border-amber-200 space-y-3">
                    <p className="text-sm font-semibold text-amber-900 mb-2">
                      Nhập tên hiển thị của bạn
                    </p>
                    <div className="flex gap-3 items-center">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => setTouched(true)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ví dụ: Minh Nam"
                        className="flex-1 px-6 py-3 rounded-lg border-2 border-amber-300 bg-white focus:outline-none focus:border-amber-500 text-sm"
                        maxLength={40}
                      />
                      <button
                        onClick={handleSubmit}
                        className="px-12 py-3 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-sm shadow-lg whitespace-nowrap"
                      >
                        Bắt đầu
                      </button>
                    </div>
                    <p className="text-[11px] text-amber-800">
                      Tên dài 2–20 ký tự, không trùng với người chơi khác và không chứa từ ngữ nhạy cảm.
                    </p>
                    {renderErrorMessage()}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

