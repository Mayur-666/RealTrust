import React, { useContext, useEffect, useState } from "react";
import AdminNav from "../components/admin/AdminNav";
import { MyContext } from "../utils/Context";
import { useNavigate } from "react-router-dom";

function AdminAuth() {
  const [adminData, setAdminData] = useState({
    username: "",
    password: "",
  });

  const { adminState, setAdminState } = useContext(MyContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({
      ...adminData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (adminData.username === "admin" && adminData.password === "admin") {
      console.log("Admin Login Successful");
      setAdminData({
        username: "",
        password: "",
      });
      const newAdminState = {
        username: adminData.username,
        password: adminData.password,
        isAuth: true,
      };
      setAdminState(newAdminState);
      localStorage.setItem("adminState", JSON.stringify(newAdminState));
      navigate("/admin-page");
    }
  };

  useEffect(() => {
    const storedAdminState = localStorage.getItem("adminState");
    if (storedAdminState && JSON.parse(storedAdminState).isAuth) {
      navigate("/admin-page");
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <AdminNav />
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={adminData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={adminData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminAuth;
