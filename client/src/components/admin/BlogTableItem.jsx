import { assets } from "../../assets/assets";
import { useAdminStore } from "../../stores/useAdminStore";

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt, isPublished, _id } = blog;
  const blogDate = new Date(createdAt);

  const { toogle, loading, deleteComment } = useAdminStore();

  const handleToogle = async (blogId) => {
    await toogle(blogId);
    fetchBlogs();
  };

  const handleDelete = async (blogId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (confirmed) {
      await deleteComment(blogId);
      fetchBlogs();
    }
  };

  return (
    <tr className="border-y border-gray-300">
      <td className="px-2 py-4">{index}</td>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">{blogDate.toDateString()}</td>
      <td className="px-2 py-4 max-sm:hidden">
        <p className={isPublished ? "text-green-600" : "text-orange-600"}>
          {isPublished ? "Published" : "Unpublished"}
        </p>
      </td>
      <td className="px-2 py-4 flex text-xs gap-3">
        <button
          onClick={() => handleToogle(_id)}
          className="border px-2 py-0.5 mt-1 rounded cursor-pointer"
        >
          {isPublished ? "Unpublish" : "Publish"}
        </button>
        <img
          src={assets.cross_icon}
          onClick={() => handleDelete(_id)}
          className="w-8 hover:scale-110 transition-all cursor-pointer"
          alt="Delete blog"
        />
      </td>
    </tr>
  );
};

export default BlogTableItem;
