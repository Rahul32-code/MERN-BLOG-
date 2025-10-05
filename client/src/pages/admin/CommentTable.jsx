import React from "react";
import { assets } from "../../assets/assets";
import { useBlogStore } from "../../stores/useBlogStore";

const CommentTable = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id } = comment;
  const blogDate = new Date(createdAt);

  const { deleteComment, loading, approveComment } = useBlogStore();

  const handleApprove = async () => {
    await approveComment(_id);
    fetchComments();
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (isConfirmed) {
      await deleteComment(_id);
      fetchComments();
    }
  };

  return (
    <tr className="border-y border-gray-300">
      <td className="px-6 py-4">
        <b className="font-medium text-gray-600">Blog</b>: {blog.title}
        <br />
        <br />
        <b className="font-medium text-gray-600">Name</b>: {comment.name}
        <br />
        <b className="font-medium text-gray-600">Comments</b>: {comment.content}
      </td>
      <td className="px-6 py-4 max-sm:hidden">
        {blogDate.toLocaleDateString()}
      </td>
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          {!comment.isApproved ? (
            <img
              src={assets.tick_icon}
              className="w-5 hover:scale-110 transition-all cursor-pointer"
              alt="Approve"
              onClick={handleApprove}
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 px-3 py-1 rounded-full">
              Approved
            </p>
          )}

          <img
            src={assets.bin_icon}
            alt="Delete"
            className="w-5 hover:scale-110 transition-all cursor-pointer"
            onClick={handleDelete}
            disabled={loading}
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTable;
