// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Register from "./screens/Register";
import Login from "./screens/Login";
import UserDashboard from "./screens/UserDashboard";
import AdminPanel from "./screens/Admin";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;
