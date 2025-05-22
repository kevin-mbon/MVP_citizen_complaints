'use client';

import React, { useState } from 'react';
import UsersTable, { User } from "@/components/tables/UsersTable";
import TableFilter, { FilterOption } from "@/components/ui/TableFilter";
import { IoIosAdd } from "react-icons/io";
import { MdImportExport } from "react-icons/md";

// Example users data
const dummyData: User[] = [
    {
        id: 'USR-2023-001',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'admin',
        institution: 'City Hall',
        status: 'active',
        lastLogin: '2023-05-15T10:30:00Z',
        createdAt: '2023-01-10T14:20:00Z'
    },
    {
        id: 'USR-2023-002',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: 'agent',
        institution: 'Water & Sanitation Department',
        status: 'active',
        lastLogin: '2023-05-14T09:15:00Z',
        createdAt: '2023-02-05T09:20:00Z'
    },
    {
        id: 'USR-2023-003',
        name: 'Robert Johnson',
        email: 'robert.johnson@example.com',
        role: 'agent',
        institution: 'Transportation Department',
        status: 'inactive',
        lastLogin: '2023-04-20T16:45:00Z',
        createdAt: '2023-01-15T11:10:00Z'
    },
    {
        id: 'USR-2023-004',
        name: 'Susan Williams',
        email: 'susan.williams@example.com',
        role: 'citizen',
        status: 'active',
        lastLogin: '2023-05-17T20:30:00Z',
        createdAt: '2023-03-12T08:45:00Z'
    },
    {
        id: 'USR-2023-005',
        name: 'Michael Brown',
        email: 'michael.brown@example.com',
        role: 'citizen',
        status: 'pending',
        createdAt: '2023-05-18T16:30:00Z'
    }
];

// Filter options by role
const roleFilterOptions: FilterOption[] = [
    { id: 'admin', label: 'Admin', count: 1, checked: true },
    { id: 'agent', label: 'Agent', count: 2, checked: true },
    { id: 'citizen', label: 'Citizen', count: 2, checked: true }
];

// Filter options by status
const statusFilterOptions: FilterOption[] = [
    { id: 'active', label: 'Active', count: 3, checked: true },
    { id: 'inactive', label: 'Inactive', count: 1, checked: true },
    { id: 'pending', label: 'Pending', count: 1, checked: true }
];

// Filter options by institution
const institutionFilterOptions: FilterOption[] = [
    { id: 'city-hall', label: 'City Hall', count: 1, checked: true },
    { id: 'water-sanitation', label: 'Water & Sanitation', count: 1, checked: true },
    { id: 'transportation', label: 'Transportation', count: 1, checked: true },
    { id: 'environment', label: 'Environmental Services', count: 0 },
    { id: 'public-safety', label: 'Public Safety', count: 0 }
];

const UsersPage = () => {
    const [filteredData, setFilteredData] = useState(dummyData);

    const handleRoleFilterChange = (selectedIds: string[]) => {
        console.log('Selected role filters:', selectedIds);
        // Implement actual filtering logic here
    };

    const handleStatusFilterChange = (selectedIds: string[]) => {
        console.log('Selected status filters:', selectedIds);
        // Implement actual filtering logic here
    };

    const handleInstitutionFilterChange = (selectedIds: string[]) => {
        console.log('Selected institution filters:', selectedIds);
        // Implement actual filtering logic here
    };

    return (
        <main className="w-full wrapper">
            <div className={'flex justify-between items-start'}>
                <div className="mb-6">
                    <h1 className="text-2xl font-bold mb-2">Users & Accounts</h1>
                    <p className="text-gray-600">
                        Manage platform users, roles, and access permissions.
                    </p>
                </div>
                <div className="flex space-x-2">
                    <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                        <IoIosAdd size={18}/>Add New User
                    </button>
                    <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                        <MdImportExport size={18}/>Export Users
                    </button>
                </div>
            </div>

            <div className="mb-4 flex items-center justify-between">
                <div className="flex space-x-2">
                    <TableFilter
                        title="Filter by Role"
                        options={roleFilterOptions}
                        onFilterChange={handleRoleFilterChange}
                    />
                    <TableFilter
                        title="Filter by Status"
                        options={statusFilterOptions}
                        onFilterChange={handleStatusFilterChange}
                    />
                    <TableFilter
                        title="Filter by Institution"
                        options={institutionFilterOptions}
                        onFilterChange={handleInstitutionFilterChange}
                    />
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <div className="grid grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <p className="text-gray-500 text-sm">Total Users</p>
                        <p className="text-2xl font-bold text-blue-600">5</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <p className="text-gray-500 text-sm">Admins</p>
                        <p className="text-2xl font-bold text-purple-600">1</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <p className="text-gray-500 text-sm">Agents</p>
                        <p className="text-2xl font-bold text-blue-600">2</p>
                    </div>
                    <div className="bg-teal-50 p-4 rounded-lg text-center">
                        <p className="text-gray-500 text-sm">Citizens</p>
                        <p className="text-2xl font-bold text-teal-600">2</p>
                    </div>
                </div>
            </div>

            <UsersTable data={filteredData} />
        </main>
    );
};

export default UsersPage;