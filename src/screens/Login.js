import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword} from "firebase/auth";
import { toast } from "react-toastify";
import '../App.css'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      if (!user.emailVerified) {
        toast.warn("Please verify your email.");
        return;
      }
      window.location.href = '/dashboard';
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSigninRoute = () => {
    window.location.href = "/register";
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-lg w-100" style={{ maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-2">Login</button>
          <button type="button" className="btn btn-link w-100" onClick={handleSigninRoute}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
