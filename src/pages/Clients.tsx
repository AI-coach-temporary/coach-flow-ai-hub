
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Mock client data
  const clients = [
    {
      id: 1, 
      name: 'Jennifer Miller', 
      email: 'jennifer@example.com', 
      phone: '(555) 123-4567',
      status: 'active',
      tags: ['VIP', 'Monthly'],
      nextAction: 'Follow-up call scheduled',
      nextDate: 'Apr 25',
      notes: 'Looking to scale her coaching business. Interested in marketing automation.'
    },
    {
      id: 2, 
      name: 'David Wilson', 
      email: 'david@example.com', 
      phone: '(555) 234-5678',
      status: 'active',
      tags: ['Quarterly'],
      nextAction: 'Strategy session',
      nextDate: 'Apr 27',
      notes: 'Focusing on growing YouTube channel. Needs content strategy.'
    },
    {
      id: 3, 
      name: 'Sarah Johnson', 
      email: 'sarah@example.com', 
      phone: '(555) 345-6789',
      status: 'pending',
      tags: ['Trial'],
      nextAction: 'Onboarding call',
      nextDate: 'Apr 22',
      notes: 'New client. Starting with the basic package. Fitness coach.'
    },
    {
      id: 4, 
      name: 'Michael Brown', 
      email: 'michael@example.com', 
      phone: '(555) 456-7890',
      status: 'inactive',
      tags: ['Past Client'],
      nextAction: 'Re-engagement email',
      nextDate: 'Apr 30',
      notes: 'Previously purchased 6-month package. Potential for renewal.'
    },
    {
      id: 5, 
      name: 'Emily Davis', 
      email: 'emily@example.com', 
      phone: '(555) 567-8901',
      status: 'active',
      tags: ['VIP', 'Weekly'],
      nextAction: 'Content review',
      nextDate: 'Apr 24',
      notes: 'High-end client. Working on book launch campaign.'
    },
  ];

  // Filter clients based on search term and selected tag
  const filteredClients = clients.filter(client => {
    const matchesSearch = !searchTerm || 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = !selectedTag || client.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  // Available tags from all clients
  const allTags = Array.from(new Set(clients.flatMap(client => client.tags)));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Client Pipeline</h1>
          <p className="text-gray-600">Manage your coaching clients and follow-up tasks</p>
        </div>
        <Button className="bg-brand-primary hover:bg-brand-secondary">
          + Add New Client
        </Button>
      </div>

      <Card className="p-6">
        <Tabs defaultValue="all">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="all">All Clients</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input 
                  type="search" 
                  placeholder="Search clients..." 
                  className="pl-8 w-[250px]"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {allTags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {allTags.map(tag => (
                <Badge 
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  className={`cursor-pointer ${selectedTag === tag ? 'bg-brand-primary' : ''}`}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                >
                  {tag}
                </Badge>
              ))}
              {selectedTag && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedTag(null)}
                  className="text-xs h-6 px-2"
                >
                  Clear
                </Button>
              )}
            </div>
          )}
          
          <TabsContent value="all" className="space-y-4">
            {filteredClients.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No clients match your search criteria</p>
              </div>
            ) : (
              <div className="overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 font-medium">Client</th>
                      <th className="text-left py-2 font-medium">Status</th>
                      <th className="text-left py-2 font-medium">Tags</th>
                      <th className="text-left py-2 font-medium">Next Action</th>
                      <th className="text-left py-2 font-medium">Notes</th>
                      <th className="text-right py-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClients.map(client => (
                      <tr key={client.id} className="border-b hover:bg-gray-50">
                        <td className="py-3">
                          <div>
                            <p className="font-medium">{client.name}</p>
                            <p className="text-sm text-gray-600">{client.email}</p>
                          </div>
                        </td>
                        <td>
                          <Badge 
                            variant="outline" 
                            className={`
                              ${client.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 
                                client.status === 'pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' :
                                'bg-gray-100 text-gray-800 hover:bg-gray-100'}
                            `}
                          >
                            {client.status}
                          </Badge>
                        </td>
                        <td>
                          <div className="flex flex-wrap gap-1">
                            {client.tags.map(tag => (
                              <Badge 
                                key={tag} 
                                variant="secondary" 
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td>
                          <div>
                            <p className="text-sm">{client.nextAction}</p>
                            <p className="text-xs text-gray-500">{client.nextDate}</p>
                          </div>
                        </td>
                        <td className="max-w-[200px]">
                          <p className="text-sm text-gray-600 truncate">{client.notes}</p>
                        </td>
                        <td className="text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="active">
            <div className="overflow-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium">Client</th>
                    <th className="text-left py-2 font-medium">Status</th>
                    <th className="text-left py-2 font-medium">Tags</th>
                    <th className="text-left py-2 font-medium">Next Action</th>
                    <th className="text-left py-2 font-medium">Notes</th>
                    <th className="text-right py-2 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients
                    .filter(client => client.status === 'active')
                    .map(client => (
                      <tr key={client.id} className="border-b hover:bg-gray-50">
                        <td className="py-3">
                          <div>
                            <p className="font-medium">{client.name}</p>
                            <p className="text-sm text-gray-600">{client.email}</p>
                          </div>
                        </td>
                        <td>
                          <Badge 
                            variant="outline" 
                            className="bg-green-100 text-green-800 hover:bg-green-100"
                          >
                            {client.status}
                          </Badge>
                        </td>
                        <td>
                          <div className="flex flex-wrap gap-1">
                            {client.tags.map(tag => (
                              <Badge 
                                key={tag} 
                                variant="secondary" 
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td>
                          <div>
                            <p className="text-sm">{client.nextAction}</p>
                            <p className="text-xs text-gray-500">{client.nextDate}</p>
                          </div>
                        </td>
                        <td className="max-w-[200px]">
                          <p className="text-sm text-gray-600 truncate">{client.notes}</p>
                        </td>
                        <td className="text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          {/* Pending & Inactive tabs would follow the same pattern */}
        </Tabs>
      </Card>
    </div>
  );
};

export default Clients;
