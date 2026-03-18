import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["admin", "super-admin"],
      default: "admin",
    },

    avatar: {
      type: String,
      default: "",
    },

    permissions: {
      type: [String],
      default: [
        "manage_products",
        "manage_orders",
        "manage_users",
      ],
    }
  }
);

export default mongoose.models.Admin ||
mongoose.model("Admin", AdminSchema);