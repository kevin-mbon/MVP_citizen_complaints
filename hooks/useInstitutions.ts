import { useState, useEffect } from 'react';
import api from '@/lib/api';

export interface Institution {
    _id: string;
    name: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface FormattedInstitution {
    id: string;
    name: string;
    address: string;
    serviceType: string;
    email: string;
    phone: string;
}

export const useInstitutions = () => {
    const [institutions, setInstitutions] = useState<FormattedInstitution[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInstitutions = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await api.get('/institutions', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const formattedData: FormattedInstitution[] = response.data.map((institution: Institution) => ({
                    id: institution._id,
                    name: institution.name,
                    address: institution.address,
                    serviceType: '',
                    email: '',
                    phone: '',
                }));

                setInstitutions(formattedData);
                setError(null);
            } catch (err) {
                console.error('Error fetching institutions:', err);
                setError('Failed to load institutions. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchInstitutions();
    }, []);

    return { institutions, isLoading, error };
};
