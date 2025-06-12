Import { Bot, BotTask, BotPersonality, AssemblyProject, GalleryFilter } from '../types';
import { culturalContexts } from './cultural';
import { sampleTasks } from './tasks';

export const sampleBots: Bot[] = [
  {
    id: 'bot-1',
    name: 'Sakura Assistant',
    avatar: '🌸',
    description: 'A culturally-aware Japanese assistant specializing in polite, hierarchical communication',
    primaryLanguage: 'japanese',
    supportedLanguages: ['japanese', 'english'],
    coreRegion: 'asian',
    tasks: [
      {
        id: 'task-1',
        taskId: '1',
        position: 0,
        adaptedContent: '新しいファイル "example.txt" を作成してください',
        testResults: [
          {
            id: 'test-1',
            testType: 'cultural',
            status: 'passed',
            score: 95,
            feedback: 'Excellent use of polite Japanese language forms',
            timestamp: new Date('2025-01-01')
          }
        ],
        feedbackOptions: [
          { type: 'emoji', value: '👍', count: 12, label: 'Helpful' },
          { type: 'emoji', value: '🎯', count: 8, label: 'Accurate' }
        ],
        musicCue: 'zen-chime',
        emoji: '✨',
        estimatedDuration: 30,
        dependencies: []
      }
    ],
    personality: {
      tone: 'formal',
      verbosity: 'detailed',
      helpfulness: 'extensive',
      culturalAdaptation: 'strict'
    },
    capabilities: ['File Operations', 'Polite Communication', 'Cultural Adaptation'],
    rating: 4.8,
    createdBy: 'Cultural Bot Team',
    createdAt: new Date('2025-01-01'),
    isPublic: true,
    tags: ['japanese', 'formal', 'file-operations'],
    culturalContext: culturalContexts.asian
  },
  {
    id: 'bot-2',
    name: 'Code Maestro',
    avatar: '👨‍💻',
    description: 'European-style programming assistant with direct, efficient communication',
    primaryLanguage: 'english',
    supportedLanguages: ['english', 'german', 'french'],
    coreRegion: 'european',
    tasks: [
      {
        id: 'task-2',
        taskId: '3',
        position: 0,
        adaptedContent: 'Initialize a new Git repository with proper European workflow standards',
        testResults: [
          {
            id: 'test-2',
            testType: 'functionality',
            status: 'passed',
            score: 92,
            feedback: 'Efficient implementation following European coding standards',
            timestamp: new Date('2025-01-01')
          }
        ],
        feedbackOptions: [
          { type: 'star', value: '5', count: 15, label: 'Excellent' },
          { type: 'thumb', value: 'up', count: 20, label: 'Useful' }
        ],
        musicCue: 'tech-beat',
        emoji: '⚡',
        estimatedDuration: 60,
        dependencies: []
      }
    ],
    personality: {
      tone: 'professional',
      verbosity: 'concise',
      helpfulness: 'moderate',
      culturalAdaptation: 'moderate'
    },
    capabilities: ['Programming', 'Git', 'Development Workflow'],
    rating: 4.6,
    createdBy: 'Dev Community',
    createdAt: new Date('2025-01-02'),
    isPublic: true,
    tags: ['programming', 'git', 'efficient'],
    culturalContext: culturalContexts.european
  },
  {
    id: 'bot-3',
    name: 'Amigo Creativo',
    avatar: '🎨',
    description: 'Latin American creative assistant with warm, expressive communication style',
    primaryLanguage: 'spanish',
    supportedLanguages: ['spanish', 'portuguese', 'english'],
    coreRegion: 'american',
    tasks: [
      {
        id: 'task-3',
        taskId: '8',
        position: 0,
        adaptedContent: 'Diseña un logo moderno para una startup tecnológica con vibra latina',
        testResults: [
          {
            id: 'test-3',
            testType: 'cultural',
            status: 'passed',
            score: 89,
            feedback: 'Great integration of Latin American design elements',
            timestamp: new Date('2025-01-01')
          }
        ],
        feedbackOptions: [
          { type: 'emoji', value: '🔥', count: 25, label: 'Amazing' },
          { type: 'emoji', value: '💖', count: 18, label: 'Love it' }
        ],
        musicCue: 'latin-vibes',
        emoji: '🌟',
        estimatedDuration: 120,
        dependencies: []
      }
    ],
    personality: {
      tone: 'friendly',
      verbosity: 'normal',
      helpfulness: 'extensive',
      culturalAdaptation: 'moderate'
    },
    capabilities: ['Design', 'Creativity', 'Cultural Expression'],
    rating: 4.9,
    createdBy: 'Creative Collective',
    createdAt: new Date('2025-01-03'),
    isPublic: true,
    tags: ['creative', 'design', 'latin'],
    culturalContext: culturalContexts.american
  },
  {
    id: 'bot-4',
    name: 'Data Sage',
    avatar: '📊',
    description: 'Analytical assistant focused on data visualization and business insights',
    primaryLanguage: 'english',
    supportedLanguages: ['english', 'chinese'],
    coreRegion: 'asian',
    tasks: [
      {
        id: 'task-4',
        taskId: '6',
        position: 0,
        adaptedContent: 'Analyze sales data and create culturally-appropriate visualizations',
        testResults: [
          {
            id: 'test-4',
            testType: 'functionality',
            status: 'passed',
            score: 94,
            feedback: 'Excellent data analysis with cultural considerations',
            timestamp: new Date('2025-01-01')
          }
        ],
        feedbackOptions: [
          { type: 'star', value: '5', count: 22, label: 'Insightful' },
          { type: 'emoji', value: '🎯', count: 16, label: 'Accurate' }
        ],
        musicCue: 'data-flow',
        emoji: '📈',
        estimatedDuration: 180,
        dependencies: []
      }
    ],
    personality: {
      tone: 'professional',
      verbosity: 'detailed',
      helpfulness: 'extensive',
      culturalAdaptation: 'moderate'
    },
    capabilities: ['Data Analysis', 'Visualization', 'Business Intelligence'],
    rating: 4.7,
    createdBy: 'Analytics Team',
    createdAt: new Date('2025-01-04'),
    isPublic: true,
    tags: ['data', 'analysis', 'business'],
    culturalContext: culturalContexts.asian
  }
];

