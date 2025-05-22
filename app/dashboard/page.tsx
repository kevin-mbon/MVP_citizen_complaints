'use client';

import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
    FaTicketAlt,
    FaUsers,
    FaCheck,
    FaClock,
    FaBullseye,
} from 'react-icons/fa';
import { BsGraphUp } from 'react-icons/bs';
import Link from 'next/link';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const DashboardPage = () => {
    // Chart data for ticket trends
    const ticketTrendsData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Submitted',
                data: [65, 78, 52, 91, 85, 107],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4,
            },
            {
                label: 'Resolved',
                data: [40, 65, 40, 80, 70, 95],
                borderColor: 'rgb(34, 197, 94)',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                fill: true,
                tension: 0.4,
            }
        ],
    };

    // Chart options for ticket trends
    const ticketTrendsOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as 'top',
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            }
        },
        maintainAspectRatio: false,
    } as const;

    // Chart data for ticket categories
    const categoryDistributionData = {
        labels: ['Water Issues', 'Electricity', 'Road Maintenance', 'Waste Management', 'Public Safety'],
        datasets: [
            {
                data: [56, 97, 124, 85, 63],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(236, 72, 153, 0.7)',
                    'rgba(234, 179, 8, 0.7)',
                    'rgba(34, 197, 94, 0.7)',
                    'rgba(168, 85, 247, 0.7)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // Chart options for category distribution
    const categoryDistributionOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right' as const,
            },
            title: {
                display: false,
            },
        },
        maintainAspectRatio: false,
    };

    // Chart data for response time by category
    const responseTimeData = {
        labels: ['Water Issues', 'Electricity', 'Road Maintenance', 'Waste Management', 'Public Safety'],
        datasets: [
            {
                label: 'Average Response Time (hours)',
                data: [24, 12, 36, 18, 8],
                backgroundColor: 'rgba(59, 130, 246, 0.7)',
            },
        ],
    };

    // Chart options for response time
    const responseTimeOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Hours'
                }
            }
        },
        maintainAspectRatio: false,
    };

    // Recent activity data
    const recentActivity = [
        {
            id: 'ACT-001',
            action: 'Ticket TKT-2023-023 status changed to Resolved',
            user: 'Jane Smith',
            department: 'Water & Sanitation',
            time: '10 minutes ago'
        },
        {
            id: 'ACT-002',
            action: 'New ticket TKT-2023-024 created',
            user: 'Michael Brown',
            department: 'Citizen',
            time: '1 hour ago'
        },
        {
            id: 'ACT-003',
            action: 'Ticket TKT-2023-018 assigned to Transportation Department',
            user: 'John Doe',
            department: 'Admin',
            time: '2 hours ago'
        },
        {
            id: 'ACT-004',
            action: 'New user USR-2023-015 registered',
            user: 'System',
            department: 'System',
            time: '3 hours ago'
        },
    ];

    return (
        <main className="w-full">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
                <p className="text-gray-600 text-sm">
                    Overview of citizen engagement and system performance.
                </p>
            </div>

            {/* Key Metrics/KPIs */}
            <section className={'wrapper mb-6'}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Overview</h2>
                </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg shadow-sm flex items-center">
                    <div className="p-3 rounded-md bg-blue-100 mr-4">
                        <FaTicketAlt className="text-blue-600" size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Total Tickets</p>
                        <p className="text-2xl font-bold text-blue-600">425</p>
                        <p className="text-xs text-green-600">+12% from last month</p>
                    </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg shadow-sm flex items-center">
                    <div className="p-3 rounded-md bg-purple-100 mr-4">
                        <FaUsers className="text-purple-600" size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Active Users</p>
                        <p className="text-2xl font-bold text-purple-600">1,245</p>
                        <p className="text-xs text-green-600">+5% from last month</p>
                    </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg shadow-sm flex items-center">
                    <div className="p-3 rounded-md bg-green-100 mr-4">
                        <FaCheck className="text-green-600" size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Resolution Rate</p>
                        <p className="text-2xl font-bold text-green-600">87%</p>
                        <p className="text-xs text-green-600">+3% from last month</p>
                    </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg shadow-sm flex items-center">
                    <div className="p-3 rounded-md bg-yellow-100 mr-4">
                        <FaClock className="text-yellow-600" size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Avg. Response Time</p>
                        <p className="text-2xl font-bold text-yellow-600">18h</p>
                        <p className="text-xs text-green-600">-2h from last month</p>
                    </div>
                </div>
            </div>
            </section>

            {/* Main dashboard grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Ticket Trends Chart - 2/3 width */}
                <div className="lg:col-span-2 bg-white p-4 rounded-lg wrapper">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Ticket Trends</h2>
                        <div className="text-sm text-gray-500">Last 6 months</div>
                    </div>
                    <div className="h-72">
                        <Line data={ticketTrendsData} options={ticketTrendsOptions} />
                    </div>
                </div>

                {/* Category Distribution - 1/3 width */}
                <div className="bg-white p-4 rounded-lg wrapper">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Category Distribution</h2>
                        <div className="text-sm text-gray-500">Current period</div>
                    </div>
                    <div className="h-72 flex items-center justify-center">
                        <Doughnut data={categoryDistributionData} options={categoryDistributionOptions} />
                    </div>
                </div>
            </div>

            {/* Secondary charts and activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Response Time by Category */}
                <div className="bg-white p-4 rounded-lg wrapper">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Response Time by Category</h2>
                        <div className="text-sm text-gray-500">Average hours</div>
                    </div>
                    <div className="h-64">
                        <Bar data={responseTimeData} options={responseTimeOptions} />
                    </div>
                </div>

                {/* Status Distribution */}
                <div className="bg-white p-4 rounded-lg wrapper">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Ticket Status Overview</h2>
                        <div className="text-sm text-gray-500">Current period</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 mt-2">
                        <div className="bg-blue-50 p-3 rounded-lg text-center">
                            <p className="text-gray-500 text-xs">Total</p>
                            <p className="text-xl font-bold text-blue-600">425</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg text-center">
                            <p className="text-gray-500 text-xs">New</p>
                            <p className="text-xl font-bold text-blue-600">75</p>
                        </div>
                        <div className="bg-yellow-50 p-3 rounded-lg text-center">
                            <p className="text-gray-500 text-xs">In Progress</p>
                            <p className="text-xl font-bold text-yellow-600">140</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg text-center">
                            <p className="text-gray-500 text-xs">Resolved</p>
                            <p className="text-xl font-bold text-green-600">180</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                            <p className="text-gray-500 text-xs">Closed</p>
                            <p className="text-xl font-bold text-gray-600">30</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-md font-semibold text-gray-700 mb-2">Top Issues This Month</h3>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                                <span className="w-32 text-sm text-gray-600 pl-2">Potholes (85%)</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                                </div>
                                <span className="w-32 text-sm text-gray-600 pl-2">Water Outages (70%)</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                                </div>
                                <span className="w-32 text-sm text-gray-600 pl-2">Streetlights (60%)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity and Goals */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity - 2/3 width */}
                <div className="lg:col-span-2 bg-white p-4 rounded-lg wrapper">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
                        <Link href="/activity" className="text-sm text-blue-600 hover:underline">View All</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Department
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Time
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {recentActivity.map((activity) => (
                                <tr key={activity.id}>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{activity.action}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{activity.user}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{activity.department}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{activity.time}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Goals and Performance - 1/3 width */}
                <div className="bg-white p-4 rounded-lg wrapper">
                    <div className="flex items-center mb-4">
                        <div className="p-2 rounded-md bg-indigo-100 mr-3">
                            <FaBullseye className="text-indigo-600" size={20} />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800">Goals & Performance</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">Ticket Resolution Rate</span>
                                <span className="text-sm font-medium text-gray-700">87% / 90%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '87%' }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">Response Time Target</span>
                                <span className="text-sm font-medium text-gray-700">18h / 12h</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">Citizen Satisfaction</span>
                                <span className="text-sm font-medium text-gray-700">78% / 85%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">User Growth</span>
                                <span className="text-sm font-medium text-gray-700">1,245 / 1,500</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '83%' }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <h3 className="text-sm font-medium text-blue-800 mb-2 flex items-center">
                            <BsGraphUp className="mr-2" /> Performance Insights
                        </h3>
                        <p className="text-sm text-blue-700">
                            Response time has improved by 10% this month. Focus on Water & Sanitation department to meet resolution targets.
                        </p>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-4 rounded-lg wrapper mt-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-3">
                    <Link
                        href="/tickets/new"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                        Create New Ticket
                    </Link>
                    <Link
                        href="/reports/generate"
                        className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
                    >
                        Generate Reports
                    </Link>
                    <Link
                        href="/users/new"
                        className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
                    >
                        Add New User
                    </Link>
                    <Link
                        href="/settings/notifications"
                        className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
                    >
                        Configure Notifications
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default DashboardPage;