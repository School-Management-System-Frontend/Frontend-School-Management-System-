import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import backgroundImage from '../assets/background.jpg';

const GlassAuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [specularStyle, setSpecularStyle] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSpecularStyle({
      background: `radial-gradient(circle at ${x}px ${y}px,
        rgba(255,255,255,0.15) 0%,
        rgba(255,255,255,0.05) 30%,
        rgba(255,255,255,0) 60%)`,
    });
  };

  const handleMouseLeave = () => {
    setSpecularStyle({});
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Form submitted:", formData);
    alert(isLogin ? "Login successful!" : "Registration successful!");

    // Reset form
    setFormData({ username: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[url('/background.jpg')] bg-cover bg-center text-black">
      <svg style={{ display: "none" }}>
        <filter id="glass-distortion">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.008"
            numOctaves="2"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="77" />
        </filter>
      </svg>

      <div
        className="relative w-[400px] min-h-[450px] rounded-2xl shadow-2xl overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Glass Layers */}
        <div
          className="absolute inset-0 backdrop-blur-md z-[1]"
          style={{ filter: "url(#glass-distortion) saturate(120%) brightness(1.15)" }}
        />
        <div className="absolute inset-0 bg-white/20 dark:bg-black/25 z-[2]" />
        <div className="absolute inset-0 z-[3]" style={specularStyle} />

        {/* Form Content */}
        <div className="relative z-[4] p-8">
          {isLogin ? (
            <div className="transition-all duration-500">
              <h3 className="text-2xl font-bold text-center mb-6">Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="relative mb-5">
                  <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-200" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-white/40 placeholder-gray-300"
                  />
                </div>
                <div className="relative mb-5">
                  <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-200" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-white/40 placeholder-gray-300"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-black/70 text-amber-50 border border-white/30 rounded-xl font-semibold hover:bg-white/30 hover:text-black transition cursor-pointer"
                >
                  Login
                </button>
              </form>
              <p className="text-sm text-center mt-5 opacity-80">
                Don’t have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-white font-semibold hover:underline cursor-pointer"
                >
                  Sign up
                </button>
              </p> 
            </div>
          ) : (
            <div className="transition-all duration-500">
              <h3 className="text-2xl font-bold text-center mb-6">Sign up</h3>
              <form onSubmit={handleSubmit}>
                <div className="relative mb-4">
                  <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-200" />
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-white/40 placeholder-gray-300"
                  />
                </div>
                <div className="relative mb-4">
                  <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-200" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-white/40 placeholder-gray-300"
                  />
                </div>
                <div className="relative mb-4">
                  <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-200" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-white/40 placeholder-gray-300"
                  />
                </div>
                <div className="relative mb-5">
                  <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-200" />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-white/40 placeholder-gray-300"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-black/70 text-amber-50 border border-white/30 rounded-xl font-semibold hover:bg-white/30 hover:text-black transition cursor-pointer"
                >
                  Sign Up
                </button>
              </form>
              <p className="text-sm text-center mt-5 opacity-80">
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-white font-semibold hover:underline cursor-pointer"
                >
                  Login
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlassAuthForm;
