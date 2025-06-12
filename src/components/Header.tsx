import React from 'react';
import { RegionalTheme } from '../types';
import { Palette, RotateCcw } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  currentTheme: RegionalTheme;
}

const Header: React.FC<HeaderProps> = ({ onReset, currentTheme }) => {
  return (
    <header className="relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-10"
        style={{ 
          backgroundImage: `linear-gradient(45deg, ${currentTheme.primaryColor} 25%, transparent 25%), 
                           linear-gradient(-45deg, ${currentTheme.primaryColor} 25%, transparent 25%), 
                           linear-gradient(45deg, transparent 75%, ${currentTheme.primaryColor} 75%), 
                           linear-gradient(-45deg, transparent 75%, ${currentTheme.primaryColor} 75%)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
        }}
      />
      
      <div className="relative bg-white bg-opacity-90 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                style={{ backgroundColor: currentTheme.primaryColor }}
              >
                <Palette className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 gradient-text">
                  Cultural Task Converter
                </h1>
                <p className="text-gray-600 text-sm">
                  Transform tasks into culturally-aware modules with regional adaptations
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  Current Theme
                </div>
                <div 
                  className="text-sm font-semibold"
                  style={{ color: currentTheme.primaryColor }}
                >
                  {currentTheme.name}
                </div>
              </div>
              
              <button
                onClick={onReset}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 border border-gray-300"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
