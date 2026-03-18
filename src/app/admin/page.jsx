"use client";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { Shield, Lock, Activity, Database } from "lucide-react";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (token) {
      router.push("/admin/dashboard");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("admin", JSON.stringify(data.admin));
        router.push("/admin/dashboard");

      } else {

        toast.error(data.message || "Login failed. Please check your credentials.");


      }

    } catch (error) {

      toast.error("An error occurred while logging in. Please try again.");

    }

    setLoading(false);
  };


  return (
    <div className="min-h-screen flex bg-[#F8FAFC] text-gray-900">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 relative flex-col justify-between px-20 py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute w-full h-full bg-[radial-gradient(#c7d2fe_1px,transparent_1px)] [background-size:30px_30px]" />
        </div>

        {/* Top Content */}
        <div className="relative z-10">

          <div className="bg-indigo-100 w-12 h-12 flex items-center justify-center rounded-xl mb-6">
            <Shield className="text-indigo-600" />
          </div>

          <h1 className="text-4xl font-bold leading-tight text-gray-900">
            Secure Admin <br />
            <span className="text-indigo-600">Control Panel</span>
          </h1>

          <p className="text-gray-600 mt-6 max-w-md">
            This area is restricted to authorized administrators only.
            Monitor system activities, manage users, and control the
            platform securely.
          </p>

          {/* Feature Cards */}
          <div className="relative z-10 grid grid-cols-2 gap-6 mt-10">

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <Activity className="text-indigo-600 mb-3" size={20} />
              <h3 className="font-semibold text-sm">Live Monitoring</h3>
              <p className="text-xs text-gray-500 mt-1">
                Track platform activity in real time.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <Database className="text-indigo-600 mb-3" size={20} />
              <h3 className="font-semibold text-sm">Secure Data</h3>
              <p className="text-xs text-gray-500 mt-1">
                Enterprise-level database protection.
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3 mt-10 text-sm text-gray-600">
            <Lock size={16} className="text-indigo-600" />
            Enterprise-grade security enabled
          </div>
        </div>



      </div>


      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">

        <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 shadow-xl">

          <h2 className="text-2xl font-semibold mb-2 text-gray-900">
            Admin Login
          </h2>

          <p className="text-gray-500 text-sm mb-6">
            Enter your admin credentials to continue.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Admin Email</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@company.com"
                className="w-full mt-2 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>


            {/* Password */}
            <div>
              <div className="flex justify-between text-sm text-gray-600">
                <label>Password</label>

                <a href="#" className="text-indigo-600 hover:underline">
                  Forgot password?
                </a>
              </div>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>


            {/* Remember */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" className="accent-indigo-600" />
              Keep me signed in
            </div>


            {/* Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg font-medium text-white transition shadow-md"
            >
              Access Dashboard
            </button>


            {/* Notice */}
            <div className="text-center mt-6 text-xs text-gray-500 border-t border-gray-200 pt-4">

              <p>🔒 Admin access only</p>

              <p className="mt-2">
                Not an administrator?{" "}
                <a href="#" className="text-indigo-600 hover:underline">
                  Contact system owner
                </a>
              </p>

            </div>

          </form>


          {/* Footer */}
          <div className="flex justify-between text-xs text-gray-400 mt-8">
            <span>© 2026 Admin System</span>
            <span>Secure Server Authentication</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminLogin;