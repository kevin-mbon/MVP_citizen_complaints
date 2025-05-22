
import React from 'react';

export interface LoaderProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 'md', className = '' }) => {
    const sizeClasses = {
        sm: 'w-5 h-5',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    return (
        <div className={`flex justify-center items-center ${className}`}>
            <div className={`animate-spin rounded-full border-4 border-t-transparent border-gray-800 ${sizeClasses[size]}`}></div>
        </div>
    );
};

export default Loader;