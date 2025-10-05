import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useBlogStore = create((set) => ({
  loading: false,
  blogs: [],
  currentBlog: null,
  currentComments: null,
  Comments: [],
  searchTerm: "",

  setSearchTerm: (term) => set({ searchTerm: term }),

  fetchAllBlogs: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/blog/all");
      set({ blogs: response.data.blogs, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  fetchAllCommentsById: async (blogId) => {
    set({ loading: true });

    try {
      const resp = await axios.post("/blog/comments", {
        blogId,
      });
      set({ currentComments: resp.data.comments });
    } catch (error) {
      toast.error(error.message || "Internal server error!!");
    } finally {
      set({ loading: false });
    }
  },

  fetchAllBlogById: async (blogId) => {
    set({ loading: true });
    try {
      const resp = await axios.get(`/blog/${blogId}`);
      set({ currentBlog: resp.data.blog });
    } catch (error) {
      toast.error(error.message || "Internal server error!!");
    } finally {
      set({ loading: false });
    }
  },

  AddComments: async (blogId, name, content) => {
    try {
      set({ loading: true });
      const resp = await axios.post(`/blog/add-comment`, {
        blog: blogId,
        name,
        content,
      });
      toast.success(resp.data.message);
    } catch (error) {
      toast.error(resp.data.message);
    } finally {
      set({ loading: false });
    }
  },

  deleteComment: async (blogId) => {
    try {
      set({ loading: true });
      const resp = await axios.post("/admin/delete-comment", {
        id: blogId,
      });
      toast.success(resp.data.message);
    } catch (error) {
      toast.error(
        error.response ? error.response.data.message : "An error occurred."
      );
    } finally {
      set({ loading: false });
    }
  },

  approveComment: async (blogId) => {
    try {
      set({ loading: true });
      const resp = await axios.post("/admin/approve-comment", {
        id: blogId,
      });
      toast.success(resp.data.message);
    } catch (error) {
      toast.error(error.resp ? error.resp.data.message : "An error occurred.");
    } finally {
      set({ loading: false });
    }
  },

  generateComments: async (params) => {
    try {
      set({ loading: true });
      const resp = await axios.post("/blog/genrate", {
        prompt: params,
      });
      return resp; 
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },
}));
