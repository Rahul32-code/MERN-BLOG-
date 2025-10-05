import React from "react";
import { assets, footer_data } from "../assets/assets";

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/30">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/3 text-gray-500">
        <div>
          <img src={assets.logo} alt="logo" className="w-32 sm:w-44" />
          <p className="max-w-[410px] mt-6">
            This is a place where you can share your knowledge and experience
            with the world. You can write articles on any topic and share them
            with the world
          </p>
        </div>

        <div className="flex flex-wrap justify-between gap-5 w-full md:w-[45%]">
          {footer_data.map((data, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                {data.title}
              </h3>
              <ul className="text-sm space-y-1">
                {data.title === "Follow Us"
                  ? data.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.url} // Use the URL for social links
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline transition-all duration-500"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))
                  : data.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href="#"
                          className="hover:underline transition-all duration-500"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className="py-4 text-center text-sm md:text-base text-gray-500">
        Copyright 2025 &copy; QuickBlog{" "}
        <a
          href="https://rahulcode.in"
          className="text-primary animate-pulse transition-all duration-500"
        >
          Rahul Developer
        </a>{" "}
        - All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
