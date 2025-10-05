import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  return (
    <div className="flex flex-col border-r border-gray-200 m-h-full p-6">
      <NavLink
        to="/admin"
        end={true}
        className={({ isActive }) =>
          ` flex items-center gap-3 p-3.5 px-3 md:px-9 md:min-w-64 cursor pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary"
          }`
        }
      >
        <img src={assets.home_icon} alt="Home" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Dashboard</p>
      </NavLink>
      <NavLink
        to="/admin/addBlog"
        className={({ isActive }) =>
          ` flex items-center gap-3 p-3.5 px-3 md:px-9 md:min-w-64 cursor pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary"
          }`
        }
      >
        <img src={assets.blog_icon} alt="Home" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Add Blog</p>
      </NavLink>
      <NavLink
        to="/admin/listBlog"
        className={({ isActive }) =>
          ` flex items-center gap-3 p-3.5 px-3 md:px-9 md:min-w-64 cursor pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary"
          }`
        }
      >
        <img src={assets.list_icon} alt="Home" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Blog List</p>
      </NavLink>
      <NavLink
        to="/admin/comments"
        className={({ isActive }) =>
          ` flex items-center gap-3 p-3.5 px-3 md:px-9 md:min-w-64 cursor pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary"
          }`
        }
      >
        <img src={assets.comment_icon} alt="Home" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Comments</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
