import Link from 'next/link';
import React, {FC} from 'react';

interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
    className?: string;
    href: string;
    active?: boolean;
}

const SidebarItem: FC<SidebarItemProps> = ({icon, label, className, href, active = false, ...etc}) => {
    return (
        <Link
            href={href}
            className={`
                flex items-center gap-2 w-full p-2 rounded-lg
                ${active ? 'bg-black text-white shadow-lg' : 'hover:bg-white text-black'}
                duration-300 border border-transparent hover:border-slate-50 hover:shadow-xl shadow-slate-100
                ${className}
            `}
            {...etc}
        >
            <div className={`size-9 rounded-md flex justify-center items-center 
                ${active ? 'bg-white text-black' : 'bg-black text-white'}
            `}>
                {icon}
            </div>
            <span className={'text-sm'}>{label}</span>
        </Link>
    );
};

export default SidebarItem;