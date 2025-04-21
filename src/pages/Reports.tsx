
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock chart components to represent real charts
const MockBarChart = () => (
  <div className="h-72 bg-gradient-to-r from-gray-50 to-gray-100 rounded-md flex items-center justify-center">
    <div className="space-y-3 w-full px-12">
      <div className="flex items-end w-full h-48 gap-3">
        <div style={{ height: '60%' }} className="w-full bg-brand-primary/80 rounded-t-md"></div>
        <div style={{ height: '75%' }} className="w-full bg-brand-primary/80 rounded-t-md"></div>
        <div style={{ height: '45%' }} className="w-full bg-brand-primary/80 rounded-t-md"></div>
        <div style={{ height: '90%' }} className="w-full bg-brand-primary/80 rounded-t-md"></div>
        <div style={{ height: '65%' }} className="w-full bg-brand-primary/80 rounded-t-md"></div>
        <div style={{ height: '80%' }} className="w-full bg-brand-primary/80 rounded-t-md"></div>
        <div style={{ height: '55%' }} className="w-full bg-brand-primary/80 rounded-t-md"></div>
      </div>
      <div className="w-full h-px bg-gray-200"></div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
        <span>Jul</span>
      </div>
    </div>
  </div>
);

const MockPieChart = () => (
  <div className="h-72 bg-gradient-to-r from-gray-50 to-gray-100 rounded-md flex items-center justify-center">
    <div className="relative w-40 h-40 rounded-full overflow-hidden">
      <div style={{ backgroundColor: '#2563EB' }} className="absolute top-0 left-0 w-1/2 h-full"></div>
      <div style={{ backgroundColor: '#4F46E5' }} className="absolute top-0 right-0 w-1/2 h-1/2 transform origin-bottom-left rotate-45"></div>
      <div style={{ backgroundColor: '#7C3AED' }} className="absolute bottom-0 right-0 w-1/2 h-1/2"></div>
      <div className="absolute inset-4 bg-white rounded-full"></div>
    </div>
  </div>
);

const MockLineChart = () => (
  <div className="h-72 bg-gradient-to-r from-gray-50 to-gray-100 rounded-md flex items-center justify-center">
    <div className="relative w-full h-48 px-12">
      <div className="w-full h-px bg-gray-200 absolute top-0"></div>
      <div className="w-full h-px bg-gray-200 absolute top-1/4"></div>
      <div className="w-full h-px bg-gray-200 absolute top-2/4"></div>
      <div className="w-full h-px bg-gray-200 absolute top-3/4"></div>
      <div className="w-full h-px bg-gray-200 absolute bottom-0"></div>
      
      <svg className="absolute inset-0 h-full w-full">
        <path 
          d="M 0,120 L 50,100 L 100,80 L 150,90 L 200,40 L 250,20 L 300,60 L 350,30" 
          fill="none" 
          stroke="#2563EB" 
          strokeWidth="3"
          className="drop-shadow"
        />
      </svg>
    </div>
  </div>
);

