import express from "express";
import Project from "../models/Project.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";


const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const projects = await Project.find({
      tenantId: req.user.tenantId,
    }).populate("createdBy", "name email");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post(
  "/",
  protect,
  authorizeRoles("admin", "manager"),
  async (req, res) => {
    try {
      const { title, description, status } = req.body;
      const newProject = await Project.create({
        title,
        description,
        status,
        tenantId: req.user.tenantId,
        createdBy: req.user._id,
      });
      res.status(201).json(newProject);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  async (req, res) => {
    try {
      let project = await Project.findOne({
        _id: req.params.id,
        tenantId: req.user.tenantId,
      });
      if (!project)
        return res
          .status(404)
          .json({ message: "Project not found in your tenant" });

      project = await Project.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  async (req, res) => {
    try {
      const project = await Project.findOneAndDelete({
        _id: req.params.id,
        tenantId: req.user.tenantId,
      });
      if (!project)
        return res
          .status(404)
          .json({ message: "Project not found or not authorized" });

      res.json({ message: "Project deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);

export default router;
