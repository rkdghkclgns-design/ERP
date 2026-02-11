import React from 'react';

export default function KanbanBoard() {
    return (
        <div className="flex gap-4 p-4 overflow-x-auto">
            {/* Kanban columns will go here */}
            <div className="bg-gray-200 p-4 rounded min-w-[300px]">To Do</div>
            <div className="bg-gray-200 p-4 rounded min-w-[300px]">In Progress</div>
            <div className="bg-gray-200 p-4 rounded min-w-[300px]">Done</div>
        </div>
    );
}
