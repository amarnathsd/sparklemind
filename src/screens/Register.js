import React, { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
    phone: "",
  });
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaptcha = (value) => {
    setCaptchaVerified(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaVerified) {
      toast.error("Please verify the captcha!");
      return;
    }
    if (!validatePassword(formData.password)) {
      toast.error(
        "Password must contain 8 characters, including a number and special character. like Amar@123"
      );
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      await sendEmailVerification(user);
      toast.success("Registration successful! Please verify your email.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    return regex.test(password);
  };

  const handleResendVerification = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      toast.success("Verification email resent.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handelloginroute = () => {
    window.location.href = "/";
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-lg w-100" style={{ maxWidth: "500px" }}>
        <h3 className="text-center mb-4">Register</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="firstName">First Name</label>
            <input
              name="firstName"
              type="text"
              className="form-control"
              id="firstName"
              placeholder="Enter your first name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="lastName">Last Name</label>
            <input
              name="lastName"
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Enter your last name"
              onChange={handleChange}
              required
            />
          </div>
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
          <div className="form-group mb-3">
            <label htmlFor="country">Country</label>
            <input
              name="country"
              type="text"
              className="form-control"
              id="country"
              placeholder="Enter your country"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="phone">Phone Number</label>
            <input
              name="phone"
              type="tel"
              className="form-control"
              id="phone"
              placeholder="Enter your phone number"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <ReCAPTCHA
              sitekey="6LdiGTkqAAAAAIiCvVAUcOetiJqmISFGWmvrIs8H"
              onChange={handleCaptcha}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-2">Register</button>
          <button
            type="button"
            className="btn btn-secondary w-100 mb-2"
            onClick={handleResendVerification}
          >
            Resend Verification
          </button>
          <button type="button" className="btn btn-link w-100" onClick={handelloginroute}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
