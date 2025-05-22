

import { useState, useCallback } from 'react';
import api from '@/lib/api';

interface UpdateTicketParams {
    id: string;
    status?: string;
    assignedTo?: string;
    priority?: string;
    notes?: string;
}

export const useTicketActions = () => {
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [updateError, setUpdateError] = useState<string | null>(null);
    const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);

    const updateTicket = useCallback(async (params: UpdateTicketParams) => {
        setIsUpdating(true);
        setUpdateError(null);
        setUpdateSuccess(false);

        try {
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('Authentication token not found');
            }

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const { id, ...updateData } = params;

            await api.patch(`/tickets/${id}`, updateData);

            setUpdateSuccess(true);
            return true;
        } catch (err: any) {
            console.error('Error updating ticket:', err);
            setUpdateError(err.message || 'Failed to update ticket. Please try again.');
            return false;
        } finally {
            setIsUpdating(false);
        }
    }, []);

    const resetUpdateStatus = useCallback(() => {
        setUpdateSuccess(false);
        setUpdateError(null);
    }, []);

    return {
        updateTicket,
        isUpdating,
        updateError,
        updateSuccess,
        resetUpdateStatus
    };
};