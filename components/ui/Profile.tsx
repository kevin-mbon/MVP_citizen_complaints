'use client';

import React, { useState, useRef, useEffect, FC } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const menuItems = [
    { label: 'Profile', href: '#' },
    { label: 'Sign out', href: '/auth/signin', isDivider: true },
];

const Profile: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleItemClick = (label: string, href: string, e: React.MouseEvent) => {
        if (label === 'Sign out') {
            e.preventDefault(); // Prevent default navigation
            logout(); // Call logout from context
            return;
        }
        router.push(href); // Navigate to other routes normally
        setIsOpen(false);
    };

    return (
        <div ref={containerRef} className="relative inline-block text-left">
            <button
                onClick={() => setIsOpen(open => !open)}
                aria-haspopup="true"
                aria-expanded={isOpen}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-600 rounded-full focus:outline-none"
            >
                <span className="font-medium text-gray-600 dark:text-gray-300">RD</span>
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-700 divide-y divide-gray-100 dark:divide-gray-600 rounded-lg shadow-sm z-10"
                    role="menu"
                    aria-labelledby="avatarButton"
                >
                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <div>Reconfort Daniel</div>
                        <div className="font-medium truncate">reconfortdanny@gmail.com</div>
                    </div>

                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        {menuItems.map(({ label, href, isDivider }) => (
                            <React.Fragment key={label}>
                                <li className={isDivider ? 'py-1' : ''}>
                                    <a
                                        href={href}
                                        onClick={(e) => handleItemClick(label, href, e)}
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        role="menuitem"
                                    >
                                        {label}
                                    </a>
                                </li>
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Profile;
