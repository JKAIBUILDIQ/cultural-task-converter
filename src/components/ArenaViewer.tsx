import React, { useState, useEffect } from 'react';
import { GameHero, TaskChallenge } from '../types/game';
import { 
  Play, 
  Pause, 
  Eye, 
  MessageCircle, 
  TrendingUp, 
  Zap, 
  Brain, 
  Users, 
  Trophy,
  Clock,
  Target,
  Code,
  Camera,
  Volume2,
  Star,
  ThumbsUp,
  Share2,
  SkipBack,
  SkipForward,
  RotateCcw,
  Calendar,
  Archive
} from 'lucide-react';

interface LiveCompetitor {
  id: string;
  hero: GameHero;
  currentCode: string;
  linesWritten: number;
  errorsFixed: number;
  currentScore: number;
  timeElapsed: number;
  isTyping: boolean;
  lastActivity: Date;
}

interface AIJudgeAnalysis {
  overallScore: number;
  codeQuality: number;
  performance: number;
  innovation: number;
  bestPractices: number;
  commentary: string;
  suggestions: string[];
  bias: 0; // Always 0 - completely unbiased
}

interface LiveMatch {
  id: string;
  title: string;
  task: TaskChallenge;
  competitors: LiveCompetitor[];
  startTime: Date;
  timeRemaining: number;
  totalViewers: number;
  status: 'starting' | 'live' | 'finished';
  prize: string;
}

interface ReplayMatch {
  id: string;
  title: string;
  date: Date;
  duration: number; // in minutes
  winner: GameHero;
  finalScore: number;
  task: TaskChallenge;
  competitors: LiveCompetitor[];
  highlights: string[];
  viewCount: number;
}

interface ArenaViewerProps {
  match?: LiveMatch;
  onStartWatching: () => void;
}

