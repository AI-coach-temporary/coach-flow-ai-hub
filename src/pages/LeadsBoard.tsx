
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// Mock data structure
const initialData = {
  leads: {
    'lead-1': { id: 'lead-1', name: 'Sarah Johnson', email: 'sarah@example.com', value: '$2,500', lastContact: '2 days ago' },
    'lead-2': { id: 'lead-2', name: 'Michael Brown', email: 'michael@example.com', value: '$3,800', lastContact: '5 days ago' },
    'lead-3': { id: 'lead-3', name: 'Jessica Williams', email: 'jessica@example.com', value: '$1,500', lastContact: '1 day ago' },
    'lead-4': { id: 'lead-4', name: 'David Miller', email: 'david@example.com', value: '$5,000', lastContact: '3 days ago' },
    'lead-5': { id: 'lead-5', name: 'Emma Davis', email: 'emma@example.com', value: '$4,200', lastContact: '1 week ago' },
    'lead-6': { id: 'lead-6', name: 'James Wilson', email: 'james@example.com', value: '$3,000', lastContact: 'Today' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'New Leads',
      leadIds: ['lead-1', 'lead-2'],
    },
    'column-2': {
      id: 'column-2',
      title: 'Contacted',
      leadIds: ['lead-3', 'lead-4'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Meeting Scheduled',
      leadIds: ['lead-5'],
    },
    'column-4': {
      id: 'column-4',
      title: 'Proposal Sent',
      leadIds: ['lead-6'],
    },
    'column-5': {
      id: 'column-5',
      title: 'Closed Won',
      leadIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4', 'column-5'],
};

const LeadsBoard = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result: any) => {
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

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setData(newState);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leads Board</h1>
          <p className="text-gray-600">Manage and track your leads through the sales pipeline</p>
        </div>
        <Button className="bg-brand-primary hover:bg-brand-secondary">
          + Add New Lead
        </Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-5 gap-4 overflow-x-auto pb-6">
          {data.columnOrder.map(columnId => {
            const column = data.columns[columnId];
            const leads = column.leadIds.map(leadId => data.leads[leadId]);

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
                              className="p-4 mb-3 hover:shadow-md"
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
    </div>
  );
};

export default LeadsBoard;
