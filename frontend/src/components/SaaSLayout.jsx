import { useContext, useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { FiHome, FiUsers, FiBriefcase, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const SaaSLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FiHome />, roles: ["admin", "manager", "user"] },
    { name: "Projects", path: "/projects", icon: <FiBriefcase />, roles: ["admin", "manager", "user"] },
    { name: "Manage Users", path: "/users", icon: <FiUsers />, roles: ["admin"] },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -300 }} animate={{ x: isSidebarOpen ? 0 : (window.innerWidth >= 768 ? 0 : -300) }}
        className="fixed md:sticky top-0 left-0 h-screen w-72 bg-white border-r border-slate-200 z-50 flex flex-col shadow-2xl md:shadow-none transition-transform duration-300 ease-in-out"
      >
        <div className="h-16 flex items-center px-8 border-b border-slate-100 justify-between">
          <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent tracking-tight">
            {user?.companyName || "SaaS App"}
          </span>
          <button className="md:hidden text-slate-500 hover:text-slate-800" onClick={() => setIsSidebarOpen(false)}>
            <FiX className="text-2xl" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {navItems.filter(item => item.roles.includes(user?.role)).map((item) => (
            <Link key={item.name} to={item.path} onClick={() => setIsSidebarOpen(false)}>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${location.pathname === item.path ? "bg-indigo-50 text-indigo-600 shadow-sm" : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"}`}>
                <span className="text-xl">{item.icon}</span>
                {item.name}
              </div>
            </Link>
          ))}
        </div>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl mb-4 border border-slate-100">
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
              {user?.name?.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-800 truncate">{user?.name}</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{user?.role}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 font-semibold rounded-xl transition duration-200">
            <FiLogOut /> Sign Out
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30">
          <button className="md:hidden text-slate-600 hover:text-indigo-600" onClick={() => setIsSidebarOpen(true)}>
            <FiMenu className="text-2xl" />
          </button>
          <div className="ml-auto flex items-center gap-4 text-sm font-medium text-slate-600 bg-slate-100 px-4 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Tenant: {user?.companyName}
          </div>
        </header>
        
        <main className="flex-1 p-4 sm:p-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Outlet /> {/* Yahan andar ke pages render honge */}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default SaaSLayout;