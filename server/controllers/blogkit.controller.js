import fs from "fs";
import imagekit from "../lib/imagekit.js";
import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";
import main from "../config/gemini.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );
    const imageFile = req.file;

    if (
      !title ||
      !subTitle ||
      !description ||
      !category ||
      !imageFile ||
      isPublished === undefined
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Upload file using fs.createReadStream for the 'file' param
    const response = await imagekit.files.upload({
      file: fs.createReadStream(imageFile.path),
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // Delete the local temp file
    fs.unlinkSync(imageFile.path);

    // Generate optimized URL with transformations using helper.buildSrc()
    const optimizedImageUrl = imagekit.helper.buildSrc({
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      src: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: 1280 },
      ],
    });

    // Create blog document
    await Blog.create({
      title,
      subTitle,
      description,
      category,
      isPublished,
      image: optimizedImageUrl,
    });

    res.status(200).json({ message: "Blog added successfully" });
  } catch (error) {
    console.error("Add blog error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBlogsById = async (req, res) => {
  try {
    const blogId = req.params.blogId; // Assuming your route uses `/blogs/:id`
    const blog = await Blog.findById(blogId);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json({ blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletBlogsById = async (req, res) => {
  try {
    const { blogId } = req.body;

    const blog = await Blog.findByIdAndDelete(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await Comment.deleteMany({ blog: blogId });

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

export const tooglePublish = async (req, res) => {
  try {
    const { id } = req.body;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.isPublished = !blog.isPublished;

    await blog.save();

    res.status(200).json({ message: "Blog status updated" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;

    await Comment.create({
      blog,
      name,
      content,
    });

    res.status(200).json({ message: "Comment added for review" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBlogComment = async (req, res) => {
  try {
    const { blogId } = req.body;

    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 }); //current date to get blog

    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;

    const content = await main(
      prompt + "Genrate a blog content for this topic in simple text"
    );

    res.status(200).json({ content });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
