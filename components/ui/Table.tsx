'use client';

import React, {ReactNode} from 'react';
import Pagination from './Pagination';
import TableFilter from "@/components/ui/TableFilter";
import TableSearch from "@/components/ui/TableSearch";

export type Column<T> = {
    header: ReactNode;
    accessor?: keyof T;
    cell?: (row: T) => ReactNode;
    className?: string;
    headerClassName?: string;
};

export interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    rowKey?: keyof T;
    noDataMessage?: string;
}

export const Table = <T extends Record<string, any>>({
                                                         columns,
                                                         data,
                                                         rowKey,
                                                         noDataMessage = 'No records found.',
                                                     }: TableProps<T>) => {
    const keyField = rowKey ?? columns.find(c => c.accessor!)?.accessor!;

    return (
        <div>
            <div className={'flex justify-between items-center w-full'}>
                <h1 className={'font-semibold'}>Table</h1>
                <div className={'flex items-center gap-2 py-2'}>
                    <TableFilter title="Filter" options={[]}/>
                    <TableSearch/>
                </div>
            </div>
            <div className="w-full overflow-x-auto rounded-lg bg-white/90 border border-slate-100 mt-2">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        {columns.map((col, i) => (
                            <th
                                key={i}
                                className={`px-6 py-3 ${col.headerClassName || ''}`}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.length > 0 ? (
                        data.map((row) => {
                            const key = row[keyField] as React.Key;
                            return (
                                <tr key={key} className=" even:bg-slate-50">
                                    {columns.map((col, ci) => {
                                        let content: ReactNode = null;
                                        if (col.cell) {
                                            content = col.cell(row);
                                        } else if (col.accessor) {
                                            content = row[col.accessor];
                                        }
                                        return (
                                            <td
                                                key={ci}
                                                className={`px-6 py-4 ${col.className || ''}`}
                                            >
                                                {content}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="px-6 py-4 text-center text-gray-700 "
                            >
                                {noDataMessage}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <Pagination/>
        </div>
    );
};