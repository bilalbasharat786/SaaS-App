import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    plan: { type: String, default: "free" },
  },
  { timestamps: true },
);

export default mongoose.model("Tenant", tenantSchema);
