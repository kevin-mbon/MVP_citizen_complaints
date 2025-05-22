
'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import { Table, Column } from '@/components/ui/Table';

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'agent' | 'citizen';
    institution?: string;
    status: 'active' | 'inactive' | 'pending';
    lastLogin?: string;
    createdAt: string;
}

interface UsersTableProps {
    data: User[];
}

const UsersTable: FC<UsersTableProps> = ({ data }) => {
    const getStatusBadge = (status: User['status']) => {
        const statusStyles = {
            'active': 'bg-green-100 text-green-800',
            'inactive': 'bg-gray-100 text-gray-800',
            'pending': 'bg-yellow-100 text-yellow-800',
        };

        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const getRoleBadge = (role: User['role']) => {
        const roleStyles = {
            'admin': 'bg-purple-100 text-purple-800',
            'agent': 'bg-blue-100 text-blue-800',
            'citizen': 'bg-teal-100 text-teal-800'
        };

        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${roleStyles[role]}`}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
            </span>
        );
    };

    const columns: Column<User>[] = [
        {
            header: 'Name',
            accessor: 'name',
            headerClassName: 'font-medium text-gray-900 dark:text-white'
        },
        {
            header: 'Email',
            accessor: 'email',
            cell: (row) => <a href={`mailto:${row.email}`} className="hover:underline">{row.email}</a>
        },
        {
            header: 'Role',
            accessor: 'role',
            cell: (row) => getRoleBadge(row.role)
        },
        {
            header: 'Institution',
            accessor: 'institution',
            cell: (row) => row.institution || 'N/A'
        },
        {
            header: 'Status',
            accessor: 'status',
            cell: (row) => getStatusBadge(row.status)
        },
        {
            header: 'Last Login',
            accessor: 'lastLogin',
            cell: (row) => row.lastLogin ? new Date(row.lastLogin).toLocaleDateString() : 'Never'
        },
        {
            header: 'Actions',
            headerClassName: 'text-right',
            className: 'text-right',
            cell: (row) => (
                <div className="flex justify-end space-x-2">
                    <Link href={`/dashboard/users/${row.id}`} className="text-blue-600 hover:underline">
                        View
                    </Link>
                    <Link href={`/dashboard/users/${row.id}/edit`} className="text-green-600 hover:underline">
                        Edit
                    </Link>
                    {row.status !== 'active' && (
                        <button className="text-blue-600 hover:underline">
                            Activate
                        </button>
                    )}
                    {row.status === 'active' && (
                        <button className="text-red-600 hover:underline">
                            Deactivate
                        </button>
                    )}
                </div>
            ),
        },
    ];

    return <Table<User> columns={columns} data={data} rowKey="id" />;
};

export default UsersTable;