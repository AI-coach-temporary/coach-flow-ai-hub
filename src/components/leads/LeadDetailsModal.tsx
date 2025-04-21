
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface LeadDetails {
  id: string;
  name: string;
  email: string;
  phone?: string;
  value: string;
  lastContact: string;
  stage: string;
  source?: string;
  notes?: string[];
  tasks?: {id: number; task: string; dueDate: string; completed: boolean}[];
}

interface LeadDetailsModalProps {
  open: boolean;
  onClose: () => void;
  lead: LeadDetails | null;
}

const LeadDetailsModal = ({ open, onClose, lead }: LeadDetailsModalProps) => {
  if (!lead) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center justify-between">
            <span>{lead.name}</span>
            <span className="text-sm px-2 py-1 bg-brand-light text-brand-primary rounded-full">
              {lead.stage}
            </span>
          </DialogTitle>
          <DialogDescription>
            Lead details and activities
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" className="mt-4">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Email</h4>
                <p>{lead.email}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                <p>{lead.phone || "Not provided"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Potential Value</h4>
                <p className="font-medium text-brand-primary">{lead.value}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Last Contact</h4>
                <p>{lead.lastContact}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Lead Source</h4>
                <p>{lead.source || "Direct"}</p>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <Button>Schedule Meeting</Button>
              <Button variant="outline" className="ml-2">Send Email</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="notes" className="space-y-4 mt-4">
            {lead.notes && lead.notes.length > 0 ? (
              <div className="space-y-3">
                {lead.notes.map((note, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-md">
                    <p>{note}</p>
                    <p className="text-xs text-gray-500 mt-2">Added on April {20 - index}, 2025</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No notes available</p>
                <Button className="mt-4">Add First Note</Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="tasks" className="mt-4">
            {lead.tasks && lead.tasks.length > 0 ? (
              <div className="space-y-2">
                {lead.tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={task.completed} 
                        className="mr-3 h-4 w-4" 
                        readOnly
                      />
                      <span className={task.completed ? 'line-through text-gray-500' : ''}>
                        {task.task}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Due: {task.dueDate}
                    </div>
                  </div>
                ))}
                <Button className="mt-2">Add New Task</Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No tasks assigned</p>
                <Button className="mt-4">Create New Task</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LeadDetailsModal;
