"use client";
import { useState } from "react";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { FiSearch } from "react-icons/fi";
import { ChevronDown } from "lucide-react";

const dummyAdmins = [
    {
        id: 1,
        name: "Julianne Smith",
        email: "julianne@gmail.com",
        role: "Super Admin",
        status: "Active",
    },
    {
        id: 2,
        name: "Marcus Reed",
        email: "marcus@gmail.com",
        role: "Content Editor",
        status: "Active",
    },
    {
        id: 3,
        name: "Elena Lopez",
        email: "elena@gmail.com",
        role: "Security Auditor",
        status: "Inactive",
    },
    {
        id: 4,
        name: "Tobias Black",
        email: "tobias@gmail.com",
        role: "System Admin",
        status: "Active",
    },
];

export default function Page() {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(null);

    const filteredAdmins = dummyAdmins.filter((admin) =>
        admin.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Manage Admins
                    </h1>
                    <p className="text-gray-900 text-sm">
                        Control system access, update roles, and monitor activity
                    </p>
                </div>

                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition">
                    <Plus size={16} />
                    Add New Admin
                </button>
            </div>

            {/* Filters + Search */}
            <div className="bg-white rounded-xl p-4 shadow-sm mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div className="flex gap-3">

                    {/* ROLE FILTER */}
                    <div className="relative">
                        <div
                            onClick={() => setOpen(open === "role" ? null : "role")}
                            className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg text-sm cursor-pointer"
                        >
                            <span className="uppercase text-xs tracking-wide text-gray-900">
                                Filter by:
                            </span>
                            <span className="font-medium text-gray-900">
                                All Roles
                            </span>
                            <ChevronDown size={14} className="text-gray-900" />
                        </div>

                        {open === "role" && (
                            <div className="absolute mt-2 w-44 bg-white rounded-xl shadow-lg p-2 z-50">
                                {["All Roles", "Super Admin", "Admin"].map((item) => (
                                    <div
                                        key={item}
                                        className="px-3 py-2 text-sm rounded-lg hover:bg-gray-100 cursor-pointer"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* STATUS FILTER */}
                    <div className="relative">
                        <div
                            onClick={() => setOpen(open === "status" ? null : "status")}
                            className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg text-sm cursor-pointer"
                        >
                            <span className="uppercase text-xs tracking-wide text-gray-900">
                                Status:
                            </span>
                            <span className="font-medium text-gray-900">
                                Active
                            </span>
                            <ChevronDown size={14} className="text-gray-900" />
                        </div>

                        {open === "status" && (
                            <div className="absolute mt-2 w-40 bg-white rounded-xl shadow-lg p-2 z-50">
                                {["Active", "Inactive"].map((item) => (
                                    <div
                                        key={item}
                                        className="px-3 py-2 text-sm rounded-lg hover:bg-gray-100 cursor-pointer"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>

                {/* Search */}
                <div className="relative w-full md:w-80">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900" />
                    <input
                        type="text"
                        placeholder="Search admins..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg outline-none focus:bg-white focus:ring-1 focus:ring-black/10 transition"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-sm">

                    <thead className="text-gray-900 text-xs uppercase" style={{backgroundColor:"#e0e0e0"}}>
                        <tr>
                            <th className="p-4 text-left">Administrator</th>
                            <th className="p-4 text-left">Role</th>
                            <th className="p-4 text-left">Last Active</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredAdmins.map((admin) => (
                            <tr key={admin.id} className="hover:bg-gray-50 transition group">

                                {/* User */}
                                <td className="p-4 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-900">
                                        {admin.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {admin.name}
                                        </p>
                                        <p className="text-xs text-gray-900">
                                            {admin.email}
                                        </p>
                                    </div>
                                </td>

                                {/* Role */}
                                <td className="p-4">
                                    <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-900">
                                        {admin.role}
                                    </span>
                                </td>

                                {/* Last Active */}
                                <td className="p-4 text-gray-900">
                                    2 mins ago
                                </td>

                                {/* Status */}
                                <td className="p-4">
                                    <span
                                        className={`px-2 py-1 text-xs rounded-full ${admin.status === "Active"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-red-100 text-red-500"
                                            }`}
                                    >
                                        {admin.status}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="p-4">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-900 transition">
                                            <Eye size={16} />
                                        </button>
                                        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-900 transition">
                                            <Pencil size={16} />
                                        </button>
                                        <button className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {/* Empty */}
            {filteredAdmins.length === 0 && (
                <div className="text-center text-gray-900 mt-6">
                    No admins found
                </div>
            )}
        </div>
    );
}