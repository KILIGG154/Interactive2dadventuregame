import { AnimatePresence, motion } from 'motion/react';
import { Trophy, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { LeaderboardEntry } from '../types/game';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  entries: LeaderboardEntry[];
  finalScore: number;
  finalLevel: number;
  onSubmitName: (name: string) => void;
  hasSubmitted: boolean;
  canSubmit?: boolean;
  initialName?: string;
  nameLocked?: boolean;
}

export function LeaderboardModal({
  isOpen,
  onClose,
  entries,
  finalScore,
  finalLevel,
  onSubmitName,
  hasSubmitted,
  canSubmit = true,
  initialName,
  nameLocked,
}: LeaderboardModalProps) {
  const [name, setName] = useState(initialName ?? '');
  const [touched, setTouched] = useState(false);

  const top10 = useMemo(() => entries.slice(0, 10), [entries]);
  const trimmed = name.trim();
  const isValid = trimmed.length >= 2 && trimmed.length <= 20;

  const submit = () => {
    setTouched(true);
    if (!canSubmit) return;
    if (nameLocked) {
      if (!initialName) return;
      onSubmitName(initialName);
      return;
    }
    if (!isValid) return;
    onSubmitName(trimmed);
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

          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              className="relative max-w-lg w-full"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div
                className="relative rounded-2xl shadow-2xl overflow-hidden border-4"
                style={{ borderColor: '#8B4513' }}
              >
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 border-b-4 border-[#8B4513]/20">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-full p-3 shadow-lg">
                        <Trophy className="size-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-serif font-bold text-[#8B4513] whitespace-nowrap">
                          Bảng xếp hạng
                        </h2>
                        <p className="text-xs text-[#8B4513]/70">
                          Điểm của bạn: <span className="font-bold">{finalScore}</span> • Cấp độ:{' '}
                          <span className="font-bold">{finalLevel}</span>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={onClose}
                      className="bg-red-100 hover:bg-red-200 rounded-full p-2 transition-colors"
                      aria-label="Đóng"
                    >
                      <X className="size-5 text-red-800" />
                    </button>
                  </div>
                </div>

                <div className="p-6 bg-[#F5E6D3]">
                  {!hasSubmitted ? (
                    <div className="mb-6 bg-white/80 rounded-xl p-4 border-2 border-amber-200">
                      {!canSubmit ? (
                        <>
                          <p className="text-sm font-bold text-amber-900">
                            Bạn cần hoàn thành toàn bộ hành trình để lưu điểm lên bảng xếp hạng.
                          </p>
                          <p className="text-xs text-amber-800/80 mt-2">
                            Bạn vẫn có thể xem Top 10, nhưng chỉ được lưu điểm khi hoàn thành.
                          </p>
                        </>
                      ) : nameLocked && initialName ? (
                        <>
                          <p className="text-sm font-semibold text-amber-900 mb-2">
                            Tên của bạn
                          </p>
                          <div className="flex items-center justify-between gap-3">
                            <div className="px-4 py-3 rounded-lg border-2 border-amber-300 bg-white text-sm font-semibold text-amber-900 flex-1">
                              {initialName}
                            </div>
                            <button
                              onClick={submit}
                              className="px-5 py-3 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold shadow-lg"
                            >
                              Lưu điểm
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="text-sm font-semibold text-amber-900 mb-2">
                            Nhập tên để lưu điểm
                          </p>
                          <div className="flex gap-3">
                            <input
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              onBlur={() => setTouched(true)}
                              placeholder="Ví dụ: Minh Nam"
                              className="flex-1 px-4 py-3 rounded-lg border-2 border-amber-300 bg-white focus:outline-none focus:border-amber-500"
                              maxLength={20}
                            />
                            <button
                              onClick={submit}
                              className="px-5 py-3 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold shadow-lg"
                            >
                              Lưu
                            </button>
                          </div>
                          {touched && !isValid && (
                            <p className="text-xs text-red-700 mt-2">
                              Tên cần từ 2–20 ký tự.
                            </p>
                          )}
                        </>
                      )}
                      <p className="text-[11px] text-amber-700 mt-2">
                        Lưu ý: Nếu bạn đã từng sai/hết giờ ở checkpoint nào đó, câu đó sẽ không cộng điểm khi làm lại.
                      </p>
                    </div>
                  ) : (
                    <div className="mb-6 bg-green-50 rounded-xl p-4 border-2 border-green-200">
                      <p className="text-sm font-bold text-green-800">
                        Đã lưu điểm của bạn vào bảng xếp hạng!
                      </p>
                    </div>
                  )}

                  <div className="bg-white/80 rounded-xl p-4 border-2 border-amber-200">
                    <p className="text-sm font-bold text-amber-900 mb-3">Top 10</p>
                    <div className="space-y-2">
                      {top10.map((e, idx) => (
                        <div
                          key={`${e.name}-${e.timestamp}-${idx}`}
                          className="flex items-center justify-between gap-3 bg-white rounded-lg px-3 py-2 border border-amber-100"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-7 text-center font-bold text-amber-900">
                              {idx + 1}
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-semibold text-gray-900 truncate">
                                {e.name}
                              </div>
                              <div className="text-[11px] text-gray-600">
                                Cấp độ {e.level}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm font-bold text-[#C4302B]">{e.score}</div>
                        </div>
                      ))}
                      {top10.length === 0 && (
                        <p className="text-xs text-gray-600 text-center py-4">
                          Chưa có ai trong bảng xếp hạng. Bạn là người đầu tiên!
                        </p>
                      )}
                    </div>
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

