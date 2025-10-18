import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createServiceClient } from "@/lib/api/client";
import { config } from "@/lib/config";

const LoginForm = ({ onLogin, switchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      return setError("Enter both email and password");
    }

    try {
      const authed = createServiceClient(config.apiBaseUrl, {
        getToken: () => localStorage.getItem("auth_token"),
      });
      const data = await authed.post("/core/login/", {
        email: trimmedEmail,
        password: trimmedPassword,
      });
      if (!data?.token) {
        setError("Login failed");
        return;
      }
      localStorage.setItem("auth_token", data.token);
      onLogin?.(data.token);
      // Hard redirect so App shell re-evaluates auth and loads dashboard immediately
      if (typeof window !== 'undefined') {
        window.location.href = '/dashboard';
        return;
      }
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError("Network error");
    }
  };

  return (
    <div className="w-full max-w-sm bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-8 border border-gray-700">
      <h2 className="text-3xl font-extrabold text-center text-orange-400 mb-6">
        Welcome Back
      </h2>
      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
        />
        <button className="w-full py-3 rounded-xl bg-orange-400 text-white font-semibold hover:bg-orange-500 transition-colors">
          Login
        </button>
      </form>

      <p className="mt-5 text-center text-gray-300 text-sm">
        Don't have an account? {" "}
        <span
          className="text-orange-400 cursor-pointer hover:underline"
          onClick={switchToSignup}
        >
          Create one
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
