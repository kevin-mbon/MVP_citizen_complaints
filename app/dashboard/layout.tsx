'use client'
import React, {FC} from 'react';
import {AppSidebar} from "@/components/layout/Sidebar";
import TopHead from "@/components/layout/TopHead";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Assistant from "@/components/features/Assistant";

interface  LayoutProps {
    children: React.ReactNode;
}

const DashboardLayout : FC<LayoutProps> = ({children}) => {
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');

        if (!token || !userStr) {
            router.replace('/auth/signin');
            return;
        }

        try {
            const user = JSON.parse(userStr);
            if (user.role !== 'admin') {
                router.replace('/auth/signin');
            }
        } catch (e) {
            router.replace('/auth/signin');
        }
    }, [router]);

    return (
        <main className={'min-h-screen w-screen flex'}>
            <AppSidebar/>
            <div className={'w-screen lg:w-full flex flex-col p-2 lg:p-4'}>
                <TopHead/>
                <div className={'w-full flex flex-col gap-4 mt-4 flex-1'}>
                    {children}
                </div>
                <Assistant/>
            </div>
        </main>
    );
};

export default DashboardLayout;