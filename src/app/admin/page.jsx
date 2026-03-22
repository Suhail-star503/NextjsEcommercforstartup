"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { FiShoppingCart, FiUsers, FiBarChart2, FiPackage } from "react-icons/fi";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";


const AdminLogin = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  

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
      if(!email) {
        setError("Please enter valid email");
        setLoading(false);
        return;
      }
      if(!password) {
        setError("Please enter valid password");
        setLoading(false);
        return;
      }
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
        setError(data.message || "Invalid email or password");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-[#F4F8FF] relative overflow-hidden">

      {/* 🔵 BLUR BACKGROUND */}
      <div className="absolute w-[420px] h-[420px] bg-blue-300/40 blur-3xl rounded-full top-[-120px] left-[-120px]" />
      <div className="absolute w-[420px] h-[420px] bg-blue-300/40 blur-3xl rounded-full top-[120px] right-[120px]" />
      <div className="absolute w-[350px] h-[350px] bg-indigo-300/40 blur-3xl rounded-full bottom-[-120px] right-[-120px]" />
      <div className="absolute w-[260px] h-[260px] bg-cyan-200/40 blur-3xl rounded-full top-[45%] left-[55%]" />

      {/* MAIN CONTAINER */}
      <div className="relative z-10 w-full flex">

        {/* LEFT SIDE */}


        <div className="hidden md:flex w-1/2 flex-col justify-center px-16 py-14 items-center">

          <div className="max-w-md w-full">

            {/* Heading */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Manage Your <br />
              <span className="text-blue-600">Ecommerce Business</span>
            </h1>

            <p className="text-gray-600 mb-8">
              Control orders, track performance, and manage products seamlessly from one powerful admin dashboard.
            </p>

            {/* Features */}
            <div className="space-y-4">

              <div className="flex items-start gap-3">
                <FiShoppingCart className="text-blue-600 mt-1" size={18} />
                <p className="text-sm text-gray-600">
                  Real-time order management and tracking
                </p>
              </div>

              <div className="flex items-start gap-3">
                <FiUsers className="text-blue-600 mt-1" size={18} />
                <p className="text-sm text-gray-600">
                  Customer insights and user analytics
                </p>
              </div>

              <div className="flex items-start gap-3">
                <FiPackage className="text-blue-600 mt-1" size={18} />
                <p className="text-sm text-gray-600">
                  Inventory and product management tools
                </p>
              </div>

              <div className="flex items-start gap-3">
                <FiBarChart2 className="text-blue-600 mt-1" size={18} />
                <p className="text-sm text-gray-600">
                  Sales reports and performance analytics
                </p>
              </div>

            </div>

            {/* Stats */}
            <div className="flex gap-10 text-sm text-gray-600 mt-10">

              <div>
                <p className="text-xl font-bold text-gray-900">
                  High
                </p>
                <p>Performance</p>
              </div>

              <div>
                <p className="text-xl font-bold text-gray-900">98%</p>
                <p>Customer Satisfaction</p>
              </div>

              <div>
                <p className="text-xl font-bold text-gray-900">24/7</p>
                <p>System Monitoring</p>
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-6">

          <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-10 shadow-xl">

            <h2 className="text-2xl font-semibold text-gray-900 text-center">
              Welcome Back
            </h2>

            <p className="text-center text-gray-500 text-sm mb-6">
              Sign in to continue to your dashboard
            </p>

            <form onSubmit={handleLogin} className="space-y-5">

              {/* ERROR MESSAGE */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* EMAIL */}
              <div className="relative">
                <label className="text-sm text-gray-600">Email Address</label>

                <div className="relative mt-2">
                  <FiMail className="absolute left-3 top-3.5 text-gray-400" size={18} />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    placeholder="name@email.com"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl 
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
            transition disabled:opacity-60"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="relative">
                <div className="flex justify-between text-sm text-gray-600">
                  <label>Password</label>
                  <span className="text-blue-600 cursor-pointer hover:underline">
                    Forgot?
                  </span>
                </div>

                <div className="relative mt-2">
                  <FiLock className="absolute left-3 top-3.5 text-gray-400" size={18} />

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl 
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
            transition disabled:opacity-60"
                  />

                  
                </div>
              </div>

              {/* REMEMBER */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <label className="flex items-center gap-2">
                  <input type="checkbox" disabled={loading} />
                  Remember me
                </label>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 
        bg-gradient-to-r from-blue-500 to-indigo-500 
        hover:opacity-90 text-white py-3 rounded-xl 
        font-medium transition shadow-md disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Signing in...
                  </>
                ) : (
                  "Sign In →"
                )}
              </button>

              {/* FOOTER */}
              <div className="text-center text-xs text-gray-400 mt-4">
                Don’t have access?{" "}
                <span className="text-blue-600 cursor-pointer hover:underline">
                  Contact Admin
                </span>
              </div>

            </form>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;