import React, { useState, useEffect } from 'react';
import { GameHero, TaskChallenge, Contest, PAIT_RATING_SYSTEM } from '../types/game';
import { sampleHeroes, sampleTasks, activeContests, dailyMissions, seasonRewards, championAbilities } from '../data/gameData';
import ArenaViewer from './ArenaViewer';

interface GameOfTasksProps {
  currentHero?: GameHero;
  onHeroSelect: (hero: GameHero) => void;
}

const GameOfTasks: React.FC<GameOfTasksProps> = ({ currentHero, onHeroSelect }) => {
  const [selectedHero, setSelectedHero] = useState<GameHero | null>(currentHero || null);
  const [activeTab, setActiveTab] = useState<'lobby' | 'tasks' | 'contests' | 'leaderboard' | 'training' | 'spectate'>('lobby');
  const [missions, setMissions] = useState(dailyMissions);

  useEffect(() => {
    if (!selectedHero && sampleHeroes.length > 0) {
      setSelectedHero(sampleHeroes[0]);
    }
  }, [selectedHero]);

  const getTierColor = (tier: string) => {
    if (!selectedHero?.paitRating?.currentRating) return '#8B5A3C';
    const tierData = Object.values(PAIT_RATING_SYSTEM.TIERS).find(t => 
      selectedHero.paitRating.currentRating >= t.min && selectedHero.paitRating.currentRating <= t.max
    );
    return tierData?.color || '#8B5A3C';
  };

  const getProgressPercentage = () => {
    if (!selectedHero?.paitRating?.currentRating) return 0;
    const currentTier = Object.entries(PAIT_RATING_SYSTEM.TIERS).find(([, tier]) => 
      selectedHero.paitRating.currentRating >= tier.min && selectedHero.paitRating.currentRating <= tier.max
    );
    if (!currentTier) return 0;
    
    const [, tier] = currentTier;
    const progress = (selectedHero.paitRating.currentRating - tier.min) / (tier.max - tier.min);
    return Math.round(progress * 100);
  };

  const handleMissionComplete = (missionId: string) => {
    setMissions(prev => prev.map(mission => 
      mission.id === missionId ? { ...mission, completed: true } : mission
    ));
  };

  if (!selectedHero) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-white mb-8">🎮 Game of Tasks</h1>
          <HeroSelection heroes={sampleHeroes} onSelect={(hero) => {
            setSelectedHero(hero);
            onHeroSelect(hero);
          }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-purple-500/30 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{selectedHero.avatar}</div>
              <div>
                <h1 className="text-2xl font-bold">{selectedHero.name}</h1>
                <div className="flex items-center space-x-2">
                  <div 
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: getTierColor(selectedHero.paitRating.tier) }}
                  >
                    {selectedHero.paitRating.tier} • {selectedHero.paitRating.currentRating} PaiT
                  </div>
                  <div className="text-sm text-gray-400">
                    Grade: {selectedHero.paitRating.grade}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-xl font-bold text-green-400">{selectedHero.paitRating.completedTasks}</div>
                <div className="text-xs text-gray-400">Tasks</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-400">{selectedHero.paitRating.accelerationMultiplier}x</div>
                <div className="text-xs text-gray-400">Acceleration</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-yellow-400">{selectedHero.paitRating.averageCompletionTime.toFixed(1)}m</div>
                <div className="text-xs text-gray-400">Avg Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b border-purple-500/30 bg-black/20">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            {[
              { id: 'lobby', label: '🏠 Lobby', icon: '🏠' },
              { id: 'tasks', label: '⚔️ Tasks', icon: '⚔️' },
              { id: 'contests', label: '🏆 Contests', icon: '🏆' },
              { id: 'leaderboard', label: '📊 Leaderboard', icon: '📊' },
              { id: 'training', label: '🎯 Q-Training', icon: '🎯' },
              { id: 'spectate', label: '👁️ Arena Viewer', icon: '👁️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-400 text-purple-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'lobby' && (
          <GameLobby 
            hero={selectedHero} 
            missions={missions}
            onMissionComplete={handleMissionComplete}
            getProgressPercentage={getProgressPercentage}
          />
        )}
        {activeTab === 'tasks' && <TaskArena tasks={sampleTasks} hero={selectedHero} />}
        {activeTab === 'contests' && <ContestHub contests={activeContests} hero={selectedHero} />}
        {activeTab === 'leaderboard' && <GlobalLeaderboard heroes={sampleHeroes} />}
        {activeTab === 'training' && <QTrainingArena hero={selectedHero} />}
        {activeTab === 'spectate' && <ArenaViewer onStartWatching={() => console.log('Started watching')} />}
      </div>
    </div>
  );
};

