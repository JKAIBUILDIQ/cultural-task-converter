import { GameHero, TaskChallenge, QTrainingQuestion, Contest, PAIT_RATING_SYSTEM } from '../types/game';

export const sampleHeroes: GameHero[] = [
  {
    id: '1',
    name: 'CodeWarrior_Somalia',
    avatar: '🛡️',
    location: {
      country: 'Somalia',
      city: 'Mogadishu',
      coordinates: [2.0469, 45.3182]
    },
    paitRating: {
      currentRating: 1450,
      maxRating: 3000,
      qTrainingScore: 1200,
      taskRatingUnlocked: true,
      completedTasks: 23,
      averageCompletionTime: 45.2,
      accelerationMultiplier: 2.8,
      tier: 'Journeyman',
      grade: 'B'
    },
    specializations: ['Web Development', 'API Design', 'Mobile Apps'],
    createdAt: new Date('2024-01-15'),
    lastActive: new Date(),
    achievements: [
      {
        id: 'speed_demon',
        name: 'Speed Demon',
        description: 'Complete 10 tasks in under 30 minutes',
        icon: '⚡',
        unlockedAt: new Date('2024-02-01'),
        rarity: 'Rare'
      }
    ]
  },
  {
    id: '2',
    name: 'AIArtisan_Japan',
    avatar: '🎨',
    location: {
      country: 'Japan',
      city: 'Tokyo',
      coordinates: [35.6762, 139.6503]
    },
    paitRating: {
      currentRating: 2150,
      maxRating: 3000,
      qTrainingScore: 1200,
      taskRatingUnlocked: true,
      completedTasks: 67,
      averageCompletionTime: 32.1,
      accelerationMultiplier: 1.9,
      tier: 'Master',
      grade: 'A'
    },
    specializations: ['Machine Learning', 'Data Science', 'UI/UX'],
    createdAt: new Date('2023-11-20'),
    lastActive: new Date(),
    achievements: []
  },
  {
    id: '3',
    name: 'TechNinja_Brazil',
    avatar: '🥷',
    location: {
      country: 'Brazil',
      city: 'São Paulo',
      coordinates: [-23.5505, -46.6333]
    },
    paitRating: {
      currentRating: 980,
      maxRating: 3000,
      qTrainingScore: 890,
      taskRatingUnlocked: false,
      completedTasks: 15,
      averageCompletionTime: 67.3,
      accelerationMultiplier: 1.4,
      tier: 'Apprentice',
      grade: 'C'
    },
    specializations: ['Backend Development', 'DevOps'],
    createdAt: new Date('2024-03-10'),
    lastActive: new Date(),
    achievements: []
  }
];

export const qTrainingQuestions: QTrainingQuestion[] = [
  {
    id: 'q1',
    question: 'What is the primary purpose of the PaiT rating system?',
    options: [
      'To rank players by completion speed only',
      'To measure skill progression through Q-training and task completion',
      'To determine prize money distribution',
      'To create competitive tournaments'
    ],
    correctAnswer: 1,
    explanation: 'PaiT rating measures overall skill progression, starting with Q-training foundation and advancing to task-based evaluation.',
    difficulty: 2,
    category: 'System Understanding',
    points: 10
  },
  {
    id: 'q2',
    question: 'What score must you achieve in Q-training to unlock task rating?',
    options: ['800', '1000', '1200', '1500'],
    correctAnswer: 2,
    explanation: 'A score of 1200 in Q-training unlocks the task rating system, ensuring proper foundational knowledge.',
    difficulty: 1,
    category: 'System Rules',
    points: 5
  },
  {
    id: 'q3',
    question: 'Which mode offers the highest scoring multiplier?',
    options: ['Classic (100hrs)', 'Moderate (8hrs)', 'Speed (1hr)', 'All are equal'],
    correctAnswer: 2,
    explanation: 'Speed mode offers 2.0x multiplier for completing tasks in just 1 hour, rewarding rapid problem-solving.',
    difficulty: 2,
    category: 'Game Mechanics',
    points: 15
  }
];

