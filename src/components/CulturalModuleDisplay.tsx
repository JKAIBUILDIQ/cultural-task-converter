import React, { useState } from 'react';
import { CulturalModule, RegionalTheme } from '../types';
import { CheckCircle, Download, Share2, RotateCcw, Eye, Code, Palette, Users, Calendar, Globe } from 'lucide-react';

interface CulturalModuleDisplayProps {
  module: CulturalModule;
  onReset: () => void;
  theme: RegionalTheme;
}

const CulturalModuleDisplay: React.FC<CulturalModuleDisplayProps> = ({
  module,
  onReset,
  theme
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'adaptations' | 'code' | 'preview'>('overview');

  const getAdaptationIcon = (type: string) => {
    switch (type) {
      case 'color': return <Palette className="w-4 h-4" />;
      case 'typography': return <Globe className="w-4 h-4" />;
      case 'layout': return <Eye className="w-4 h-4" />;
      case 'interaction': return <Users className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse-soft"
            style={{ backgroundColor: theme.primaryColor }}
          >
            <CheckCircle className="w-8 h-8" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Cultural Module Generated Successfully!
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Your task has been successfully adapted for the {module.theme.name} cultural context. 
          Review the adaptations and download your culturally-aware module.
        </p>
      </div>

      {/* Module Info Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {module.originalTask.english}
            </h3>
            <p className="text-gray-600 mb-4">{module.originalTask.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span 
                className="px-3 py-1 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: theme.primaryColor }}
              >
                {module.culturalContext.region}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                {module.culturalContext.language}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                {module.originalTask.complexity}
              </span>
            </div>

            <div className="text-sm text-gray-500">
              <Calendar className="w-4 h-4 inline mr-2" />
              Generated on {module.generatedAt.toLocaleDateString()}
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <button
              className="w-full py-2 px-4 rounded-lg font-medium text-white transition-colors duration-200 hover:opacity-90 flex items-center justify-center"
              style={{ backgroundColor: theme.primaryColor }}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Module
            </button>
            
            <button className="w-full py-2 px-4 rounded-lg font-medium bg-gray-100 text-gray-700 transition-colors duration-200 hover:bg-gray-200 flex items-center justify-center">
              <Share2 className="w-4 h-4 mr-2" />
              Share Module
            </button>
            
            <button 
              onClick={onReset}
              className="w-full py-2 px-4 rounded-lg font-medium bg-gray-100 text-gray-700 transition-colors duration-200 hover:bg-gray-200 flex items-center justify-center"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Create Another
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'overview', label: 'Overview', icon: <Eye className="w-4 h-4" /> },
            { id: 'adaptations', label: 'Adaptations', icon: <Palette className="w-4 h-4" /> },
            { id: 'code', label: 'Implementation', icon: <Code className="w-4 h-4" /> },
            { id: 'preview', label: 'Preview', icon: <Globe className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-b-2 text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              style={{
                borderBottomColor: activeTab === tab.id ? theme.primaryColor : 'transparent',
                color: activeTab === tab.id ? theme.primaryColor : undefined
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Adapted Content</h4>
                <div 
                  className="p-4 rounded-lg border-l-4"
                  style={{ 
                    backgroundColor: `${theme.primaryColor}08`,
                    borderLeftColor: theme.primaryColor,
                    direction: module.culturalContext.writingDirection 
                  }}
                >
                  <div className="font-medium text-gray-900 mb-2">
                    {module.adaptedContent}
                  </div>
                  <div className="text-sm text-gray-600">
                    Adapted for {module.culturalContext.region} region • {module.culturalContext.language} language
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Cultural Context</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="font-medium text-gray-900 mb-2">Localization</div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>Date Format: {module.culturalContext.dateFormat}</div>
                      <div>Time Format: {module.culturalContext.timeFormat}</div>
                      <div>Currency: {module.culturalContext.currency}</div>
                      <div>Writing Direction: {module.culturalContext.writingDirection}</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="font-medium text-gray-900 mb-2">Cultural Norms</div>
                    <div className="space-y-2">
                      {module.culturalContext.culturalNorms.slice(0, 2).map((norm, index) => (
                        <div key={index} className="text-sm">
                          <span className="font-medium capitalize">{norm.type}:</span>
                          <span className="text-gray-600 ml-1">{norm.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Adaptations Tab */}
          {activeTab === 'adaptations' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Visual Adaptations</h4>
                <div className="space-y-4">
                  {module.visualAdaptations.map((adaptation, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        {getAdaptationIcon(adaptation.type)}
                        <span className="font-medium text-gray-900 ml-2 capitalize">
                          {adaptation.type}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Original:</div>
                          <div className="flex items-center space-x-2">
                            {adaptation.type === 'color' && (
                              <div 
                                className="w-6 h-6 rounded border"
                                style={{ backgroundColor: adaptation.original }}
                              />
                            )}
                            <span className="text-sm font-medium">{adaptation.original}</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Adapted:</div>
                          <div className="flex items-center space-x-2">
                            {adaptation.type === 'color' && (
                              <div 
                                className="w-6 h-6 rounded border"
                                style={{ backgroundColor: adaptation.adapted }}
                              />
                            )}
                            <span className="text-sm font-medium">{adaptation.adapted}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">{adaptation.reason}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Functional Adaptations</h4>
                <div className="space-y-4">
                  {module.functionalAdaptations.map((adaptation, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        {getAdaptationIcon(adaptation.type)}
                        <span className="font-medium text-gray-900 ml-2 capitalize">
                          {adaptation.type}
                        </span>
                      </div>
                      <div className="text-sm text-gray-700 mb-2">{adaptation.description}</div>
                      <div className="text-sm text-gray-600 mb-2">
                        <strong>Cultural Reason:</strong> {adaptation.culturalReason}
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong>Implementation:</strong> {adaptation.implementation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Code Tab */}
          {activeTab === 'code' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">CSS Variables</h4>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
{`:root {
  --primary-color: ${module.theme.primaryColor};
  --secondary-color: ${module.theme.secondaryColor};
  --accent-color: ${module.theme.accentColor};
  --font-family: '${module.theme.fontFamily}', sans-serif;
  --border-radius: ${module.theme.borderRadius === 'sharp' ? '0px' : module.theme.borderRadius === 'rounded' ? '8px' : '50%'};
  --spacing: ${module.theme.spacing === 'compact' ? '0.5rem' : module.theme.spacing === 'normal' ? '1rem' : '1.5rem'};
  --writing-direction: ${module.culturalContext.writingDirection};
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Component Example</h4>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-blue-400 text-sm">
{`<div className="cultural-module" 
     style={{ 
       fontFamily: '${module.theme.fontFamily}',
       direction: '${module.culturalContext.writingDirection}',
       color: '${module.theme.primaryColor}'
     }}>
  <h1>${module.adaptedContent}</h1>
  <p>Adapted for ${module.culturalContext.region} region</p>
</div>`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* Preview Tab */}
          {activeTab === 'preview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h4>
                <div 
                  className="border-2 rounded-lg p-8 text-center"
                  style={{ 
                    borderColor: theme.primaryColor,
                    fontFamily: module.theme.fontFamily,
                    direction: module.culturalContext.writingDirection
                  }}
                >
                  <div 
                    className="text-2xl font-bold mb-4"
                    style={{ color: theme.primaryColor }}
                  >
                    {module.adaptedContent}
                  </div>
                  <div className="text-gray-600 mb-6">
                    {module.originalTask.description}
                  </div>
                  <button
                    className="px-6 py-3 rounded-lg font-medium text-white transition-colors duration-200 hover:opacity-90"
                    style={{ 
                      backgroundColor: theme.primaryColor,
                      borderRadius: module.theme.borderRadius === 'sharp' ? '0px' : 
                                   module.theme.borderRadius === 'rounded' ? '8px' : '50px'
                    }}
                  >
                    Sample Action Button
                  </button>
                  
                  <div className="mt-6 text-sm text-gray-500">
                    Preview showing {module.theme.name} styling with {module.culturalContext.language} localization
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CulturalModuleDisplay;
