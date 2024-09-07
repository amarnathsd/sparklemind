// UserDashboard.js
import React, { useState } from "react";
import { auth } from "../firebase";
import { updatePassword } from "firebase/auth";
import { toast } from "react-toastify";

const Admin = () => {
  const [password, setPassword] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      toast.error("Password must contain 8 characters, including a number and special character.");
      return;
    }
    try {
      await updatePassword(auth.currentUser, password);
      toast.success("Password updated successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    return regex.test(password);
  };

  return (
    <form onSubmit={handlePasswordChange}>
      <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Update Password</button>
    </form>
  );
};

export default Admin;
