import { RegionalTheme, CulturalContext, RegionType } from '../types';

export const regionalThemes: Record<RegionType, RegionalTheme> = {
  asian: {
    name: 'Asian Harmony',
    region: 'asian',
    primaryColor: '#e53e3e',
    secondaryColor: '#fed7d7',
    accentColor: '#c53030',
    fontFamily: 'Noto Sans SC',
    iconStyle: 'filled',
    borderRadius: 'rounded',
    spacing: 'compact',
    shadows: 'medium'
  },
  european: {
    name: 'European Elegance',
    region: 'european',
    primaryColor: '#3182ce',
    secondaryColor: '#bee3f8',
    accentColor: '#2c5282',
    fontFamily: 'Inter',
    iconStyle: 'outlined',
    borderRadius: 'sharp',
    spacing: 'normal',
    shadows: 'minimal'
  },
  american: {
    name: 'American Bold',
    region: 'american',
    primaryColor: '#38a169',
    secondaryColor: '#c6f6d5',
    accentColor: '#2f855a',
    fontFamily: 'Inter',
    iconStyle: 'filled',
    borderRadius: 'rounded',
    spacing: 'spacious',
    shadows: 'prominent'
  },
  african: {
    name: 'African Vibrant',
    region: 'african',
    primaryColor: '#d69e2e',
    secondaryColor: '#faf089',
    accentColor: '#b7791f',
    fontFamily: 'Inter',
    iconStyle: 'rounded',
    borderRadius: 'circular',
    spacing: 'spacious',
    shadows: 'medium'
  },
  oceanic: {
    name: 'Oceanic Flow',
    region: 'oceanic',
    primaryColor: '#805ad5',
    secondaryColor: '#e9d8fd',
    accentColor: '#6b46c1',
    fontFamily: 'Inter',
    iconStyle: 'rounded',
    borderRadius: 'rounded',
    spacing: 'normal',
    shadows: 'medium'
  },
  arabic: {
    name: 'Arabic Heritage',
    region: 'arabic',
    primaryColor: '#dd6b20',
    secondaryColor: '#fbd38d',
    accentColor: '#c05621',
    fontFamily: 'Noto Sans Arabic',
    iconStyle: 'filled',
    borderRadius: 'rounded',
    spacing: 'spacious',
    shadows: 'prominent'
  }
};

export const culturalContexts: Record<RegionType, CulturalContext> = {
  asian: {
    region: 'asian',
    language: 'chinese',
    writingDirection: 'ltr',
    dateFormat: 'YYYY/MM/DD',
    timeFormat: '24h',
    currency: '¥',
    numberFormat: 'comma',
    culturalNorms: [
      {
        type: 'hierarchy',
        description: 'Respect for authority and seniority',
        impact: 'high',
        examples: ['Formal titles', 'Indirect communication', 'Group consensus']
      },
      {
        type: 'communication',
        description: 'High-context communication style',
        impact: 'high',
        examples: ['Subtle implications', 'Non-verbal cues', 'Saving face']
      },
      {
        type: 'colors',
        description: 'Red symbolizes luck and prosperity',
        impact: 'medium',
        examples: ['Avoid white for celebrations', 'Gold for wealth', 'Red for success']
      }
    ]
  },
  european: {
    region: 'european',
    language: 'english',
    writingDirection: 'ltr',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    currency: '€',
    numberFormat: 'comma',
    culturalNorms: [
      {
        type: 'formality',
        description: 'Balanced formal and informal interactions',
        impact: 'medium',
        examples: ['Professional courtesy', 'Direct communication', 'Personal space']
      },
      {
        type: 'time',
        description: 'Punctuality is highly valued',
        impact: 'high',
        examples: ['Precise scheduling', 'Respect for deadlines', 'Efficiency focus']
      }
    ]
  },
  american: {
    region: 'american',
    language: 'english',
    writingDirection: 'ltr',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    currency: '$',
    numberFormat: 'decimal',
    culturalNorms: [
      {
        type: 'communication',
        description: 'Direct and assertive communication',
        impact: 'high',
        examples: ['Clear expectations', 'Individual achievement', 'Innovation focus']
      },
      {
        type: 'formality',
        description: 'Casual and approachable style',
        impact: 'medium',
        examples: ['First-name basis', 'Informal interactions', 'Accessibility']
      }
    ]
  },
  african: {
    region: 'african',
    language: 'english',
    writingDirection: 'ltr',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12h',
    currency: 'R',
    numberFormat: 'decimal',
    culturalNorms: [
      {
        type: 'communication',
        description: 'Community-oriented approach',
        impact: 'high',
        examples: ['Ubuntu philosophy', 'Collective decision-making', 'Storytelling tradition']
      },
      {
        type: 'colors',
        description: 'Vibrant colors reflect cultural richness',
        impact: 'medium',
        examples: ['Earth tones for grounding', 'Bright colors for celebration', 'Patterns for identity']
      }
    ]
  },
  oceanic: {
    region: 'oceanic',
    language: 'english',
    writingDirection: 'ltr',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12h',
    currency: 'A$',
    numberFormat: 'decimal',
    culturalNorms: [
      {
        type: 'communication',
        description: 'Laid-back and friendly approach',
        impact: 'medium',
        examples: ['Casual conversation', 'Humor in communication', 'Work-life balance']
      },
      {
        type: 'formality',
        description: 'Informal and egalitarian',
        impact: 'medium',
        examples: ['Flat hierarchies', 'Approachable leadership', 'Fair go attitude']
      }
    ]
  },
  arabic: {
    region: 'arabic',
    language: 'arabic',
    writingDirection: 'rtl',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12h',
    currency: 'ر.س',
    numberFormat: 'decimal',
    culturalNorms: [
      {
        type: 'hierarchy',
        description: 'Respect for age and authority',
        impact: 'high',
        examples: ['Elder consultation', 'Formal greetings', 'Honor-based decisions']
      },
      {
        type: 'communication',
        description: 'Elaborate and expressive style',
        impact: 'high',
        examples: ['Flowery language', 'Hospitality emphasis', 'Relationship building']
      },
      {
        type: 'formality',
        description: 'High formality in business contexts',
        impact: 'high',
        examples: ['Proper titles', 'Ceremonial aspects', 'Respect protocols']
      }
    ]
  }
};

export const regionInfo = {
  asian: {
    name: 'Asian Regions',
    countries: ['China', 'Japan', 'Korea', 'Singapore', 'Taiwan'],
    description: 'Emphasizes harmony, respect, and collective well-being'
  },
  european: {
    name: 'European Regions',
    countries: ['Germany', 'France', 'UK', 'Netherlands', 'Nordic Countries'],
    description: 'Values efficiency, precision, and structured approaches'
  },
  american: {
    name: 'American Regions',
    countries: ['United States', 'Canada'],
    description: 'Focuses on innovation, directness, and individual achievement'
  },
  african: {
    name: 'African Regions',
    countries: ['South Africa', 'Nigeria', 'Kenya', 'Egypt'],
    description: 'Celebrates community, vibrant expression, and collective wisdom'
  },
  oceanic: {
    name: 'Oceanic Regions',
    countries: ['Australia', 'New Zealand', 'Pacific Islands'],
    description: 'Emphasizes balance, informality, and environmental harmony'
  },
  arabic: {
    name: 'Arabic Regions',
    countries: ['Saudi Arabia', 'UAE', 'Qatar', 'Kuwait', 'Morocco'],
    description: 'Values tradition, hospitality, and elaborate communication'
  }
};
