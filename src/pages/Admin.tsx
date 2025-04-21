
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import AddUserModal from '@/components/admin/AddUserModal';
import type { User } from '@/components/admin/AddUserModal';

const Admin = () => {
  // Modal state
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  
  // Mock user data
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'John Preacher',
      email: 'john@example.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: 'Today, 9:42 AM',
    },
    {
      id: 2,
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      role: 'Manager',
      status: 'Active',
      lastLogin: 'Yesterday, 3:15 PM',
    },
    {
      id: 3,
      name: 'Michael Rodriguez',
      email: 'michael@example.com',
      role: 'User',
      status: 'Inactive',
      lastLogin: 'Apr 15, 2025, 10:30 AM',
    },
    {
      id: 4,
      name: 'Jessica Chen',
      email: 'jessica@example.com',
      role: 'User',
      status: 'Active',
      lastLogin: 'Today, 8:05 AM',
    },
  ]);

  // Mock platform stats
  const platformStats = [
    { label: 'Active Users', value: '42', change: '+5' },
    { label: 'Total Clients', value: '128', change: '+15' },
    { label: 'Active Campaigns', value: '12', change: '+2' },
    { label: 'Storage Used', value: '1.2GB', change: '+120MB' },
  ];
  
  const handleAddUser = (newUser: Omit<User, 'id' | 'lastLogin'>) => {
    const user: User = {
      ...newUser,
      id: users.length + 1,
      lastLogin: 'Never'
    };
    
    setUsers([...users, user]);
    toast.success(`User ${user.name} has been added successfully!`);
  };
  
  const handleEditUser = (userId: number) => {
    toast.info(`Editing user ${userId} - Feature coming soon`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Portal</h1>
          <p className="text-gray-600">Manage users and platform settings</p>
        </div>
        <Button 
          className="bg-brand-primary hover:bg-brand-secondary"
          onClick={() => setIsAddUserModalOpen(true)}
        >
          + Add New User
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {platformStats.map((stat) => (
          <Card key={stat.label} className="p-6">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-3xl font-bold mt-1">{stat.value}</p>
            <p className="text-sm text-green-600 mt-1">{stat.change} this month</p>
          </Card>
        ))}
      </div>
      
      <Card className="p-6">
        <Tabs defaultValue="users">
          <TabsList className="mb-6">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <div className="overflow-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium">Name</th>
                    <th className="text-left py-2 font-medium">Email</th>
                    <th className="text-left py-2 font-medium">Role</th>
                    <th className="text-left py-2 font-medium">Status</th>
                    <th className="text-left py-2 font-medium">Last Login</th>
                    <th className="text-right py-2 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 font-medium">{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <Badge 
                          variant="outline" 
                          className={
                            user.role === 'Admin' ? 'bg-purple-100 text-purple-800 hover:bg-purple-100' : 
                            user.role === 'Manager' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' : 
                            'bg-gray-100 text-gray-800 hover:bg-gray-100'
                          }
                        >
                          {user.role}
                        </Badge>
                      </td>
                      <td>
                        <Badge 
                          variant="outline" 
                          className={
                            user.status === 'Active' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 
                            'bg-red-100 text-red-800 hover:bg-red-100'
                          }
                        >
                          {user.status}
                        </Badge>
                      </td>
                      <td>{user.lastLogin}</td>
                      <td className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleEditUser(user.id)}>
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">General Settings</h3>
                <Card className="p-4 space-y-3">
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-medium">Company Name</p>
                      <p className="text-sm text-gray-500">Your business name as shown to clients</p>
                    </div>
                    <Button variant="outline">Edit</Button>
                  </div>
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-500">Configure email alerts and notifications</p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Data Retention</p>
                      <p className="text-sm text-gray-500">Configure how long data is stored</p>
                    </div>
                    <Button variant="outline">Settings</Button>
                  </div>
                </Card>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Appearance</h3>
                <Card className="p-4 space-y-3">
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-medium">Theme</p>
                      <p className="text-sm text-gray-500">Light or dark mode</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Light</Button>
                      <Button variant="outline" size="sm">Dark</Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Branding</p>
                      <p className="text-sm text-gray-500">Customize logo and colors</p>
                    </div>
                    <Button variant="outline">Customize</Button>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="billing">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Current Plan</h3>
                <Card className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="inline-block px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium mb-2">
                        Professional Plan
                      </div>
                      <p className="font-medium text-2xl">$49.99<span className="text-sm text-gray-500">/month</span></p>
                      <p className="text-sm text-gray-600 mt-1">Renews on May 15, 2025</p>
                    </div>
                    <Button variant="outline">Change Plan</Button>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Plan Features</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <span>Up to 500 clients</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <span>Unlimited campaigns</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <span>Advanced reporting</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <span>5 team members</span>
                      </li>
                    </ul>
                  </div>
                </Card>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Payment Method</h3>
                <Card className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 rounded bg-gray-200 flex items-center justify-center text-xs">
                        VISA
                      </div>
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-xs text-gray-500">Expires 09/27</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="integrations">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center text-blue-600">
                        Z
                      </div>
                      <div>
                        <p className="font-medium">Zoom</p>
                        <p className="text-sm text-gray-500">Video conferencing integration</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800">Connected</Badge>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded bg-green-100 flex items-center justify-center text-green-600">
                        C
                      </div>
                      <div>
                        <p className="font-medium">Calendly</p>
                        <p className="text-sm text-gray-500">Scheduling integration</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800">Connected</Badge>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded bg-purple-100 flex items-center justify-center text-purple-600">
                        S
                      </div>
                      <div>
                        <p className="font-medium">Stripe</p>
                        <p className="text-sm text-gray-500">Payment processing</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-red-100 text-red-800">Not Connected</Badge>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded bg-orange-100 flex items-center justify-center text-orange-600">
                        H
                      </div>
                      <div>
                        <p className="font-medium">HubSpot</p>
                        <p className="text-sm text-gray-500">CRM integration</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-red-100 text-red-800">Not Connected</Badge>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                </Card>
              </div>
              
              <Card className="p-6">
                <h3 className="font-medium mb-4">Available Integrations</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start gap-3" size="lg">
                    <span className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center text-blue-600 text-xs">
                      M
                    </span>
                    <span>Mailchimp</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3" size="lg">
                    <span className="w-6 h-6 rounded bg-red-100 flex items-center justify-center text-red-600 text-xs">
                      G
                    </span>
                    <span>Google Analytics</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3" size="lg">
                    <span className="w-6 h-6 rounded bg-green-100 flex items-center justify-center text-green-600 text-xs">
                      QF
                    </span>
                    <span>QuickFile</span>
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
      
      <AddUserModal 
        open={isAddUserModalOpen} 
        onClose={() => setIsAddUserModalOpen(false)}
        onAddUser={handleAddUser}
      />
    </div>
  );
};

export default Admin;
