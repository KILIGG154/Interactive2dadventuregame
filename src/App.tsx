import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, BookOpen, X } from 'lucide-react';
import { Checkpoint } from './components/Checkpoint';
import { MonkCharacter } from './components/MonkCharacter';
import { QuestionModal } from './components/QuestionModal';
import { ProgressBar } from './components/ProgressBar';
import { LibraryModal } from './components/LibraryModal';
import { UnlockNotification } from './components/UnlockNotification';
import { CompletionCelebration } from './components/CompletionCelebration';
import { ParticleSystem } from './components/ParticleSystem';
import { EraProgressTracker } from './components/EraProgressTracker';
import { unifiedMapCheckpoints, eraRegions } from './data/unifiedMapData';
import { decisionMoments } from './data/decisionMomentsData';
import { getUnlockedPeriods, philosophicalPeriods } from './data/philosophicalPeriodsData';
import { PlayerProgress, Checkpoint as CheckpointType } from './types/game';

function App() {
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<CheckpointType | null>(null);
  const [showLibrary, setShowLibrary] = useState(false);
  const [checkpoints, setCheckpoints] = useState<CheckpointType[]>(unifiedMapCheckpoints);
  const [selectedEra, setSelectedEra] = useState<string>('Lý - Trần'); // Start with first era
  const [monkPosition, setMonkPosition] = useState({ x: 15, y: 75 });
  const [isMonkMoving, setIsMonkMoving] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);  const [progress, setProgress] = useState<PlayerProgress>({
    currentCheckpoint: 'cp-1',
    completedCheckpoints: [],
    score: 0,
    level: 1,
    achievements: [],
  });
  const [unlockNotification, setUnlockNotification] = useState<{
    periodName: string;
    isVisible: boolean;
  }>({ periodName: '', isVisible: false });
  const [showLibraryHint, setShowLibraryHint] = useState(true);

  const handleCheckpointClick = (checkpoint: CheckpointType) => {
    console.log('Checkpoint clicked:', checkpoint);
    console.log('Checkpoint status:', checkpoint.status);
    console.log('Has question:', !!checkpoint.question);
    if (checkpoint.status === 'locked') {
      console.log('Checkpoint is locked!');
      return;
    }
    console.log('Opening question modal');
    setSelectedCheckpoint(checkpoint);
  };

  const moveMonkToCheckpoint = (targetX: number, targetY: number) => {
    setIsMonkMoving(true);
    
    const startX = monkPosition.x;
    const startY = monkPosition.y;
    const duration = 1500;
    const steps = 40;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progressValue = currentStep / steps;
      const easeProgress = 1 - Math.pow(1 - progressValue, 3);
      const newX = startX + (targetX - startX) * easeProgress;
      const newY = startY + (targetY - startY) * easeProgress;
      
      setMonkPosition({ x: newX, y: newY });

      if (currentStep >= steps) {
        clearInterval(interval);
        setIsMonkMoving(false);
      }
    }, duration / steps);
  };

  const handleAnswer = (correct: boolean) => {
    if (!selectedCheckpoint) return;

    // Nếu là Decision Moment → dùng score từ phân tích triết học thay vì đúng/sai đơn giản
    const dm = selectedCheckpoint.decisionMomentId
      ? decisionMoments.find((d) => d.id === selectedCheckpoint.decisionMomentId)
      : undefined;

    let scoreChange: number;
    if (dm && correct) {
      // Ở chế độ Decision Moment, QuestionModal đã xác nhận là một lựa chọn hợp lệ,
      // phần điểm chi tiết có thể được gán ở đây trong tương lai (hiện tại +100 để đơn giản).
      scoreChange = 100;
    } else {
      scoreChange = correct ? 100 : -20;
    }
    const newScore = Math.max(0, progress.score + scoreChange);
    const newLevel = Math.floor(newScore / 500) + 1;

    const updatedCheckpoints = checkpoints.map((cp) => {
      if (cp.id === selectedCheckpoint.id) {
        return { ...cp, status: 'completed' as const };
      }
      return cp;
    });

    const currentIndex = checkpoints.findIndex((cp) => cp.id === selectedCheckpoint.id);
    
    // Check if this is the last checkpoint of the current era
    const currentEra = eraRegions.find(
      (region) => currentIndex >= region.startCheckpoint && currentIndex <= region.endCheckpoint
    );
    const isLastCheckpointOfEra = currentEra && currentIndex === currentEra.endCheckpoint;
    
    if (currentIndex < checkpoints.length - 1) {
      updatedCheckpoints[currentIndex + 1].status = 'active';
      
      const nextCheckpoint = updatedCheckpoints[currentIndex + 1];
      moveMonkToCheckpoint(nextCheckpoint.x, nextCheckpoint.y);
    }

    setCheckpoints(updatedCheckpoints);    const newCompletedCheckpoints = [...progress.completedCheckpoints, selectedCheckpoint.id];
    const newAchievements = [...progress.achievements];

    // Check for newly unlocked periods
    const previousUnlocked = getUnlockedPeriods(progress.completedCheckpoints, checkpoints.length);
    const newUnlocked = getUnlockedPeriods(newCompletedCheckpoints, checkpoints.length);
    const newlyUnlocked = newUnlocked.filter(period => !previousUnlocked.includes(period));

    if (newCompletedCheckpoints.length === 1 && !newAchievements.includes('first-step')) {
      newAchievements.push('first-step');
    }
    if (newScore >= 500 && !newAchievements.includes('scholar')) {
      newAchievements.push('scholar');
    }
    if (newCompletedCheckpoints.length === checkpoints.length && !newAchievements.includes('enlightened')) {
      newAchievements.push('enlightened');
      // Tự động mở thư viện hành trình khi hoàn thành tất cả
      setTimeout(() => {
        setShowLibrary(true);
      }, 3000); // Đợi 3 giây sau khi hiển thị thông báo hoàn thành
    }

    setProgress({
      currentCheckpoint: currentIndex < checkpoints.length - 1 ? checkpoints[currentIndex + 1].id : selectedCheckpoint.id,
      completedCheckpoints: newCompletedCheckpoints,
      score: newScore,
      level: newLevel,
      achievements: newAchievements,
    });    // Celebrate if completed an era
    if (isLastCheckpointOfEra) {
      setIsCelebrating(true);
      setTimeout(() => {
        setIsCelebrating(false);
      }, 3000);
    }

    // Show notification for newly unlocked periods
    if (newlyUnlocked.length > 0) {
      const unlockedPeriod = philosophicalPeriods.find(p => p.id === newlyUnlocked[0]);
      if (unlockedPeriod) {
        setTimeout(() => {
          setUnlockNotification({
            periodName: unlockedPeriod.name,
            isVisible: true
          });
        }, 1500); // Show after celebration ends
      }
    }

    setSelectedCheckpoint(null);
  };

  const calculateCompletionPercentage = () => {
    return (progress.completedCheckpoints.length / checkpoints.length) * 100;
  };

  const getCurrentEra = () => {
    const currentCheckpoint = checkpoints.find((cp) => cp.id === progress.currentCheckpoint);
    if (!currentCheckpoint) return 'Lý - Trần';
    
    const checkpointIndex = checkpoints.findIndex((cp) => cp.id === currentCheckpoint.id);
    const era = eraRegions.find(
      (region) => checkpointIndex >= region.startCheckpoint && checkpointIndex <= region.endCheckpoint
    );
    return era?.name || 'Lý - Trần';
  };

  const handleEraSelect = (eraName: string) => {
    setSelectedEra(eraName);
    
    // Move monk to first checkpoint of selected era
    const era = eraRegions.find(e => e.name === eraName);
    if (era) {
      const firstCheckpoint = checkpoints[era.startCheckpoint];
      moveMonkToCheckpoint(firstCheckpoint.x, firstCheckpoint.y);
      
      // Unlock first checkpoint of selected era
      const updatedCheckpoints = checkpoints.map((cp, index) => {
        if (index === era.startCheckpoint) {
          return { ...cp, status: 'active' as const };
        }
        return cp;
      });
      setCheckpoints(updatedCheckpoints);
    }
  };

  // Get checkpoints for selected era
  const getVisibleCheckpoints = () => {
    const era = eraRegions.find(e => e.name === selectedEra);
    if (!era) return checkpoints;
    
    const visible = checkpoints.slice(era.startCheckpoint, era.endCheckpoint + 1);
    console.log('Selected era:', selectedEra);
    console.log('Era data:', era);
    console.log('Visible checkpoints:', visible);
    return visible;
  };

  const visibleCheckpoints = getVisibleCheckpoints();

  const handleOpenLibrary = () => {
    setShowLibrary(true);
    setShowLibraryHint(false);
  };

  return (
    <div className="min-h-screen bg-[#F5E6D3] overflow-x-hidden">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-30">
        <ProgressBar
          completionPercentage={calculateCompletionPercentage()}
          currentEra={getCurrentEra()}
        />
      </div>      {/* Completion Celebration */}
      <CompletionCelebration isVisible={progress.completedCheckpoints.length === checkpoints.length} />


      {/* Main Content */}
      <div className="flex-1 relative pt-[76px]">{/* Container có thể scroll */}
        {/* Era Progress Tracker - Nằm bên phải, scroll cùng */}
        <EraProgressTracker
          eras={eraRegions}
          selectedEra={selectedEra}
          completedCheckpoints={progress.completedCheckpoints}
          allCheckpoints={checkpoints}
          onEraSelect={handleEraSelect}
          score={progress.score}
          level={progress.level}
          achievements={progress.achievements}
        />
        
        {/* Vintage Map Area */}
        <div className="relative pr-[360px]">{/* Padding right để tránh đè lên sidebar */}
          <div 
            className="absolute inset-0" 
            style={{
              background: `
                linear-gradient(rgba(245, 230, 211, 0.95), rgba(245, 230, 211, 0.95)),
                repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 115, 85, 0.03) 2px, rgba(139, 115, 85, 0.03) 4px),
                repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(139, 115, 85, 0.03) 2px, rgba(139, 115, 85, 0.03) 4px)
              `,
              boxShadow: 'inset 0 0 100px rgba(139, 115, 85, 0.1)',
            }}
          />

          {/* Particle system */}
          <ParticleSystem />

          {/* Map Container */}
          <div className="relative min-h-screen p-8">
            {/* Decorative vintage border */}
            <div 
              className="absolute inset-8 border-8 rounded-lg pointer-events-none"
              style={{
                borderColor: '#8B4513',
                borderStyle: 'double',
                boxShadow: 'inset 0 0 20px rgba(139, 69, 19, 0.1)',
              }}
            />
            
            {/* Inner border */}
            <div 
              className="absolute"
              style={{
                top: '48px',
                left: '48px',
                right: '48px',
                bottom: '48px',
                border: '2px solid #8B4513',
                borderRadius: '4px',
                pointerEvents: 'none',
              }}
            />

            {/* Title banner */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 z-10"
              style={{ top: '60px' }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="relative">
                <svg width="600" height="80" viewBox="0 0 600 80">
                  <path
                    d="M 50 20 Q 60 10, 80 20 L 520 20 Q 540 10, 550 20 L 550 60 Q 540 50, 520 60 L 80 60 Q 60 50, 50 60 Z"
                    fill="#F5E6D3"
                    stroke="#8B4513"
                    strokeWidth="3"
                  />
                  <path d="M 50 20 Q 30 30, 40 50 Q 45 45, 50 60" fill="#E5D4C1" stroke="#8B4513" strokeWidth="2" />
                  <path d="M 550 20 Q 570 30, 560 50 Q 555 45, 550 60" fill="#E5D4C1" stroke="#8B4513" strokeWidth="2" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h1 
                    className="text-3xl font-bold text-center"
                    style={{ 
                      fontFamily: 'serif',
                      color: '#8B4513',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                    }}
                  >
                    Hành Trình Phật Giáo Việt Nam
                  </h1>
                </div>
              </div>
            </motion.div>

            {/* Mountains */}
            <svg className="absolute left-16 top-40 opacity-20 pointer-events-none" width="200" height="100">
              <path d="M 0 80 L 50 20 L 80 50 L 120 10 L 150 40 L 200 80 Z" fill="#8B7355" stroke="#6B5D52" strokeWidth="2" />
            </svg>
            
            <svg className="absolute right-32 top-52 opacity-20 pointer-events-none" width="180" height="90">
              <path d="M 0 70 L 60 15 L 100 45 L 140 25 L 180 70 Z" fill="#8B7355" stroke="#6B5D52" strokeWidth="2" />
            </svg>

            {/* Trees */}
            {[...Array(15)].map((_, i) => {
              const positions = [
                { x: 120, y: 200 }, { x: 250, y: 450 }, { x: 180, y: 350 },
                { x: 420, y: 280 }, { x: 550, y: 520 }, { x: 680, y: 380 },
                { x: 320, y: 600 }, { x: 780, y: 240 }, { x: 150, y: 550 },
                { x: 850, y: 420 }, { x: 480, y: 180 }, { x: 620, y: 640 },
                { x: 290, y: 320 }, { x: 720, y: 580 }, { x: 390, y: 480 },
              ];
              const pos = positions[i];
              
              return (
                <svg 
                  key={`tree-${i}`}
                  className="absolute opacity-30 pointer-events-none" 
                  style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
                  width="20" 
                  height="25"
                >
                  <line x1="10" y1="25" x2="10" y2="15" stroke="#4A7C59" strokeWidth="2" />
                  <path d="M 5 15 L 10 8 L 15 15 Z" fill="#4A7C59" stroke="#2C5234" strokeWidth="1" />
                </svg>
              );
            })}

            {/* Compass rose */}
            <motion.div
              className="absolute bottom-24 right-24 pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
            >
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="35" fill="none" stroke="#8B4513" strokeWidth="2" />
                <path d="M 40 10 L 43 30 L 40 28 L 37 30 Z" fill="#C4302B" stroke="#8B4513" strokeWidth="1" />
                <text x="40" y="8" textAnchor="middle" fontSize="12" fontFamily="serif" fill="#8B4513">N</text>
              </svg>
            </motion.div>

            {/* Path SVG */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 1 }}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {visibleCheckpoints.map((checkpoint, index) => {
                if (index === visibleCheckpoints.length - 1) return null;
                const next = visibleCheckpoints[index + 1];
                
                const pathD = `M ${checkpoint.x} ${checkpoint.y} Q ${(checkpoint.x + next.x) / 2} ${(checkpoint.y + next.y) / 2 - 3} ${next.x} ${next.y}`;
                const isActive = checkpoints.find(cp => cp.id === next.id)?.status !== 'locked';
                const checkpointEra = eraRegions.find(
                  (region) => index >= region.startCheckpoint && index <= region.endCheckpoint
                );
                const pathColor = checkpointEra?.color || '#8B4513';

                return (
                  <motion.path
                    key={`path-${checkpoint.id}`}
                    d={pathD}
                    fill="none"
                    stroke={isActive ? pathColor : '#E5D4C1'}
                    strokeWidth="1.2"
                    strokeDasharray="12 6"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isActive ? 1 : 0 }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                  />
                );
              })}
            </svg>

            {/* Checkpoints */}
            <div className="absolute inset-0" style={{ zIndex: 10, pointerEvents: 'none' }}>
              {visibleCheckpoints.map((checkpoint) => (
                <div key={checkpoint.id} style={{ pointerEvents: 'auto' }}>
                  <Checkpoint
                    checkpoint={checkpoint}
                    onClick={() => handleCheckpointClick(checkpoint)}
                  />
                </div>
              ))}
            </div>

            {/* Monk character - positioned to the left of checkpoint */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 15 }}>
              <MonkCharacter
                x={monkPosition.x - 8}
                y={monkPosition.y}
                emotion={isCelebrating ? 'happy' : (isMonkMoving ? 'walking' : 'idle')}
                size="small"
              />
            </div>

            {/* Journey Library Button + Hint (anchored together) */}
            <div className="absolute bottom-24 right-24 z-40">
              <motion.button
                onClick={handleOpenLibrary}
                className="relative bg-gradient-to-br from-amber-600 to-orange-600 text-white p-4 rounded-full shadow-2xl hover:shadow-amber-500/50 transition-all group"
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    '0 10px 30px rgba(251, 191, 36, 0.3)',
                    '0 10px 40px rgba(251, 191, 36, 0.5)',
                    '0 10px 30px rgba(251, 191, 36, 0.3)',
                  ],
                }}
                transition={{
                  boxShadow: { duration: 2, repeat: Infinity },
                }}
              >
                <BookOpen size={60} className="group-hover:rotate-12 transition-transform" />
                {/* <motion.div
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, type: "spring" }}
                >
                  {getUnlockedPeriods(progress.completedCheckpoints, checkpoints.length).length}
                </motion.div> */}
              </motion.button>

              {/* Library Hint Tooltip */}
              <AnimatePresence>
                {showLibraryHint && (
                  <motion.div
                    className="absolute z-50 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border-2 border-[#8B4513]/30 p-4 w-96"
                    style={{
                      right: 'calc(100% + 14px)',
                      top: '20%',
                      transform: 'translateY(-50%)',
                    }}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  >
                    {/* Arrow pointing to button */}
                    <div
                      className="absolute"
                      style={{
                        right: -8,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 0,
                        height: 0,
                        borderTop: '8px solid transparent',
                        borderBottom: '8px solid transparent',
                        borderLeft: '8px solid rgba(255,255,255,0.95)',
                        filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))',
                      }}
                    />

                    <div className="flex items-center gap-3">
                      {/* Close button */}
                      <button
                        onClick={() => setShowLibraryHint(false)}
                        className="shrink-0 text-gray-500 hover:text-gray-700 transition-colors"
                        aria-label="Đóng"
                      >
                        <X size={16} />
                      </button>

                      {/* Content */}
                      <p  className="text-sm text-[#8B4513] font-medium whitespace-nowrap ">
                        Hãy bấm vào nút này để mở Thư viện Hành Trình
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Completion */}
            {progress.completedCheckpoints.length === checkpoints.length && (
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ zIndex: 20 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-12 py-8 rounded-3xl shadow-2xl border-4 border-white text-center">
                  <div className="text-6xl mb-4">✨</div>
                  <h2 className="text-4xl font-bold mb-4">Giác Ngộ Viên Mãn!</h2>
                  <p className="text-xl mb-4">Tổng điểm: {progress.score}</p>
                  <motion.div
                    className="text-lg text-yellow-100 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                  >
                    🏛️ Thư viện hành trình sẽ tự động mở sau 3 giây...
                  </motion.div>
                  <motion.button
                    onClick={handleOpenLibrary}
                    className="bg-white text-orange-600 px-6 py-2 rounded-full font-bold hover:bg-orange-50 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                  >
                    Mở Thư Viện Ngay
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {selectedCheckpoint && (
          <QuestionModal
            question={selectedCheckpoint.question}
            isOpen={!!selectedCheckpoint}
            onClose={() => setSelectedCheckpoint(null)}
            onAnswer={handleAnswer}
            theory={selectedCheckpoint.theory}
            decisionMoment={
              selectedCheckpoint.decisionMomentId
                ? decisionMoments.find((d) => d.id === selectedCheckpoint.decisionMomentId)
                : undefined
            }
          />
        )}
      </AnimatePresence>      <LibraryModal
        isOpen={showLibrary}
        onClose={() => setShowLibrary(false)}
        checkpoints={checkpoints}
      />

      {/* Unlock Notification */}
      <UnlockNotification
        periodName={unlockNotification.periodName}
        isVisible={unlockNotification.isVisible}
        onClose={() => setUnlockNotification({ periodName: '', isVisible: false })}
      />
    </div>
  );
}

export default App;