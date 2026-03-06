import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const users = await User.find({ tenantId: req.user.tenantId }).select(
      "-password",
    );
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/create", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      tenantId: req.user.tenantId,
    });

    res
      .status(201)
      .json({ message: "User created successfully", userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
