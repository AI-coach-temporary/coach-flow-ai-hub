
import { useState } from 'react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import EventModal, { CalendarEvent } from '@/components/calendar/EventModal';

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  
  // Mock scheduled events
  const [events, setEvents] = useState<CalendarEvent[]>([
    { id: 1, title: 'Strategy Session with Client', date: new Date(), startTime: '09:00', endTime: '10:00', type: 'client' },
    { id: 2, title: 'Team Meeting', date: new Date(), startTime: '11:00', endTime: '12:00', type: 'internal' },
    { id: 3, title: 'Content Creation', date: new Date(), startTime: '14:00', endTime: '16:00', type: 'social' },
    { id: 4, title: 'Lead Follow-up Call', date: new Date(), startTime: '16:30', endTime: '17:00', type: 'client' },
  ]);

  const handleAddEvent = (newEvent: Omit<CalendarEvent, 'id'>) => {
    const event: CalendarEvent = {
      ...newEvent,
      id: events.length + 1
    };
    
    setEvents([...events, event]);
    toast.success('Event added successfully!');
  };
  
  const getDisplayedEvents = () => {
    if (!date) return [];
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };
  
  const displayedEvents = getDisplayedEvents();
  const displayDate = date ? new Intl.DateTimeFormat('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  }).format(date) : '';

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600">Manage your sessions and social content schedule</p>
        </div>
        <Button 
          className="bg-brand-primary hover:bg-brand-secondary"
          onClick={() => setIsEventModalOpen(true)}
        >
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
                <h2 className="text-lg font-medium">{displayDate}</h2>
                {displayedEvents.length > 0 ? (
                  displayedEvents.map(event => (
                    <div 
                      key={event.id} 
                      className={`p-4 rounded-md border-l-4 cursor-pointer hover:shadow-md ${
                        event.type === 'client' ? 'border-brand-primary bg-brand-light/50' :
                        event.type === 'social' ? 'border-purple-400 bg-purple-50' :
                        'border-blue-400 bg-blue-50'
                      }`}
                      onClick={() => toast.info(`Event details for: ${event.title}`)}
                    >
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-gray-600">{event.startTime} - {event.endTime}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 border-2 border-dashed rounded-md">
                    <p className="text-gray-500">No events scheduled for this day</p>
                    <Button 
                      className="mt-4" 
                      onClick={() => setIsEventModalOpen(true)}
                    >
                      Add Event
                    </Button>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="client" className="space-y-4">
                <h2 className="text-lg font-medium">{displayDate}</h2>
                {displayedEvents.filter(e => e.type === 'client').length > 0 ? (
                  displayedEvents.filter(e => e.type === 'client').map(event => (
                    <div 
                      key={event.id}
                      className="p-4 rounded-md border-l-4 border-brand-primary bg-brand-light/50 cursor-pointer hover:shadow-md" 
                      onClick={() => toast.info(`Event details for: ${event.title}`)}
                    >
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-gray-600">{event.startTime} - {event.endTime}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 border-2 border-dashed rounded-md">
                    <p className="text-gray-500">No client sessions scheduled for this day</p>
                    <Button 
                      className="mt-4" 
                      onClick={() => setIsEventModalOpen(true)}
                    >
                      Add Client Session
                    </Button>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="social" className="space-y-4">
                <h2 className="text-lg font-medium">{displayDate}</h2>
                {displayedEvents.filter(e => e.type === 'social').length > 0 ? (
                  displayedEvents.filter(e => e.type === 'social').map(event => (
                    <div 
                      key={event.id}
                      className="p-4 rounded-md border-l-4 border-purple-400 bg-purple-50 cursor-pointer hover:shadow-md" 
                      onClick={() => toast.info(`Event details for: ${event.title}`)}
                    >
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-gray-600">{event.startTime} - {event.endTime}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 border-2 border-dashed rounded-md">
                    <p className="text-gray-500">No social content scheduled for this day</p>
                    <Button 
                      className="mt-4" 
                      onClick={() => setIsEventModalOpen(true)}
                    >
                      Add Social Content
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
      
      <EventModal
        open={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onAddEvent={handleAddEvent}
        initialDate={date}
      />
    </div>
  );
};

export default Calendar;
