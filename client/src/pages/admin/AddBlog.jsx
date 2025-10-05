import { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import Loader from "../../components/Loader";
import { useAdminStore } from "../../stores/useAdminStore";
import toast, { LoaderIcon } from "react-hot-toast";
import { parse } from "marked";
import { useBlogStore } from "../../stores/useBlogStore";

const AddBlog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  const { loading, addBlogs } = useAdminStore();
  const { generateComments } = useBlogStore();

  const generate = async () => {
    if (!title) {
      toast.error("Please enter a blog title to generate content.");
      return;
    }

    try {
      const resp = await generateComments(title);
      if (resp?.data?.content) {
        quillRef.current.root.innerHTML = parse(resp.data.content);
      } else {
        toast.error("No content received from AI.");
      }
    } catch (err) {
      toast.error("Failed to generate content.");
      console.error(err);
    }

    console.log("Generating content with AI...");
  };

  const resetForm = () => {
    setTitle("");
    setSubTitle("");
    setCategory("Startup");
    setIsPublished(false);
    setImage(null);

    if (quillRef.current) {
      quillRef.current.setContents([]);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const blog = {
      title,
      subTitle,
      description: quillRef.current.root.innerHTML,
      category,
      isPublished,
    };

    const formData = new FormData();
    formData.append("blog", JSON.stringify(blog));
    formData.append("image", image);

    await addBlogs(formData);

    resetForm();
  };

  useEffect(() => {
    // Initialize Quill editor only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl px-4 md:p-10 sm:m-10 shadow rounded">
        {/* Thumbnail */}
        <p className="mt-4">Upload thumbnail</p>
        <label htmlFor="image">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt="Thumbnail"
            className="mt-12 h-16 rounded cursor-pointer"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </label>

        {/* Title */}
        <p className="mt-4">Blog title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        {/* Sub Title */}
        <p className="mt-4">Sub title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setSubTitle(e.target.value)}
          value={subTitle}
        />

        {/* Quill Editor */}
        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef}></div>
          {loading && (
            <div className="absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2">
              <div className="w-8 h-8 rounded-full border-2 border-t-white animate-spin"></div>
            </div>
          )}
          <button
            disabled={loading}
            type="button"
            onClick={generate}
            className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer"
          >
            Generate with AI
          </button>
        </div>

        {/* Category */}
        <p className="mt-4">Blog category</p>
        <select
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          id=""
          className="mt-2 px-3 border border-gray-300 text-gray-500 outline-none rounded"
        >
          <option value="">Select Category</option>
          {blogCategories.map((item, index) => {
            return (
              <option value={item} key={index}>
                {item}
              </option>
            );
          })}
        </select>

        {/* Published Checkbox */}
        <div className="flex gap-2 mt-4">
          <p>Published Now</p>
          <input
            onChange={(e) => setIsPublished(e.target.checked)}
            type="checkbox"
            name="isPublished"
            className="scale-125 cursor-pointer"
            checked={isPublished}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm flex items-center justify-center"
        >
          {loading ? <LoaderIcon className="spinner w-6 h-6" /> : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
