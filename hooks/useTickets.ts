import { useState, useEffect } from 'react';
import api from '@/lib/api';

export interface TicketResponse {
    _id: string;
    user: string;
    institution: string;
    category: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface FormattedTicket {
    id: string;
    title: string; // Will be populated from description
    category: string;
    status: 'new' | 'assigned' | 'in-progress' | 'resolved' | 'closed';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    submittedBy: string;
    assignedTo: string;
    createdAt: string;
    updatedAt: string;
}

// Map API status to UI status
const mapStatus = (apiStatus: string): 'new' | 'assigned' | 'in-progress' | 'resolved' | 'closed' => {
    const statusMap: Record<string, 'new' | 'assigned' | 'in-progress' | 'resolved' | 'closed'> = {
        'open': 'new',
        'assigned': 'assigned',
        'inProgress': 'in-progress',
        'processing': 'in-progress',
        'resolved': 'resolved',
        'closed': 'closed'
    };

    return statusMap[apiStatus] || 'new';
};

// Helper to determine priority (as it's not in the API response)
const determinePriority = (): 'low' | 'medium' | 'high' | 'urgent' => {
    // For now, randomly assign priority since it's not in the API
    const priorities: ('low' | 'medium' | 'high' | 'urgent')[] = ['low', 'medium', 'high', 'urgent'];
    const randomIndex = Math.floor(Math.random() * priorities.length);
    return priorities[randomIndex];
};

export const useTickets = () => {
    const [tickets, setTickets] = useState<FormattedTicket[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [stats, setStats] = useState<{
        total: number;
        new: number;
        inProgress: number;
        resolved: number;
        closed: number;
    }>({
        total: 0,
        new: 0,
        inProgress: 0,
        resolved: 0,
        closed: 0
    });

    useEffect(() => {
        const fetchTickets = async () => {
            setIsLoading(true);
            try {
                // Get token from localStorage or wherever you store it
                const token = localStorage.getItem('token');

                if (!token) {
                    throw new Error('Authentication token not found');
                }

                // Set authorization header
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                const response = await api.get('/tickets');

                // Transform API data to match the table component's expected format
                const formattedData: FormattedTicket[] = response.data.map((ticket: TicketResponse) => {
                    const status = mapStatus(ticket.status);
                    const priority = determinePriority();

                    return {
                        id: ticket._id,
                        title: ticket.description.length > 50
                            ? `${ticket.description.substring(0, 50)}...`
                            : ticket.description,
                        category: ticket.category, // This might need to be fetched separately or included in response
                        status,
                        priority,
                        submittedBy: ticket.user, // This might need to be fetched separately or included in response
                        assignedTo: '', // Not available in current API response
                        createdAt: ticket.createdAt,
                        updatedAt: ticket.updatedAt
                    };
                });

                setTickets(formattedData);

                // Update stats
                const calculatedStats = {
                    total: formattedData.length,
                    new: formattedData.filter(t => t.status === 'new').length,
                    inProgress: formattedData.filter(t => t.status === 'in-progress' || t.status === 'assigned').length,
                    resolved: formattedData.filter(t => t.status === 'resolved').length,
                    closed: formattedData.filter(t => t.status === 'closed').length
                };

                setStats(calculatedStats);
                setError(null);
            } catch (err: any) {
                console.error('Error fetching tickets:', err);
                setError(err.message || 'Failed to load tickets. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTickets();
    }, []);

    return { tickets, isLoading, error, stats };
};