const ArenaViewer: React.FC<ArenaViewerProps> = ({ match, onStartWatching }) => {
  const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'code' | 'split' | 'stats'>('split');
  const [chatMessages, setChatMessages] = useState<Array<{id: string, user: string, message: string, timestamp: Date}>>([]);
  const [newMessage, setNewMessage] = useState('');
  const [viewers, setViewers] = useState(47329);
  const [predictions, setPredictions] = useState<{[key: string]: number}>({});
  
  // Replay Mode State
  const [isReplayMode, setIsReplayMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [replayTime, setReplayTime] = useState(0); // Current replay position in seconds
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // 0.5x, 1x, 2x, 4x

  // Simulated live match data
  const defaultMatch: LiveMatch = {
    id: 'world-championship-2024',
    title: '🏆 World Championship Finals - Speed Mode',
    task: {
      id: 'championship-final',
      title: 'Real-time Trading Algorithm',
      description: 'Build a cryptocurrency trading algorithm that can process 1M transactions/second',
      difficulty: 'Master',
      mode: 'Speed',
      timeLimit: 1,
      basePoints: 500,
      requiredRating: 2000,
      tags: ['Algorithm', 'Trading', 'Performance'],
      createdBy: 'WorldChampionship',
      submissions: [],
      aiPrompt: 'Create a high-frequency trading algorithm with risk management',
      expectedOutput: 'Working trading system with backtesting results'
    },
    competitors: [
      {
        id: '1',
        hero: {
          id: '1',
          name: 'CodeWarrior_Somalia',
          avatar: '🛡️',
          location: { country: 'Somalia', city: 'Mogadishu', coordinates: [2.0469, 45.3182] },
          paitRating: {
            currentRating: 2850,
            maxRating: 3000,
            qTrainingScore: 1200,
            taskRatingUnlocked: true,
            completedTasks: 156,
            averageCompletionTime: 23.4,
            accelerationMultiplier: 3.2,
            tier: 'Grandmaster',
            grade: 'S'
          },
          specializations: ['Trading', 'Algorithms', 'Performance'],
          createdAt: new Date('2023-06-15'),
          lastActive: new Date(),
          achievements: []
        },
        currentCode: `class TradingEngine {
  constructor() {
    this.orders = new Map();
    this.positions = new Map();
    this.riskManager = new RiskManager();
  }
  
  processOrder(order) {
    // Real-time validation
    if (!this.riskManager.validate(order)) {
      return { status: 'rejected', reason: 'risk' };
    }
    
    // Ultra-fast matching engine`,
        linesWritten: 87,
        errorsFixed: 3,
        currentScore: 485,
        timeElapsed: 34,
        isTyping: true,
        lastActivity: new Date()
      },
      {
        id: '2',
        hero: {
          id: '2',
          name: 'AIArtisan_Japan',
          avatar: '🎨',
          location: { country: 'Japan', city: 'Tokyo', coordinates: [35.6762, 139.6503] },
          paitRating: {
            currentRating: 2790,
            maxRating: 3000,
            qTrainingScore: 1200,
            taskRatingUnlocked: true,
            completedTasks: 143,
            averageCompletionTime: 28.1,
            accelerationMultiplier: 2.9,
            tier: 'Grandmaster',
            grade: 'S'
          },
          specializations: ['AI', 'Machine Learning', 'Optimization'],
          createdAt: new Date('2023-04-20'),
          lastActive: new Date(),
          achievements: []
        },
        currentCode: `import numpy as np
from sklearn.ensemble import RandomForestRegressor

class MLTradingStrategy:
    def __init__(self):
        self.model = RandomForestRegressor(n_estimators=100)
        self.features = ['price_momentum', 'volume_spike', 'sentiment']
        
    def predict_price_movement(self, market_data):
        X = self.extract_features(market_data)
        return self.model.predict(X.reshape(1, -1))[0]`,
        linesWritten: 72,
        errorsFixed: 1,
        currentScore: 467,
        timeElapsed: 34,
        isTyping: false,
        lastActivity: new Date(Date.now() - 8000)
      }
    ],
    startTime: new Date(Date.now() - 34 * 60 * 1000),
    timeRemaining: 26,
    totalViewers: 47329,
    status: 'live',
    prize: '$50,000 + Scholarship Fund'
  };

  // Sample Replay Matches
  const sampleReplays: ReplayMatch[] = [
    {
      id: 'replay-world-finals-2024',
      title: '🏆 World Championship Finals 2024 - LEGENDARY',
      date: new Date('2024-03-15'),
      duration: 60,
      winner: defaultMatch.competitors[0].hero,
      finalScore: 485,
      task: defaultMatch.task,
      competitors: defaultMatch.competitors,
      highlights: ['Amazing comeback at 30min', 'Perfect algorithm implementation', 'AI Judge gives 98/100 innovation score'],
      viewCount: 2840000
    },
    {
      id: 'replay-speed-championship',
      title: '⚡ Speed Championship - Under 1 Hour',
      date: new Date('2024-02-20'),
      duration: 45,
      winner: defaultMatch.competitors[1].hero,
      finalScore: 492,
      task: defaultMatch.task,
      competitors: defaultMatch.competitors,
      highlights: ['Record-breaking performance', 'Zero errors throughout', 'Innovative ML approach'],
      viewCount: 1560000
    },
    {
      id: 'replay-somalia-victory',
      title: '🇸🇴 Somalia Rises - Inspirational Victory',
      date: new Date('2024-01-10'),
      duration: 55,
      winner: defaultMatch.competitors[0].hero,
      finalScore: 478,
      task: defaultMatch.task,
      competitors: defaultMatch.competitors,
      highlights: ['Against all odds victory', 'Perfect risk management', 'Global inspiration'],
      viewCount: 4200000
    }
  ];

  const liveMatch = match || defaultMatch;
  const aiAnalysis: AIJudgeAnalysis = {
    overallScore: 94,
    codeQuality: 96,
    performance: 91,
    innovation: 98,
    bestPractices: 89,
    commentary: "CodeWarrior_Somalia demonstrates exceptional algorithmic thinking. The risk management implementation is innovative and the code structure shows deep understanding of high-frequency trading principles.",
    suggestions: [
      "Consider implementing circuit breakers for extreme volatility",
      "Add more comprehensive error handling for network failures",
      "Optimize memory allocation for the order book structure"
    ],
    bias: 0
  };

  useEffect(() => {
    // Simulate live updates
    const interval = setInterval(() => {
      setViewers(prev => prev + Math.floor(Math.random() * 100) - 50);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs}:${mins.toString().padStart(2, '0')}`;
  };

  const addChatMessage = () => {
    if (!newMessage.trim()) return;
    
    const message = {
      id: Date.now().toString(),
      user: `Viewer${Math.floor(Math.random() * 9999)}`,
      message: newMessage,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev.slice(-49), message]);
    setNewMessage('');
  };

  // Replay Mode - Show Replay Library
  if (isReplayMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
        {/* Replay Header */}
        <div className="border-b border-purple-500/30 bg-black/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Archive className="w-5 h-5 text-orange-400" />
                  <span className="text-orange-400 font-bold">REPLAY LIBRARY</span>
                </div>
                <h1 className="text-xl font-bold">Educational Match Replays</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsReplayMode(false)}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span>Back to Live</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Replay Library */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">🎬 Study the Masters</h2>
            <p className="text-gray-400">Watch legendary programming battles and learn from the best. Every move analyzed by unbiased AI.</p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {sampleReplays.map((replay) => (
              <div
                key={replay.id}
                className="bg-gradient-to-br from-gray-800/50 to-purple-800/30 rounded-lg border border-gray-700 p-6 hover:border-purple-500 transition-all cursor-pointer group"
                onClick={() => {
                  // Here you would load the specific replay
                  setIsReplayMode(false); // For demo, go back to live view
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold group-hover:text-purple-400 transition-colors">
                    {replay.title}
                  </h3>
                  <div className="px-2 py-1 bg-orange-600 rounded text-xs font-bold">
                    REPLAY
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{replay.winner.avatar}</span>
                    <div>
                      <div className="font-semibold">{replay.winner.name}</div>
                      <div className="text-sm text-gray-400">Winner • Final Score: {replay.finalScore}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{replay.date.toLocaleDateString()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{replay.duration}min</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{(replay.viewCount / 1000000).toFixed(1)}M</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="font-semibold text-sm flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>Highlights</span>
                  </h5>
                  <div className="space-y-1">
                    {replay.highlights.slice(0, 2).map((highlight, idx) => (
                      <div key={idx} className="text-xs text-gray-400 flex items-start space-x-2">
                        <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-600">
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors group-hover:bg-purple-500">
                    <Play className="w-4 h-4" />
                    <span>Watch Replay</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Live Mode - Show Current Match
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-purple-500/30 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-400 font-bold">LIVE</span>
              </div>
              <h1 className="text-xl font-bold">{liveMatch.title}</h1>
              <div className="flex items-center space-x-2 text-gray-400">
                <Eye className="w-4 h-4" />
                <span>{viewers.toLocaleString()} watching</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsReplayMode(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
              >
                <Archive className="w-4 h-4" />
                <span>Watch Replays</span>
              </button>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{formatTime(liveMatch.timeRemaining)}</div>
                <div className="text-xs text-gray-400">Time Left</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-400">{liveMatch.prize}</div>
                <div className="text-xs text-gray-400">Prize Pool</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-4 gap-6">
          {/* Main Viewing Area */}
          <div className="col-span-3 space-y-4">
            {/* View Mode Selector */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex bg-gray-800 rounded-lg p-1">
                {[
                  { id: 'code', label: 'Code View', icon: Code },
                  { id: 'split', label: 'Split View', icon: Camera },
                  { id: 'stats', label: 'Stats View', icon: TrendingUp }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setViewMode(id as any)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                      viewMode === id ? 'bg-purple-600' : 'hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
              
              <div className="flex items-center space-x-2 ml-auto">
                <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg">
                  <Star className="w-4 h-4" />
                  <span>Follow</span>
                </button>
              </div>
            </div>

            {/* Live Code Streaming */}
            <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h3 className="text-lg font-bold flex items-center space-x-2">
                  <Code className="w-5 h-5" />
                  <span>Live Code Stream</span>
                </h3>
                <div className="flex items-center space-x-4">
                  {liveMatch.competitors.map((competitor) => (
                    <button
                      key={competitor.id}
                      onClick={() => setSelectedCompetitor(competitor.id)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                        selectedCompetitor === competitor.id || (!selectedCompetitor && competitor.id === '1')
                          ? 'bg-purple-600' 
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    >
                      <span>{competitor.hero.avatar}</span>
                      <span>{competitor.hero.name}</span>
                      {competitor.isTyping && <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="p-4">
                <div className="bg-black rounded-lg p-4 font-mono text-sm">
                  <pre className="text-green-400 whitespace-pre-wrap">
                    {(selectedCompetitor ? 
                      liveMatch.competitors.find(c => c.id === selectedCompetitor)?.currentCode : 
                      liveMatch.competitors[0]?.currentCode
                    ) || 'Loading...'}
                  </pre>
                  {(selectedCompetitor ? 
                    liveMatch.competitors.find(c => c.id === selectedCompetitor)?.isTyping : 
                    liveMatch.competitors[0]?.isTyping
                  ) && (
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-xs">Typing...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* AI Judge Analysis */}
            <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg border border-blue-500/30 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-bold">🤖 AI Judge Analysis</h3>
                <div className="px-3 py-1 bg-green-600 rounded-full text-xs font-bold">
                  100% UNBIASED
                </div>
              </div>
              
              <div className="grid grid-cols-5 gap-4 mb-4">
                {[
                  { label: 'Overall', value: aiAnalysis.overallScore, color: 'bg-purple-500' },
                  { label: 'Quality', value: aiAnalysis.codeQuality, color: 'bg-blue-500' },
                  { label: 'Performance', value: aiAnalysis.performance, color: 'bg-green-500' },
                  { label: 'Innovation', value: aiAnalysis.innovation, color: 'bg-yellow-500' },
                  { label: 'Best Practices', value: aiAnalysis.bestPractices, color: 'bg-red-500' }
                ].map((metric) => (
                  <div key={metric.label} className="text-center">
                    <div className="text-2xl font-bold mb-1">{metric.value}</div>
                    <div className="text-xs text-gray-400 mb-2">{metric.label}</div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`${metric.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-black/30 rounded-lg p-4">
                <h4 className="font-bold mb-2 flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Live Commentary</span>
                </h4>
                <p className="text-gray-300 mb-3">{aiAnalysis.commentary}</p>
                
                <h5 className="font-semibold mb-2">AI Suggestions:</h5>
                <ul className="space-y-1">
                  {aiAnalysis.suggestions.map((suggestion, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-sm">
                      <Target className="w-3 h-3 text-yellow-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-400">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Live Leaderboard */}
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <div className="p-4 border-b border-gray-700">
                <h3 className="font-bold flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span>Live Rankings</span>
                </h3>
              </div>
              <div className="p-4 space-y-3">
                {liveMatch.competitors
                  .sort((a, b) => b.currentScore - a.currentScore)
                  .map((competitor, idx) => (
                  <div key={competitor.id} className="flex items-center space-x-3 p-3 bg-gray-900 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      idx === 0 ? 'bg-yellow-500 text-black' : 
                      idx === 1 ? 'bg-gray-400 text-black' : 
                      'bg-orange-500 text-black'
                    }`}>
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span>{competitor.hero.avatar}</span>
                        <span className="font-semibold text-sm">{competitor.hero.name.split('_')[0]}</span>
                      </div>
                      <div className="text-xs text-gray-400">
                        {competitor.hero.paitRating.currentRating} PaiT • {competitor.hero.location.country}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-400">{competitor.currentScore}</div>
                      <div className="text-xs text-gray-400">{competitor.linesWritten} lines</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Stats */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
              <h3 className="font-bold mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span>Live Stats</span>
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Lines Written</span>
                  <span className="font-bold">{liveMatch.competitors.reduce((sum, c) => sum + c.linesWritten, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Bugs Fixed</span>
                  <span className="font-bold">{liveMatch.competitors.reduce((sum, c) => sum + c.errorsFixed, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg Speed (WPM)</span>
                  <span className="font-bold">127</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">AI Confidence</span>
                  <span className="font-bold text-green-400">96%</span>
                </div>
              </div>
            </div>

            {/* Live Chat */}
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <div className="p-4 border-b border-gray-700">
                <h3 className="font-bold flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-green-400" />
                  <span>Live Chat</span>
                  <span className="text-xs text-gray-400">({viewers.toLocaleString()})</span>
                </h3>
              </div>
              <div className="h-64 overflow-y-auto p-4 space-y-2">
                {chatMessages.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>Chat is starting soon...</p>
                  </div>
                ) : (
                  chatMessages.map((msg) => (
                    <div key={msg.id} className="text-sm">
                      <span className="text-purple-400 font-semibold">{msg.user}:</span>
                      <span className="ml-2 text-gray-300">{msg.message}</span>
                    </div>
                  ))
                )}
              </div>
              <div className="p-4 border-t border-gray-700">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addChatMessage()}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                  />
                  <button
                    onClick={addChatMessage}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArenaViewer;
