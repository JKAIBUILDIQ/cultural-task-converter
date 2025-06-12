import React, { useState } from 'react';
import { Task, RegionType, ConversionSettings, CulturalModule, Bot, BotTask, AssemblyProject } from './types';
import { GameHero } from './types/game';
import { sampleTasks } from './data/tasks';
import { regionalThemes, culturalContexts } from './data/cultural';
import { sampleBots } from './data/bots';
import TaskSelector from './components/TaskSelector';
import MultilingualTaskSelector from './components/MultilingualTaskSelector';
import RegionSelector from './components/RegionSelector';
import ConversionPanel from './components/ConversionPanel';
import CulturalModuleDisplay from './components/CulturalModuleDisplay';
import BotAssemblyStudio from './components/BotAssemblyStudio';
import BotGalleria from './components/BotGalleria';
import GameOfTasks from './components/GameOfTasks';
import RequestFlow from './components/RequestFlow';
import Header from './components/Header';
import { Wand2, Globe, Settings, Wrench, Building2, GamepadIcon, Workflow } from 'lucide-react';

type AppMode = 'converter' | 'assembly' | 'galleria' | 'game' | 'request-flow';

function App() {
  const [appMode, setAppMode] = useState<AppMode>('converter');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<RegionType>('asian');
  const [conversionSettings, setConversionSettings] = useState<ConversionSettings>({
    targetRegion: 'asian',
    targetLanguage: 'chinese',
    preserveOriginal: true,
    adaptationLevel: 'moderate',
    includeVisualAdaptations: true,
    includeFunctionalAdaptations: true,
    generateMultipleVariants: false
  });
  const [culturalModule, setCulturalModule] = useState<CulturalModule | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [activeStep, setActiveStep] = useState<'task' | 'region' | 'convert' | 'result'>('task');
  const [savedProjects, setSavedProjects] = useState<AssemblyProject[]>([]);
  const [currentHero, setCurrentHero] = useState<GameHero | null>(null);

  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task);
    setActiveStep('region');
  };

  const handleRegionSelect = (region: RegionType) => {
    setSelectedRegion(region);
    setConversionSettings(prev => ({
      ...prev,
      targetRegion: region,
      targetLanguage: culturalContexts[region].language
    }));
    setActiveStep('convert');
  };

  const handleConvert = async (settings: ConversionSettings) => {
    if (!selectedTask) return;

    setIsConverting(true);
    setConversionSettings(settings);

    // Simulate conversion process
    await new Promise(resolve => setTimeout(resolve, 2000));

    const theme = regionalThemes[settings.targetRegion];
    const context = culturalContexts[settings.targetRegion];

    // Generate mock cultural module
    const module: CulturalModule = {
      id: `module-${Date.now()}`,
      originalTask: selectedTask,
      culturalContext: context,
      adaptedContent: (selectedTask as any)[context.language] || selectedTask.english,
      visualAdaptations: [
        {
          type: 'color',
          original: '#3b82f6',
          adapted: theme.primaryColor,
          reason: `Adapted to ${theme.name} color scheme for cultural resonance`
        },
        {
          type: 'typography',
          original: 'Inter',
          adapted: theme.fontFamily,
          reason: `Using ${theme.fontFamily} for better readability in target region`
        }
      ],
      functionalAdaptations: [
        {
          type: 'interaction',
          description: 'Modified interaction patterns for cultural preferences',
          culturalReason: context.culturalNorms[0]?.description || 'Cultural adaptation',
          implementation: 'Adjusted button styles and feedback mechanisms'
        }
      ],
      theme,
      generatedAt: new Date()
    };

    setCulturalModule(module);
    setIsConverting(false);
    setActiveStep('result');
  };

  const resetConverter = () => {
    setSelectedTask(null);
    setSelectedRegion('asian');
    setCulturalModule(null);
    setActiveStep('task');
  };

  const handleSaveProject = (project: AssemblyProject) => {
    setSavedProjects(prev => [...prev, project]);
    console.log('Project saved:', project);
  };

  const handleTestBot = (timeline: BotTask[]) => {
    console.log('Testing bot timeline:', timeline);
    // Simulate bot testing
  };

  const handleBotSelect = (bot: Bot) => {
    console.log('Bot selected:', bot);
    // Handle bot selection for further actions
  };

  const handleBotEdit = (bot: Bot) => {
    console.log('Edit bot:', bot);
    // Switch to assembly mode with bot pre-loaded
    setAppMode('assembly');
  };

  const handleBotTest = (bot: Bot) => {
    console.log('Test bot:', bot);
    // Run bot tests
  };

  const handleHeroSelect = (hero: GameHero) => {
    setCurrentHero(hero);
    console.log('Hero selected:', hero);
  };

  const currentTheme = regionalThemes[selectedRegion];

  const renderModeContent = () => {
    switch (appMode) {
      case 'assembly':
        return (
          <BotAssemblyStudio
            theme={currentTheme}
            onSave={handleSaveProject}
            onTest={handleTestBot}
          />
        );
      
      case 'galleria':
        return (
          <BotGalleria
            theme={currentTheme}
            onBotSelect={handleBotSelect}
            onBotEdit={handleBotEdit}
            onBotTest={handleBotTest}
          />
        );
      
      case 'game':
        return (
          <GameOfTasks
            currentHero={currentHero || undefined}
            onHeroSelect={handleHeroSelect}
          />
        );
      
      case 'request-flow':
        return (
          <RequestFlow
            theme={currentTheme}
          />
        );
      
      default: // converter
        return (
          <div className={`min-h-screen theme-${selectedRegion}`} style={{
            background: `linear-gradient(135deg, ${currentTheme.secondaryColor} 0%, ${currentTheme.primaryColor}20 100%)`
          }}>
            <main className="container mx-auto px-4 py-8">
              {/* Progress Indicator */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-4">
                  <StepIndicator 
                    step={1} 
                    icon={<Settings className="w-5 h-5" />} 
                    label="Select Task" 
                    active={activeStep === 'task'} 
                    completed={selectedTask !== null}
                    theme={currentTheme}
                  />
                  <div className="w-12 h-0.5 bg-gray-300"></div>
                  <StepIndicator 
                    step={2} 
                    icon={<Globe className="w-5 h-5" />} 
                    label="Choose Region" 
                    active={activeStep === 'region'} 
                    completed={activeStep === 'convert' || activeStep === 'result'}
                    theme={currentTheme}
                  />
                  <div className="w-12 h-0.5 bg-gray-300"></div>
                  <StepIndicator 
                    step={3} 
                    icon={<Wand2 className="w-5 h-5" />} 
                    label="Convert" 
                    active={activeStep === 'convert' || activeStep === 'result'} 
                    completed={culturalModule !== null}
                    theme={currentTheme}
                  />
                </div>
              </div>

              {/* Content Sections */}
              <div className="max-w-6xl mx-auto">
                {activeStep === 'task' && (
                  <MultilingualTaskSelector 
                    tasks={sampleTasks}
                    onTaskSelect={handleTaskSelect}
                    theme={currentTheme}
                  />
                )}

                {activeStep === 'region' && selectedTask && (
                  <RegionSelector
                    selectedTask={selectedTask}
                    onRegionSelect={handleRegionSelect}
                    currentTheme={currentTheme}
                  />
                )}

                {activeStep === 'convert' && selectedTask && !culturalModule && (
                  <ConversionPanel
                    task={selectedTask}
                    region={selectedRegion}
                    settings={conversionSettings}
                    onConvert={handleConvert}
                    isConverting={isConverting}
                    theme={currentTheme}
                  />
                )}

                {activeStep === 'result' && culturalModule && (
                  <CulturalModuleDisplay
                    module={culturalModule}
                    onReset={resetConverter}
                    theme={currentTheme}
                  />
                )}
              </div>
            </main>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xl" 
                     style={{ backgroundColor: currentTheme.primaryColor }}>
                  🌍
                </div>
                <h1 className="text-xl font-bold text-gray-900">Cultural Bot Builder</h1>
              </div>
              
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setAppMode('converter')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    appMode === 'converter' 
                      ? 'text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  style={{
                    backgroundColor: appMode === 'converter' ? currentTheme.primaryColor : 'transparent'
                  }}
                >
                  <Wand2 className="w-4 h-4" />
                  <span>Task Converter</span>
                </button>
                
                <button
                  onClick={() => setAppMode('assembly')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    appMode === 'assembly' 
                      ? 'text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  style={{
                    backgroundColor: appMode === 'assembly' ? currentTheme.primaryColor : 'transparent'
                  }}
                >
                  <Wrench className="w-4 h-4" />
                  <span>Assembly Studio</span>
                </button>
                
                <button
                  onClick={() => setAppMode('galleria')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    appMode === 'galleria' 
                      ? 'text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  style={{
                    backgroundColor: appMode === 'galleria' ? currentTheme.primaryColor : 'transparent'
                  }}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Bot Galleria</span>
                </button>
                
                <button
                  onClick={() => setAppMode('game')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    appMode === 'game' 
                      ? 'text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  style={{
                    backgroundColor: appMode === 'game' ? currentTheme.primaryColor : 'transparent'
                  }}
                >
                  <GamepadIcon className="w-4 h-4" />
                  <span>Game of Tasks</span>
                </button>
                
                <button
                  onClick={() => setAppMode('request-flow')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    appMode === 'request-flow' 
                      ? 'text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  style={{
                    backgroundColor: appMode === 'request-flow' ? currentTheme.primaryColor : 'transparent'
                  }}
                >
                  <Workflow className="w-4 h-4" />
                  <span>Request Flow</span>
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {currentHero && appMode === 'game' && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>{currentHero.avatar}</span>
                  <span className="font-medium">{currentHero.name}</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                    {currentHero.paitRating.currentRating} PaiT
                  </span>
                </div>
              )}
              
              {appMode === 'converter' && (
                <button
                  onClick={resetConverter}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mode Content */}
      {renderModeContent()}
    </div>
  );
}

interface StepIndicatorProps {
  step: number;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  completed: boolean;
  theme: any;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  step, icon, label, active, completed, theme 
}) => (
  <div className="flex flex-col items-center space-y-2">
    <div 
      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
        completed 
          ? 'border-green-500 bg-green-500 text-white' 
          : active 
            ? `border-[${theme.primaryColor}] bg-[${theme.primaryColor}] text-white`
            : 'border-gray-300 bg-white text-gray-400'
      }`}
      style={{
        borderColor: completed ? '#10b981' : active ? theme.primaryColor : '#d1d5db',
        backgroundColor: completed ? '#10b981' : active ? theme.primaryColor : '#ffffff',
        color: completed || active ? '#ffffff' : '#9ca3af'
      }}
    >
      {icon}
    </div>
    <span className={`text-sm font-medium ${active ? 'text-gray-900' : 'text-gray-500'}`}>
      {label}
    </span>
  </div>
);

export default App;