export const sampleProjects: AssemblyProject[] = [
  {
    id: 'project-1',
    name: 'Multilingual File Manager',
    bot: {
      name: 'File Guardian',
      avatar: '📁',
      description: 'A comprehensive file management assistant',
      primaryLanguage: 'english',
      supportedLanguages: ['english', 'spanish', 'french'],
      coreRegion: 'european'
    },
    timeline: [
      {
        id: 'timeline-1',
        taskId: '1',
        position: 0,
        adaptedContent: 'Create a new file with cultural naming conventions',
        testResults: [],
        feedbackOptions: [],
        emoji: '📝',
        estimatedDuration: 45,
        dependencies: []
      },
      {
        id: 'timeline-2',
        taskId: '2',
        position: 1,
        adaptedContent: 'Read file contents with proper encoding',
        testResults: [],
        feedbackOptions: [],
        emoji: '👀',
        estimatedDuration: 30,
        dependencies: ['timeline-1']
      }
    ],
    settings: {
      autoTest: true,
      showFeedback: true,
      enableMusic: false,
      allowEmoji: true,
      culturalValidation: true,
      targetAudience: ['developers', 'content-creators']
    },
    lastModified: new Date('2025-01-05'),
    isDraft: true
  }
];

export const defaultGalleryFilter: GalleryFilter = {
  sortBy: 'rating',
  sortOrder: 'desc'
};

export const musicCues = [
  { id: 'zen-chime', name: 'Zen Chime', region: 'asian' },
  { id: 'tech-beat', name: 'Tech Beat', region: 'european' },
  { id: 'latin-vibes', name: 'Latin Vibes', region: 'american' },
  { id: 'data-flow', name: 'Data Flow', region: 'asian' },
  { id: 'success-bell', name: 'Success Bell', region: 'european' },
  { id: 'ambient-calm', name: 'Ambient Calm', region: 'oceanic' }
];

export const botAvatars = [
  '🤖', '👨‍💻', '👩‍💻', '🌸', '🎨', '📊', '📁', '🌟', '⚡', '🔧',
  '📚', '🎯', '🌍', '💡', '🎵', '🏆', '🌈', '🔥', '✨', '🎭'
];
