import { useState } from 'react';
import api from '@/lib/api';
import { FormikValues } from 'formik';

interface TicketFormData {
    title: string;
    message: string;
    categoryId: string;
    institutionId: string;
}

interface TicketResponse {
    id: string;
    title: string;
    description: string;
    status: string;
    createdAt: string;
}

export const useSubmitTicket = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [ticketId, setTicketId] = useState<string | null>(null);

    const submitTicket = async (formData: FormikValues, userId: string) => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');

            const apiData = {
                title: formData.title,
                description: formData.message,
                category: formData.categoryId,
                institution: formData.institutionId,
                status: 'open',
                userId: userId
            };

            const response = await api.post('/tickets', apiData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setTicketId(response.data.id || `TKT-${Math.floor(Math.random() * 100000)}`);
            return response.data;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to submit ticket';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return {
        submitTicket,
        loading,
        error,
        ticketId
    };
};

export default useSubmitTicket;