// Hero Selection Component
const HeroSelection: React.FC<{ heroes: GameHero[], onSelect: (hero: GameHero) => void }> = ({ heroes, onSelect }) => (
  <div className="grid md:grid-cols-3 gap-6">
    {heroes.map((hero) => (
      <div
        key={hero.id}
        onClick={() => onSelect(hero)}
        className="bg-gradient-to-br from-purple-800/50 to-blue-800/50 rounded-lg p-6 cursor-pointer hover:scale-105 transition-transform border border-purple-500/30"
      >
        <div className="text-6xl text-center mb-4">{hero.avatar}</div>
        <h3 className="text-xl font-bold text-center mb-2">{hero.name}</h3>
        <div className="text-center mb-4">
          <span className="px-3 py-1 bg-purple-600 rounded-full text-sm">
            {hero.paitRating.tier} • {hero.paitRating.currentRating} PaiT
          </span>
        </div>
        <div className="text-sm text-gray-300 text-center">
          {hero.location.city}, {hero.location.country}
        </div>
        <div className="mt-4 flex justify-center space-x-2">
          {hero.specializations.slice(0, 3).map((spec, idx) => (
            <span key={idx} className="px-2 py-1 bg-blue-600/50 rounded text-xs">{spec}</span>
          ))}
        </div>
      </div>
    ))}
    
    <div className="bg-gradient-to-br from-green-800/50 to-emerald-800/50 rounded-lg p-6 cursor-pointer hover:scale-105 transition-transform border border-green-500/30 flex flex-col items-center justify-center">
      <div className="text-6xl mb-4">➕</div>
      <h3 className="text-xl font-bold mb-2">Create Hero</h3>
      <p className="text-gray-300 text-center">Start your journey in the Game of Tasks</p>
    </div>
  </div>
);

