import { BotRequest, BuildTask, Builder, Notification, RewardClaim, BotShowcase } from '../types/request-flow';

export const sampleRequests: BotRequest[] = [
  {
    id: 'req-001',
    requestorName: 'Lea Santos',
    requestTitle: 'Multilingual Bot for Cebuano Loan Applications',
    description: 'We need a bot that can handle loan applications in Cebuano language, with cultural sensitivity for Filipino customers. Should include KYC document parsing and emotional response capabilities.',
    modulesNeeded: ['KYC doc parse', 'Loan calculator', 'Emotional response in Tagalog', 'Cultural sensitivity'],
    priority: 'Urgent',
    rewardType: 'Points',
    rewardAmount: 300,
    requestedBy: 'Friday end of week',
    submittedAt: new Date('2025-06-05T10:30:00'),
    status: 'Pending',
    estimatedHours: 3,
    deadline: new Date('2025-06-07T17:00:00'),
    culturalContext: 'Filipino banking culture with emphasis on personal relationships and trust',
    targetLanguages: ['cebuano', 'tagalog', 'english'],
    targetRegions: ['asian']
  },
  {
    id: 'req-002',
    requestorName: 'Ahmed Al-Rashid',
    requestTitle: 'Arabic Customer Service Bot for E-commerce',
    description: 'Customer service bot for handling order inquiries, returns, and complaints in Arabic. Must be culturally appropriate for Gulf region customers.',
    modulesNeeded: ['Order tracking', 'Return processing', 'Cultural greeting protocols', 'Complaint escalation'],
    priority: 'High',
    rewardType: 'Monetary',
    rewardAmount: 500,
    requestedBy: 'Next Monday',
    submittedAt: new Date('2025-06-04T14:20:00'),
    status: 'In Progress',
    assignedBuilder: 'builder-003',
    estimatedHours: 5,
    deadline: new Date('2025-06-09T12:00:00'),
    culturalContext: 'Gulf Arabic business culture with formal greetings and hospitality',
    targetLanguages: ['arabic', 'english'],
    targetRegions: ['arabic']
  },
  {
    id: 'req-003',
    requestorName: 'Maria Rodriguez',
    requestTitle: 'Spanish Healthcare Assistant Bot',
    description: 'Medical assistant bot for Spanish-speaking patients in the US. Should help with appointment scheduling and basic health questions.',
    modulesNeeded: ['Appointment scheduling', 'Medical terminology', 'Insurance verification', 'Emergency protocols'],
    priority: 'Medium',
    rewardType: 'Public Credit',
    rewardAmount: 200,
    requestedBy: 'End of month',
    submittedAt: new Date('2025-06-03T09:15:00'),
    status: 'Review',
    assignedBuilder: 'builder-001',
    estimatedHours: 4,
    deadline: new Date('2025-06-30T23:59:00'),
    culturalContext: 'US Hispanic healthcare with emphasis on family involvement',
    targetLanguages: ['spanish', 'english'],
    targetRegions: ['american']
  }
];

export const sampleBuilders: Builder[] = [
  {
    id: 'builder-001',
    name: 'Kai Chen',
    avatar: '👨‍💻',
    specialties: ['Healthcare Bots', 'Multilingual Support', 'Cultural Adaptation'],
    languages: ['english', 'spanish', 'chinese'],
    regions: ['american', 'asian'],
    rating: 4.8,
    completedTasks: 24,
    totalEarnings: 2400,
    currentTasks: ['task-003'],
    availability: 'Busy',
    joinedAt: new Date('2024-03-15')
  },
  {
    id: 'builder-002',
    name: 'Sofia Martinez',
    avatar: '👩‍🎨',
    specialties: ['Customer Service', 'E-commerce', 'UI/UX Design'],
    languages: ['spanish', 'english', 'portuguese'],
    regions: ['american', 'european'],
    rating: 4.9,
    completedTasks: 31,
    totalEarnings: 3100,
    currentTasks: [],
    availability: 'Available',
    joinedAt: new Date('2024-01-20')
  },
  {
    id: 'builder-003',
    name: 'Omar Hassan',
    avatar: '🧑‍💼',
    specialties: ['Arabic Localization', 'Banking & Finance', 'Cultural Consulting'],
    languages: ['arabic', 'english', 'french'],
    regions: ['arabic', 'african'],
    rating: 4.7,
    completedTasks: 18,
    totalEarnings: 1800,
    currentTasks: ['task-002'],
    availability: 'Busy',
    joinedAt: new Date('2024-05-10')
  },
  {
    id: 'builder-004',
    name: 'Yuki Tanaka',
    avatar: '👩‍🔬',
    specialties: ['AI Training', 'Japanese Culture', 'Gaming Bots'],
    languages: ['japanese', 'english', 'korean'],
    regions: ['asian'],
    rating: 4.6,
    completedTasks: 15,
    totalEarnings: 1500,
    currentTasks: [],
    availability: 'Available',
    joinedAt: new Date('2024-04-25')
  }
];

