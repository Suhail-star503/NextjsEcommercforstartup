"use client";

import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white border-b-2 border-indigo-200 px-6 py-4 flex items-center justify-between">

      {/* Search */}
      <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg w-80">

        <Search size={16} className="text-gray-500" />

        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none ml-2 text-sm w-full"
        />

      </div>

      {/* Right side */}
      <div className="flex items-center gap-6">

        <Bell className="text-gray-600 cursor-pointer" />

        <div className="flex items-center gap-3">

          <div className="text-sm">
            <p className="font-medium">Admin</p>
            <p className="text-gray-500 text-xs">admin@email.com</p>
          </div>

          <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">
            A
          </div>

        </div>

      </div>

    </header>
  );
}