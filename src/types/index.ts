export interface Task {
  id: string;
  category: string;
  english: string;
  spanish: string;
  french: string;
  german: string;
  chinese: string;
  japanese: string;
  portuguese: string;
  description: string;
  complexity: 'basic' | 'intermediate' | 'advanced';
  tags: string[];
}

export interface CulturalContext {
  region: RegionType;
  language: LanguageType;
  writingDirection: 'ltr' | 'rtl';
  dateFormat: string;
  timeFormat: '12h' | '24h';
  currency: string;
  numberFormat: 'decimal' | 'comma';
  culturalNorms: CulturalNorm[];
}

export interface CulturalNorm {
  type: 'communication' | 'hierarchy' | 'time' | 'formality' | 'colors' | 'symbols';
  description: string;
  impact: 'low' | 'medium' | 'high';
  examples: string[];
}

export type RegionType = 'asian' | 'european' | 'american' | 'african' | 'oceanic' | 'arabic';

export type LanguageType = 'english' | 'spanish' | 'french' | 'german' | 'chinese' | 'japanese' | 'portuguese' | 'arabic' | 'korean';

export interface RegionalTheme {
  name: string;
  region: RegionType;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  iconStyle: 'outlined' | 'filled' | 'rounded';
  borderRadius: 'sharp' | 'rounded' | 'circular';
  spacing: 'compact' | 'normal' | 'spacious';
  shadows: 'minimal' | 'medium' | 'prominent';
}

export interface CulturalModule {
  id: string;
  originalTask: Task;
  culturalContext: CulturalContext;
  adaptedContent: string;
  visualAdaptations: VisualAdaptation[];
  functionalAdaptations: FunctionalAdaptation[];
  theme: RegionalTheme;
  generatedAt: Date;
}

export interface VisualAdaptation {
  type: 'color' | 'typography' | 'layout' | 'iconography' | 'imagery';
  original: string;
  adapted: string;
  reason: string;
}

export interface FunctionalAdaptation {
  type: 'interaction' | 'navigation' | 'input' | 'feedback' | 'workflow';
  description: string;
  culturalReason: string;
  implementation: string;
}

export interface ConversionSettings {
  targetRegion: RegionType;
  targetLanguage: LanguageType;
  preserveOriginal: boolean;
  adaptationLevel: 'minimal' | 'moderate' | 'comprehensive';
  includeVisualAdaptations: boolean;
  includeFunctionalAdaptations: boolean;
  generateMultipleVariants: boolean;
}

// Phase 2: Bot Assembly Studio & Galleria Types
export interface Bot {
  id: string;
  name: string;
  avatar: string;
  description: string;
  primaryLanguage: LanguageType;
  supportedLanguages: LanguageType[];
  coreRegion: RegionType;
  tasks: BotTask[];
  personality: BotPersonality;
  capabilities: string[];
  rating: number;
  createdBy: string;
  createdAt: Date;
  isPublic: boolean;
  tags: string[];
  culturalContext: CulturalContext;
}

export interface BotTask {
  id: string;
  taskId: string;
  position: number;
  adaptedContent: string;
  testResults: TestResult[];
  feedbackOptions: FeedbackOption[];
  musicCue?: string;
  emoji?: string;
  estimatedDuration: number;
  dependencies: string[];
}

export interface BotPersonality {
  tone: 'formal' | 'casual' | 'friendly' | 'professional' | 'playful';
  verbosity: 'concise' | 'normal' | 'detailed';
  helpfulness: 'minimal' | 'moderate' | 'extensive';
  culturalAdaptation: 'strict' | 'moderate' | 'flexible';
}

export interface TestResult {
  id: string;
  testType: 'functionality' | 'cultural' | 'language' | 'user-experience';
  status: 'passed' | 'failed' | 'warning';
  score: number;
  feedback: string;
  timestamp: Date;
}

export interface FeedbackOption {
  type: 'emoji' | 'star' | 'thumb' | 'custom';
  value: string;
  count: number;
  label: string;
}

export interface AssemblyProject {
  id: string;
  name: string;
  bot: Partial<Bot>;
  timeline: BotTask[];
  settings: AssemblySettings;
  lastModified: Date;
  isDraft: boolean;
}

export interface AssemblySettings {
  autoTest: boolean;
  showFeedback: boolean;
  enableMusic: boolean;
  allowEmoji: boolean;
  culturalValidation: boolean;
  targetAudience: string[];
}

export interface GalleryFilter {
  language?: LanguageType;
  category?: string;
  region?: RegionType;
  complexity?: Task['complexity'];
  rating?: number;
  creator?: string;
  tags?: string[];
  sortBy: 'rating' | 'date' | 'popularity' | 'name' | 'language';
  sortOrder: 'asc' | 'desc';
}
