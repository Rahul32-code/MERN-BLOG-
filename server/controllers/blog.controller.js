import cloudinary from "../lib/cloudniary.js";
import Blog from "../models/blog.model.js";

export const addBlog = async (req, res) => {
  try {
    const blogData = JSON.parse(req.body.blog);
    const { title, subTitle, description, category, isPublished } = blogData;

    const imageFile = req.file;

    // console.log("Parsed blog:", blogData);
    // console.log("File:", req.file);

    if (!title || !subTitle || !description || !category || !imageFile || isPublished === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
      folder: "blog",
    });

    const blog = await Blog.create({
      title,
      subTitle,
      description,
      category,
      isPublished,
      image: cloudinaryResponse.secure_url,
    });

    res.status(200).json({ message: "Blog added successfully" });
  } catch (error) {
    console.error("Add blog error:", error);
    res.status(500).json({ message: error.message });
  }
};
