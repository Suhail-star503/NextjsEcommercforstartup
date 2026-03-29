import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
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
      index: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // hide password by default
    },

    role: {
      type: String,
      enum: ["super_admin", "admin", "manager", "support"],
      default: "admin",
    },

    permissions: [
      {
        type: String,
        enum: [
          "manage_users",
          "manage_orders",
          "manage_products",
          "manage_categories",
          "view_reports",
          "manage_coupons",
          "manage_settings",
        ],
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
    },

    loginHistory: [
      {
        ip: String,
        device: String,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    avatar: {
      type: String,
    },

    phone: {
      type: String,
    },

    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite in dev (Next.js / hot reload)
const Admin = mongoose.model("Admin", adminSchema);

export default Admin;