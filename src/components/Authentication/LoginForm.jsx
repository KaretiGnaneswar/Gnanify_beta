import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createServiceClient } from "@/lib/api/client";
import { config } from "@/lib/config";
import { useAuth } from "@/context/AuthContext";

const LoginForm = ({ switchToSignup }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Enter both email and password");
      setLoading(false);
      return;
    }

    try {
      const client = createServiceClient(config.apiBaseUrl);
      const data = await client.post("/core/login/", { email, password });

      if (!data?.token) {
        setError("Login failed");
        setLoading(false);
        return;
      }

      login(data.token); // ✅ AuthContext login
      navigate("/"); // redirect to root
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
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
          disabled={loading}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          disabled={loading}
        />
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-orange-400 text-white font-semibold hover:bg-orange-500 transition-colors disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Logging in…" : "Login"}
        </button>
      </form>

      <p className="mt-5 text-center text-gray-300 text-sm">
        Don't have an account?{" "}
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
