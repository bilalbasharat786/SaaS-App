import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FiPlus, FiTrash2, FiBriefcase } from "react-icons/fi";


const Projects = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", status: "pending" });

  const fetchProjects = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects`, config);
      setProjects(data);
    } catch (error) {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post(`${import.meta.env.VITE_API_URL}/api/projects`, formData, config);
      toast.success("Project created successfully");
      setShowForm(false);
      setFormData({ title: "", description: "", status: "pending" });
      fetchProjects();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating project");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/projects/${id}`, config);
      toast.success("Project deleted");
      fetchProjects();
    } catch (error) {
      toast.error("Error deleting project");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2"><FiBriefcase className="text-indigo-500" /> Projects</h1>
          <p className="text-slate-500 text-sm mt-1">Manage data for {user?.companyName}</p>
        </div>
        {(user?.role === "admin" || user?.role === "manager") && (
          <button onClick={() => setShowForm(!showForm)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition w-full sm:w-auto justify-center">
            <FiPlus /> {showForm ? "Cancel" : "New Project"}
          </button>
        )}
      </div>

      {showForm && (
        <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} onSubmit={handleCreate} className="bg-white p-6 rounded-3xl shadow-md border border-indigo-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input type="text" placeholder="Project Title" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
            <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none">
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <textarea placeholder="Description" required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none mb-4" rows="3"></textarea>
          <button type="submit" className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition">Save Project</button>
        </motion.form>
      )}

      {loading ? <p className="text-center p-10 font-bold text-slate-400">Loading...</p> : (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 text-sm uppercase">
                <tr>
                  <th className="p-5">Title</th>
                  <th className="p-5">Status</th>
                  <th className="p-5">Created By</th>
                  {(user?.role === "admin" || user?.role === "manager") && <th className="p-5 text-right">Action</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50/50 transition">
                    <td className="p-5 font-bold text-slate-800">{p.title}</td>
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${p.status === 'completed' ? 'bg-green-100 text-green-700' : p.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-5 text-slate-600 text-sm">{p.createdBy?.name || "Unknown"}</td>
                    {(user?.role === "admin" || user?.role === "manager") && (
                      <td className="p-5 text-right">
                        <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition">
                          <FiTrash2 size={18} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
                {projects.length === 0 && <tr><td colSpan="4" className="p-10 text-center text-slate-500">No projects found.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;