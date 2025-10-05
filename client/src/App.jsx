// App.js

import React, { useRef, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import AddBlog from "./pages/admin/AddBlog";
import ListBlog from "./pages/admin/ListBlog";
import Comments from "./pages/admin/Comments";
import Login from "./components/admin/Login";
import "quill/dist/quill.snow.css";
import { Toaster } from "react-hot-toast";
import LoadingBar from "react-top-loading-bar";
import { useAdminStore } from "./stores/useAdminStore";

const App = () => {
  const ref = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (ref.current) {
      ref.current.continuousStart();
    }

    const timeout = setTimeout(() => {
      if (ref.current) {
        ref.current.complete();
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [location]);

  const { token, accessToken } = useAdminStore();

  useEffect(() => {
    accessToken();
  }, [accessToken]);

  return (
    <div>
      {/* <LoadingBar color="#5044E5" ref={ref} height={3} /> */}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />

        {/* Admin routes */}
        <Route path="/admin" element={token ? <Layout /> : <Login />}>
          <Route index element={<Dashboard />} />
          <Route path="addBlog" element={<AddBlog />} />
          <Route path="listBlog" element={<ListBlog />} />
          <Route path="comments" element={<Comments />} />
        </Route>
      </Routes>

      {/* toaster */}
      <Toaster position="bottom-right" reverseOrder={true} />
    </div>
  );
};

export default App;
