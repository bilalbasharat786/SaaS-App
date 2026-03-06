import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { motion } from "framer-motion";
import { 
  FiTrendingUp, FiUsers, FiActivity, FiClock, 
  FiArrowUpRight, FiArrowDownRight, FiMoreVertical, 
  FiDatabase, FiCheckCircle, FiStar, FiShield
} from "react-icons/fi";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { title: "Total Users", value: "1,248", change: "+12.5%", isUp: true, icon: <FiUsers />, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "System Uptime", value: "99.9%", change: "+0.2%", isUp: true, icon: <FiActivity />, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Data Processed", value: "84.2 GB", change: "-2.4%", isUp: false, icon: <FiDatabase />, color: "text-indigo-600", bg: "bg-indigo-50" },
    { title: "Pending Tasks", value: "14", change: "-5", isUp: true, icon: <FiClock />, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  const chartHeights = [40, 65, 45, 80, 55, 90, 70, 60, 85, 50, 75, 95];

  const recentActivities = [
    { user: "Ali Khan", action: "created a new project", time: "2 mins ago", icon: <FiCheckCircle className="text-emerald-500" /> },
    { user: "Sara Ahmed", action: "updated server configs", time: "1 hour ago", icon: <FiShield className="text-blue-500" /> },
    { user: "System", action: "automated backup completed", time: "3 hours ago", icon: <FiDatabase className="text-indigo-500" /> },
    { user: "Kamran", action: "deleted old logs", time: "5 hours ago", icon: <FiActivity className="text-orange-500" /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible" 
      className="max-w-7xl mx-auto space-y-6 pb-10"
    >
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {greeting}, {user?.name?.split(' ')[0] || 'User'}
            </h1>
            <span className="bg-amber-100 text-amber-700 p-1.5 rounded-full">
              <FiStar size={16} className="fill-current" />
            </span>
          </div>
          <p className="text-slate-500 font-medium">
            Here is what's happening in <span className="text-indigo-600 font-bold uppercase tracking-wider">{user?.companyName}</span> today.
          </p>
        </div>
        <div className="flex flex-col items-end bg-slate-50 px-5 py-3 rounded-2xl border border-slate-200">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Current Time</span>
          <span className="text-xl font-extrabold text-slate-800 font-mono">{currentTime}</span>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-sm font-bold px-2.5 py-1 rounded-full ${stat.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {stat.isUp ? <FiArrowUpRight /> : <FiArrowDownRight />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-slate-400 font-semibold text-sm mb-1">{stat.title}</h3>
            <p className="text-3xl font-extrabold text-slate-800">{stat.value}</p>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Activity Overview</h2>
              <p className="text-sm text-slate-400 font-medium">Monthly usage and traffic metrics</p>
            </div>
            <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors">
              <FiMoreVertical size={20} />
            </button>
          </div>
          <div className="h-64 flex items-end gap-2 md:gap-4 justify-between pt-4">
            {chartHeights.map((height, i) => (
              <div key={i} className="relative flex flex-col justify-end w-full h-full group">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 1, delay: i * 0.05, type: "spring" }}
                  className="bg-indigo-100 rounded-t-lg w-full relative group-hover:bg-indigo-200 transition-colors"
                >
                  <div 
                    className="absolute bottom-0 w-full bg-indigo-600 rounded-t-lg transition-all duration-500"
                    style={{ height: `${height * 0.6}%` }}
                  ></div>
                </motion.div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {height * 12} views
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs font-bold text-slate-400">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            <span className="hidden sm:inline">Jul</span><span className="hidden sm:inline">Aug</span>
            <span className="hidden sm:inline">Sep</span><span className="hidden sm:inline">Oct</span>
            <span className="hidden sm:inline">Nov</span><span className="hidden sm:inline">Dec</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
            <button className="text-indigo-600 text-sm font-bold hover:text-indigo-800 transition-colors">View All</button>
          </div>
          <div className="flex-1 space-y-6">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex gap-4">
                <div className="mt-1 bg-slate-50 p-2 rounded-full border border-slate-100">
                  {activity.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {activity.user} <span className="font-medium text-slate-500">{activity.action}</span>
                  </p>
                  <p className="text-xs font-bold text-slate-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-slate-600">Storage Capacity</span>
              <span className="text-sm font-bold text-indigo-600">76%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 mb-2 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "76%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="bg-indigo-600 h-2.5 rounded-full"
              ></motion.div>
            </div>
            <p className="text-xs font-medium text-slate-400">760 GB used of 1000 GB</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;