'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';

export interface Category {
    _id: string;
    name: string;
    description: string;
    complaintOrFeedbackCount: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface CategoryForDisplay {
    id: string;
    name: string;
    description: string;
    count: number;
    routingAgency: string;
}

export const useCategories = () => {
    const [categories, setCategories] = useState<CategoryForDisplay[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');

            const response = await api.get('/category', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const transformedData: CategoryForDisplay[] = response.data.map((category: Category) => ({
                id: category._id,
                name: category.name,
                description: category.description,
                count: category.complaintOrFeedbackCount,
                routingAgency: "Unassigned"
            }));

            setCategories(transformedData);
            setError(null);
        } catch (err) {
            console.error('Error fetching categories:', err);
            setError('Failed to fetch categories. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return { categories, loading, error, refetch: fetchCategories };
};

export default useCategories;