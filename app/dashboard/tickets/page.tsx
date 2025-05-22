'use client';

import React, { useState, useEffect } from 'react';
import TicketsTable from "@/components/tables/TicketsTable";
import TableFilter, { FilterOption } from "@/components/ui/TableFilter";
import { MdImportExport } from "react-icons/md";
import { useTickets } from '@/hooks/useTickets';
import Loader from '@/components/ui/Loader';

const TicketsPage = () => {
    // Fetch tickets data
    const { tickets, isLoading, error, stats } = useTickets();

    // State for filtered data
    const [filteredData, setFilteredData] = useState(tickets);

    // Filter states
    const [statusFilters, setStatusFilters] = useState<string[]>(['new', 'assigned', 'in-progress']);
    const [priorityFilters, setPriorityFilters] = useState<string[]>(['medium', 'high', 'urgent']);
    const [categoryFilters, setCategoryFilters] = useState<string[]>([]);

    // Update filtered data when source data or filters change
    useEffect(() => {
        if (tickets.length > 0) {
            let filtered = [...tickets];

            // Apply status filters if any are selected
            if (statusFilters.length > 0) {
                filtered = filtered.filter(ticket => statusFilters.includes(ticket.status));
            }

            // Apply priority filters if any are selected
            if (priorityFilters.length > 0) {
                filtered = filtered.filter(ticket => priorityFilters.includes(ticket.priority));
            }

            // Apply category filters if any are selected
            if (categoryFilters.length > 0 && categoryFilters[0] !== '') {
                filtered = filtered.filter(ticket => categoryFilters.includes(ticket.category));
            }

            setFilteredData(filtered);
        } else {
            setFilteredData([]);
        }
    }, [tickets, statusFilters, priorityFilters, categoryFilters]);

    // Generate filter options from actual data
    const getStatusFilterOptions = (): FilterOption[] => {
        const options: FilterOption[] = [
            { id: 'new', label: 'New', count: stats.new, checked: statusFilters.includes('new') },
            { id: 'assigned', label: 'Assigned', count: 0, checked: statusFilters.includes('assigned') },
            { id: 'in-progress', label: 'In Progress', count: stats.inProgress, checked: statusFilters.includes('in-progress') },
            { id: 'resolved', label: 'Resolved', count: stats.resolved, checked: statusFilters.includes('resolved') },
            { id: 'closed', label: 'Closed', count: stats.closed, checked: statusFilters.includes('closed') }
        ];

        // Update count for assigned tickets
        const assignedCount = tickets.filter(t => t.status === 'assigned').length;
        const assignedOption = options.find(o => o.id === 'assigned');
        if (assignedOption) assignedOption.count = assignedCount;

        return options;
    };

    const getPriorityFilterOptions = (): FilterOption[] => {
        // Count occurrences of each priority
        const counts = {
            low: tickets.filter(t => t.priority === 'low').length,
            medium: tickets.filter(t => t.priority === 'medium').length,
            high: tickets.filter(t => t.priority === 'high').length,
            urgent: tickets.filter(t => t.priority === 'urgent').length
        };

        return [
            { id: 'low', label: 'Low', count: counts.low, checked: priorityFilters.includes('low') },
            { id: 'medium', label: 'Medium', count: counts.medium, checked: priorityFilters.includes('medium') },
            { id: 'high', label: 'High', count: counts.high, checked: priorityFilters.includes('high') },
            { id: 'urgent', label: 'Urgent', count: counts.urgent, checked: priorityFilters.includes('urgent') }
        ];
    };

    const getCategoryFilterOptions = (): FilterOption[] => {
        // Get unique categories
        const uniqueCategories = [...new Set(tickets.map(t => t.category))];

        return uniqueCategories.map(category => {
            const count = tickets.filter(t => t.category === category).length;
            return {
                id: category,
                label: category,
                count,
                checked: categoryFilters.includes(category)
            };
        });
    };

    const handleStatusFilterChange = (selectedIds: string[]) => {
        setStatusFilters(selectedIds);
    };

    const handlePriorityFilterChange = (selectedIds: string[]) => {
        setPriorityFilters(selectedIds);
    };

    const handleCategoryFilterChange = (selectedIds: string[]) => {
        setCategoryFilters(selectedIds);
    };

    return (
        <main className="w-full wrapper">
            <div className="flex justify-between items-start">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold mb-2">Complaints & Feedback</h1>
                    <p className="text-gray-600">
                        Manage and respond to citizen complaints and feedback.
                    </p>
                </div>
                <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                    <MdImportExport size={18}/>Export Report
                </button>
            </div>

            {/* Loading state */}
            {isLoading && (
                <div className="flex justify-center items-center h-64">
                    <Loader size="lg" />
                </div>
            )}

            {/* Error state */}
            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
                    <p>{error}</p>
                    <button
                        className="text-red-700 underline mt-2"
                        onClick={() => window.location.reload()}
                    >
                        Try again
                    </button>
                </div>
            )}

            {/* Content when data is loaded */}
            {!isLoading && !error && (
                <>
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex space-x-2">
                            <TableFilter
                                title="Filter by Status"
                                options={getStatusFilterOptions()}
                                onFilterChange={handleStatusFilterChange}
                            />
                            <TableFilter
                                title="Filter by Priority"
                                options={getPriorityFilterOptions()}
                                onFilterChange={handlePriorityFilterChange}
                            />
                            {tickets.length > 0 && (
                                <TableFilter
                                    title="Filter by Category"
                                    options={getCategoryFilterOptions()}
                                    onFilterChange={handleCategoryFilterChange}
                                />
                            )}
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                        <div className="grid grid-cols-5 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg text-center">
                                <p className="text-gray-500 text-sm">Total</p>
                                <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg text-center">
                                <p className="text-gray-500 text-sm">New</p>
                                <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
                            </div>
                            <div className="bg-yellow-50 p-4 rounded-lg text-center">
                                <p className="text-gray-500 text-sm">In Progress</p>
                                <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg text-center">
                                <p className="text-gray-500 text-sm">Resolved</p>
                                <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg text-center">
                                <p className="text-gray-500 text-sm">Closed</p>
                                <p className="text-2xl font-bold text-gray-600">{stats.closed}</p>
                            </div>
                        </div>
                    </div>

                    {/* Data state */}
                    {filteredData.length > 0 ? (
                        <TicketsTable data={filteredData} />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-center bg-white p-6 rounded-lg shadow-sm">
                            <p className="text-gray-500 mb-4">No tickets match your filters</p>
                            <button
                                className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium"
                                onClick={() => {
                                    setStatusFilters([]);
                                    setPriorityFilters([]);
                                    setCategoryFilters([]);
                                }}
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </>
            )}
        </main>
    );
};

export default TicketsPage;