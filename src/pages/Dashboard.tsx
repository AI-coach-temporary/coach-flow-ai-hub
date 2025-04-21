
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Users, Calendar, MessageSquare } from 'lucide-react';

const Dashboard = () => {
  // Mock statistics
  const stats = [
    { title: 'Total Leads', value: '123', change: '+12%', icon: <Users size={20} /> },
    { title: 'Conversion Rate', value: '24%', change: '+2.5%', icon: <BarChart size={20} /> },
    { title: 'Appointments', value: '35', change: '+5%', icon: <Calendar size={20} /> },
    { title: 'Active Campaigns', value: '7', change: '+1', icon: <MessageSquare size={20} /> },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, John! Here's what's happening.</p>
        </div>
        <Button className="bg-brand-primary hover:bg-brand-secondary">
          + Add New Lead
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change} this month</p>
              </div>
              <div className="p-2 rounded-md bg-brand-light text-brand-primary">
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-md">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    {i % 2 === 0 ? <Users size={16} /> : <MessageSquare size={16} />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">
                      {i % 2 === 0 ? 'New lead added' : 'Campaign updated'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {i % 2 === 0 ? 'Sarah Johnson was added as a new lead' : 'Email sequence "Coach Onboarding" was updated'}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 whitespace-nowrap">2h ago</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div>
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Tasks</h2>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md">
                  <input type="checkbox" className="rounded text-brand-primary focus:ring-brand-primary" />
                  <div className="flex-1">
                    <p className="font-medium">Follow up with Mark</p>
                    <p className="text-sm text-gray-500">Due in 2 days</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" className="text-brand-primary border-brand-primary hover:bg-brand-light">
                View All Tasks
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
