import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Users, Calendar, Lightbulb, MapPin, Award, Lock } from 'lucide-react';
import { useState } from 'react';
import { PhilosophicalPeriod, Checkpoint } from '../types/game';
import { philosophicalPeriods, getUnlockedPeriods } from '../data/philosophicalPeriodsData';

interface JourneyLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedCheckpoints: string[];
  totalCheckpoints: number;
}

export function JourneyLibraryModal({ 
  isOpen, 
  onClose, 
  completedCheckpoints, 
  totalCheckpoints 
}: JourneyLibraryModalProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<PhilosophicalPeriod | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'details'>('overview');
  
  const unlockedPeriods = getUnlockedPeriods(completedCheckpoints, totalCheckpoints);
  const completionRate = Math.round((completedCheckpoints.length / totalCheckpoints) * 100);

  const formatWWWWH = (period: PhilosophicalPeriod) => ({
    what: period.what,
    who: period.who,
    why: period.why,
    how: period.how,
    when: period.when
  });
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed top-4 left-4 right-4 bottom-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-2xl z-[9999] overflow-hidden border-2 border-amber-200 flex flex-col"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >            {/* Header */}
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 relative flex-shrink-0">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors z-10"
              >
                <X size={24} />
              </button>
              
              <div className="flex items-center gap-4">
                <BookOpen size={32} className="text-amber-100" />
                <div>
                  <h2 className="text-3xl font-bold">Thư Viện Hành Trình</h2>
                  <p className="text-amber-100 text-lg">
                    Các Mốc Phát Triển Triết Học Phật Giáo Việt Nam
                  </p>
                </div>
              </div>
              
              {/* Progress */}
              <div className="mt-4 bg-white/20 rounded-full p-1">
                <div 
                  className="bg-white rounded-full px-4 py-2 text-amber-600 font-semibold transition-all duration-500"
                  style={{ width: `${Math.max(15, completionRate)}%` }}
                >
                  {completionRate}% Hoàn thành
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar - Periods List */}
              <div className="w-1/3 bg-white/60 border-r border-amber-200 p-4 overflow-y-auto">
                <h3 className="text-xl font-bold text-amber-800 mb-4 flex items-center gap-2">
                  <Calendar size={20} />
                  Các Giai Đoạn
                </h3>
                
                <div className="space-y-3">
                  {philosophicalPeriods.map((period, index) => {
                    const isUnlocked = unlockedPeriods.includes(period.id);
                    
                    return (
                      <motion.div
                        key={period.id}
                        className={`
                          relative p-4 rounded-xl border-2 cursor-pointer transition-all
                          ${isUnlocked 
                            ? 'border-amber-300 bg-gradient-to-r from-white to-amber-50 hover:shadow-md' 
                            : 'border-gray-300 bg-gray-100 opacity-60'
                          }
                          ${selectedPeriod?.id === period.id ? 'ring-2 ring-amber-500' : ''}
                        `}
                        onClick={() => isUnlocked && setSelectedPeriod(period)}
                        whileHover={isUnlocked ? { scale: 1.02 } : {}}
                        whileTap={isUnlocked ? { scale: 0.98 } : {}}
                      >
                        {!isUnlocked && (
                          <div className="absolute top-2 right-2">
                            <Lock size={16} className="text-gray-500" />
                          </div>
                        )}
                        
                        <div className="flex items-center gap-3 mb-2">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: isUnlocked ? period.color : '#ccc' }}
                          />
                          <span className="text-sm text-gray-600 font-medium">
                            {period.period}
                          </span>
                        </div>
                        
                        <h4 className={`font-bold text-lg mb-1 ${isUnlocked ? 'text-amber-800' : 'text-gray-500'}`}>
                          {period.name}
                        </h4>
                        
                        <p className={`text-sm ${isUnlocked ? 'text-gray-700' : 'text-gray-400'}`}>
                          {period.what.length > 80 ? period.what.substring(0, 80) + '...' : period.what}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                {!selectedPeriod ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <BookOpen size={64} className="mx-auto mb-4 text-gray-400" />
                      <h3 className="text-2xl font-bold mb-2">Chọn một giai đoạn</h3>
                      <p className="text-lg">để khám phá chi tiết hành trình phát triển triết học Phật giáo Việt Nam</p>
                      <p className="mt-4 text-amber-600 font-semibold">
                        Đã mở khóa: {unlockedPeriods.length}/{philosophicalPeriods.length} giai đoạn
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Period Header */}
                    <div className="mb-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div 
                          className="w-8 h-8 rounded-full"
                          style={{ backgroundColor: selectedPeriod.color }}
                        />
                        <div>
                          <h3 className="text-3xl font-bold text-amber-800">
                            {selectedPeriod.name}
                          </h3>
                          <p className="text-lg text-gray-600 font-semibold">
                            {selectedPeriod.period}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-6">
                      <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                          activeTab === 'overview'
                            ? 'bg-amber-600 text-white'
                            : 'bg-white text-amber-600 border border-amber-300'
                        }`}
                      >
                        5W1H Overview
                      </button>
                      <button
                        onClick={() => setActiveTab('details')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                          activeTab === 'details'
                            ? 'bg-amber-600 text-white'
                            : 'bg-white text-amber-600 border border-amber-300'
                        }`}
                      >
                        Chi Tiết
                      </button>
                    </div>

                    {/* Content based on active tab */}
                    {activeTab === 'overview' && (
                      <div className="space-y-6">
                        {/* 5W1H Format */}
                        {[
                          { key: 'what', label: 'GÌ (What)', icon: Lightbulb, color: 'bg-blue-500' },
                          { key: 'who', label: 'AI (Who)', icon: Users, color: 'bg-green-500' },
                          { key: 'why', label: 'TẠI SAO (Why)', icon: Award, color: 'bg-purple-500' },
                          { key: 'how', label: 'NHƯ THẾ NÀO (How)', icon: MapPin, color: 'bg-orange-500' },
                          { key: 'when', label: 'KHI NÀO (When)', icon: Calendar, color: 'bg-red-500' }
                        ].map(({ key, label, icon: Icon, color }) => (
                          <motion.div
                            key={key}
                            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <div className={`p-2 rounded-lg ${color} text-white`}>
                                <Icon size={20} />
                              </div>
                              <h4 className="text-xl font-bold text-gray-800">{label}</h4>
                            </div>
                            <div className="text-gray-700 leading-relaxed">
                              {key === 'who' ? (
                                <ul className="space-y-2">
                                  {(selectedPeriod[key] as string[]).map((person, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                      {person}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p>{selectedPeriod[key as keyof PhilosophicalPeriod] as string}</p>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'details' && (
                      <div className="space-y-6">
                        {/* Key Events */}
                        <motion.div 
                          className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Calendar className="text-blue-500" size={20} />
                            Sự Kiện Quan Trọng
                          </h4>
                          <ul className="space-y-3">
                            {selectedPeriod.keyEvents.map((event, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>
                                <span className="text-gray-700">{event}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>

                        {/* Monuments */}
                        <motion.div 
                          className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <MapPin className="text-green-500" size={20} />
                            Di Tích & Công Trình
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {selectedPeriod.monuments.map((monument, index) => (
                              <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200">
                                <span className="text-gray-700 font-medium">{monument}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>

                        {/* Philosophical Concepts */}
                        <motion.div 
                          className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Lightbulb className="text-purple-500" size={20} />
                            Tư Tưởng & Triết Lý
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {selectedPeriod.philosophicalConcepts.map((concept, index) => (
                              <span 
                                key={index} 
                                className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-4 py-2 rounded-full font-medium border border-purple-200"
                              >
                                {concept}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
