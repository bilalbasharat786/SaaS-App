import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Tenant from "../models/Tenant.js";


const router = express.Router();

router.post("/register-tenant", async (req, res) => {
  try {
    const { companyName, userName, email, password } = req.body;

    const tenantExists = await Tenant.findOne({ name: companyName });
    if (tenantExists)
      return res.status(400).json({ message: "Company name already taken" });

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email already exists" });

    const newTenant = await Tenant.create({ name: companyName });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = await User.create({
      name: userName,
      email,
      password: hashedPassword,
      role: "admin",
      tenantId: newTenant._id,
    });

    res.status(201).json({ message: "Tenant and Admin created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate("tenantId", "name");
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId._id,
      companyName: user.tenantId.name,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
