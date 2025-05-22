'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {GrHomeRounded} from "react-icons/gr";

const Breadcrumb = () => {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(Boolean);

    const buildHref = (index: number) => {
        return '/' + pathSegments.slice(0, index + 1).join('/');
    };

    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white gap-1"
                    >
                        <GrHomeRounded size={14} className={'-mt-[2px]'}/>
                        Home
                    </Link>
                </li>

                {pathSegments.map((segment, index) => {
                    const href = buildHref(index);
                    const isLast = index === pathSegments.length - 1;

                    const label = decodeURIComponent(segment)
                        .replace(/-/g, ' ')
                        .replace(/\b\w/g, (l) => l.toUpperCase()); // Capitalize words

                    return (
                        <li key={href} aria-current={isLast ? 'page' : undefined}>
                            <div className="flex items-center">
                                <svg
                                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 6 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 9 4-4-4-4"
                                    />
                                </svg>
                                {isLast ? (
                                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                    {label}
                  </span>
                                ) : (
                                    <Link
                                        href={href}
                                        className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                                    >
                                        {label}
                                    </Link>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;