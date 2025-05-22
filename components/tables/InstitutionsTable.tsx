
'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import { Table, Column } from '@/components/ui/Table';

export interface Institution {
    id: string;
    name: string;
    serviceType: string;
    email: string;
    phone: string;
    address?: string;
}

interface InstitutionsTableProps {
    data: Institution[];
}

const InstitutionsTable: FC<InstitutionsTableProps> = ({ data }) => {
    const columns: Column<Institution>[] = [
        {
            header: 'Institution Name',
            accessor: 'name',
            headerClassName: 'font-medium text-gray-900 dark:text-white'
        },
        {
            header: 'Address',
            accessor: 'address',
            cell: (row) => row.address || 'N/A'
        },
        {
            header: 'Service Type',
            accessor: 'serviceType',
            cell: (row) => row.serviceType || 'N/A'
        },
        {
            header: 'Contact Email',
            cell: (row) => row.email ? (
                <a href={`mailto:${row.email}`} className="hover:underline">{row.email}</a>
            ) : (
                <span className="text-gray-400">Not available</span>
            ),
        },
        {
            header: 'Contact Phone',
            cell: (row) => row.phone ? (
                <a href={`tel:${row.phone}`} className="hover:underline">{row.phone}</a>
            ) : (
                <span className="text-gray-400">Not available</span>
            ),
        },
        {
            header: 'Actions',
            headerClassName: 'text-right',
            className: 'text-right',
            cell: (row) => (
                <Link href={`/dashboard/institutions/${row.id}`} className="text-blue-600 hover:underline">
                    View
                </Link>
            ),
        },
    ];

    return <Table<Institution> columns={columns} data={data} rowKey="id" />;
};

export default InstitutionsTable;