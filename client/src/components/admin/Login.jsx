import React, { useState } from "react";
import { useAdminStore } from "../../stores/useAdminStore";
import { LoaderIcon } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loading, login } = useAdminStore();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login(formData.email, formData.password);

    setTimeout(() => {
      useNavigate("/admin");
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-primary">Admin</span> Login
            </h1>
            <p className="text-light">
              Enter your credentials to access the admin panel
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6 w-full sm:max-w-md text-gray-600"
          >
            <div className="flex flex-col">
              <label>Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                placeholder="Your email id"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              />
            </div>
            <div className="flex flex-col">
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                placeholder="Your password"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all flex items-center justify-center"
            >
              {loading ? <LoaderIcon className="spinner w-6 h-6" /> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
