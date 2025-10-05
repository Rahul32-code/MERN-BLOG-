import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";
import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";

const genrateTokens = (id) => {
  const accessToken = jwt.sign({ id }, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  return { accessToken };
};

const setCookies = (res, accessToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, //1 day
  });
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(400).json({
        message: "Invalid email or password.",
      });
    }

    const { accessToken } = genrateTokens(admin._id);

    setCookies(res, accessToken);

    res.status(200).json({
      id: admin._id,
      email: admin.email,
      token: accessToken,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
};

export const adminLogout = async (req, res) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(400).json({ message: "No refresh token found!" });
    }

    res.clearCookie("accessToken");

    res.status(200).json({ message: "Logout Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const accessToken = async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blog = await Blog.find({}).sort({ createdAt: -1 });

    res.status(200).json({ blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllComment = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate("blog")
      .sort({ createdAt: -1 });

    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const recentBlog = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const blogCount = await Blog.countDocuments();
    const commentCount = await Comment.countDocuments();
    const draftCount = await Blog.countDocuments({ isPublished: false });

    const dashboardData = {
      recentBlog,
      blogCount,
      commentCount,
      draftCount,
    };

    res.status(200).json({
      dashboardData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndDelete(id);

    res.status(200).json({ message: "comment delete successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approvedCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndUpdate(id, { isApproved: true });

    res.status(200).json({ message: "comment approve successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
