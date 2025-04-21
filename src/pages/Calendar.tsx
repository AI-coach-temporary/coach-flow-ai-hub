
import { useState } from 'react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Mock scheduled events
  const events = [
    { id: 1, title: 'Strategy Session with Client', time: '09:00 AM - 10:00 AM', type: 'client' },
    { id: 2, title: 'Team Meeting', time: '11:00 AM - 12:00 PM', type: 'internal' },
    { id: 3, title: 'Content Creation', time: '02:00 PM - 04:00 PM', type: 'social' },
    { id: 4, title: 'Lead Follow-up Call', time: '04:30 PM - 05:00 PM', type: 'client' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600">Manage your sessions and social content schedule</p>
        </div>
        <Button className="bg-brand-primary hover:bg-brand-secondary">
          + Add New Event
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <Card className="p-4">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              className="border-none"
            />
          </Card>
          <Card className="p-4 mt-6">
            <h2 className="text-lg font-semibold mb-3">Upcoming Events</h2>
            <div className="space-y-3">
              <div className="p-3 bg-brand-light rounded-md border-l-4 border-brand-primary">
                <p className="font-medium">Strategy Call: Sarah Johnson</p>
                <p className="text-sm text-gray-600">Tomorrow, 10:00 AM</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-md border-l-4 border-purple-400">
                <p className="font-medium">Instagram Post Due</p>
                <p className="text-sm text-gray-600">Apr 23, 9:00 AM</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-md border-l-4 border-blue-400">
                <p className="font-medium">Email Campaign Launch</p>
                <p className="text-sm text-gray-600">Apr 24, 8:00 AM</p>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card className="p-6">
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Events</TabsTrigger>
                <TabsTrigger value="client">Client Sessions</TabsTrigger>
                <TabsTrigger value="social">Social Content</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-4">
                <h2 className="text-lg font-medium">Wednesday, April 21, 2025</h2>
                {events.map(event => (
                  <div 
                    key={event.id} 
                    className={`p-4 rounded-md border-l-4 ${
                      event.type === 'client' ? 'border-brand-primary bg-brand-light/50' :
                      event.type === 'social' ? 'border-purple-400 bg-purple-50' :
                      'border-blue-400 bg-blue-50'
                    }`}
                  >
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-gray-600">{event.time}</p>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="client" className="space-y-4">
                <h2 className="text-lg font-medium">Wednesday, April 21, 2025</h2>
                {events.filter(e => e.type === 'client').map(event => (
                  <div 
                    key={event.id}
                    className="p-4 rounded-md border-l-4 border-brand-primary bg-brand-light/50" 
                  >
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-gray-600">{event.time}</p>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="social" className="space-y-4">
                <h2 className="text-lg font-medium">Wednesday, April 21, 2025</h2>
                {events.filter(e => e.type === 'social').map(event => (
                  <div 
                    key={event.id}
                    className="p-4 rounded-md border-l-4 border-purple-400 bg-purple-50" 
                  >
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-gray-600">{event.time}</p>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