const Reports = () => {
  const [dateRange, setDateRange] = useState('30');
  
  // Mock stats
  const salesStats = {
    totalRevenue: '$24,750',
    averageDeal: '$2,475',
    conversionRate: '24%',
    leadsGenerated: '103',
  };
  
  const marketingStats = {
    emailsSent: '1,245',
    emailOpenRate: '32%',
    clickThroughRate: '8.5%',
    socialEngagement: '+24%',
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600">Analyze your sales and marketing performance</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export</Button>
        </div>
      </div>
      
      <Tabs defaultValue="sales">
        <TabsList className="mb-6">
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6">
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-3xl font-bold mt-1">{salesStats.totalRevenue}</p>
              <p className="text-sm text-green-600 mt-1">+15% from last period</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-gray-500">Average Deal Size</p>
              <p className="text-3xl font-bold mt-1">{salesStats.averageDeal}</p>
              <p className="text-sm text-green-600 mt-1">+5% from last period</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-gray-500">Conversion Rate</p>
              <p className="text-3xl font-bold mt-1">{salesStats.conversionRate}</p>
              <p className="text-sm text-green-600 mt-1">+2% from last period</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-gray-500">Leads Generated</p>
              <p className="text-3xl font-bold mt-1">{salesStats.leadsGenerated}</p>
              <p className="text-sm text-green-600 mt-1">+12 from last period</p>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-2">Revenue Over Time</h2>
              <p className="text-sm text-gray-500 mb-4">Monthly revenue for the selected period</p>
              <MockBarChart />
            </Card>
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-2">Deal Stages</h2>
              <p className="text-sm text-gray-500 mb-4">Distribution of deals by pipeline stage</p>
              <MockPieChart />
            </Card>
          </div>
          
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-2">Recent Sales</h2>
            <div className="overflow-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium">Client</th>
                    <th className="text-left py-2 font-medium">Service</th>
                    <th className="text-left py-2 font-medium">Amount</th>
                    <th className="text-left py-2 font-medium">Date</th>
                    <th className="text-right py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map(i => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="py-3 font-medium">Client Name {i}</td>
                      <td>1-on-1 Coaching Package</td>
                      <td>${Math.floor(Math.random() * 5000) + 1000}</td>
                      <td>Apr {Math.floor(Math.random() * 20) + 1}, 2025</td>
                      <td className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          i % 3 === 0 ? 'bg-yellow-100 text-yellow-800' : 
                          i % 3 === 1 ? 'bg-green-100 text-green-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {i % 3 === 0 ? 'Pending' : i % 3 === 1 ? 'Completed' : 'Processing'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="marketing" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6">
              <p className="text-sm text-gray-500">Emails Sent</p>
              <p className="text-3xl font-bold mt-1">{marketingStats.emailsSent}</p>
              <p className="text-sm text-green-600 mt-1">+5% from last period</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-gray-500">Email Open Rate</p>
              <p className="text-3xl font-bold mt-1">{marketingStats.emailOpenRate}</p>
              <p className="text-sm text-green-600 mt-1">+2.5% from last period</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-gray-500">Click Through Rate</p>
              <p className="text-3xl font-bold mt-1">{marketingStats.clickThroughRate}</p>
              <p className="text-sm text-green-600 mt-1">+1.2% from last period</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-gray-500">Social Engagement</p>
              <p className="text-3xl font-bold mt-1">{marketingStats.socialEngagement}</p>
              <p className="text-sm text-green-600 mt-1">+8% from last period</p>
            </Card>
          </div>
          
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-2">Campaign Performance</h2>
            <p className="text-sm text-gray-500 mb-4">Key metrics over time</p>
            <MockLineChart />
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-2">Top Performing Campaigns</h2>
              <div className="space-y-4 mt-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div>
                      <p className="font-medium">Campaign Name {i}</p>
                      <p className="text-sm text-gray-500">Email sequence</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-brand-primary">{30 + i * 5}%</p>
                      <p className="text-sm text-gray-500">Open rate</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-2">Lead Sources</h2>
              <div className="space-y-4 mt-4">
                {[
                  { source: 'Website', percentage: 35 },
                  { source: 'Social Media', percentage: 28 },
                  { source: 'Referrals', percentage: 20 },
                  { source: 'Webinars', percentage: 12 },
                  { source: 'Other', percentage: 5 }
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{item.source}</span>
                      <span>{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-brand-primary h-2.5 rounded-full" 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="clients" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <p className="text-sm text-gray-500">Total Clients</p>
              <p className="text-3xl font-bold mt-1">42</p>
              <p className="text-sm text-green-600 mt-1">+5 from last period</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-gray-500">Client Retention Rate</p>
              <p className="text-3xl font-bold mt-1">87%</p>
              <p className="text-sm text-green-600 mt-1">+3% from last period</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-gray-500">Average Client Value</p>
              <p className="text-3xl font-bold mt-1">$3,850</p>
              <p className="text-sm text-green-600 mt-1">+$250 from last period</p>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-2">Client Growth</h2>
              <p className="text-sm text-gray-500 mb-4">New clients over time</p>
              <MockBarChart />
            </Card>
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-2">Client Categories</h2>
              <p className="text-sm text-gray-500 mb-4">Distribution by client type</p>
              <MockPieChart />
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
