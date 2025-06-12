# Cultural Task Converter

A comprehensive UI system for converting tasks into culturally-aware modules with regional style variations. This application transforms multilingual tasks from your task library into culturally-adapted components that respect regional design patterns, communication styles, and cultural preferences.

## Features

### 🌍 Multi-Regional Support
- **Asian Regions**: Harmony-focused design with respect for hierarchy
- **European Regions**: Efficient, precision-oriented styling
- **American Regions**: Bold, innovation-focused approach
- **African Regions**: Vibrant, community-oriented design
- **Oceanic Regions**: Balanced, informal styling
- **Arabic Regions**: Heritage-rich, elaborate design

### 🎨 Cultural Adaptations
- **Visual Themes**: Region-specific color schemes, typography, and layouts
- **Communication Styles**: Adapted language tone and interaction patterns
- **Functional Adaptations**: Modified user experience flows for cultural preferences
- **Localization**: Date formats, time formats, currency, and writing direction
- **Cultural Norms**: Respect for hierarchy, formality levels, and cultural symbols

### 🛠 Technical Features
- **React + TypeScript**: Type-safe, modern development
- **Tailwind CSS**: Utility-first styling with custom themes
- **Vite**: Fast development and building
- **Lucide Icons**: Beautiful, consistent iconography
- **Responsive Design**: Works across all device sizes
- **Real-time Preview**: See adaptations as you configure them

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cultural-task-converter
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

### Step 1: Select a Task
- Browse the multilingual task library
- Filter by category, complexity, or search terms
- Select a task to convert

### Step 2: Choose Target Region
- Pick from 6 major cultural regions
- Preview regional characteristics and design patterns
- Understand cultural context and norms

### Step 3: Configure Conversion
- Set adaptation level (minimal, moderate, comprehensive)
- Choose visual and functional adaptations
- Configure preservation and variant settings

### Step 4: Review Results
- Examine the culturally-adapted module
- Review visual and functional changes
- Export implementation code
- Preview live demonstration

## Project Structure

```
cultural-task-converter/
├── src/
│   ├── components/           # React components
│   │   ├── Header.tsx       # Application header
│   │   ├── TaskSelector.tsx # Task selection interface
│   │   ├── RegionSelector.tsx # Region selection interface
│   │   ├── ConversionPanel.tsx # Configuration panel
│   │   └── CulturalModuleDisplay.tsx # Results display
│   ├── data/                # Static data and configurations
│   │   ├── tasks.ts         # Sample multilingual tasks
│   │   └── cultural.ts      # Cultural themes and contexts
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # Main type definitions
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles and themes
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## Cultural Regions

### Asian Harmony
- **Colors**: Red (luck), Gold (wealth)
- **Communication**: High-context, respectful
- **Typography**: Noto Sans SC
- **Characteristics**: Compact spacing, filled icons

### European Elegance  
- **Colors**: Professional blues
- **Communication**: Direct, efficient
- **Typography**: Inter
- **Characteristics**: Sharp borders, minimal shadows

### American Bold
- **Colors**: Strong greens
- **Communication**: Assertive, innovative
- **Typography**: Inter
- **Characteristics**: Spacious layout, prominent shadows

### African Vibrant
- **Colors**: Warm earth tones
- **Communication**: Community-focused
- **Typography**: Inter
- **Characteristics**: Circular borders, vibrant expressions

### Oceanic Flow
- **Colors**: Calming purples
- **Communication**: Laid-back, friendly
- **Typography**: Inter
- **Characteristics**: Rounded elements, balanced design

### Arabic Heritage
- **Colors**: Rich oranges and golds
- **Communication**: Elaborate, respectful
- **Typography**: Noto Sans Arabic
- **Characteristics**: RTL support, formal styling

## Customization

### Adding New Tasks
1. Add tasks to `src/data/tasks.ts`:
```typescript
{
  id: 'unique-id',
  category: 'Category Name',
  english: 'Task description in English',
  spanish: 'Descripción en español',
  // ... other languages
  description: 'Detailed description',
  complexity: 'basic' | 'intermediate' | 'advanced',
  tags: ['tag1', 'tag2']
}
```

### Adding New Regions
1. Define theme in `src/data/cultural.ts`:
```typescript
newRegion: {
  name: 'Region Name',
  region: 'newRegion',
  primaryColor: '#color',
  // ... other theme properties
}
```

2. Add cultural context:
```typescript
newRegion: {
  region: 'newRegion',
  language: 'language',
  writingDirection: 'ltr' | 'rtl',
  // ... cultural properties
}
```

3. Update type definitions in `src/types/index.ts`

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (if configured)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Cultural Considerations

This application is designed to respect and celebrate cultural diversity. The adaptations are based on general cultural research and best practices. For production use, consider:

- Consulting with local cultural experts
- User testing with target cultural groups
- Iterating based on feedback from regional users
- Staying updated on cultural preferences and changes

## License

[Your chosen license]

## Acknowledgments

- Cultural research and design patterns
- Multilingual task library contributors
- Open source community
- Regional design consultants
