import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useAdminStore = create((set) => ({
  admin: null,
  loading: false,
  token: null,
  adminBlogs: [],
  dashboards: [],
  Comments:[],

  login: async (email, password) => {
    set({ loading: true });

    try {
      const resp = await axios.post("/admin/login", { email, password });

      set({ admin: resp.data.email, token: resp.data.token, loading: false });

      toast.success("Login successful!");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An error occurred during login"
      );
    } finally {
      set({ loading: false });
    }
  },

  accessToken: async () => {
    set({ loading: true });

    try {
      const resp = await axios.get("/admin/accessToken");

      const { accessToken } = resp.data;
      //   console.log(resp);
      set({ token: accessToken, loading: false });
      //   toast.success("Access token fetched");
    } catch (error) {
      set({ loading: false });
      //   toast.error(
      //     error?.response?.data?.message || "Failed to fetch access token"
      //   );
    }
  },

  Logout: async () => {
    set({ loading: true });
    try {
      const resp = await axios.get("/admin/logout");

      toast.success(resp.data.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An error occurred during login"
      );
    } finally {
      set({ loading: false });
    }
  },

  addBlogs: async (formData) => {
    set({ loading: true });
    try {
      const resp = await axios.post("/blog/add", formData);
      toast.success(resp.data.message);
    } catch (error) {
      toast.error(error.message || "Failed to add blog");
    } finally {
      set({ loading: false });
    }
  },

  getBlogs: async () => {
    set({ loading: true });

    try {
      const resp = await axios.get("/admin/blogs");
      set({ adminBlogs: resp.data.blog });
    } catch (error) {
      toast.error(error.message || "Internal server error!!");
    } finally {
      set({ loading: false });
    }
  },

  toogle: async (id) => {
    set({ loading: true });

    try {
      const resp = await axios.post("/blog/toogle-published", {
        id,
      });
      toast.success(resp.data.message);
    } catch (error) {
      toast.error(error.message || "Internal server error!!");
    } finally {
      set({ loading: false });
    }
  },

  deleteBlog: async (id) => {
    set({ loading: true });

    try {
      const resp = await axios.post("/blog/delete", {
        blogId: id, 
      });
      toast.success(resp.data.message);
    } catch (error) {
      toast.error(error.message || "Internal server error!!");
    } finally {
      set({ loading: false });
    }
  },
  
  DashboardData: async (id) => {
    set({ loading: true });

    try {
      const resp = await axios.get("/admin/dashboard");
      set({ dashboards: resp.data.dashboardData })
    } catch (error) {
      toast.error(error.message || "Internal server error!!");
    } finally {
      set({ loading: false });
    }
  },

  dashboardComments: async () => {
    set({ loading: true });

    try {
      const resp = await axios.get("/admin/comments");
      set({ Comments: resp.data.comments })
    } catch (error) {
      toast.error(error.message || "Internal server error!!");
    } finally {
      set({ loading: false });
    }
  }
}));
