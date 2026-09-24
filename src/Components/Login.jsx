import { useState } from "react";
import api from "../Services/api";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      console.log("Login response:", response.data);

      onLogin();
    } catch (error) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">

        <h1 className="text-2xl font-bold text-center mb-6">
          Product Admin Dashboard
        </h1>

        <form onSubmit={handleLogin}>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;