import React, { useState } from 'react';
import { Task, RegionalTheme } from '../types';
import { taskCategories, complexityLevels } from '../data/tasks';
import { Search, Filter, FileText, Clock, Tag } from 'lucide-react';

interface TaskSelectorProps {
  tasks: Task[];
  onTaskSelect: (task: Task) => void;
  theme: RegionalTheme;
}

const TaskSelector: React.FC<TaskSelectorProps> = ({ tasks, onTaskSelect, theme }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedComplexity, setSelectedComplexity] = useState<string>('all');
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  React.useEffect(() => {
    let filtered = tasks;

    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(task => task.category === selectedCategory);
    }

    if (selectedComplexity !== 'all') {
      filtered = filtered.filter(task => task.complexity === selectedComplexity);
    }

    setFilteredTasks(filtered);
  }, [searchTerm, selectedCategory, selectedComplexity, tasks]);

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'basic': return '#10b981';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Select a Task to Convert
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose from our library of multilingual tasks. Each task will be adapted to your target region's cultural context and visual preferences.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
              style={{ 
                focusRingColor: `${theme.primaryColor}40`,
                borderColor: searchTerm ? theme.primaryColor : '#d1d5db'
              }}
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:border-transparent bg-white"
              style={{ 
                focusRingColor: `${theme.primaryColor}40`
              }}
            >
              <option value="all">All Categories</option>
              {taskCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Complexity Filter */}
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={selectedComplexity}
              onChange={(e) => setSelectedComplexity(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:border-transparent bg-white"
              style={{ 
                focusRingColor: `${theme.primaryColor}40`
              }}
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

        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredTasks.length} of {tasks.length} tasks
        </div>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => onTaskSelect(task)}
            theme={theme}
            getComplexityColor={getComplexityColor}
          />
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
};

interface TaskCardProps {
  task: Task;
  onClick: () => void;
  theme: RegionalTheme;
  getComplexityColor: (complexity: string) => string;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick, theme, getComplexityColor }) => {
  return (
    <div
      onClick={onClick}
      className="cultural-card bg-white rounded-xl shadow-md p-6 cursor-pointer border border-gray-200 hover:shadow-xl transition-all duration-300"
      style={{
        borderLeftColor: theme.primaryColor,
        borderLeftWidth: '4px'
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
            {task.english}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {task.description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <span 
          className="px-2 py-1 rounded-full text-xs font-medium text-white"
          style={{ backgroundColor: getComplexityColor(task.complexity) }}
        >
          {task.complexity}
        </span>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {task.category}
        </span>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {task.tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium"
            style={{
              backgroundColor: `${theme.primaryColor}10`,
              color: theme.primaryColor
            }}
          >
            <Tag className="w-3 h-3 mr-1" />
            {tag}
          </span>
        ))}
        {task.tags.length > 3 && (
          <span className="text-xs text-gray-400">
            +{task.tags.length - 3} more
          </span>
        )}
      </div>

      <button
        className="w-full py-2 px-4 rounded-lg font-medium text-white transition-colors duration-200 hover:opacity-90"
        style={{ backgroundColor: theme.primaryColor }}
      >
        Select Task
      </button>
    </div>
  );
};

export default TaskSelector;
