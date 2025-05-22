'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import { Table, Column } from '@/components/ui/Table';

export interface Ticket {
    id: string;
    title: string;
    category: string;
    status: 'new' | 'assigned' | 'in-progress' | 'resolved' | 'closed';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    submittedBy: string;
    assignedTo: string;
    createdAt: string;
    updatedAt: string;
}

interface TicketsTableProps {
    data: Ticket[];
}

const TicketsTable: FC<TicketsTableProps> = ({ data }) => {
    const getStatusBadge = (status: Ticket['status']) => {
        const statusStyles = {
            'new': 'bg-blue-100 text-blue-800',
            'assigned': 'bg-purple-100 text-purple-800',
            'in-progress': 'bg-yellow-100 text-yellow-800',
            'resolved': 'bg-green-100 text-green-800',
            'closed': 'bg-gray-100 text-gray-800'
        };

        const statusText = {
            'new': 'New',
            'assigned': 'Assigned',
            'in-progress': 'In Progress',
            'resolved': 'Resolved',
            'closed': 'Closed'
        };

        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}>
                {statusText[status]}
            </span>
        );
    };

    const getPriorityBadge = (priority: Ticket['priority']) => {
        const priorityStyles = {
            'low': 'bg-gray-100 text-gray-800',
            'medium': 'bg-blue-100 text-blue-800',
            'high': 'bg-orange-100 text-orange-800',
            'urgent': 'bg-red-100 text-red-800'
        };

        const priorityText = {
            'low': 'Low',
            'medium': 'Medium',
            'high': 'High',
            'urgent': 'Urgent'
        };

        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityStyles[priority]}`}>
                {priorityText[priority]}
            </span>
        );
    };

    const columns: Column<Ticket>[] = [
        {
            header: 'Ticket ID',
            accessor: 'id',
            cell: (row) => <span className="font-mono text-xs">{row.id}</span>,
        },
        {
            header: 'Title',
            accessor: 'title',
            headerClassName: 'font-medium text-gray-900 dark:text-white',
            cell: (row) => (
                <Link href={`/dashboard/tickets/${row.id}`} className="hover:text-blue-600 hover:underline">
                    {row.title}
                </Link>
            )
        },
        {
            header: 'Category',
            accessor: 'category'
        },
        {
            header: 'Status',
            accessor: 'status',
            cell: (row) => getStatusBadge(row.status)
        },
        {
            header: 'Priority',
            accessor: 'priority',
            cell: (row) => getPriorityBadge(row.priority)
        },
        {
            header: 'Submitted By',
            accessor: 'submittedBy'
        },
        {
            header: 'Created',
            accessor: 'createdAt',
            cell: (row) => {
                const date = new Date(row.createdAt);
                return <span>{date.toLocaleDateString()}</span>;
            }
        },
        {
            header: 'Actions',
            headerClassName: 'text-right',
            className: 'text-right',
            cell: (row) => (
                <div className="flex justify-end space-x-2">
                    <Link href={`/dashboard/tickets/${row.id}`} className="text-blue-600 hover:underline">
                        View
                    </Link>
                    <Link href={`/dashboard/tickets/${row.id}/edit`} className="text-green-600 hover:underline">
                        Update
                    </Link>
                </div>
            ),
        },
    ];

    return <Table<Ticket> columns={columns} data={data} rowKey="id" />;
};

export default TicketsTable;