'use client';

import React from 'react';
import InstitutionsTable from "@/components/tables/InstitutionsTable";
import { IoIosAdd } from "react-icons/io";
import { useInstitutions } from '@/hooks/useInstitutions';
import Loader from '@/components/ui/Loader';
import Link from 'next/link';

const InstitutionsPage = () => {
    const { institutions, isLoading, error } = useInstitutions();

    return (
        <main className="w-full wrapper">
            <div className="flex justify-between items-start">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold mb-2">Institutions</h1>
                    <p className="text-gray-600">
                        Manage Institutions for proper routing and assignment.
                    </p>
                </div>
                <Link href="/dashboard/institutions/new">
                    <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                        <IoIosAdd size={18}/> Add New Institution
                    </button>
                </Link>
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

            {/* Data state */}
            {!isLoading && !error && institutions.length > 0 && (
                <InstitutionsTable data={institutions} />
            )}

            {/* Empty state */}
            {!isLoading && !error && institutions.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                    <p className="text-gray-500 mb-4">No institutions found</p>
                    <Link href="/dashboard/institutions/new">
                        <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                            <IoIosAdd size={18}/> Add First Institution
                        </button>
                    </Link>
                </div>
            )}
        </main>
    );
};

export default InstitutionsPage;