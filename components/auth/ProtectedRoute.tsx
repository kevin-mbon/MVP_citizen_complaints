'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-hot-toast';

interface ProtectedRouteProps {
    children: React.ReactNode;
    roles?: string[];
}

export default function ProtectedRoute({ children, roles = [] }: ProtectedRouteProps) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Check if is authenticated
        if (!user) {
            toast.error('You must be logged in to access this page');
            router.push('/auth/signin');
            return;
        }

        if (roles.length > 0 && !roles.includes(user.role)) {
            toast.error('You do not have permission to access this page');
            router.push('/dashboard');
        }
    }, [user, router, roles]);

    if (!user) {
        return ('No Users Logged in');
    }

    if (roles.length > 0 && !roles.includes(user.role)) {
        return null;
    }

    return <>{children}</>;
}