// Game Lobby Component
const GameLobby: React.FC<{ 
  hero: GameHero, 
  missions: typeof dailyMissions,
  onMissionComplete: (id: string) => void,
  getProgressPercentage: () => number
}> = ({ hero, missions, onMissionComplete, getProgressPercentage }) => (
  <div className="grid lg:grid-cols-3 gap-6">
    {/* Hero Stats */}
    <div className="lg:col-span-2 space-y-6">
      <div className="bg-gradient-to-r from-purple-800/30 to-blue-800/30 rounded-lg p-6 border border-purple-500/30">
        <h2 className="text-2xl font-bold mb-4">🎮 Hero Status</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">PaiT Rating Progress</h3>
            <div className="bg-gray-700 rounded-full h-4 mb-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${(hero.paitRating.currentRating / hero.paitRating.maxRating) * 100}%` }}
              />
            </div>
            <div className="text-sm text-gray-400">
              {hero.paitRating.currentRating} / {hero.paitRating.maxRating} PaiT
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Next Tier Progress</h3>
            <div className="bg-gray-700 rounded-full h-4 mb-2">
              <div 
                className="bg-gradient-to-r from-yellow-500 to-orange-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
            <div className="text-sm text-gray-400">
              {getProgressPercentage()}% to next tier
            </div>
          </div>
        </div>
      </div>

      {/* Champion Abilities */}
      <div className="bg-gradient-to-r from-green-800/30 to-teal-800/30 rounded-lg p-6 border border-green-500/30">
        <h2 className="text-2xl font-bold mb-4">⚡ Champion Abilities</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(championAbilities.CodeWarrior).map(([key, ability]) => (
            <div key={key} className="bg-black/30 rounded p-3">
              <div className="font-bold text-yellow-400 uppercase">{key}</div>
              <div className="text-sm text-gray-300">{ability}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Daily Missions & Season Rewards */}
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-800/30 to-red-800/30 rounded-lg p-6 border border-orange-500/30">
        <h2 className="text-xl font-bold mb-4">🎯 Daily Missions</h2>
        <div className="space-y-3">
          {missions.map((mission) => (
            <div 
              key={mission.id}
              className={`p-3 rounded border ${
                mission.completed 
                  ? 'bg-green-800/30 border-green-500/30' 
                  : 'bg-gray-800/30 border-gray-500/30'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">{mission.title}</div>
                  <div className="text-sm text-gray-400">{mission.description}</div>
                </div>
                <div className="text-right">
                  <div className="text-yellow-400 font-bold">+{mission.reward}</div>
                  {!mission.completed && (
                    <button 
                      onClick={() => onMissionComplete(mission.id)}
                      className="text-xs bg-purple-600 hover:bg-purple-700 px-2 py-1 rounded mt-1"
                    >
                      Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-800/30 to-amber-800/30 rounded-lg p-6 border border-yellow-500/30">
        <h2 className="text-xl font-bold mb-4">🏆 Season Rewards</h2>
        <div className="space-y-2">
          {seasonRewards.map((reward, idx) => (
            <div 
              key={idx}
              className={`p-2 rounded text-sm ${
                hero.paitRating.tier === reward.tier 
                  ? 'bg-yellow-600/30 border border-yellow-500' 
                  : 'bg-gray-800/30'
              }`}
            >
              <div className="font-semibold">{reward.tier}</div>
              <div className="text-gray-400">{reward.reward}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Placeholder components for other tabs
const TaskArena: React.FC<{ tasks: TaskChallenge[], hero: GameHero }> = ({ tasks, hero }) => (
  <div className="text-center py-12">
    <div className="text-6xl mb-4">⚔️</div>
    <h2 className="text-2xl font-bold mb-4">Task Arena</h2>
    <p className="text-gray-400 mb-8">Choose your battle mode and prove your skills!</p>
    <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
      {['Speed (1hr)', 'Moderate (8hr)', 'Classic (100hr)'].map((mode, idx) => (
        <div key={idx} className="bg-purple-800/30 p-6 rounded-lg border border-purple-500/30">
          <h3 className="text-xl font-bold mb-2">{mode}</h3>
          <p className="text-gray-400">Available tasks: {tasks.length}</p>
        </div>
      ))}
    </div>
  </div>
);

const ContestHub: React.FC<{ contests: Contest[], hero: GameHero }> = ({ contests }) => (
  <div className="text-center py-12">
    <div className="text-6xl mb-4">🏆</div>
    <h2 className="text-2xl font-bold mb-4">Contest Hub</h2>
    <p className="text-gray-400">Compete with developers worldwide!</p>
  </div>
);

const GlobalLeaderboard: React.FC<{ heroes: GameHero[] }> = ({ heroes }) => (
  <div className="text-center py-12">
    <div className="text-6xl mb-4">📊</div>
    <h2 className="text-2xl font-bold mb-4">Global Leaderboard</h2>
    <p className="text-gray-400">See where you rank among all heroes!</p>
  </div>
);

const QTrainingArena: React.FC<{ hero: GameHero }> = ({ hero }) => (
  <div className="text-center py-12">
    <div className="text-6xl mb-4">🎯</div>
    <h2 className="text-2xl font-bold mb-4">Q-Training Arena</h2>
    <p className="text-gray-400">Master the fundamentals to unlock task rating!</p>
    <div className="mt-8">
      <div className="text-4xl font-bold text-green-400">{hero.paitRating.qTrainingScore}</div>
      <div className="text-gray-400">Current Q-Training Score</div>
      <div className="mt-4">
        {hero.paitRating.taskRatingUnlocked ? (
          <span className="text-green-400">✅ Task Rating Unlocked!</span>
        ) : (
          <span className="text-yellow-400">🔒 Need {PAIT_RATING_SYSTEM.Q_TRAINING_UNLOCK - hero.paitRating.qTrainingScore} more points</span>
        )}
      </div>
    </div>
  </div>
);


export default GameOfTasks;
