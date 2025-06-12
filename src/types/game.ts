export interface PaiTRating {
  currentRating: number;
  maxRating: number;
  qTrainingScore: number;
  taskRatingUnlocked: boolean;
  completedTasks: number;
  averageCompletionTime: number;
  accelerationMultiplier: number;
  tier: 'Novice' | 'Apprentice' | 'Journeyman' | 'Expert' | 'Master' | 'Grandmaster';
  grade: 'F' | 'D' | 'C' | 'B' | 'A' | 'S';
}

export interface GameHero {
  id: string;
  name: string;
  avatar: string;
  location: {
    country: string;
    city: string;
    coordinates: [number, number];
  };
  paitRating: PaiTRating;
  specializations: string[];
  createdAt: Date;
  lastActive: Date;
  achievements: Achievement[];
}

export interface TaskChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Master';
  mode: 'Speed' | 'Moderate' | 'Classic';
  timeLimit: number; // in hours
  basePoints: number;
  requiredRating: number;
  tags: string[];
  createdBy: string;
  submissions: TaskSubmission[];
  aiPrompt: string;
  expectedOutput: string;
}

export interface TaskSubmission {
  id: string;
  heroId: string;
  taskId: string;
  submittedAt: Date;
  completionTime: number; // in minutes
  code: string;
  description: string;
  aiGrade: number; // 0-100
  peerReviews: PeerReview[];
  finalScore: number;
  speedBonus: number;
  difficultyMultiplier: number;
}

export interface PeerReview {
  reviewerId: string;
  rating: number; // 1-5
  comment: string;
  reviewedAt: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
}

export interface QTrainingQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: number; // 1-5
  category: string;
  points: number;
}

export interface Contest {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  mode: 'Speed' | 'Moderate' | 'Classic';
  tasks: TaskChallenge[];
  participants: string[];
  leaderboard: ContestEntry[];
  prize: string;
  status: 'Upcoming' | 'Active' | 'Completed';
}

export interface ContestEntry {
  heroId: string;
  totalScore: number;
  tasksCompleted: number;
  averageTime: number;
  rank: number;
}

export const PAIT_RATING_SYSTEM = {
  MAX_RATING: 3000,
  Q_TRAINING_UNLOCK: 1200,
  TIERS: {
    NOVICE: { min: 0, max: 800, color: '#8B5A3C' },
    APPRENTICE: { min: 801, max: 1200, color: '#C0C0C0' },
    JOURNEYMAN: { min: 1201, max: 1600, color: '#FFD700' },
    EXPERT: { min: 1601, max: 2000, color: '#FF6B35' },
    MASTER: { min: 2001, max: 2400, color: '#4ECDC4' },
    GRANDMASTER: { min: 2401, max: 3000, color: '#FF1744' }
  },
  MODES: {
    SPEED: { timeLimit: 1, multiplier: 2.0 },
    MODERATE: { timeLimit: 8, multiplier: 1.5 },
    CLASSIC: { timeLimit: 100, multiplier: 1.0 }
  }
};
