import React, { useState } from 'react';
import { Task, RegionType, ConversionSettings, RegionalTheme } from '../types';
import { culturalContexts } from '../data/cultural';
import { Settings, Wand2, Eye, Layers, Code, Globe2 } from 'lucide-react';

interface ConversionPanelProps {
  task: Task;
  region: RegionType;
  settings: ConversionSettings;
  onConvert: (settings: ConversionSettings) => void;
  isConverting: boolean;
  theme: RegionalTheme;
}

const ConversionPanel: React.FC<ConversionPanelProps> = ({
  task,
  region,
  settings,
  onConvert,
  isConverting,
  theme
}) => {
  const [localSettings, setLocalSettings] = useState<ConversionSettings>(settings);
  const context = culturalContexts[region];

  const handleSettingChange = (key: keyof ConversionSettings, value: any) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleConvert = () => {
    onConvert(localSettings);
  };

  return (
    <div className="animate-slide-up">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Configure Conversion Settings
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Customize how your task will be adapted for the target cultural region. 
          These settings control the depth and scope of cultural modifications.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Settings Panel */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-6">
            <Settings className="w-6 h-6 mr-3" style={{ color: theme.primaryColor }} />
            <h3 className="text-xl font-semibold text-gray-900">Adaptation Settings</h3>
          </div>

          <div className="space-y-6">
            {/* Adaptation Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Adaptation Level
              </label>
              <div className="space-y-2">
                {(['minimal', 'moderate', 'comprehensive'] as const).map((level) => (
                  <div key={level} className="flex items-center">
                    <input
                      type="radio"
                      id={`level-${level}`}
                      name="adaptationLevel"
                      value={level}
                      checked={localSettings.adaptationLevel === level}
                      onChange={(e) => handleSettingChange('adaptationLevel', e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2"
                      style={{ accentColor: theme.primaryColor }}
                    />
                    <label htmlFor={`level-${level}`} className="ml-3 text-sm">
                      <span className="font-medium capitalize">{level}</span>
                      <span className="text-gray-500 ml-2">
                        {level === 'minimal' && '- Basic language and color changes'}
                        {level === 'moderate' && '- Language, visual, and interaction adaptations'}
                        {level === 'comprehensive' && '- Full cultural redesign with deep adaptations'}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Adaptations */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={localSettings.includeVisualAdaptations}
                  onChange={(e) => handleSettingChange('includeVisualAdaptations', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 focus:ring-2"
                  style={{ accentColor: theme.primaryColor }}
                />
                <span className="ml-3 text-sm font-medium text-gray-700">
                  Include Visual Adaptations
                </span>
                <Eye className="w-4 h-4 ml-2 text-gray-400" />
              </label>
              <p className="text-xs text-gray-500 ml-7 mt-1">
                Adapt colors, typography, spacing, and visual elements
              </p>
            </div>

            {/* Functional Adaptations */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={localSettings.includeFunctionalAdaptations}
                  onChange={(e) => handleSettingChange('includeFunctionalAdaptations', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 focus:ring-2"
                  style={{ accentColor: theme.primaryColor }}
                />
                <span className="ml-3 text-sm font-medium text-gray-700">
                  Include Functional Adaptations
                </span>
                <Code className="w-4 h-4 ml-2 text-gray-400" />
              </label>
              <p className="text-xs text-gray-500 ml-7 mt-1">
                Modify interaction patterns and user experience flows
              </p>
            </div>

            {/* Preserve Original */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={localSettings.preserveOriginal}
                  onChange={(e) => handleSettingChange('preserveOriginal', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 focus:ring-2"
                  style={{ accentColor: theme.primaryColor }}
                />
                <span className="ml-3 text-sm font-medium text-gray-700">
                  Preserve Original Task
                </span>
                <Layers className="w-4 h-4 ml-2 text-gray-400" />
              </label>
              <p className="text-xs text-gray-500 ml-7 mt-1">
                Keep the original task alongside the adapted version
              </p>
            </div>

            {/* Multiple Variants */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={localSettings.generateMultipleVariants}
                  onChange={(e) => handleSettingChange('generateMultipleVariants', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 focus:ring-2"
                  style={{ accentColor: theme.primaryColor }}
                />
                <span className="ml-3 text-sm font-medium text-gray-700">
                  Generate Multiple Variants
                </span>
                <Globe2 className="w-4 h-4 ml-2 text-gray-400" />
              </label>
              <p className="text-xs text-gray-500 ml-7 mt-1">
                Create variations for different contexts within the region
              </p>
            </div>
          </div>

          {/* Convert Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleConvert}
              disabled={isConverting}
              className="w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              style={{ backgroundColor: theme.primaryColor }}
            >
              {isConverting ? (
                <>
                  <div className="loading-spinner mr-3"></div>
                  Converting...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 mr-2" />
                  Convert to Cultural Module
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-6">
            <Eye className="w-6 h-6 mr-3" style={{ color: theme.primaryColor }} />
            <h3 className="text-xl font-semibold text-gray-900">Conversion Preview</h3>
          </div>

          {/* Task Preview */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Original Task</h4>
            <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-300">
              <div className="font-medium text-gray-900 mb-1">{task.english}</div>
              <div className="text-sm text-gray-600 mb-2">{task.description}</div>
              <div className="text-xs text-gray-500">{task.category} • {task.complexity}</div>
            </div>
          </div>

          {/* Target Context */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Target Cultural Context</h4>
            <div 
              className="rounded-lg p-4 border-l-4"
              style={{ 
                backgroundColor: `${theme.primaryColor}08`,
                borderLeftColor: theme.primaryColor 
              }}
            >
              <div className="font-medium mb-2" style={{ color: theme.primaryColor }}>
                {context.region.charAt(0).toUpperCase() + context.region.slice(1)} Region
              </div>
              <div className="text-sm text-gray-700 mb-2">
                Language: {context.language} • Direction: {context.writingDirection}
              </div>
              <div className="text-sm text-gray-700 mb-2">
                Date Format: {context.dateFormat} • Time: {context.timeFormat}
              </div>
              <div className="text-sm text-gray-700">
                Currency: {context.currency} • Numbers: {context.numberFormat}
              </div>
            </div>
          </div>

          {/* Cultural Norms */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Key Cultural Considerations</h4>
            <div className="space-y-3">
              {context.culturalNorms.slice(0, 3).map((norm, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      {norm.type}
                    </span>
                    <span 
                      className={`text-xs px-2 py-1 rounded-full ${
                        norm.impact === 'high' ? 'bg-red-100 text-red-700' :
                        norm.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}
                    >
                      {norm.impact} impact
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{norm.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionPanel;
