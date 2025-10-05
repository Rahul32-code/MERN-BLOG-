import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useBlogStore } from "../stores/useBlogStore";

const Header = () => {
  const [input, setInput] = useState("");
  const { setSearchTerm } = useBlogStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(input);
  };

  const handleClear = () => {
    setInput(""); // Clear the input field
    setSearchTerm(""); // Clear the search term in the store
  };

  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="text-center mt-20 mb-8">
        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary">
          <p>New: Ai Feature integrated</p>
          <img src={assets.star_icon} alt="star_icon" className="w-2.5" />
        </div>

        <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700">
          Your own <span className="text-primary">blogging</span>
          <br /> platform
        </h1>

        <p className="my-6 sm:my-8 max-w-2xl mx-auto max-sm:text-xs text-gray-500">
          This is a place where you can share your knowledge and experience with
          the world. You can write articles on any topic and share them with
          the world.
        </p>

        <form
          action=""
          className="flex justify-center max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="search"
            placeholder="Search for articles"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full pl-4 outline-none"
          />
          <button
            type="submit"
            className="bg-primary text-white py-2 px-8 m-1.5 rounded hover:scale-105 transition-all cursor-pointer"
          >
            Search
          </button>
        </form>

        {/* Clear Search Button */}
        {input && (
          <div className="text-center mt-4">
            <button
              onClick={handleClear}
              className="border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      <img
        src={assets.gradientBackground}
        alt="gradientbg"
        className="absolute -top-50 -z-1 opacity-50"
      />
    </div>
  );
};

export default Header;
