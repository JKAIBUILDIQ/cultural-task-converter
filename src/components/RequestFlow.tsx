import React, { useState, useEffect } from 'react';
import { 
  BotRequest, 
  BuildTask, 
  Builder, 
  Notification, 
  RewardClaim, 
  BotShowcase 
} from '../types/request-flow';
import { RegionalTheme } from '../types/index';
import { 
  sampleRequests, 
  sampleBuilders, 
  sampleBuildTasks, 
  sampleNotifications,
  sampleRewardClaims,
  sampleShowcase,
  aiProjectManagerActions
} from '../data/request-flow';
import { 
  Plus, 
  Users, 
  Clock, 
  Star, 
  Trophy, 
  Bell, 
  Send, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  DollarSign,
  Award,
  MessageSquare,
  Briefcase,
  Calendar,
  Target,
  Zap,
  Bot,
  Eye,
  Edit,
  Play
} from 'lucide-react';

interface RequestFlowProps {
  theme: RegionalTheme;
}

type ViewMode = 'submit' | 'dashboard' | 'tasks' | 'builders' | 'showcase';

const RequestFlow: React.FC<RequestFlowProps> = ({ theme }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('submit');
  const [requests, setRequests] = useState<BotRequest[]>(sampleRequests);
  const [tasks, setTasks] = useState<BuildTask[]>(sampleBuildTasks);
  const [builders, setBuilders] = useState<Builder[]>(sampleBuilders);
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);
  const [rewardClaims, setRewardClaims] = useState<RewardClaim[]>(sampleRewardClaims);
  const [showcase, setShowcase] = useState<BotShowcase[]>(sampleShowcase);
  const [newRequest, setNewRequest] = useState<Partial<BotRequest>>({
    requestorName: '',
    requestTitle: '',
    description: '',
    modulesNeeded: [],
    priority: 'Medium',
    rewardType: 'Points',
    rewardAmount: 100,
    requestedBy: '',
    culturalContext: '',
    targetLanguages: [],
    targetRegions: []
  });

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    const request: BotRequest = {
      ...newRequest,
      id: `req-${Date.now()}`,
      submittedAt: new Date(),
      status: 'Pending',
      estimatedHours: Math.ceil(newRequest.modulesNeeded!.length * 1.5)
    } as BotRequest;

    setRequests(prev => [request, ...prev]);

    // AI Project Manager analyzes the request
    const analysis = aiProjectManagerActions.interpretRequest(request);
    
    // Generate build task
    const buildTask: BuildTask = {
      id: `task-${Date.now()}`,
      requestId: request.id,
      title: `${request.requestTitle} Development`,
      description: request.description,
      modules: request.modulesNeeded,
      status: 'Available',
      reward: {
        type: request.rewardType,
        amount: request.rewardAmount
      },
      estimatedHours: analysis.estimatedTimeline,
      deadline: request.deadline,
      culturalRequirements: analysis.culturalConsiderations,
      technicalRequirements: request.modulesNeeded
    };

    setTasks(prev => [buildTask, ...prev]);

    // Create notification for builders
    const notification: Notification = {
      id: `notif-${Date.now()}`,
      type: 'new_request',
      title: 'New Bot Request Available',
      message: `${request.requestorName} submitted a new request: ${request.requestTitle}. Reward: ${request.rewardAmount} ${request.rewardType}.`,
      recipientId: 'all-builders',
      recipientType: 'builder',
      priority: request.priority === 'Urgent' ? 'high' : 'medium',
      createdAt: new Date(),
      actionRequired: true,
      relatedId: request.id
    };

    setNotifications(prev => [notification, ...prev]);

    // Reset form
    setNewRequest({
      requestorName: '',
      requestTitle: '',
      description: '',
      modulesNeeded: [],
      priority: 'Medium',
      rewardType: 'Points',
      rewardAmount: 100,
      requestedBy: '',
      culturalContext: '',
      targetLanguages: [],
      targetRegions: []
    });

    // Switch to dashboard view
    setViewMode('dashboard');
  };

  const handleClaimTask = (taskId: string, builderId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: 'Claimed', claimedBy: builderId, claimedAt: new Date() }
        : task
    ));

    setRequests(prev => prev.map(request => 
      tasks.find(t => t.id === taskId)?.requestId === request.id
        ? { ...request, status: 'In Progress', assignedBuilder: builderId }
        : request
    ));
  };

  const handleCompleteTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: 'Review', submittedAt: new Date() }
        : task
    ));

    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const rewardClaim: RewardClaim = {
        id: `claim-${Date.now()}`,
        builderId: task.claimedBy!,
        taskId: task.id,
        requestId: task.requestId,
        rewardType: task.reward.type,
        amount: task.reward.amount,
        status: 'Pending',
        claimedAt: new Date()
      };

      setRewardClaims(prev => [rewardClaim, ...prev]);
    }
  };

  const handleApproveTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    const request = requests.find(r => r.id === task?.requestId);
    
    if (task && request) {
      // Update task status
      setTasks(prev => prev.map(t => 
        t.id === taskId ? { ...t, status: 'Completed' } : t
      ));

      // Update request status
      setRequests(prev => prev.map(r => 
        r.id === task.requestId ? { ...r, status: 'Completed' } : r
      ));

      // Approve reward claim
      setRewardClaims(prev => prev.map(claim =>
        claim.taskId === taskId 
          ? { ...claim, status: 'Approved', approvedAt: new Date() }
          : claim
      ));

      // Add to showcase
      const showcaseItem: BotShowcase = {
        id: `showcase-${Date.now()}`,
        requestId: task.requestId,
        botId: `bot-${task.requestId}-${Date.now()}`,
        title: request.requestTitle,
        description: request.description,
        builtBy: builders.find(b => b.id === task.claimedBy)?.name || 'Unknown',
        requestedBy: request.requestorName,
        culturalTheme: request.culturalContext || 'Cultural Adaptation',
        languages: request.targetLanguages || [],
        regions: request.targetRegions || [],
        tags: task.modules,
        rating: 4.5 + Math.random() * 0.5,
        deployedAt: new Date(),
        featuredUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      };

      setShowcase(prev => [showcaseItem, ...prev]);
    }
  };

  const renderSubmitForm = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit Bot Request</h1>
        <p className="text-gray-600">Tell us what awesome bot you need, and our builders will make it happen!</p>
      </div>

      <form onSubmit={handleSubmitRequest} className="space-y-6 bg-white rounded-xl p-8 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <span>🧑‍💻</span>
              <span>Requestor Name</span>
            </label>
            <input
              type="text"
              value={newRequest.requestorName}
              onChange={(e) => setNewRequest(prev => ({ ...prev, requestorName: e.target.value }))}
              placeholder="Lea Santos"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
              style={{ outline: 'none' }}
              onFocus={(e) => e.target.style.borderColor = theme.primaryColor}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              required
            />
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <span>📬</span>
              <span>Request Title</span>
            </label>
            <input
              type="text"
              value={newRequest.requestTitle}
              onChange={(e) => setNewRequest(prev => ({ ...prev, requestTitle: e.target.value }))}
              placeholder="We need a multilingual bot for Cebuano loan applications"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <span>📄</span>
            <span>Description</span>
          </label>
          <textarea
            value={newRequest.description}
            onChange={(e) => setNewRequest(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe use case, target users, any tone/style needs..."
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <span>🧩</span>
            <span>Modules Needed</span>
          </label>
          <input
            type="text"
            value={newRequest.modulesNeeded?.join(', ')}
            onChange={(e) => setNewRequest(prev => ({ 
              ...prev, 
              modulesNeeded: e.target.value.split(',').map(m => m.trim()).filter(Boolean)
            }))}
            placeholder="KYC doc parse, Loan calculator, Emotional response in Tagalog"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
            required
          />
          <p className="text-sm text-gray-500 mt-1">Separate modules with commas</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <span>🎯</span>
              <span>Priority</span>
            </label>
            <select
              value={newRequest.priority}
              onChange={(e) => setNewRequest(prev => ({ ...prev, priority: e.target.value as any }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">🔴 Urgent</option>
            </select>
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <span>💰</span>
              <span>Reward Type</span>
            </label>
            <select
              value={newRequest.rewardType}
              onChange={(e) => setNewRequest(prev => ({ ...prev, rewardType: e.target.value as any }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
            >
              <option value="Points">Points</option>
              <option value="Token">Token</option>
              <option value="Public Credit">Public Credit</option>
              <option value="Monetary">Monetary ($)</option>
            </select>
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <span>💎</span>
              <span>Reward Amount</span>
            </label>
            <input
              type="number"
              value={newRequest.rewardAmount}
              onChange={(e) => setNewRequest(prev => ({ ...prev, rewardAmount: Number(e.target.value) }))}
              min="1"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <span>📆</span>
            <span>Requested By</span>
          </label>
          <input
            type="text"
            value={newRequest.requestedBy}
            onChange={(e) => setNewRequest(prev => ({ ...prev, requestedBy: e.target.value }))}
            placeholder="Friday end of week / Next Monday / End of month"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <span>🌍</span>
            <span>Cultural Context (Optional)</span>
          </label>
          <input
            type="text"
            value={newRequest.culturalContext}
            onChange={(e) => setNewRequest(prev => ({ ...prev, culturalContext: e.target.value }))}
            placeholder="Filipino banking culture with emphasis on personal relationships and trust"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center space-x-2 px-8 py-3 text-white rounded-lg font-medium hover:opacity-90 transition-all"
            style={{ backgroundColor: theme.primaryColor }}
          >
            <Send className="w-5 h-5" />
            <span>Submit Request</span>
          </button>
        </div>
      </form>
    </div>
  );

  const renderDashboard = () => (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🤖 AI Project Manager Dashboard</h1>
        <p className="text-gray-600">Managing requests, tasks, and builders across the studio</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Requests</p>
              <p className="text-2xl font-bold text-gray-900">{requests.filter(r => r.status !== 'Completed').length}</p>
            </div>
            <Briefcase className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Available Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{tasks.filter(t => t.status === 'Available').length}</p>
            </div>
            <Target className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Available Builders</p>
              <p className="text-2xl font-bold text-gray-900">{builders.filter(b => b.availability === 'Available').length}</p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed Bots</p>
              <p className="text-2xl font-bold text-gray-900">{showcase.length}</p>
            </div>
            <Trophy className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Recent Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Requests</h2>
          <div className="space-y-4">
            {requests.slice(0, 3).map(request => (
              <div key={request.id} className="border-l-4 pl-4 py-3" style={{ borderLeftColor: theme.primaryColor }}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{request.requestTitle}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    request.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    request.status === 'Review' ? 'bg-orange-100 text-orange-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {request.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{request.description.substring(0, 100)}...</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>By {request.requestorName}</span>
                  <span>{request.rewardAmount} {request.rewardType}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Notifications</h2>
          <div className="space-y-4">
            {notifications.slice(0, 4).map(notification => (
              <div key={notification.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-full ${
                  notification.priority === 'high' ? 'bg-red-100' :
                  notification.priority === 'medium' ? 'bg-yellow-100' :
                  'bg-gray-100'
                }`}>
                  <Bell className={`w-4 h-4 ${
                    notification.priority === 'high' ? 'text-red-600' :
                    notification.priority === 'medium' ? 'text-yellow-600' :
                    'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-sm">{notification.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {notification.createdAt.toLocaleDateString()} at {notification.createdAt.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTasks = () => (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🛠 Build Tasks</h1>
        <p className="text-gray-600">Available opportunities for builders</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {tasks.map(task => (
          <div key={task.id} className="bg-white rounded-xl shadow-lg p-6 border-l-4" style={{ borderLeftColor: theme.primaryColor }}>
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                task.status === 'Available' ? 'bg-green-100 text-green-800' :
                task.status === 'Claimed' ? 'bg-blue-100 text-blue-800' :
                task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                task.status === 'Review' ? 'bg-orange-100 text-orange-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {task.status}
              </span>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{task.estimatedHours}h</span>
              </div>
            </div>

            <h3 className="font-bold text-gray-900 mb-2">{task.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{task.description}</p>

            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">Modules Required:</h4>
              <div className="flex flex-wrap gap-1">
                {task.modules.map((module, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    {module}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {task.reward.type === 'Monetary' && <DollarSign className="w-4 h-4 text-green-600" />}
                {task.reward.type === 'Points' && <Star className="w-4 h-4 text-yellow-600" />}
                {task.reward.type === 'Token' && <Award className="w-4 h-4 text-purple-600" />}
                {task.reward.type === 'Public Credit' && <Trophy className="w-4 h-4 text-blue-600" />}
                <span className="font-medium text-gray-900">{task.reward.amount} {task.reward.type}</span>
              </div>

              {task.status === 'Available' && (
                <button
                  onClick={() => handleClaimTask(task.id, 'builder-002')}
                  className="px-4 py-2 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-all"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  Claim Task
                </button>
              )}

              {task.status === 'In Progress' && task.claimedBy === 'builder-002' && (
                <button
                  onClick={() => handleCompleteTask(task.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-all"
                >
                  Submit
                </button>
              )}

              {task.status === 'Review' && (
                <button
                  onClick={() => handleApproveTask(task.id)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-all"
                >
                  Approve
                </button>
              )}
            </div>

            {task.claimedBy && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>Claimed by {builders.find(b => b.id === task.claimedBy)?.name || 'Unknown'}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderBuilders = () => (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">👥 Builders Network</h1>
        <p className="text-gray-600">Our talented community of bot builders</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {builders.map(builder => (
          <div key={builder.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-3xl">{builder.avatar}</div>
              <div>
                <h3 className="font-bold text-gray-900">{builder.name}</h3>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    builder.availability === 'Available' ? 'bg-green-100 text-green-800' :
                    builder.availability === 'Busy' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {builder.availability}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium">{builder.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">Specialties:</h4>
              <div className="flex flex-wrap gap-1">
                {builder.specialties.map((specialty, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">Languages:</h4>
              <div className="flex flex-wrap gap-1">
                {builder.languages.map((language, index) => (
                  <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                    {language}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center text-sm">
              <div>
                <p className="font-medium text-gray-900">{builder.completedTasks}</p>
                <p className="text-gray-600">Completed</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">${builder.totalEarnings}</p>
                <p className="text-gray-600">Earned</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderShowcase = () => (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🎉 Bot Showcase</h1>
        <p className="text-gray-600">Featured bots built by our community</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {showcase.map(showcaseItem => (
          <div key={showcaseItem.id} className="bg-white rounded-xl shadow-lg p-6 border-l-4" style={{ borderLeftColor: theme.primaryColor }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900">{showcaseItem.title}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">{showcaseItem.rating.toFixed(1)}</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{showcaseItem.description}</p>

            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Built by: <strong>{showcaseItem.builtBy}</strong></span>
                <span>Requested by: <strong>{showcaseItem.requestedBy}</strong></span>
              </div>
              <p className="text-xs text-gray-500 mb-2">Theme: {showcaseItem.culturalTheme}</p>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">Languages:</h4>
              <div className="flex flex-wrap gap-1">
                {showcaseItem.languages.map((language, index) => (
                  <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                    {language}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">Tags:</h4>
              <div className="flex flex-wrap gap-1">
                {showcaseItem.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">
                Deployed: {showcaseItem.deployedAt.toLocaleDateString()}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-all"
                >
                  <Eye className="w-3 h-3" />
                  <span>View</span>
                </button>
                <button
                  className="flex items-center space-x-1 px-3 py-1 bg-gray-600 text-white rounded text-xs hover:bg-gray-700 transition-all"
                >
                  <Play className="w-3 h-3" />
                  <span>Test</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Main render function
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xl" 
                     style={{ backgroundColor: theme.primaryColor }}>
                  🚀
                </div>
                <h1 className="text-xl font-bold text-gray-900">Request Flow Studio</h1>
              </div>
              
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setViewMode('submit')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    viewMode === 'submit' 
                      ? 'text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  style={{
                    backgroundColor: viewMode === 'submit' ? theme.primaryColor : 'transparent'
                  }}
                >
                  <Plus className="w-4 h-4" />
                  <span>Submit Request</span>
                </button>
                
                <button
                  onClick={() => setViewMode('dashboard')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    viewMode === 'dashboard' 
                      ? 'text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  style={{
                    backgroundColor: viewMode === 'dashboard' ? theme.primaryColor : 'transparent'
                  }}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
                
                <button
                  onClick={() => setViewMode('tasks')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    viewMode === 'tasks' 
                      ? 'text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  style={{
                    backgroundColor: viewMode === 'tasks' ? theme.primaryColor : 'transparent'
                  }}
                >
                  <Target className="w-4 h-4" />
                  <span>Build Tasks</span>
                </button>
                
                <button
                  onClick={() => setViewMode('builders')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    viewMode === 'builders' 
                      ? 'text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  style={{
                    backgroundColor: viewMode === 'builders' ? theme.primaryColor : 'transparent'
                  }}
                >
                  <Users className="w-4 h-4" />
                  <span>Builders</span>
                </button>
                
                <button
                  onClick={() => setViewMode('showcase')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    viewMode === 'showcase' 
                      ? 'text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  style={{
                    backgroundColor: viewMode === 'showcase' ? theme.primaryColor : 'transparent'
                  }}
                >
                  <Trophy className="w-4 h-4" />
                  <span>Showcase</span>
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600" />
                {notifications.filter(n => !n.readAt).length > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">
                      {notifications.filter(n => !n.readAt).length}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="min-h-screen" style={{
        background: `linear-gradient(135deg, ${theme.secondaryColor}20 0%, ${theme.primaryColor}10 100%)`
      }}>
        {viewMode === 'submit' && renderSubmitForm()}
        {viewMode === 'dashboard' && renderDashboard()}
        {viewMode === 'tasks' && renderTasks()}
        {viewMode === 'builders' && renderBuilders()}
        {viewMode === 'showcase' && renderShowcase()}
      </div>
    </div>
  );
};

export default RequestFlow;
