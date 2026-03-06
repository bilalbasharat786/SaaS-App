import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiTrendingUp, FiUsers, FiActivity, FiClock, 
  FiArrowUpRight, FiArrowDownRight, FiMoreVertical, 
  FiDatabase, FiCheckCircle, FiStar, FiShield, FiAlertTriangle
} from "react-icons/fi";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [activeChartData, setActiveChartData] = useState(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { title: "Active Licenses", value: "1,248", change: "+12.5%", isUp: true, icon: <FiUsers />, color: "text-sky-400", bg: "bg-sky-950", border: "border-sky-800/50" },
    { title: "Core Uptime", value: "99.99%", change: "+0.02%", isUp: true, icon: <FiActivity />, color: "text-emerald-400", bg: "bg-emerald-950", border: "border-emerald-800/50" },
    { title: "Traffic Out", value: "84.2 TB", change: "-2.4%", isUp: false, icon: <FiDatabase />, color: "text-violet-400", bg: "bg-violet-950", border: "border-violet-800/50" },
    { title: "Sec Alerts", value: "3", change: "Stable", isUp: true, icon: <FiShield />, color: "text-amber-400", bg: "bg-amber-950", border: "border-amber-800/50" },
  ];

  const complexChartData = [
    { month: "Jan", traffic: 4000, requests: 2400 },
    { month: "Feb", traffic: 6500, requests: 3500 },
    { month: "Mar", traffic: 4500, requests: 3000 },
    { month: "Apr", traffic: 8000, requests: 5000 },
    { month: "May", traffic: 5500, requests: 4000 },
    { month: "Jun", traffic: 9000, requests: 6000 },
    { month: "Jul", traffic: 7000, requests: 5500 },
    { month: "Aug", traffic: 6000, requests: 4800 },
    { month: "Sep", traffic: 8500, requests: 5800 },
    { month: "Oct", traffic: 5000, requests: 3800 },
    { month: "Nov", traffic: 7500, requests: 5200 },
    { month: "Dec", traffic: 9500, requests: 7000 },
  ];

  const recentActivities = [
    { user: "Zeeshan Khan", action: "deployed build #A14", time: "2 mins ago", icon: <FiCheckCircle className="text-emerald-400" />, type: "deploy" },
    { user: "M. Bilal", action: "scaled database nodes", time: "1 hour ago", icon: <FiDatabase className="text-sky-400" />, type: "system" },
    { user: "Firewall Bot", action: "blocked IP 192.168.1.1", time: "3 hours ago", icon: <FiShield className="text-amber-400" />, type: "security" },
    { user: "System Monitor", action: "high CPU latency alert", time: "5 hours ago", icon: <FiAlertTriangle className="text-red-400" />, type: "alert" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } }
  };

  const maxTraffic = Math.max(...complexChartData.map(d => d.traffic));

  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible" 
      className="max-w-7xl mx-auto space-y-8 pb-16 px-4 md:px-6 lg:px-8 bg-slate-950 text-slate-100 min-h-screen relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6366f1" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <motion.div variants={itemVariants} className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-slate-900 p-7 md:p-9 rounded-[2rem] border border-slate-800 shadow-2xl shadow-slate-950/50 backdrop-blur-sm">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <span className="bg-amber-950 text-amber-400 p-2 rounded-xl border border-amber-800/50">
              <FiStar size={20} className="fill-current" />
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {greeting}, {user?.name?.split(' ')[0] || 'Operator'}
            </h1>
          </div>
          <p className="text-slate-400 font-medium text-base md:text-lg pl-14">
            System overview for <span className="text-indigo-400 font-bold uppercase tracking-wider bg-indigo-950 px-2 py-0.5 rounded-md text-sm">{user?.companyName}</span> workspace.
          </p>
        </div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-4 bg-slate-800/60 p-4 rounded-2xl border border-slate-700 shadow-inner w-full md:w-auto justify-between md:justify-start"
        >
          <div className="flex items-center gap-3">
             <span className="relative flex h-3 w-3">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
             </span>
             <span className="text-sm font-bold text-slate-300 uppercase tracking-widest">Live Sync</span>
          </div>
          <span className="text-2xl font-black text-white font-mono bg-slate-950 px-4 py-1.5 rounded-lg border border-slate-800 tracking-wider shadow-md">{currentTime}</span>
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
        {stats.map((stat, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            whileHover={{ y: -8, borderColor: "#6366f1" }}
            className={`bg-slate-900 p-7 rounded-3xl border border-slate-800 shadow-xl shadow-slate-950/30 flex flex-col justify-between transition-all duration-300 group ${stat.border} hover:shadow-indigo-950/20`}
          >
            <div className="flex justify-between items-start mb-5">
              <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} text-2xl border ${stat.border} group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-full ${stat.isUp ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50' : 'bg-red-950 text-red-400 border border-red-800/50'}`}>
                {stat.isUp ? <FiArrowUpRight size={14} /> : <FiArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <div>
              <h3 className="text-slate-400 font-semibold text-sm mb-1.5 tracking-wide">{stat.title}</h3>
              <p className="text-4xl font-extrabold text-white tracking-tighter">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-7">
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-slate-900 p-7 md:p-9 rounded-[2rem] border border-slate-800 shadow-xl shadow-slate-950/30">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4 relative">
            <div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-3">
                 <FiTrendingUp className="text-indigo-400" /> Network Traffic
              </h2>
              <p className="text-base text-slate-400 font-medium">Data throughput and request logs (Real-time Simulation)</p>
            </div>
            <div className="flex items-center gap-3 border border-slate-700 bg-slate-800/50 p-1.5 rounded-xl self-end sm:self-center">
               <button className="bg-indigo-600 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition">Requests</button>
               <button className="text-slate-300 text-sm font-bold px-4 py-2 rounded-lg hover:bg-slate-700 transition">Bandwidth</button>
               <button className="p-2 hover:bg-slate-700 rounded-xl text-slate-500 transition">
                 <FiMoreVertical size={20} />
               </button>
            </div>
            
            <AnimatePresence>
               {activeChartData && (
                  <motion.div 
                     initial={{ opacity: 0, scale: 0.8, y: 10 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.8, y: 10 }}
                     className="absolute top-full left-0 mt-4 bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-2xl z-20 w-full sm:w-auto"
                  >
                     <p className="text-sm font-bold text-indigo-300">{activeChartData.month} Performance</p>
                     <p className="text-lg font-extrabold text-white mt-1">Traffic: <span className="text-slate-300 font-medium">{activeChartData.traffic} MB</span></p>
                     <p className="text-lg font-extrabold text-white">Requests: <span className="text-slate-300 font-medium">{activeChartData.requests} req/s</span></p>
                  </motion.div>
               )}
            </AnimatePresence>
          </div>
          
          <div className="h-80 flex items-end gap-1.5 md:gap-3 justify-between pt-6 border-l-2 border-b-2 border-slate-800 pl-4">
            {complexChartData.map((data, i) => (
              <div key={i} className="relative flex flex-col justify-end w-full h-full group" onMouseEnter={() => setActiveChartData(data)} onMouseLeave={() => setActiveChartData(null)}>
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.traffic / maxTraffic) * 100}%` }}
                  transition={{ duration: 1.2, delay: i * 0.04, type: "spring", bounce: 0.3 }}
                  className="bg-slate-800 rounded-t-lg w-full relative group-hover:bg-slate-700/80 transition-colors cursor-pointer overflow-hidden group border border-slate-700 hover:border-indigo-600"
                >
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.requests / (maxTraffic * 0.8)) * 100}%` }}
                    transition={{ duration: 1, delay: i * 0.06 + 0.5, ease: "easeOut" }}
                    className="absolute bottom-0 w-full bg-indigo-600 rounded-t-lg transition-all duration-300 shadow-[0_0_15px_3px_rgba(99,102,241,0.3)] group-hover:bg-indigo-500"
                  ></motion.div>
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </motion.div>
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-[11px] font-black py-1.5 px-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-10 shadow-xl border border-slate-600 scale-75 group-hover:scale-100">
                  Vol: {(data.traffic / 1000).toFixed(1)} GB
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-5 text-[11px] font-black text-slate-500 uppercase tracking-widest pl-4">
            {complexChartData.map(d => <span key={d.month} className="w-full text-center">{d.month}</span>)}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-slate-900 p-7 md:p-9 rounded-[2rem] border border-slate-800 shadow-xl shadow-slate-950/30 flex flex-col h-full hover:border-violet-800/50 transition-colors duration-500 group">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-800">
            <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-3">
               <FiActivity className="text-violet-400" /> Event Logs
            </h2>
            <button className="text-violet-400 text-sm font-bold hover:text-violet-300 transition-colors bg-violet-950/50 px-3 py-1.5 rounded-lg border border-violet-800/50">Audit Trail</button>
          </div>
          <div className="flex-1 space-y-7 relative">
             <div className="absolute left-[26px] top-2 bottom-2 w-0.5 bg-slate-800 group-hover:bg-violet-900 transition-colors duration-500"></div>
            {recentActivities.map((activity, index) => (
              <motion.div key={index} custom={index} variants={itemVariants} className="flex gap-5 relative z-10 items-center bg-slate-900 group-hover:bg-slate-800/30 p-2 rounded-xl transition-colors">
                <div className={`shrink-0 w-12 h-12 bg-slate-800 p-2 rounded-full border border-slate-700 flex items-center justify-center text-xl shadow-inner group-hover:border-violet-700 group-hover:scale-110 transition-all duration-300`}>
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white tracking-wide leading-relaxed">
                    {activity.user} <span className="font-medium text-slate-400">{activity.action}</span>
                  </p>
                  <p className="text-xs font-black text-slate-600 uppercase tracking-widest mt-1.5 flex items-center gap-1.5">
                     <FiClock size={12}/> {activity.time}
                  </p>
                </div>
                 <div className={`w-2.5 h-2.5 rounded-full absolute left-[22px] top-1/2 -translate-y-1/2 ${activity.type === 'alert' ? 'bg-red-500' : activity.type === 'security' ? 'bg-amber-500' : 'bg-slate-700'} border-2 border-slate-900`}></div>
              </motion.div>
            ))}
          </div>
          
          <motion.div variants={itemVariants} className="mt-10 pt-8 border-t border-slate-800 bg-slate-950 p-6 rounded-2xl border hover:border-indigo-800 transition-colors">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-black text-slate-300 uppercase tracking-widest">Compute Clusters</span>
              <span className="text-lg font-black text-indigo-400 font-mono">76% <span className="text-slate-600 text-xs">/ LOAD</span></span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3 mb-3 overflow-hidden border border-slate-700 shadow-inner p-0.5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "76%" }}
                transition={{ duration: 1.8, ease: "circOut", delay: 0.5 }}
                className="bg-indigo-500 h-full rounded-full shadow-[0_0_10px_1px_rgba(99,102,241,0.5)] bg-gradient-to-r from-indigo-600 to-indigo-400"
              ></motion.div>
            </div>
            <p className="text-xs font-medium text-slate-500 text-center tracking-wide">3.8 GHz Avg / 1.2 TB RAM Allocated across 12 nodes</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;