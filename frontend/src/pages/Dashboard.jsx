import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { motion } from "framer-motion";
import { FiTrendingUp, FiUsers, FiActivity } from "react-icons/fi";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const stats = [
    { title: "Total Users", value: "Active", icon: <FiUsers className="text-blue-500" />, bg: "bg-blue-50" },
    { title: "System Status", value: "Online", icon: <FiActivity className="text-green-500" />, bg: "bg-green-50" },
    { title: "Performance", value: "Optimal", icon: <FiTrendingUp className="text-purple-500" />, bg: "bg-purple-50" },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl shadow-indigo-200"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">Welcome back, {user?.name}</h1>
        <p className="text-indigo-100 text-lg font-medium">You are logged in to the <span className="font-bold text-white uppercase">{user?.companyName}</span> workspace as a <span className="uppercase font-bold text-white bg-white/20 px-2 py-1 rounded-md text-sm ml-1">{user?.role}</span>.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6 hover:shadow-md transition-shadow"
          >
            <div className={`w-16 h-16 rounded-2xl ${stat.bg} flex items-center justify-center text-3xl`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-slate-500 font-medium text-sm">{stat.title}</p>
              <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;