export const sampleBuildTasks: BuildTask[] = [
  {
    id: 'task-001',
    requestId: 'req-001',
    title: 'Cebuano Loan Bot Development',
    description: 'Build multilingual loan application bot with cultural sensitivity for Filipino market',
    modules: ['KYC doc parse', 'Loan calculator', 'Emotional response in Tagalog', 'Cultural sensitivity'],
    status: 'Available',
    reward: {
      type: 'Points',
      amount: 300
    },
    estimatedHours: 3,
    deadline: new Date('2025-06-07T17:00:00'),
    culturalRequirements: ['Filipino banking culture', 'Cebuano language nuances', 'Trust-building communication'],
    technicalRequirements: ['Document parsing API', 'Loan calculation engine', 'Multi-language support', 'Emotional AI responses']
  },
  {
    id: 'task-002',
    requestId: 'req-002',
    title: 'Arabic E-commerce Customer Service Bot',
    description: 'Customer service bot for Arabic-speaking customers in Gulf region',
    modules: ['Order tracking', 'Return processing', 'Cultural greeting protocols', 'Complaint escalation'],
    status: 'In Progress',
    reward: {
      type: 'Monetary',
      amount: 500
    },
    estimatedHours: 5,
    deadline: new Date('2025-06-09T12:00:00'),
    claimedBy: 'builder-003',
    claimedAt: new Date('2025-06-04T15:30:00'),
    culturalRequirements: ['Gulf Arabic business etiquette', 'Formal greeting protocols', 'Hospitality emphasis'],
    technicalRequirements: ['Order management integration', 'Return workflow', 'Escalation routing', 'Arabic NLP']
  },
  {
    id: 'task-003',
    requestId: 'req-003',
    title: 'Spanish Healthcare Assistant Bot',
    description: 'Medical assistant for Spanish-speaking patients in US healthcare system',
    modules: ['Appointment scheduling', 'Medical terminology', 'Insurance verification', 'Emergency protocols'],
    status: 'Review',
    reward: {
      type: 'Public Credit',
      amount: 200
    },
    estimatedHours: 4,
    deadline: new Date('2025-06-30T23:59:00'),
    claimedBy: 'builder-001',
    claimedAt: new Date('2025-06-03T11:00:00'),
    submittedAt: new Date('2025-06-05T16:45:00'),
    reviewFeedback: ['Great cultural adaptation, but needs more medical terminology coverage', 'Emergency protocols need refinement'],
    culturalRequirements: ['US Hispanic healthcare culture', 'Family involvement in decisions', 'Respectful medical communication'],
    technicalRequirements: ['Appointment system integration', 'Medical database access', 'Insurance API', 'Emergency routing']
  }
];

