import { Router } from "express";

import upload from "../middleware/multer.middleware.js";
import protectRoute from "../middleware/auth.middleware.js";
import {
  addBlog,
  addComment,
  deletBlogsById,
  generateContent,
  getAllBlogs,
  getBlogComment,
  getBlogsById,
  tooglePublish,
} from "../controllers/blogkit.controller.js";

const blogRoutes = Router();

blogRoutes.post("/add", upload.single("image"), protectRoute, addBlog);
blogRoutes.get("/all", getAllBlogs);
blogRoutes.get("/:blogId", getBlogsById);
blogRoutes.post("/delete", protectRoute, deletBlogsById);
blogRoutes.post("/toogle-published", protectRoute, tooglePublish);

blogRoutes.post("/add-comment", addComment);
blogRoutes.post("/comments", getBlogComment);

blogRoutes.post("/genrate", protectRoute, generateContent);

export default blogRoutes;
