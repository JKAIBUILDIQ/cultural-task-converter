import React, { useState, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Bot, BotTask, Task, AssemblyProject, AssemblySettings, RegionalTheme } from '../types';
import { sampleTasks } from '../data/tasks';
import { musicCues, botAvatars } from '../data/bots';
import { 
  Play, 
  Pause, 
  Settings, 
  Music, 
  Smile, 
  Star, 
  Trash2, 
  Save, 
  TestTube,
  Clock,
  Link,
  Volume2,
  VolumeX
} from 'lucide-react';

interface BotAssemblyStudioProps {
  theme: RegionalTheme;
  onSave: (project: AssemblyProject) => void;
  onTest: (timeline: BotTask[]) => void;
}

const BotAssemblyStudio: React.FC<BotAssemblyStudioProps> = ({ theme, onSave, onTest }) => {
  const [project, setProject] = useState<AssemblyProject>({
    id: `project-${Date.now()}`,
    name: 'New Bot Project',
    bot: {
      name: 'My Custom Bot',
      avatar: '🤖',
      description: 'A personalized cultural assistant',
      primaryLanguage: 'english',
      supportedLanguages: ['english'],
      coreRegion: 'european'
    },
    timeline: [],
    settings: {
      autoTest: true,
      showFeedback: true,
      enableMusic: false,
      allowEmoji: true,
      culturalValidation: true,
      targetAudience: []
    },
    lastModified: new Date(),
    isDraft: true
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === 'tasks' && destination.droppableId === 'timeline') {
      // Adding task to timeline
      const task = sampleTasks[source.index];
      const newBotTask: BotTask = {
        id: `bot-task-${Date.now()}`,
        taskId: task.id,
        position: destination.index,
        adaptedContent: task.english,
        testResults: [],
        feedbackOptions: [
          { type: 'emoji', value: '👍', count: 0, label: 'Good' },
          { type: 'emoji', value: '❤️', count: 0, label: 'Love' },
          { type: 'star', value: '5', count: 0, label: 'Excellent' }
        ],
        emoji: '✨',
        estimatedDuration: 60,
        dependencies: []
      };

      setProject(prev => ({
        ...prev,
        timeline: [
          ...prev.timeline.slice(0, destination.index),
          newBotTask,
          ...prev.timeline.slice(destination.index)
        ].map((task, index) => ({ ...task, position: index })),
        lastModified: new Date()
      }));
    } else if (source.droppableId === 'timeline' && destination.droppableId === 'timeline') {
      // Reordering tasks in timeline
      const newTimeline = [...project.timeline];
      const [removed] = newTimeline.splice(source.index, 1);
      newTimeline.splice(destination.index, 0, removed);

      setProject(prev => ({
        ...prev,
        timeline: newTimeline.map((task, index) => ({ ...task, position: index })),
        lastModified: new Date()
      }));
    }
  }, [project.timeline]);

  const handleTestRun = () => {
    setIsPlaying(true);
    setCurrentTaskIndex(0);
    onTest(project.timeline);
    
    // Simulate test execution
    const testInterval = setInterval(() => {
      setCurrentTaskIndex(prev => {
        if (prev >= project.timeline.length - 1) {
          setIsPlaying(false);
          clearInterval(testInterval);
          return 0;
        }
        return prev + 1;
      });
    }, 2000);
  };

  const handleTaskUpdate = (taskId: string, updates: Partial<BotTask>) => {
    setProject(prev => ({
      ...prev,
      timeline: prev.timeline.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      ),
      lastModified: new Date()
    }));
  };

  const handleRemoveTask = (taskId: string) => {
    setProject(prev => ({
      ...prev,
      timeline: prev.timeline.filter(task => task.id !== taskId)
        .map((task, index) => ({ ...task, position: index })),
      lastModified: new Date()
    }));
  };

  const handleSettingsChange = (settings: Partial<AssemblySettings>) => {
    setProject(prev => ({
      ...prev,
      settings: { ...prev.settings, ...settings },
      lastModified: new Date()
    }));
  };

  const totalDuration = project.timeline.reduce((sum, task) => sum + task.estimatedDuration, 0);

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-2xl">{project.bot.avatar}</span>
            <div>
              <input
                type="text"
                value={project.name}
                onChange={(e) => setProject(prev => ({ ...prev, name: e.target.value }))}
                className="text-xl font-bold bg-transparent border-none outline-none"
                style={{ color: theme.primaryColor }}
              />
              <p className="text-gray-600 text-sm">{project.bot.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{Math.ceil(totalDuration / 60)}m total</span>
            </div>
            
            <button
              onClick={handleTestRun}
              disabled={project.timeline.length === 0 || isPlaying}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white disabled:opacity-50"
              style={{ backgroundColor: theme.primaryColor }}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Running...' : 'Test Run'}</span>
            </button>
            
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              <Settings className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => onSave(project)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <DragDropContext onDragEnd={handleDragEnd}>
          {/* Task Library */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-900">Available Tasks</h3>
              <p className="text-sm text-gray-600">Drag tasks to your bot timeline</p>
            </div>
            
            <Droppable droppableId="tasks" isDropDisabled={true}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex-1 overflow-y-auto p-4 space-y-2"
                >
                  {sampleTasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-3 bg-gray-50 rounded-lg border cursor-move transition-all ${
                            snapshot.isDragging ? 'shadow-lg bg-white' : 'hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-900">{task.category}</span>
                            <span className={`px-2 py-1 rounded text-xs ${
                              task.complexity === 'basic' ? 'bg-green-100 text-green-800' :
                              task.complexity === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {task.complexity}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{task.english}</p>
                          <div className="flex items-center mt-2 space-x-2">
                            {task.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          {/* Timeline */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-gray-200 bg-white">
              <h3 className="font-medium text-gray-900">Bot Timeline</h3>
              <p className="text-sm text-gray-600">Order tasks to create your bot's workflow</p>
            </div>
            
            <Droppable droppableId="timeline">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`flex-1 overflow-y-auto p-4 transition-all ${
                    snapshot.isDraggingOver ? 'bg-blue-50' : 'bg-gray-50'
                  }`}
                >
                  {project.timeline.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <TestTube className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Drag tasks here to build your bot</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {project.timeline.map((botTask, index) => {
                        const originalTask = sampleTasks.find(t => t.id === botTask.taskId);
                        const isCurrentTask = isPlaying && index === currentTaskIndex;
                        
                        return (
                          <Draggable key={botTask.id} draggableId={botTask.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`p-4 bg-white rounded-lg border transition-all ${
                                  snapshot.isDragging ? 'shadow-lg' : 'hover:shadow-md'
                                } ${isCurrentTask ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                      <span className="text-sm font-medium text-gray-600">
                                        Step {index + 1}
                                      </span>
                                      <span className="text-lg">{botTask.emoji}</span>
                                      {originalTask && (
                                        <span className="text-sm text-gray-500">
                                          {originalTask.category}
                                        </span>
                                      )}
                                    </div>
                                    
                                    <textarea
                                      value={botTask.adaptedContent}
                                      onChange={(e) => handleTaskUpdate(botTask.id, { adaptedContent: e.target.value })}
                                      className="w-full text-sm bg-transparent resize-none border-none outline-none"
                                      rows={2}
                                    />
                                    
                                    <div className="flex items-center justify-between mt-3">
                                      <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-2">
                                          <Clock className="w-3 h-3 text-gray-400" />
                                          <span className="text-xs text-gray-500">
                                            {botTask.estimatedDuration}s
                                          </span>
                                        </div>
                                        
                                        {project.settings.enableMusic && botTask.musicCue && (
                                          <div className="flex items-center space-x-2">
                                            <Music className="w-3 h-3 text-gray-400" />
                                            <span className="text-xs text-gray-500">
                                              {musicCues.find(m => m.id === botTask.musicCue)?.name}
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                      
                                      <div className="flex items-center space-x-2">
                                        {project.settings.showFeedback && (
                                          <div className="flex items-center space-x-1">
                                            {botTask.feedbackOptions.slice(0, 3).map(option => (
                                              <span key={option.value} className="text-sm">
                                                {option.value}
                                              </span>
                                            ))}
                                          </div>
                                        )}
                                        
                                        <button
                                          onClick={() => handleRemoveTask(botTask.id)}
                                          className="p-1 text-gray-400 hover:text-red-500"
                                        >
                                          <Trash2 className="w-3 h-3" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                    </div>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>

        {/* Settings Panel */}
        {showSettings && (
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-900">Assembly Settings</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bot Avatar
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {botAvatars.slice(0, 10).map(avatar => (
                    <button
                      key={avatar}
                      onClick={() => setProject(prev => ({
                        ...prev,
                        bot: { ...prev.bot, avatar }
                      }))}
                      className={`p-2 text-xl border rounded hover:bg-gray-50 ${
                        project.bot.avatar === avatar ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                      }`}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={project.settings.autoTest}
                    onChange={(e) => handleSettingsChange({ autoTest: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm">Auto-test on changes</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={project.settings.showFeedback}
                    onChange={(e) => handleSettingsChange({ showFeedback: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm">Show feedback options</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={project.settings.enableMusic}
                    onChange={(e) => handleSettingsChange({ enableMusic: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm">Enable music cues</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={project.settings.allowEmoji}
                    onChange={(e) => handleSettingsChange({ allowEmoji: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm">Allow emoji reactions</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={project.settings.culturalValidation}
                    onChange={(e) => handleSettingsChange({ culturalValidation: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm">Cultural validation</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BotAssemblyStudio;
