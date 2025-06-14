import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Users, Calendar, MessageSquare, TrendingUp, Star } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { FadeIn, SlideIn, StaggerChildren } from '@/components/ui/animations';

const Dashboard = () => {
  const { user, isDemoMode } = useAuth();
  const [stats, setStats] = useState([
    { title: 'Total Leads', value: '0', change: '+0%', icon: <Users size={20} /> },
    { title: 'Conversion Rate', value: '0%', change: '+0%', icon: <BarChart size={20} /> },
    { title: 'Appointments', value: '0', change: '+0', icon: <Calendar size={20} /> },
    { title: 'Active Campaigns', value: '0', change: '+0', icon: <MessageSquare size={20} /> },
  ]);

  const [activities, setActivities] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (isDemoMode) {
      // Demo data
      setStats([
        { title: 'Total Leads', value: '287', change: '+23%', icon: <Users size={20} /> },
        { title: 'Conversion Rate', value: '34%', change: '+5.2%', icon: <TrendingUp size={20} /> },
        { title: 'Appointments', value: '48', change: '+12', icon: <Calendar size={20} /> },
        { title: 'Active Campaigns', value: '9', change: '+3', icon: <MessageSquare size={20} /> },
      ]);

      setActivities([
        { id: 1, type: 'lead', title: 'New lead added', description: 'Sarah Johnson was added as a qualified lead', time: '2h ago', icon: <Users size={16} /> },
        { id: 2, type: 'campaign', title: 'Campaign updated', description: 'Email sequence "Coach Onboarding" completed redesign', time: '4h ago', icon: <MessageSquare size={16} /> },
        { id: 3, type: 'appointment', title: 'Meeting scheduled', description: 'Discovery call with Mark Thompson scheduled', time: '6h ago', icon: <Calendar size={16} /> },
        { id: 4, type: 'lead', title: 'Lead converted', description: 'Jessica Lee upgraded to premium coaching package', time: '1d ago', icon: <Star size={16} /> },
      ]);

      setTasks([
        { id: 1, title: 'Follow up with Mark Thompson', due: 'Due in 2 days', completed: false },
        { id: 2, title: 'Review quarterly performance metrics', due: 'Due tomorrow', completed: false },
        { id: 3, title: 'Update coaching curriculum', due: 'Due in 5 days', completed: false },
        { id: 4, title: 'Schedule team meeting', due: 'Due today', completed: true },
      ]);
    } else if (user) {
      // Real user data would be fetched here
      // For now, keeping empty state for real users
      setStats([
        { title: 'Total Leads', value: '0', change: '+0%', icon: <Users size={20} /> },
        { title: 'Conversion Rate', value: '0%', change: '+0%', icon: <BarChart size={20} /> },
        { title: 'Appointments', value: '0', change: '+0', icon: <Calendar size={20} /> },
        { title: 'Active Campaigns', value: '0', change: '+0', icon: <MessageSquare size={20} /> },
      ]);
      setActivities([]);
      setTasks([]);
    }
  }, [isDemoMode, user]);

  const userName = isDemoMode ? 'Demo User' : (user?.email?.split('@')[0] || 'User');

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {userName}! 
              {isDemoMode && <span className="text-brand-primary"> (Demo Mode)</span>}
            </h1>
            <p className="text-gray-600">
              {isDemoMode 
                ? "You're exploring with sample data. Sign up to start tracking your real metrics!" 
                : "Here's what's happening with your coaching business."
              }
            </p>
          </div>
          <SlideIn direction="left">
            <Button className="bg-brand-primary hover:bg-brand-secondary transition-all duration-300 transform hover:scale-105">
              + Add New Lead
            </Button>
          </SlideIn>
        </div>
      </FadeIn>

      <StaggerChildren staggerDelay={100} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-0 bg-white/60 backdrop-blur-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold mt-1 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-sm text-green-600 mt-1 font-medium">{stat.change} this month</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 text-brand-primary">
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </StaggerChildren>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SlideIn direction="up" delay={300} className="lg:col-span-2">
          <Card className="p-6 hover:shadow-lg transition-all duration-300 border-0 bg-white/60 backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Recent Activity</h2>
            <div className="space-y-4">
              {activities.length > 0 ? (
                <StaggerChildren staggerDelay={50}>
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-3 hover:bg-gray-50/50 rounded-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.description}</p>
                      </div>
                      <p className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</p>
                    </div>
                  ))}
                </StaggerChildren>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p>No recent activity</p>
                  <p className="text-sm">Your activity will appear here once you start using the platform</p>
                </div>
              )}
            </div>
          </Card>
        </SlideIn>
        
        <SlideIn direction="up" delay={400}>
          <Card className="p-6 hover:shadow-lg transition-all duration-300 border-0 bg-white/60 backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Tasks</h2>
            <div className="space-y-3">
              {tasks.length > 0 ? (
                <StaggerChildren staggerDelay={75}>
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-3 p-3 hover:bg-gray-50/50 rounded-lg transition-all duration-200 hover:scale-[1.01] cursor-pointer">
                      <input 
                        type="checkbox" 
                        defaultChecked={task.completed}
                        className="rounded text-brand-primary focus:ring-brand-primary transition-all duration-200" 
                      />
                      <div className="flex-1">
                        <p className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                          {task.title}
                        </p>
                        <p className="text-sm text-gray-500">{task.due}</p>
                      </div>
                    </div>
                  ))}
                </StaggerChildren>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p>No tasks yet</p>
                  <p className="text-sm">Create tasks to stay organized</p>
                </div>
              )}
            </div>
            <div className="mt-6 text-center">
              <Button 
                variant="outline" 
                className="text-brand-primary border-brand-primary hover:bg-brand-light transition-all duration-200 hover:scale-105"
              >
                {tasks.length > 0 ? 'View All Tasks' : 'Create First Task'}
              </Button>
            </div>
          </Card>
        </SlideIn>
      </div>
    </div>
  );
};

export default Dashboard;
