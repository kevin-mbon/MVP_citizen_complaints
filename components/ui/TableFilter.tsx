'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FilterOption {
    id: string;
    label: string;
    count?: number;
    checked?: boolean;
}

interface TableFilterProps {
    title: string;
    options: FilterOption[];
    onFilterChange?: (selectedIds: string[]) => void;
}

const TableFilter: React.FC<TableFilterProps> = ({
                                                     title = 'Filter',
                                                     options = [],
                                                     onFilterChange
                                                 }) => {
    const [open, setOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>(
        options.filter(option => option.checked).map(option => option.id)
    );
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Notify parent component when selections change
    useEffect(() => {
        if (onFilterChange) {
            onFilterChange(selectedOptions);
        }
    }, [selectedOptions, onFilterChange]);

    const handleCheckboxChange = (id: string, checked: boolean) => {
        if (checked) {
            setSelectedOptions(prev => [...prev, id]);
        } else {
            setSelectedOptions(prev => prev.filter(optionId => optionId !== id));
        }
    };

    return (
        <div className="relative flex items-center justify-center">
            <button
                onClick={() => setOpen(prev => !prev)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium border border-slate-300 text-slate-600 bg-white rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
                {title}
                <svg
                    className={`w-4 h-4 ml-2 transition-transform ${open ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        ref={dropdownRef}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 w-56 p-3 bg-white rounded-lg shadow-lg z-10 dark:bg-gray-700"
                    >
                        <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                            {title}
                        </h6>
                        <ul className="space-y-2 text-sm text-gray-900 dark:text-gray-100 max-h-64 overflow-y-auto">
                            {options.map(({ id, label, count, checked }) => (
                                <li key={id} className="flex items-center">
                                    <input
                                        id={id}
                                        type="checkbox"
                                        checked={selectedOptions.includes(id)}
                                        onChange={(e) => handleCheckboxChange(id, e.target.checked)}
                                        className="w-4 h-4 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600"
                                    />
                                    <label htmlFor={id} className="ml-2 font-medium">
                                        {label} {count !== undefined && `(${count})`}
                                    </label>
                                </li>
                            ))}
                        </ul>
                        {options.length > 5 && (
                            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600 flex justify-between">
                                <button
                                    onClick={() => setSelectedOptions([])}
                                    className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    Clear all
                                </button>
                                <button
                                    onClick={() => setSelectedOptions(options.map(opt => opt.id))}
                                    className="text-xs text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                    Select all
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TableFilter;