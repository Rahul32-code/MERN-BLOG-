import React, { useEffect, useState } from "react";
import { blogCategories } from "../assets/assets";
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import { useBlogStore } from "../stores/useBlogStore";
import { PiMaskSad } from "react-icons/pi";

const BlogList = () => {
  const { blogs, loading, fetchAllBlogs, searchTerm, setSearchTerm } = useBlogStore();
  const [menu, setMenu] = useState("All");

  useEffect(() => {
    fetchAllBlogs();
  }, [fetchAllBlogs, searchTerm]);

  const filterBlogs = () => {
    let filteredBlogs = blogs;

    // Filter by category
    if (menu !== "All") {
      filteredBlogs = filteredBlogs.filter((blog) => blog.category === menu);
    }

    // Filter by search term
    if (searchTerm !== "") {
      filteredBlogs = filteredBlogs.filter(
        (blog) =>
          blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.content?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filteredBlogs;
  };

  const filteredBlogs = filterBlogs();
  return (
    <div>
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((item, index) => (
          <div key={index} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer text-gray-500 ${
                menu === item && "text-white px-4 pt-0.5"
              }`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                  className="absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full"
                ></motion.div>
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mx-8 sm:mx-16 xl:mx-40">
        {loading ? (
          <div>Loading...</div>
        ) : filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        ) : (
          <div className="col-span-full text-center text-xl text-gray-500 mt-12">
            <div className="p-6 text-gray-700 rounded-lg shadow-xl mx-auto animate-fadeIn">
              <PiMaskSad
                className="mx-auto mb-4 w-24 h-24  animate-bounce text-primary"
                size={100}
              />
              <h2 className="text-2xl font-semibold mb-2 animate-fadeInText">
                Oops! No Blogs Found
              </h2>
              <p className="text-lg mb-4 animate-fadeInText">
                We couldn't find any blogs matching your search criteria.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
