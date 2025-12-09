import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
  },
  { timestamps: { createdAt: "subscribedAt", updatedAt: false } }
);

export default mongoose.model("Newsletter", newsletterSchema);

