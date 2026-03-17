import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FiBriefcase, FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";


const RegisterTenant = () => {
  const [formData, setFormData] = useState({ companyName: "", userName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register-tenant`, formData);
      toast.success("Company registered! Please log in.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="max-w-lg w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
      >
        <div className="p-8 sm:p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Setup Workspace</h2>
            <p className="text-slate-500 mt-2 text-sm font-medium">Create a new tenant for your company</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-slate-700 text-sm font-bold mb-2">Company Name</label>
              <div className="relative">
                <FiBriefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg" />
                <input type="text" name="companyName" required onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium" placeholder="Acme Corp" />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 text-sm font-bold mb-2">Admin Name</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg" />
                <input type="text" name="userName" required onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium" placeholder="John Doe" />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 text-sm font-bold mb-2">Work Email</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg" />
                <input type="email" name="email" required onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium" placeholder="admin@acme.com" />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 text-sm font-bold mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg" />
                <input type="password" name="password" required minLength="6" onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium" placeholder="••••••••" />
              </div>
            </div>

            <button disabled={loading} type="submit" className="w-full mt-6 flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition duration-300 shadow-lg shadow-indigo-200 disabled:opacity-70">
              {loading ? "Creating Workspace..." : <>Create Workspace <FiArrowRight /></>}
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-slate-600 font-medium">
            Already have an account? <Link to="/login" className="text-indigo-600 hover:underline font-bold">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterTenant;