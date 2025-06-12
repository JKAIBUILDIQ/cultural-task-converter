import React, { useState, useMemo } from 'react';
import { Bot, GalleryFilter, RegionalTheme, RegionType, LanguageType } from '../types';
import { sampleBots } from '../data/bots';
import { regionalThemes } from '../data/cultural';
import { 
  Filter, 
  Search, 
  Star, 
  Globe, 
  Calendar,
  User,
  Tag,
  Grid,
  List,
  ChevronDown,
  Heart,
  Play,
  Settings
} from 'lucide-react';

interface BotGalleriaProps {
  theme: RegionalTheme;
  onBotSelect: (bot: Bot) => void;
  onBotEdit: (bot: Bot) => void;
  onBotTest: (bot: Bot) => void;
}

const BotGalleria: React.FC<BotGalleriaProps> = ({ theme, onBotSelect, onBotEdit, onBotTest }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filter, setFilter] = useState<GalleryFilter>({
    sortBy: 'rating',
    sortOrder: 'desc'
  });

  const regions: RegionType[] = ['asian', 'european', 'american', 'african', 'oceanic', 'arabic'];
  const languages: LanguageType[] = ['english', 'spanish', 'french', 'german', 'chinese', 'japanese', 'portuguese', 'arabic', 'korean'];
  const categories = ['File Operations', 'Programming & Development', 'Web Development', 'Data Analysis', 'Creative Tasks'];

  const filteredAndSortedBots = useMemo(() => {
    let filtered = sampleBots.filter(bot => {
      // Search filter
      if (searchQuery && !bot.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !bot.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Region filter
      if (filter.region && bot.coreRegion !== filter.region) {
        return false;
      }
      
      // Language filter
      if (filter.language && !bot.supportedLanguages.includes(filter.language)) {
        return false;
      }
      
      // Rating filter
      if (filter.rating && bot.rating < filter.rating) {
        return false;
      }
      
      // Tags filter
      if (filter.tags && filter.tags.length > 0) {
        const hasMatchingTag = filter.tags.some(tag => 
          bot.tags.some(botTag => botTag.toLowerCase().includes(tag.toLowerCase()))
        );
        if (!hasMatchingTag) {
          return false;
        }
      }
      
      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (filter.sortBy) {
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'date':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'language':
          comparison = a.primaryLanguage.localeCompare(b.primaryLanguage);
          break;
        case 'popularity':
          // Mock popularity based on rating and task count
          const popularityA = a.rating * a.tasks.length;
          const popularityB = b.rating * b.tasks.length;
          comparison = popularityA - popularityB;
          break;
        default:
          comparison = 0;
      }
      
      return filter.sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [sampleBots, searchQuery, filter]);

  const handleFilterChange = (updates: Partial<GalleryFilter>) => {
    setFilter(prev => ({ ...prev, ...updates }));
  };

  const getRegionTheme = (region: RegionType) => {
    return regionalThemes[region];
  };

  const renderBotCard = (bot: Bot) => {
    const botTheme = getRegionTheme(bot.coreRegion);
    
    return (
      <div
        key={bot.id}
        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
      >
        {/* Header */}
        <div 
          className="h-20 relative"
          style={{ 
            background: `linear-gradient(135deg, ${botTheme.primaryColor}, ${botTheme.secondaryColor})` 
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-2 py-1">
              <Star className="w-3 h-3 text-yellow-300 fill-current" />
              <span className="text-white text-xs font-medium">{bot.rating}</span>
            </div>
            {bot.isPublic && (
              <div className="w-6 h-6 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Globe className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Avatar */}
        <div className="relative -mt-8 flex justify-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl shadow-lg">
            {bot.avatar}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 pt-4">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{bot.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{bot.description}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-4 text-center">
            <div>
              <div className="text-lg font-semibold" style={{ color: botTheme.primaryColor }}>
                {bot.tasks.length}
              </div>
              <div className="text-xs text-gray-500">Tasks</div>
            </div>
            <div>
              <div className="text-lg font-semibold" style={{ color: botTheme.primaryColor }}>
                {bot.supportedLanguages.length}
              </div>
              <div className="text-xs text-gray-500">Languages</div>
            </div>
            <div>
              <div className="text-lg font-semibold" style={{ color: botTheme.primaryColor }}>
                {bot.capabilities.length}
              </div>
              <div className="text-xs text-gray-500">Skills</div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {bot.tags.slice(0, 3).map(tag => (
              <span 
                key={tag}
                className="px-2 py-1 text-xs rounded-full"
                style={{ 
                  backgroundColor: `${botTheme.primaryColor}15`,
                  color: botTheme.primaryColor 
                }}
              >
                {tag}
              </span>
            ))}
            {bot.tags.length > 3 && (
              <span className="px-2 py-1 text-xs text-gray-500 rounded-full bg-gray-100">
                +{bot.tags.length - 3}
              </span>
            )}
          </div>

          {/* Primary Language & Region */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
            <div className="flex items-center space-x-1">
              <Globe className="w-3 h-3" />
              <span className="capitalize">{bot.primaryLanguage}</span>
            </div>
            <div className="flex items-center space-x-1">
              <User className="w-3 h-3" />
              <span className="capitalize">{bot.coreRegion}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onBotSelect(bot)}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center"
            >
              <Heart className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => onBotTest(bot)}
              className="p-2 rounded-lg transition-colors flex items-center justify-center text-white"
              style={{ backgroundColor: botTheme.primaryColor }}
            >
              <Play className="w-4 h-4" />
            </button>
            <button
              onClick={() => onBotEdit(bot)}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center"
            >
              <Settings className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderBotListItem = (bot: Bot) => {
    const botTheme = getRegionTheme(bot.coreRegion);
    
    return (
      <div
        key={bot.id}
        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4 border"
      >
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl bg-gray-100">
            {bot.avatar}
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-medium text-gray-900">{bot.name}</h3>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{bot.rating}</span>
                </div>
                <span className="text-xs text-gray-500">{bot.createdBy}</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-2">{bot.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span className="capitalize">{bot.primaryLanguage}</span>
                <span className="capitalize">{bot.coreRegion}</span>
                <span>{bot.tasks.length} tasks</span>
                <span>{bot.supportedLanguages.length} languages</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onBotTest(bot)}
                  className="px-3 py-1 rounded text-white text-sm"
                  style={{ backgroundColor: botTheme.primaryColor }}
                >
                  Try
                </button>
                <button
                  onClick={() => onBotEdit(bot)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-600 text-sm"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: theme.primaryColor }}>
                Bot Galleria 🏛️
              </h1>
              <p className="text-gray-600">Discover and explore cultural bots from around the world</p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bots..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* View Toggle */}
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              
              {/* Filters */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
          
          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {/* Region Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                  <select
                    value={filter.region || ''}
                    onChange={(e) => handleFilterChange({ region: e.target.value as RegionType || undefined })}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  >
                    <option value="">All Regions</option>
                    {regions.map(region => (
                      <option key={region} value={region} className="capitalize">{region}</option>
                    ))}
                  </select>
                </div>
                
                {/* Language Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <select
                    value={filter.language || ''}
                    onChange={(e) => handleFilterChange({ language: e.target.value as LanguageType || undefined })}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  >
                    <option value="">All Languages</option>
                    {languages.map(language => (
                      <option key={language} value={language} className="capitalize">{language}</option>
                    ))}
                  </select>
                </div>
                
                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Rating</label>
                  <select
                    value={filter.rating || ''}
                    onChange={(e) => handleFilterChange({ rating: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  >
                    <option value="">Any Rating</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="4.0">4.0+ Stars</option>
                    <option value="3.5">3.5+ Stars</option>
                    <option value="3.0">3.0+ Stars</option>
                  </select>
                </div>
                
                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                  <select
                    value={filter.sortBy}
                    onChange={(e) => handleFilterChange({ sortBy: e.target.value as GalleryFilter['sortBy'] })}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  >
                    <option value="rating">Rating</option>
                    <option value="date">Date Created</option>
                    <option value="name">Name</option>
                    <option value="language">Language</option>
                    <option value="popularity">Popularity</option>
                  </select>
                </div>
                
                {/* Sort Order */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                  <select
                    value={filter.sortOrder}
                    onChange={(e) => handleFilterChange({ sortOrder: e.target.value as 'asc' | 'desc' })}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  >
                    <option value="desc">High to Low</option>
                    <option value="asc">Low to High</option>
                  </select>
                </div>
                
                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={() => setFilter({ sortBy: 'rating', sortOrder: 'desc' })}
                    className="w-full p-2 bg-gray-200 hover:bg-gray-300 rounded text-sm text-gray-700"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredAndSortedBots.length} of {sampleBots.length} bots
          </p>
        </div>

        {/* Bot Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedBots.map(renderBotCard)}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAndSortedBots.map(renderBotListItem)}
          </div>
        )}

        {filteredAndSortedBots.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bots found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BotGalleria;
