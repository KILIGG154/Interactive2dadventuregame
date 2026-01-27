import { motion, AnimatePresence } from 'motion/react';
import { X, Users, Lightbulb, MapPin, Flame, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { Checkpoint } from '../types/game';
import { TheoryCard } from './TheoryCard';
import { eraRegions } from '../data/unifiedMapData';

interface LibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  checkpoints: Checkpoint[];
}

type Tab = 'figures' | 'philosophy' | 'monuments' | 'theory';

export function LibraryModal({ isOpen, onClose, checkpoints }: LibraryModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>('figures');
  const [expandedTheoryId, setExpandedTheoryId] = useState<string | null>(null);

  const figures = [
    {
      name: 'Thiền sư Vạn Hạnh',
      era: 'Lý (1012-1096)',
      contribution: 'Triết lý "Tứ đại giai không"',
      image: '👴',
    },
    {
      name: 'Trần Nhân Tông',
      era: 'Trần (1258-1308)',
      contribution: 'Sáng lập thiền phái Trúc Lâm',
      image: '🧘',
    },
    {
      name: 'Thích Nhất Hạnh',
      era: 'Hiện đại (1926-2022)',
      contribution: 'Phổ biến thiền chánh niệm toàn cầu',
      image: '🙏',
    },
  ];

  const philosophies = [
    {
      name: 'Thiền Trúc Lâm',
      period: 'Thế kỷ 13-14',
      description: 'Hòa quyện Thiền - Tịnh - Mật, gắn liền dân tộc',
    },
    {
      name: 'Phật giáo nhập thế',
      period: 'Thế kỷ 20-21',
      description: 'Phật giáo tham gia tích cực vào xã hội',
    },
    {
      name: 'Thiền chánh niệm',
      period: 'Đương đại',
      description: 'Sống tỉnh thức trong từng khoảnh khắc',
    },
  ];

  const monuments = [
    {
      name: 'Chùa Diên Hựu (Dâu)',
      location: 'Bắc Ninh',
      significance: 'Ngôi chùa cổ nhất Việt Nam',
      period: 'Thế kỷ 6',
    },
    {
      name: 'Núi Yên Tử',
      location: 'Quảng Ninh',
      significance: 'Cái nôi thiền phái Trúc Lâm',
      period: 'Thế kỷ 13',
    },
    {
      name: 'Chùa Thiên Mụ',
      location: 'Huế',
      significance: 'Biểu tượng cố đô, tháp Phước Duyên 7 tầng',
      period: 'Thế kỷ 17',
    },
    {
      name: 'Thiền viện Trúc Lâm',
      location: 'Đà Lạt',
      significance: 'Thiền viện hiện đại giữa thiên nhiên',
      period: 'Thế kỷ 20',
    },
  ];

  const tabs = [
    { id: 'figures' as Tab, label: 'Nhân vật', icon: Users },
    { id: 'philosophy' as Tab, label: 'Tư tưởng', icon: Lightbulb },
    { id: 'monuments' as Tab, label: 'Di tích', icon: MapPin },
    { id: 'theory' as Tab, label: 'Lý thuyết', icon: BookOpen },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              className="relative max-w-4xl w-full max-h-[80vh] bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-amber-700 to-orange-700 p-6 border-b-4 border-amber-900">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 rounded-full p-3">
                      <Flame className="size-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Thư viện Tri thức</h2>
                      <p className="text-sm text-amber-100">Kho tài liệu Phật giáo Việt Nam</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                  >
                    <X className="size-6 text-white" />
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mt-6">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    
                    return (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                          isActive
                            ? 'bg-white text-amber-900 shadow-lg'
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="size-5" />
                        <span>{tab.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-180px)]">
                <AnimatePresence mode="wait">
                  {activeTab === 'figures' && (
                    <motion.div
                      key="figures"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                      {figures.map((figure, index) => (
                        <motion.div
                          key={figure.name}
                          className="bg-white rounded-lg p-5 border-2 border-amber-200 hover:border-amber-400 transition-colors shadow-md"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, y: -5 }}
                        >
                          <div className="text-5xl mb-3 text-center">{figure.image}</div>
                          <h3 className="text-lg font-bold text-amber-900 mb-1">{figure.name}</h3>
                          <p className="text-sm text-amber-700 mb-2">{figure.era}</p>
                          <p className="text-sm text-gray-700">{figure.contribution}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'philosophy' && (
                    <motion.div
                      key="philosophy"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-4"
                    >
                      {philosophies.map((philosophy, index) => (
                        <motion.div
                          key={philosophy.name}
                          className="bg-white rounded-lg p-6 border-2 border-purple-200 hover:border-purple-400 transition-colors shadow-md"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.01 }}
                        >
                          <div className="flex items-start gap-4">
                            <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-full p-3">
                              <Lightbulb className="size-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-purple-900 mb-1">
                                {philosophy.name}
                              </h3>
                              <p className="text-sm text-purple-700 mb-2">{philosophy.period}</p>
                              <p className="text-gray-700">{philosophy.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'monuments' && (
                    <motion.div
                      key="monuments"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      {monuments.map((monument, index) => (
                        <motion.div
                          key={monument.name}
                          className="bg-white rounded-lg p-5 border-2 border-green-200 hover:border-green-400 transition-colors shadow-md"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-full p-2">
                              <MapPin className="size-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-green-900">{monument.name}</h3>
                              <p className="text-sm text-green-700">{monument.location}</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{monument.significance}</p>
                          <p className="text-xs text-gray-600 italic">{monument.period}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'theory' && (
                    <motion.div
                      key="theory"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                    >
                      {eraRegions.map((era, eraIndex) => {
                        const eraCheckpoints = checkpoints.slice(
                          era.startCheckpoint,
                          era.endCheckpoint + 1
                        ).filter((cp) => cp.theory);
                        if (eraCheckpoints.length === 0) return null;
                        return (
                          <div key={era.name}>
                            <h3
                              className="text-lg font-bold text-amber-900 mb-3 flex items-center gap-2"
                              style={{ color: era.color }}
                            >
                              <span>{era.icon}</span>
                              {era.name} ({era.period})
                            </h3>
                            <div className="space-y-3">
                              {eraCheckpoints.map((cp) => (
                                <div key={cp.id}>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setExpandedTheoryId(expandedTheoryId === cp.id ? null : cp.id)
                                    }
                                    className="w-full text-left flex items-center justify-between gap-2 p-3 rounded-lg bg-white border-2 border-amber-200 hover:border-amber-400 transition-colors"
                                  >
                                    <span className="font-semibold text-amber-900">{cp.title}</span>
                                    <span className="text-amber-600">
                                      {expandedTheoryId === cp.id ? '▼ Thu gọn' : '▶ Đọc'}
                                    </span>
                                  </button>
                                  <AnimatePresence>
                                    {expandedTheoryId === cp.id && cp.theory && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="mt-2 overflow-hidden"
                                      >
                                        <TheoryCard theory={cp.theory} />
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
