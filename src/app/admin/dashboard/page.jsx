"use client";

import {
    Users,
    ShoppingCart,
    DollarSign,
    Package
} from "lucide-react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid
} from "recharts";

const revenueData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 5000 },
    { month: "Apr", revenue: 4500 },
    { month: "May", revenue: 6000 },
    { month: "Jun", revenue: 7000 }
];

const stockData = [
    { name: "Shoes", stock: 120 },
    { name: "T-Shirts", stock: 90 },
    { name: "Hoodies", stock: 40 },
    { name: "Jackets", stock: 60 },
    { name: "Caps", stock: 150 }
];

export default function DashboardPage() {
    return (
        <div className="space-y-10">

            {/* Title */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Dashboard Overview
                </h1>
                <p className="text-gray-500 text-sm">
                    Welcome back! Here's what's happening in your store.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-6">

                <div className="bg-white px-3 py-4 rounded-2xl shadow-md hover:shadow-lg transition flex items-center gap-2">

                    <div className="p-3 rounded-xl bg-indigo-100">
                        <Users className="text-indigo-600" />
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm">Total Customers</p>
                        <h2 className="text-2xl font-bold">1,245</h2>
                    </div>

                </div>


                <div className="bg-white px-3 py-4 rounded-2xl shadow-md hover:shadow-lg transition flex items-center gap-2">

                    <div className="p-3 rounded-xl bg-green-100">
                        <ShoppingCart className="text-green-600" />
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm">Orders</p>
                        <h2 className="text-2xl font-bold">320</h2>
                    </div>

                </div>


                <div className="bg-white px-3 py-4 rounded-2xl shadow-md hover:shadow-lg transition flex items-center gap-2">

                    <div className="p-3 rounded-xl bg-yellow-100">
                        <DollarSign className="text-yellow-600" />
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm">Revenue</p>
                        <h2 className="text-2xl font-bold">12,500</h2>
                    </div>

                </div>


                <div className="bg-white px-3 py-4 rounded-2xl shadow-md hover:shadow-lg transition flex items-center gap-2">

                    <div className="p-3 rounded-xl bg-purple-100">
                        <Package className="text-purple-600" />
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm">Products</p>
                        <h2 className="text-2xl font-bold">85</h2>
                    </div>

                </div>

            </div>


            {/* Charts */}
            <div className="grid grid-cols-2 gap-8">

                {/* Revenue Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-md">

                    <h3 className="font-semibold text-lg mb-5">
                        Revenue Overview
                    </h3>

                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={revenueData}>
                            <XAxis dataKey="month" stroke="#9CA3AF" />
                            <YAxis stroke="#9CA3AF" />
                            <Tooltip />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#6366F1"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>

                </div>


                {/* Stock Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-md">

                    <h3 className="font-semibold text-lg mb-5">
                        Product Stock
                    </h3>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={stockData}>
                            <XAxis dataKey="name" stroke="#9CA3AF" />
                            <YAxis stroke="#9CA3AF" />
                            <Tooltip />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Bar
                                dataKey="stock"
                                fill="#6366F1"
                                radius={[6, 6, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>

                </div>

            </div>


            {/* Bottom Section */}
            <div className="grid grid-cols-2 gap-8">

                {/* Customers */}
                <div className="bg-white p-6 rounded-2xl shadow-md">

                    <h3 className="font-semibold text-lg mb-5">
                        Recent Customers
                    </h3>

                    <table className="w-full text-sm">

                        <thead className="text-gray-500 border-b">
                            <tr>
                                <th className="text-left py-3">Name</th>
                                <th className="text-left py-3">Email</th>
                                <th className="text-left py-3">Status</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">

                            <tr>
                                <td className="py-3">John Doe</td>
                                <td>john@email.com</td>
                                <td className="text-green-600 font-medium">Active</td>
                            </tr>

                            <tr>
                                <td className="py-3">Sarah Smith</td>
                                <td>sarah@email.com</td>
                                <td className="text-green-600 font-medium">Active</td>
                            </tr>

                            <tr>
                                <td className="py-3">Mike Johnson</td>
                                <td>mike@email.com</td>
                                <td className="text-yellow-600 font-medium">Pending</td>
                            </tr>

                        </tbody>

                    </table>

                </div>


                {/* Low Stock */}
                <div className="bg-white p-6 rounded-2xl shadow-md">

                    <h3 className="font-semibold text-lg mb-5">
                        Low Stock Products
                    </h3>

                    <ul className="space-y-4 text-sm">

                        <li className="flex justify-between">
                            <span>Hoodie</span>
                            <span className="text-red-500 font-medium">12 left</span>
                        </li>

                        <li className="flex justify-between">
                            <span>Jacket</span>
                            <span className="text-red-500 font-medium">8 left</span>
                        </li>

                        <li className="flex justify-between">
                            <span>Winter Cap</span>
                            <span className="text-red-500 font-medium">15 left</span>
                        </li>

                    </ul>

                </div>

            </div>

        </div>
    );
}