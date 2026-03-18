"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import Navbar from './navbar'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLayout({ children }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("adminToken");

        if (!token) {
            router.push("/admin");
        } else {
            setLoading(false);
        }
    }, [router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                Loading Dashboard...
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-100">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Area */}
            <div className="flex-1 flex flex-col">

                {/* Navbar */}
                <Navbar />

                {/* Page Content */}
                <main className="p-6 overflow-y-auto scrollbar-hide">{children}</main>

            </div>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}



