
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, ShoppingCart, Package, Settings } from "lucide-react";

export default function Sidebar() {

  const pathname = usePathname();

  const activeClass = "bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600";
  const normalClass = "hover:bg-gray-100";

  return (
    <aside className="w-64 bg-[#FFFFFF] text-gray-800 min-h-screen p-6">

      <h2 className="text-2xl font-bold text-gray-900 mb-10">
        AdminPanel
      </h2>

      <nav>

        <Link
          href="/admin/dashboard"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
          ${pathname === "/admin/dashboard" ? activeClass : normalClass}`}
        >
          <LayoutDashboard size={18} />
          
          Analytics
        </Link>

        <Link
          href="/admin/dashboard/users"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
          ${pathname === "/admin/dashboard/users" ? activeClass : normalClass}`}
        >
          <Users size={18} />
          Customers
        </Link>

        <Link
          href="/admin/dashboard/orders"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
          ${pathname === "/admin/dashboard/orders" ? activeClass : normalClass}`}
        >
          <ShoppingCart size={18} />
          Orders
        </Link>

        <Link
          href="/admin/dashboard/products"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
          ${pathname === "/admin/dashboard/products" ? activeClass : normalClass}`}
        >
          <Package size={18} />
          Products
        </Link>

        <Link
          href="/admin/dashboard/settings"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
          ${pathname === "/admin/dashboard/settings" ? activeClass : normalClass}`}
        >
          <Settings size={18} />
          Settings
        </Link>

      </nav>

    </aside>
  );
}