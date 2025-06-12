import React from 'react';
import { Task, RegionType, RegionalTheme } from '../types';
import { regionalThemes, regionInfo } from '../data/cultural';
import { Globe, Users, MapPin, Palette } from 'lucide-react';

interface RegionSelectorProps {
  selectedTask: Task;
  onRegionSelect: (region: RegionType) => void;
  currentTheme: RegionalTheme;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ 
  selectedTask, 
  onRegionSelect, 
  currentTheme 
}) => {
  const regions: RegionType[] = ['asian', 'european', 'american', 'african', 'oceanic', 'arabic'];

  return (
    <div className="animate-slide-up">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Choose Target Region
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Select the cultural region for adaptation. Each region has unique design patterns, 
          communication styles, and cultural preferences.
        </p>

        {/* Selected Task Preview */}
        <div className="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto border-l-4" 
             style={{ borderLeftColor: currentTheme.primaryColor }}>
          <div className="text-sm text-gray-500 mb-1">Selected Task:</div>
          <div className="font-medium text-gray-900">{selectedTask.english}</div>
          <div className="text-sm text-gray-600 mt-1">{selectedTask.category}</div>
        </div>
      </div>

      {/* Region Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {regions.map((regionKey) => {
          const region = regionalThemes[regionKey];
          const info = regionInfo[regionKey];
          
          return (
            <RegionCard
              key={regionKey}
              region={region}
              info={info}
              onClick={() => onRegionSelect(regionKey)}
            />
          );
        })}
      </div>

      {/* Cultural Considerations Info */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <div className="text-center mb-6">
          <Globe className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h3 className="text-xl font-semibold text-gray-900">Cultural Adaptation Features</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Palette className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900 mb-1">Visual Themes</h4>
            <p className="text-sm text-gray-600">Colors, typography, and layouts adapted for cultural preferences</p>
          </div>
          
          <div className="text-center">
            <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900 mb-1">Communication Style</h4>
            <p className="text-sm text-gray-600">Language tone and interaction patterns matching cultural norms</p>
          </div>
          
          <div className="text-center">
            <MapPin className="w-6 h-6 text-red-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900 mb-1">Regional Context</h4>
            <p className="text-sm text-gray-600">Localized formats, symbols, and cultural references</p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface RegionCardProps {
  region: RegionalTheme;
  info: any;
  onClick: () => void;
}

const RegionCard: React.FC<RegionCardProps> = ({ region, info, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cultural-card bg-white rounded-xl shadow-lg p-6 cursor-pointer border-2 border-transparent hover:shadow-2xl transition-all duration-300 group"
      style={{
        borderColor: 'transparent',
        '--hover-border': region.primaryColor
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = region.primaryColor;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'transparent';
      }}
    >
      {/* Region Header */}
      <div className="flex items-center justify-between mb-4">
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300"
          style={{ backgroundColor: region.primaryColor }}
        >
          <Globe className="w-8 h-8" />
        </div>
        <div className="text-right">
          <div 
            className="text-sm font-medium px-2 py-1 rounded-full text-white"
            style={{ backgroundColor: region.accentColor }}
          >
            {region.iconStyle}
          </div>
        </div>
      </div>

      {/* Region Info */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-1">
          {region.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3">
          {info.description}
        </p>
        
        {/* Countries */}
        <div className="flex flex-wrap gap-1 mb-4">
          {info.countries.slice(0, 3).map((country: string, index: number) => (
            <span
              key={index}
              className="text-xs px-2 py-1 rounded-md"
              style={{
                backgroundColor: `${region.primaryColor}15`,
                color: region.primaryColor
              }}
            >
              {country}
            </span>
          ))}
          {info.countries.length > 3 && (
            <span className="text-xs text-gray-400">
              +{info.countries.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Theme Characteristics */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Font Family:</span>
          <span className="font-medium" style={{ fontFamily: region.fontFamily }}>
            {region.fontFamily}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Spacing:</span>
          <span className="font-medium capitalize">{region.spacing}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Border Style:</span>
          <span className="font-medium capitalize">{region.borderRadius}</span>
        </div>
      </div>

      {/* Color Palette Preview */}
      <div className="mb-6">
        <div className="text-sm text-gray-600 mb-2">Color Palette:</div>
        <div className="flex space-x-2">
          <div 
            className="w-8 h-8 rounded-lg shadow-sm"
            style={{ backgroundColor: region.primaryColor }}
            title="Primary Color"
          />
          <div 
            className="w-8 h-8 rounded-lg shadow-sm"
            style={{ backgroundColor: region.secondaryColor }}
            title="Secondary Color"
          />
          <div 
            className="w-8 h-8 rounded-lg shadow-sm"
            style={{ backgroundColor: region.accentColor }}
            title="Accent Color"
          />
        </div>
      </div>

      {/* Select Button */}
      <button
        className="w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 hover:opacity-90 hover:scale-105"
        style={{ backgroundColor: region.primaryColor }}
      >
        Select {info.name}
      </button>
    </div>
  );
};

export default RegionSelector;
