"use client";
import { Shield, Lock } from "lucide-react";

const AdminLogin = () => {
  return (
    <div className="min-h-screen flex bg-[#0B1120] text-white">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 relative flex-col justify-center px-20 bg-gradient-to-br from-[#0B1120] via-[#0E1A2B] to-[#0B1120]">
        
        {/* Glow Effect */}
        <div className="absolute w-96 h-96 bg-blue-600 opacity-10 blur-3xl rounded-full top-20 left-20"></div>

        <div className="relative z-10">
          <div className="bg-blue-600/20 w-12 h-12 flex items-center justify-center rounded-xl mb-6">
            <Shield className="text-blue-500" />
          </div>

          <h1 className="text-4xl font-bold leading-tight">
            Secure Admin <br />
            <span className="text-blue-500">Control Panel</span>
          </h1>

          <p className="text-gray-400 mt-6 max-w-md">
            This area is restricted to authorized administrators only. 
            All activities are monitored and securely logged.
          </p>

          <div className="flex items-center gap-3 mt-10 text-sm text-gray-400">
            <Lock size={16} className="text-blue-500" />
            Enterprise-grade security enabled
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-[#111827] border border-[#1F2937] rounded-2xl p-8 shadow-2xl">

          <h2 className="text-2xl font-semibold mb-2">Admin Login</h2>
          <p className="text-gray-400 text-sm mb-6">
            Enter your admin credentials to continue.
          </p>

          <form className="space-y-5">

            {/* Email */}
            <div>
              <label className="text-sm text-gray-400">Admin Email</label>
              <input
                type="email"
                placeholder="admin@company.com"
                className="w-full mt-2 px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Password (Default Browser Eye Icon) */}
            <div>
              <div className="flex justify-between text-sm text-gray-400">
                <label>Password</label>
                <a href="#" className="text-blue-500 hover:underline">
                  Forgot password?
                </a>
              </div>

              <input
                type="password"
                placeholder="••••••••"
                className="w-full mt-2 px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Remember */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <input type="checkbox" className="accent-blue-500" />
              Keep me signed in
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-medium transition shadow-lg hover:shadow-blue-500/30"
            >
              Access Dashboard
            </button>

            {/* Admin Notice */}
            <div className="text-center mt-6 text-xs text-gray-500 border-t border-gray-800 pt-4">
              <p>🔒 Admin access only</p>
              <p className="mt-2">
                Not an administrator?{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Contact system owner
                </a>
              </p>
            </div>

          </form>

          {/* Footer */}
          <div className="flex justify-between text-xs text-gray-600 mt-8">
            <span>© 2026 Admin System</span>
            <span>Secure Server Authentication</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminLogin;