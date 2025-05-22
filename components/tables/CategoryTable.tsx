'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import { Table, Column } from '@/components/ui/Table';
import { CategoryForDisplay } from '@/hooks/useCategory';

interface CategoryTableProps {
    data: CategoryForDisplay[];
}

const CategoryTable: FC<CategoryTableProps> = ({ data }) => {
    const columns: Column<CategoryForDisplay>[] = [
        {
            header: 'Category Name',
            accessor: 'name',
            headerClassName: 'font-medium text-gray-900 dark:text-white'
        },
        { header: 'Description', accessor: 'description' },
        {
            header: 'Complaint Count',
            accessor: 'count',
            className: 'text-center',
            headerClassName: 'text-center'
        },
        { header: 'Routing Agency', accessor: 'routingAgency' },
        {
            header: 'Actions',
            headerClassName: 'text-right',
            className: 'text-right',
            cell: (row) => (
                <div className="flex justify-end space-x-2">
                    <Link href={`/dashboard/category/${row.id}`} className="text-blue-600 hover:underline">
                        View
                    </Link>
                    <Link href={`/dashboard/category/${row.id}/edit`} className="text-green-600 hover:underline">
                        Edit
                    </Link>
                </div>
            ),
        },
    ];

    return <Table<CategoryForDisplay> columns={columns} data={data} rowKey="id" />;
};

export default CategoryTable;