export const sampleTasks: TaskChallenge[] = [
  {
    id: 'task1',
    title: 'Real-time Chat System',
    description: 'Build a WebSocket-based chat application with user authentication and message persistence.',
    difficulty: 'Advanced',
    mode: 'Moderate',
    timeLimit: 8,
    basePoints: 150,
    requiredRating: 1200,
    tags: ['WebSocket', 'Authentication', 'Real-time'],
    createdBy: 'system',
    submissions: [],
    aiPrompt: 'Create a real-time chat system that supports multiple users, message history, and user authentication.',
    expectedOutput: 'Working chat application with login, real-time messaging, and message persistence'
  },
  {
    id: 'task2',
    title: 'E-commerce Product Filter',
    description: 'Create a dynamic product filtering system with search, categories, and price ranges.',
    difficulty: 'Intermediate',
    mode: 'Speed',
    timeLimit: 1,
    basePoints: 80,
    requiredRating: 800,
    tags: ['JavaScript', 'Filtering', 'UI/UX'],
    createdBy: 'system',
    submissions: [],
    aiPrompt: 'Build a product filtering interface that allows users to search and filter by multiple criteria.',
    expectedOutput: 'Interactive product filter with search, category, and price filtering'
  }
];

export const activeContests: Contest[] = [
  {
    id: 'contest1',
    title: 'Global AI Assistant Challenge',
    description: 'Build the most innovative AI assistant for real-world problems',
    startDate: new Date('2024-06-01'),
    endDate: new Date('2024-06-30'),
    mode: 'Classic',
    tasks: sampleTasks,
    participants: ['1', '2', '3'],
    leaderboard: [
      { heroId: '2', totalScore: 2150, tasksCompleted: 3, averageTime: 32.1, rank: 1 },
      { heroId: '1', totalScore: 1450, tasksCompleted: 2, averageTime: 45.2, rank: 2 },
      { heroId: '3', totalScore: 980, tasksCompleted: 1, averageTime: 67.3, rank: 3 }
    ],
    prize: '🏆 Championship Belt + $5000 Scholarship',
    status: 'Active'
  }
];

// League of Legends inspired features
export const dailyMissions = [
  { id: 'daily1', title: 'First Victory', description: 'Complete your first task today', reward: 50, completed: false },
  { id: 'daily2', title: 'Speed Runner', description: 'Complete a task in Speed mode', reward: 100, completed: false },
  { id: 'daily3', title: 'Helper', description: 'Review 3 peer submissions', reward: 75, completed: false }
];

export const seasonRewards = [
  { tier: 'Grandmaster', reward: '💎 Diamond Bot Skin + $2000 Scholarship' },
  { tier: 'Master', reward: '🥇 Gold Bot Skin + $1000 Scholarship' },
  { tier: 'Expert', reward: '🥈 Silver Bot Skin + $500 Scholarship' },
  { tier: 'Journeyman', reward: '🥉 Bronze Bot Skin + Certification' },
  { tier: 'Apprentice', reward: '🎖️ Achievement Badge' },
  { tier: 'Novice', reward: '⭐ Participation Trophy' }
];

export const championAbilities = {
  'CodeWarrior': {
    passive: 'Debug Sense - 25% faster error detection',
    q: 'Code Sprint - Complete next task 20% faster',
    w: 'Shield Wall - Immune to one failed submission',
    e: 'Battle Cry - +50% points for next hour',
    r: 'Ultimate Victory - Double points for perfect score'
  },
  'AIArtisan': {
    passive: 'Creative Flow - 15% bonus points on UI/UX tasks',
    q: 'Inspiration - Reveal hints for current task',
    w: 'Design Shield - Protect rating from one bad score',
    e: 'Artistic Vision - See peer solutions after completion',
    r: 'Masterpiece - Create legendary-tier submission'
  },
  'TechNinja': {
    passive: 'Shadow Step - Invisible on leaderboard until task completion',
    q: 'Swift Strike - Instantly complete one easy task',
    w: 'Smoke Screen - Hide your approach from competitors',
    e: 'Precision - 100% accuracy on next Q-training session',
    r: 'Shadow Clone - Submit two solutions simultaneously'
  }
};
