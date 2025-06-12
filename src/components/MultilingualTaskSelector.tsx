import React, { useState, useEffect } from 'react';
import { Task, RegionalTheme, LanguageType, RegionType } from '../types';
import { taskCategories, complexityLevels } from '../data/tasks';
import { regionalThemes } from '../data/cultural';
import { 
  Search, 
  Filter, 
  Globe, 
  Languages, 
  Map, 
  RotateCcw,
  ChevronDown,
  Sparkles,
  Eye,
  MousePointer
} from 'lucide-react';

interface MultilingualTaskSelectorProps {
  tasks: Task[];
  onTaskSelect: (task: Task) => void;
  theme: RegionalTheme;
}

const MultilingualTaskSelector: React.FC<MultilingualTaskSelectorProps> = ({ 
  tasks, 
  onTaskSelect, 
  theme 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedComplexity, setSelectedComplexity] = useState<string>('all');
  const [activeLanguage, setActiveLanguage] = useState<LanguageType>('english');
  const [selectedRegion, setSelectedRegion] = useState<RegionType | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'multilingual' | 'globe'>('globe');
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [hoveredRegion, setHoveredRegion] = useState<RegionType | null>(null);
  const [globeRotation, setGlobeRotation] = useState(0);

  // Language mapping to regions and their coordinates
  const languageRegions = {
    english: { region: 'american' as RegionType, x: 25, y: 40, color: '#3B82F6' },
    spanish: { region: 'american' as RegionType, x: 20, y: 60, color: '#EF4444' },
    french: { region: 'european' as RegionType, x: 50, y: 35, color: '#8B5CF6' },
    german: { region: 'european' as RegionType, x: 52, y: 32, color: '#F59E0B' },
    chinese: { region: 'asian' as RegionType, x: 75, y: 45, color: '#EF4444' },
    japanese: { region: 'asian' as RegionType, x: 80, y: 40, color: '#EC4899' },
    portuguese: { region: 'american' as RegionType, x: 35, y: 70, color: '#10B981' }
  };

  const regionColors = {
    asian: '#FF6B6B',
    european: '#4ECDC4', 
    american: '#45B7D1',
    african: '#FFA07A',
    oceanic: '#98D8C8',
    arabic: '#F7DC6F'
  };

  useEffect(() => {
    let filtered = tasks;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(task =>
        Object.values(task).some(value => 
          typeof value === 'string' && 
          value.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(task => task.category === selectedCategory);
    }

    // Complexity filter
    if (selectedComplexity !== 'all') {
      filtered = filtered.filter(task => task.complexity === selectedComplexity);
    }

    setFilteredTasks(filtered);
  }, [searchTerm, selectedCategory, selectedComplexity, tasks]);

  // Globe rotation animation
  useEffect(() => {
    const interval = setInterval(() => {
      setGlobeRotation(prev => (prev + 0.5) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const InteractiveGlobe = () => (
    <div className="relative w-80 h-80 mx-auto mb-8">
      {/* Globe container */}
      <div 
        className="relative w-full h-full rounded-full border-4 border-blue-200 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 shadow-2xl overflow-hidden"
        style={{
          background: `conic-gradient(from ${globeRotation}deg, #3B82F6, #1E40AF, #1E3A8A, #3B82F6)`,
          boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3), inset 0 0 50px rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Latitude/Longitude lines */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={`lat-${i}`}
              className="absolute left-0 right-0 border-t border-white/20"
              style={{ top: `${(i + 1) * 15}%` }}
            />
          ))}
          {[...Array(8)].map((_, i) => (
            <div
              key={`lng-${i}`}
              className="absolute top-0 bottom-0 border-l border-white/20"
              style={{ left: `${(i + 1) * 12}%` }}
            />
          ))}
        </div>

        {/* Language points on globe */}
        {Object.entries(languageRegions).map(([lang, info]) => (
          <div
            key={lang}
            className={`absolute w-6 h-6 rounded-full cursor-pointer transition-all duration-300 ${
              activeLanguage === lang ? 'scale-150 z-10' : 'scale-100 hover:scale-125'
            }`}
            style={{
              left: `${info.x}%`,
              top: `${info.y}%`,
              backgroundColor: info.color,
              boxShadow: `0 0 20px ${info.color}80`,
              border: activeLanguage === lang ? '3px solid white' : '2px solid rgba(255,255,255,0.5)'
            }}
            onClick={() => setActiveLanguage(lang as LanguageType)}
            onMouseEnter={() => setHoveredRegion(info.region)}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            <div className="absolute inset-0 rounded-full animate-ping bg-current opacity-30" />
            <div className="relative w-full h-full rounded-full flex items-center justify-center text-white text-xs font-bold">
              {lang.slice(0, 2).toUpperCase()}
            </div>
          </div>
        ))}

        {/* Hover tooltip */}
        {hoveredRegion && (
          <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1 rounded-lg text-sm">
            {hoveredRegion.charAt(0).toUpperCase() + hoveredRegion.slice(1)} Region
          </div>
        )}

        {/* Globe shine effect */}
        <div 
          className="absolute top-8 left-8 w-16 h-16 rounded-full bg-white/30 blur-xl"
          style={{
            transform: `rotate(${globeRotation * 2}deg) translate(20px, 20px)`
          }}
        />
      </div>

      {/* Language selection info */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-6 py-2 shadow-lg border">
        <div className="flex items-center space-x-2">
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: languageRegions[activeLanguage].color }}
          />
          <span className="font-medium capitalize">{activeLanguage}</span>
          <Languages className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </div>
  );

  const LanguageSelector = () => (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {Object.entries(languageRegions).map(([lang, info]) => (
        <button
          key={lang}
          onClick={() => setActiveLanguage(lang as LanguageType)}
          className={`px-4 py-2 rounded-full transition-all duration-300 ${
            activeLanguage === lang
              ? 'text-white shadow-lg scale-105'
              : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
          }`}
          style={{
            backgroundColor: activeLanguage === lang ? info.color : undefined
          }}
        >
          <span className="font-medium capitalize">{lang}</span>
        </button>
      ))}
    </div>
  );

  const ViewModeSelector = () => (
    <div className="flex justify-center mb-6">
      <div className="bg-white rounded-xl p-1 shadow-lg border">
        <button
          onClick={() => setViewMode('globe')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
            viewMode === 'globe' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Globe</span>
        </button>
        <button
          onClick={() => setViewMode('multilingual')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
            viewMode === 'multilingual' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Languages className="w-4 h-4" />
          <span>Multilingual</span>
        </button>
        <button
          onClick={() => setViewMode('grid')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
            viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Grid</span>
        </button>
      </div>
    </div>
  );

  const MultilingualTaskCard = ({ task }: { task: Task }) => {
    const [showAllLanguages, setShowAllLanguages] = useState(false);
    
    return (
      <div className="bg-white rounded-xl shadow-lg border-l-4 p-6 hover:shadow-xl transition-all duration-300"
           style={{ borderLeftColor: languageRegions[activeLanguage].color }}>
        
        {/* Primary language display */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span 
              className="px-3 py-1 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: languageRegions[activeLanguage].color }}
            >
              {activeLanguage}
            </span>
            <button
              onClick={() => setShowAllLanguages(!showAllLanguages)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Languages className="w-4 h-4" />
            </button>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {task[activeLanguage]}
          </h3>
        </div>

        {/* All languages expansion */}
        {showAllLanguages && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <Sparkles className="w-4 h-4 mr-2" />
              All Languages
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(languageRegions).map(([lang, info]) => (
                <div key={lang} className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: info.color }}
                  />
                  <span className="text-xs font-medium text-gray-600 w-16">
                    {lang}:
                  </span>
                  <span className="text-sm text-gray-900 flex-1">
                    {task[lang as keyof Task]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Task metadata */}
        <div className="flex items-center justify-between mb-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            task.complexity === 'basic' ? 'bg-green-100 text-green-800' :
            task.complexity === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {task.complexity}
          </span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {task.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4">{task.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {task.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 rounded-md text-xs font-medium"
              style={{
                backgroundColor: `${languageRegions[activeLanguage].color}20`,
                color: languageRegions[activeLanguage].color
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action button */}
        <button
          onClick={() => onTaskSelect(task)}
          className="w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center justify-center space-x-2"
          style={{ backgroundColor: languageRegions[activeLanguage].color }}
        >
          <MousePointer className="w-4 h-4" />
          <span>Select Task</span>
        </button>
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center">
          <Globe className="w-8 h-8 mr-3 text-blue-500" />
          Multilingual Task Explorer
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Discover tasks in 7 languages across global cultures. Click on the globe to explore different regions and languages.
        </p>
      </div>

      {/* View mode selector */}
      <ViewModeSelector />

      {/* Interactive Globe */}
      {viewMode === 'globe' && (
        <div className="mb-8">
          <InteractiveGlobe />
          <div className="text-center text-sm text-gray-600">
            Click on language points to explore tasks in different languages
          </div>
        </div>
      )}

      {/* Language Selector */}
      {(viewMode === 'multilingual' || viewMode === 'grid') && <LanguageSelector />}

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tasks in any language..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
              style={{ 
                borderColor: searchTerm ? languageRegions[activeLanguage].color : '#d1d5db'
              }}
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:border-transparent bg-white"
            >
              <option value="all">All Categories</option>
              {taskCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Complexity Filter */}
          <div className="relative">
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            <select
              value={selectedComplexity}
              onChange={(e) => setSelectedComplexity(e.target.value)}
              className="pl-4 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:border-transparent bg-white appearance-none"
            >
              <option value="all">All Levels</option>
              {complexityLevels.map(level => (
                <option key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-600">
            Showing {filteredTasks.length} of {tasks.length} tasks in 
            <span 
              className="font-medium ml-1"
              style={{ color: languageRegions[activeLanguage].color }}
            >
              {activeLanguage}
            </span>
          </span>
          
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedComplexity('all');
            }}
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <MultilingualTaskCard key={task.id} task={task} />
        ))}
      </div>

      {/* No results */}
      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or explore different languages.</p>
        </div>
      )}
    </div>
  );
};

export default MultilingualTaskSelector;
