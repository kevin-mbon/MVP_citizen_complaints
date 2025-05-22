'use client';

import React from 'react';
import CategoryTable from "@/components/tables/CategoryTable";
import { IoIosAdd } from "react-icons/io";
import useCategories from "@/hooks/useCategory";
import Loader from "@/components/ui/Loader";

const Page = () => {
    const { categories, loading, error } = useCategories();

    return (
        <main className="w-full">
            <div className="flex justify-between items-start">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold mb-2">Categories</h1>
                    <p className="text-gray-600">
                        Manage complaint categories for proper routing and assignment.
                    </p>
                </div>
                <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                    <IoIosAdd size={18}/> Add New Category
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader size={'lg'}/>
                </div>
            ) : error ? (
                <div className="text-red-500 p-4 bg-red-50 rounded-md">
                    {error}
                </div>
            ) : (
                <CategoryTable data={categories} />
            )}
        </main>
    );
};

export default Page;