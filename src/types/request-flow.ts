export interface BotRequest {
  id: string;
  requestorName: string;
  requestTitle: string;
  description: string;
  modulesNeeded: string[];
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  rewardType: 'Points' | 'Token' | 'Public Credit' | 'Monetary';
  rewardAmount: number;
  requestedBy: string;
  submittedAt: Date;
  status: 'Pending' | 'In Progress' | 'Review' | 'Completed' | 'Deployed';
  assignedBuilder?: string;
  estimatedHours?: number;
  deadline?: Date;
  culturalContext?: string;
  targetLanguages?: string[];
  targetRegions?: string[];
}

export interface BuildTask {
  id: string;
  requestId: string;
  title: string;
  description: string;
  modules: string[];
  status: 'Available' | 'Claimed' | 'In Progress' | 'Review' | 'Completed';
  reward: {
    type: 'Points' | 'Token' | 'Public Credit' | 'Monetary';
    amount: number;
  };
  estimatedHours: number;
  deadline?: Date;
  claimedBy?: string;
  claimedAt?: Date;
  submittedAt?: Date;
  reviewFeedback?: string[];
  culturalRequirements: string[];
  technicalRequirements: string[];
}

export interface Builder {
  id: string;
  name: string;
  avatar: string;
  specialties: string[];
  languages: string[];
  regions: string[];
  rating: number;
  completedTasks: number;
  totalEarnings: number;
  currentTasks: string[];
  availability: 'Available' | 'Busy' | 'Offline';
  joinedAt: Date;
}

export interface ProjectManager {
  activeRequests: BotRequest[];
  taskQueue: BuildTask[];
  availableBuilders: Builder[];
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'new_request' | 'task_available' | 'task_claimed' | 'task_completed' | 'reward_issued';
  title: string;
  message: string;
  recipientId: string;
  recipientType: 'builder' | 'requestor' | 'admin';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  readAt?: Date;
  actionRequired?: boolean;
  relatedId?: string;
}

export interface RewardClaim {
  id: string;
  builderId: string;
  taskId: string;
  requestId: string;
  rewardType: 'Points' | 'Token' | 'Public Credit' | 'Monetary';
  amount: number;
  status: 'Pending' | 'Approved' | 'Paid' | 'Disputed';
  claimedAt: Date;
  approvedAt?: Date;
  paidAt?: Date;
  notes?: string;
}

export interface BotShowcase {
  id: string;
  requestId: string;
  botId: string;
  title: string;
  description: string;
  builtBy: string;
  requestedBy: string;
  culturalTheme: string;
  languages: string[];
  regions: string[];
  tags: string[];
  rating: number;
  deployedAt: Date;
  featuredUntil?: Date;
}