export const sampleNotifications: Notification[] = [
  {
    id: 'notif-001',
    type: 'new_request',
    title: 'New Bot Request Available',
    message: 'Lea Santos submitted a new request for a Cebuano loan application bot. Reward: 300 points.',
    recipientId: 'all-builders',
    recipientType: 'builder',
    priority: 'high',
    createdAt: new Date('2025-06-05T10:35:00'),
    actionRequired: true,
    relatedId: 'req-001'
  },
  {
    id: 'notif-002',
    type: 'task_completed',
    title: 'Task Submitted for Review',
    message: 'Kai Chen submitted the Spanish Healthcare Assistant Bot for review.',
    recipientId: 'admin-001',
    recipientType: 'admin',
    priority: 'medium',
    createdAt: new Date('2025-06-05T16:50:00'),
    actionRequired: true,
    relatedId: 'task-003'
  },
  {
    id: 'notif-003',
    type: 'reward_issued',
    title: 'Reward Payment Processed',
    message: 'Your reward of $500 for the Arabic E-commerce bot has been processed.',
    recipientId: 'builder-003',
    recipientType: 'builder',
    priority: 'low',
    createdAt: new Date('2025-06-04T18:20:00'),
    readAt: new Date('2025-06-04T19:05:00'),
    relatedId: 'claim-001'
  }
];

export const sampleRewardClaims: RewardClaim[] = [
  {
    id: 'claim-001',
    builderId: 'builder-003',
    taskId: 'task-002',
    requestId: 'req-002',
    rewardType: 'Monetary',
    amount: 500,
    status: 'Paid',
    claimedAt: new Date('2025-06-04T17:30:00'),
    approvedAt: new Date('2025-06-04T18:00:00'),
    paidAt: new Date('2025-06-04T18:20:00'),
    notes: 'Excellent work on cultural adaptation and technical implementation'
  },
  {
    id: 'claim-002',
    builderId: 'builder-001',
    taskId: 'task-003',
    requestId: 'req-003',
    rewardType: 'Public Credit',
    amount: 200,
    status: 'Pending',
    claimedAt: new Date('2025-06-05T16:45:00'),
    notes: 'Under review - minor revisions requested'
  }
];

export const sampleShowcase: BotShowcase[] = [
  {
    id: 'showcase-001',
    requestId: 'req-002',
    botId: 'bot-arabic-cs-001',
    title: 'Gulf Arabic Customer Service Bot',
    description: 'Culturally-aware customer service bot for Arabic e-commerce platforms',
    builtBy: 'Omar Hassan',
    requestedBy: 'Ahmed Al-Rashid',
    culturalTheme: 'Gulf Arabic Business Culture',
    languages: ['arabic', 'english'],
    regions: ['arabic'],
    tags: ['customer-service', 'e-commerce', 'arabic', 'gulf-culture'],
    rating: 4.8,
    deployedAt: new Date('2025-06-04T20:00:00'),
    featuredUntil: new Date('2025-06-11T23:59:59')
  }
];

// AI Project Manager Intelligence
export const aiProjectManagerActions = {
  interpretRequest: (request: BotRequest) => {
    const complexity = request.modulesNeeded.length > 3 ? 'advanced' : 
                     request.modulesNeeded.length > 1 ? 'intermediate' : 'basic';
    
    const suggestedBuilders = sampleBuilders.filter(builder => 
      builder.availability === 'Available' &&
      request.targetLanguages?.some(lang => builder.languages.includes(lang)) &&
      request.targetRegions?.some(region => builder.regions.includes(region))
    );

    return {
      complexity,
      suggestedBuilders,
      estimatedTimeline: request.estimatedHours || 3,
      culturalConsiderations: request.culturalContext ? [request.culturalContext] : []
    };
  },

  generateBuildOpportunity: (request: BotRequest) => {
    const opportunity = {
      title: `Build Opportunity: ${request.requestTitle}`,
      description: request.description,
      reward: `${request.rewardAmount} ${request.rewardType}`,
      estimatedTime: `${request.estimatedHours || 3}h`,
      priority: request.priority,
      culturalRequirements: request.culturalContext ? [request.culturalContext] : [],
      technicalRequirements: request.modulesNeeded
    };
    
    return opportunity;
  },

  provideMidpointFeedback: (task: BuildTask) => {
    const feedbackExamples = [
      "Tone is too casual for banking context, please make it more formal",
      "Great cultural adaptation! Consider adding more regional greetings",
      "Technical implementation looks solid, but needs better error handling",
      "Excellent work on language switching - very smooth UX"
    ];
    
    return feedbackExamples[Math.floor(Math.random() * feedbackExamples.length)];
  }
};
