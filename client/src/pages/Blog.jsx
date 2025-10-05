import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { LoaderIcon } from "react-hot-toast";

import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useBlogStore } from "../stores/useBlogStore";

const Blog = () => {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ name: "", content: "" });

  const {
    fetchAllCommentsById,
    fetchAllBlogById,
    currentBlog,
    currentComments,
    AddComments,
    loading,
  } = useBlogStore();

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllBlogById(id);
      await fetchAllCommentsById(id);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (currentBlog) setData(currentBlog);
    if (currentComments) setComments(currentComments);
  }, [currentBlog, currentComments]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (!form.name || !form.content) return;

    await AddComments(id, form.name, form.content);
    
    setForm({ name: "", content: "" });
  };

  if (!data) return <Loader />;

  return (
    <div className="relative">
      <img
        src={assets.gradientBackground}
        alt="gradient background"
        className="absolute -top-50 -z-1 opacity-50"
      />

      <Navbar />

      {/* Blog Header */}
      <div className="text-center mt-20 text-gray-600 px-4">
        <p className="text-primary py-4 font-medium">
          Published on {moment(data.createdAt).format("MMMM DD, YYYY")}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-3xl mx-auto text-gray-800">
          {data.title}
        </h1>
        <h2 className="my-5 max-w-lg mx-auto text-gray-500">
          {data.subTitle}
        </h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/40 bg-primary/10 text-primary font-medium">
          John Doe
        </p>
      </div>

      {/* Blog Image & Content */}
      <div className="mx-5 max-w-5xl md:mx-auto my-10">
        <img
          src={data.image}
          alt="blog"
          className="rounded-3xl mb-5 w-full object-cover"
        />
        <div
          dangerouslySetInnerHTML={{ __html: data.description }}
          className="rich-text max-w-3xl mx-auto text-gray-700"
        />
      </div>

      {/* Comment List */}
      <div className="mt-14 mb-10 max-w-3xl mx-auto">
        <p className="font-semibold text-2xl mb-4 text-gray-800">
          Comments ({comments.length})
        </p>

        <div className="flex flex-col gap-4">
          {comments.map((item) => (
            <div
              key={item._id}
              className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600"
            >
              <div className="flex items-center gap-2 mb-2">
                <img src={assets.user_icon} alt="user" className="w-6" />
                <p className="font-medium">{item.name}</p>
              </div>
              <p className="text-sm">{item.content}</p>
              <div className="absolute right-4 bottom-3 text-xs text-gray-500">
                {moment(item.createdAt).fromNow()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Comment Form */}
      <div className="max-w-3xl mx-auto px-4">
        <p className="font-semibold mb-4 text-gray-800">Add Your Comment</p>
        <form
          onSubmit={addComment}
          className="flex flex-col items-start gap-4 max-w-lg mx-auto"
        >
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded outline-none"
          />

          <textarea
            name="content"
            placeholder="Comment"
            value={form.content}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded outline-none h-48"
          />

          <button
            type="submit"
            disabled={loading}
            className={`bg-primary text-white py-2 px-8 rounded hover:scale-105 transition-all cursor-pointer ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? <LoaderIcon className="w-6 h-6 animate-spin" /> : "Submit"}
          </button>
        </form>
      </div>

      {/* Social Share */}
      <div className="my-24 max-w-3xl mx-auto">
        <p className="font-semibold my-4 text-gray-800">
          Share this article on social media
        </p>
        <div className="flex gap-4">
          <img src={assets.facebook_icon} width={40} alt="facebook" />
          <img src={assets.twitter_icon} width={40} alt="twitter" />
          <img src={assets.googleplus_icon} width={40} alt="google plus" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
