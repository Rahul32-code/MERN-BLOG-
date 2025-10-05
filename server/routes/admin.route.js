import { Router } from "express";
import {
  accessToken,
  adminLogin,
  adminLogout,
  approvedCommentById,
  deleteCommentById,
  getAllBlogsAdmin,
  getAllComment,
  getDashboard,
} from "../controllers/admin.controller.js";
import protectRoute from "../middleware/auth.middleware.js";

const adminRoutes = Router();

adminRoutes.post("/login", adminLogin);
adminRoutes.get("/logout", adminLogout);
adminRoutes.get("/accessToken", accessToken);
adminRoutes.get("/comments", protectRoute, getAllComment);
adminRoutes.get("/blogs", protectRoute, getAllBlogsAdmin);
adminRoutes.post("/delete-comment", protectRoute, deleteCommentById);
adminRoutes.post("/approve-comment", protectRoute, approvedCommentById);
adminRoutes.get("/dashboard", protectRoute, getDashboard);

export default adminRoutes;
