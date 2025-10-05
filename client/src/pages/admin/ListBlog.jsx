import React, { useEffect, useState } from "react";
import { useAdminStore } from "../../stores/useAdminStore";
import BlogTableItem from "../../components/admin/BlogTableItem";

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const { getBlogs, adminBlogs, loading } = useAdminStore();

  const fetchBlogs = async () => {
    await getBlogs(); 
  };

  useEffect(() => {
    fetchBlogs();
  }, []); 

  useEffect(() => {
    if (adminBlogs.length > 0) {
      setBlogs(adminBlogs); 
    }
  }, [adminBlogs]); 

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/20">
      <h1>All Blogs</h1>

      <div className="relative h-4/5 max-w-4xl overflow-x-auto shadow rounded-lg scroller-hide bg-white">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-600 text-left uppercase">
            <tr>
              <th className="px-2 py-4 xl:px-6" scope="col">
                #
              </th>
              <th className="px-2 py-4" scope="col">
                Blog Title
              </th>
              <th className="px-2 py-4 max-sm:hidden" scope="col">
                Date
              </th>
              <th className="px-2 py-4 max-sm:hidden" scope="col">
                Status
              </th>
              <th className="px-2 py-4" scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  {/* Skeleton Loader for Table Rows */}
                  <div className="animate-pulse">
                    <div className="h-6 bg-gray-300 mb-4 rounded"></div>
                    <div className="h-6 bg-gray-300 mb-4 rounded"></div>
                    <div className="h-6 bg-gray-300 mb-4 rounded"></div>
                  </div>
                </td>
              </tr>
            ) : (
              blogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchBlogs}
                  index={index + 1}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBlog;
