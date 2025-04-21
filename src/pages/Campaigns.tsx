
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Mail } from 'lucide-react';

const Campaigns = () => {
  const [activeTab, setActiveTab] = useState('active');
  
  // Mock campaigns
  const campaigns = [
    { 
      id: 1, 
      name: 'Welcome Sequence', 
      type: 'email', 
      status: 'active', 
      stats: { sent: 256, opened: 189, clicked: 124 },
      lastUpdated: '2 days ago'
    },
    { 
      id: 2, 
      name: 'Re-engagement', 
      type: 'email', 
      status: 'active', 
      stats: { sent: 124, opened: 67, clicked: 45 },
      lastUpdated: '5 days ago'
    },
    { 
      id: 3, 
      name: 'Appointment Reminder', 
      type: 'sms', 
      status: 'active', 
      stats: { sent: 78, opened: 78, clicked: 0 },
      lastUpdated: '1 day ago'
    },
    { 
      id: 4, 
      name: 'Course Promotion', 
      type: 'email', 
      status: 'draft', 
      stats: { sent: 0, opened: 0, clicked: 0 },
      lastUpdated: '3 days ago'
    },
    { 
      id: 5, 
      name: 'Webinar Follow-up', 
      type: 'email', 
      status: 'scheduled', 
      stats: { sent: 0, opened: 0, clicked: 0 },
      lastUpdated: '1 day ago'
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-gray-600">Create and manage your marketing campaigns</p>
        </div>
        <Button className="bg-brand-primary hover:bg-brand-secondary">
          + Create Campaign
        </Button>
      </div>
      
      <Card className="p-6">
        <Tabs defaultValue="active" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
            <TabsTrigger value="all">All Campaigns</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns
                .filter(c => activeTab === 'all' || c.status === activeTab)
                .map(campaign => (
                  <Card key={campaign.id} className="p-4 hover:shadow-md transition-shadow duration-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{campaign.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={campaign.type === 'email' ? 'outline' : 'secondary'} className="text-xs">
                            {campaign.type === 'email' ? <Mail size={12} className="mr-1" /> : <MessageSquare size={12} className="mr-1" />}
                            {campaign.type.toUpperCase()}
                          </Badge>
                          <Badge 
                            variant={campaign.status === 'active' ? 'default' : 'outline'}
                            className={`text-xs ${
                              campaign.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 
                              campaign.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' : ''
                            }`}
                          >
                            {campaign.status}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                    
                    {campaign.status === 'active' && (
                      <div className="mt-4 grid grid-cols-3 gap-2 border-t pt-3">
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Sent</p>
                          <p className="font-medium">{campaign.stats.sent}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Opened</p>
                          <p className="font-medium">{campaign.stats.opened}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Clicked</p>
                          <p className="font-medium">{campaign.stats.clicked}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-3 text-xs text-gray-500">
                      Last updated: {campaign.lastUpdated}
                    </div>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Campaigns;
