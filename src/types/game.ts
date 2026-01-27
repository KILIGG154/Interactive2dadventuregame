export type CheckpointStatus = 'locked' | 'active' | 'completed';

export interface Theory {
  title: string;
  content: string;
}

export interface Checkpoint {
  id: string;
  title: string;
  description: string;
  x: number;
  y: number;
  status: CheckpointStatus;
  icon: 'lotus' | 'bell' | 'sutra';
  question: Question;
  era: string;
  theory?: Theory;
}

export interface Question {
  title: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint?: string; // Gợi ý khi trả lời sai lần đầu
  historicalFigure?: string;
  image?: string;
}

export interface Era {
  id: string;
  name: string;
  period: string;
  color: string;
  bgColor: string;
  checkpoints: Checkpoint[];
  landmark: {
    name: string;
    x: number;
    y: number;
  };
}

export interface PlayerProgress {
  currentCheckpoint: string;
  completedCheckpoints: string[];
  score: number;
  level: number;
  achievements: string[];
}

// New interfaces for Journey Library
export interface PhilosophicalPeriod {
  id: string;
  name: string;
  period: string;
  what: string; // Gì - Bản chất, đặc điểm chính
  who: string[]; // Ai - Nhân vật quan trọng
  why: string; // Tại sao - Nguyên nhân hình thành
  how: string; // Như thế nào - Cách thức phát triển
  when: string; // Khi nào - Thời gian cụ thể
  keyEvents: string[];
  monuments: string[];
  philosophicalConcepts: string[];
  image?: string;
  color: string;
}

export interface JourneyLibrary {
  periods: PhilosophicalPeriod[];
  totalProgress: number;
  unlockedPeriods: string[];
}