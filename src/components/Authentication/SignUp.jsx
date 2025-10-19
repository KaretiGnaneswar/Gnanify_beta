import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createServiceClient } from "@/lib/api/client";
import { config } from "@/lib/config";

const SignupForm = ({ onSignup, switchToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) return setError("Fill all fields");
    if (password !== confirmPassword) return setError("Passwords do not match");

    try {
      setLoading(true);
      const client = createServiceClient(config.apiBaseUrl, {
        getToken: () => localStorage.getItem("auth_token"),
      });

      const data = await client.post("/core/signup/", { email, password });

      if (!data?.token) {
        setError("Signup failed");
        return;
      }

      localStorage.setItem("auth_token", data.token);
      onSignup?.(data.token);

      // ✅ Redirect to root (gnanify.com)
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm bg-gray-800/90 rounded-3xl shadow-xl p-6 md:p-8 border border-gray-700">
      <h2 className="text-3xl font-extrabold text-center text-orange-400 mb-6">Create Account</h2>
      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
          disabled={loading}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
          disabled={loading}
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
          disabled={loading}
        />
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-orange-400 text-white font-semibold hover:bg-orange-500 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Signing up…" : "Sign Up"}
        </button>
      </form>

      <p className="mt-5 text-center text-gray-300 text-sm">
        Already have an account?{" "}
        <span className="text-orange-400 cursor-pointer hover:underline" onClick={switchToLogin}>
          Login
        </span>
      </p>
    </div>
  );
};

export default SignupForm;
