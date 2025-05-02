
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import LeadDetailsModal, { LeadDetails } from '@/components/leads/LeadDetailsModal';
import AddLeadModal from '@/components/leads/AddLeadModal';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

// Initial data structure for the board columns
const initialColumns = {
  'column-1': {
    id: 'column-1',
    title: 'New Leads',
    leadIds: [],
  },
  'column-2': {
    id: 'column-2',
    title: 'Contacted',
    leadIds: [],
  },
  'column-3': {
    id: 'column-3',
    title: 'Meeting Scheduled',
    leadIds: [],
  },
  'column-4': {
    id: 'column-4',
    title: 'Proposal Sent',
    leadIds: [],
  },
  'column-5': {
    id: 'column-5',
    title: 'Closed Won',
    leadIds: [],
  },
};

const columnOrder = ['column-1', 'column-2', 'column-3', 'column-4', 'column-5'];

const LeadsBoard = () => {
  const [data, setData] = useState({
    leads: {},
    columns: initialColumns,
    columnOrder: columnOrder,
  });
  const [selectedLead, setSelectedLead] = useState<LeadDetails | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  
  // Fetch leads data from Supabase
  useEffect(() => {
    const fetchLeads = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const { data: leadsData, error } = await supabase
          .from('leads')
          .select('*')
          .eq('user_id', user.id);
          
        if (error) {
          throw error;
        }
        
        if (leadsData) {
          // Process leads and organize them by status
          const leadsById: Record<string, any> = {};
          const columnLeads: Record<string, string[]> = {
            'column-1': [], // New Leads
            'column-2': [], // Contacted
            'column-3': [], // Meeting Scheduled
            'column-4': [], // Proposal Sent
            'column-5': [], // Closed Won
          };
          
          leadsData.forEach(lead => {
            // Process the lead data to match our application's format
            const processedLead = {
              id: lead.id,
              name: lead.name,
              email: lead.email || '',
              phone: lead.phone || '',
              value: '$0', // We'll need to add this field to our database if needed
              lastContact: lead.updated_at ? new Date(lead.updated_at).toLocaleDateString() : 'Never',
              stage: getStageFromStatus(lead.status),
              source: '',
              notes: lead.notes ? [lead.notes] : [],
              tasks: []
            };
            
            leadsById[lead.id] = processedLead;
            
            // Add to appropriate column based on status
            const columnId = getColumnIdFromStatus(lead.status);
            if (columnId) {
              columnLeads[columnId].push(lead.id);
            } else {
              columnLeads['column-1'].push(lead.id); // Default to New Leads
            }
          });
          
          // Update state with the fetched data
          setData(prevData => ({
            leads: leadsById,
            columns: {
              ...prevData.columns,
              'column-1': {
                ...prevData.columns['column-1'],
                leadIds: columnLeads['column-1']
              },
              'column-2': {
                ...prevData.columns['column-2'],
                leadIds: columnLeads['column-2']
              },
              'column-3': {
                ...prevData.columns['column-3'],
                leadIds: columnLeads['column-3']
              },
              'column-4': {
                ...prevData.columns['column-4'],
                leadIds: columnLeads['column-4']
              },
              'column-5': {
                ...prevData.columns['column-5'],
                leadIds: columnLeads['column-5']
              },
            },
            columnOrder: prevData.columnOrder
          }));
        }
      } catch (error: any) {
        toast.error(`Error fetching leads: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLeads();
  }, [user]);
  
  // Helper function to map status to stage
  const getStageFromStatus = (status: string): string => {
    const statusMap: Record<string, string> = {
      'new': 'New Leads',
      'contacted': 'Contacted',
      'meeting_scheduled': 'Meeting Scheduled',
      'proposal_sent': 'Proposal Sent',
      'closed_won': 'Closed Won'
    };
    
    return statusMap[status] || 'New Leads';
  };
  
  // Helper function to map status to column ID
  const getColumnIdFromStatus = (status: string): string => {
    const columnMap: Record<string, string> = {
      'new': 'column-1',
      'contacted': 'column-2',
      'meeting_scheduled': 'column-3',
      'proposal_sent': 'column-4',
      'closed_won': 'column-5'
    };
    
    return columnMap[status] || 'column-1';
  };
  
  // Helper function to map stage to status
  const getStatusFromStage = (stage: string): string => {
    const stageMap: Record<string, string> = {
      'New Leads': 'new',
      'Contacted': 'contacted',
      'Meeting Scheduled': 'meeting_scheduled',
      'Proposal Sent': 'proposal_sent',
      'Closed Won': 'closed_won'
    };
    
    return stageMap[stage] || 'new';
  };
  
  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    // First update the UI
    if (start === finish) {
      const newLeadIds = Array.from(start.leadIds);
      newLeadIds.splice(source.index, 1);
      newLeadIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        leadIds: newLeadIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newState);
      return;
    }

    // Moving from one list to another
    const startLeadIds = Array.from(start.leadIds);
    startLeadIds.splice(source.index, 1);
    const newStart = {
      ...start,
      leadIds: startLeadIds,
    };

    const finishLeadIds = Array.from(finish.leadIds);
    finishLeadIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      leadIds: finishLeadIds,
    };

    // Update the lead's stage in the leads object
    const updatedLeads = {
      ...data.leads,
      [draggableId]: {
        ...data.leads[draggableId],
        stage: finish.title
      }
    };

    const newState = {
      ...data,
      leads: updatedLeads,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    
    setData(newState);
    
    // Update the status in Supabase
    try {
      const newStatus = getStatusFromStage(finish.title);
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus })
        .eq('id', draggableId);
        
      if (error) {
        throw error;
      }
      
      toast.success(`Lead moved to ${finish.title}`);
    } catch (error: any) {
      toast.error(`Error updating lead status: ${error.message}`);
      // Revert the UI change if the API call fails
      setData({
        ...data,
        leads: {
          ...data.leads,
          [draggableId]: {
            ...data.leads[draggableId],
            stage: start.title
          }
        }
      });
    }
  };
  
  const handleLeadClick = (leadId: string) => {
    const lead = data.leads[leadId];
    setSelectedLead(lead);
    setIsLeadModalOpen(true);
  };
  
  const handleAddNewLead = () => {
    setIsAddLeadModalOpen(true);
  };

  const handleAddLead = (newLead: any) => {
    // Get the stage column based on the new lead's stage
    const targetColumnId = Object.keys(data.columns).find(
      columnId => data.columns[columnId].title === newLead.stage
    ) || 'column-1'; // Default to first column if not found

    // Update the leads object
    const updatedLeads = {
      ...data.leads,
      [newLead.id]: newLead,
    };

    // Update the column's leadIds
    const updatedColumn = {
      ...data.columns[targetColumnId],
      leadIds: [newLead.id, ...data.columns[targetColumnId].leadIds],
    };

    // Update the data state
    setData({
      ...data,
      leads: updatedLeads,
      columns: {
        ...data.columns,
        [targetColumnId]: updatedColumn,
      },
    });
  };

  // Extract all stage titles for the dropdown
  const stageOptions = data.columnOrder.map(columnId => data.columns[columnId].title);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leads Board</h1>
          <p className="text-gray-600">Manage and track your leads through the sales pipeline</p>
        </div>
        <Button 
          className="bg-brand-primary hover:bg-brand-secondary"
          onClick={handleAddNewLead}
        >
          + Add New Lead
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-6">
            {data.columnOrder.map(columnId => {
              const column = data.columns[columnId];
              const leads = column.leadIds.map(leadId => data.leads[leadId]).filter(Boolean);

              return (
                <div key={column.id} className="min-w-[250px]">
                  <h2 className="text-md font-semibold mb-3 px-3 py-1 bg-gray-100 rounded-md">
                    {column.title} <span className="text-gray-500">({leads.length})</span>
                  </h2>
                  <Droppable droppableId={column.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="min-h-[500px]"
                      >
                        {leads.map((lead, index) => (
                          <Draggable key={lead.id} draggableId={lead.id} index={index}>
                            {(provided) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="p-4 mb-3 hover:shadow-md cursor-pointer"
                                onClick={() => handleLeadClick(lead.id)}
                              >
                                <div>
                                  <h3 className="font-semibold text-brand-primary">{lead.name}</h3>
                                  <p className="text-sm text-gray-600">{lead.email}</p>
                                  <div className="flex justify-between mt-3 text-xs text-gray-500">
                                    <span>Value: <span className="font-medium text-gray-700">{lead.value}</span></span>
                                    <span>Last Contact: {lead.lastContact}</span>
                                  </div>
                                </div>
                              </Card>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      )}
      
      {/* Lead Details Modal */}
      <LeadDetailsModal
        open={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        lead={selectedLead}
      />

      {/* Add Lead Modal */}
      <AddLeadModal
        open={isAddLeadModalOpen}
        onClose={() => setIsAddLeadModalOpen(false)}
        onAddLead={handleAddLead}
        stages={stageOptions}
      />
    </div>
  );
};

export default LeadsBoard;
