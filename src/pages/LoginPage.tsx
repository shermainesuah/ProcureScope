import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (email === "admin@example.com" && password === "123") {
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white p-10 rounded-2xl shadow-lg font-sans">
        <h2 className="text-2xl font-bold text-center mb-2 text-primary">
          Welcome back,
        </h2>
        <p className="text-center text-gray-600">
          login with your credentials to continue.
        </p>

        <form onSubmit={handleLogin} className="mt-10">
          <div className="gap-2 flex flex-col">
            <label className="block text-sm font-semibold text-text-primary">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-1 border rounded-lg bg-white border-primary text-text-primary focus:outline-none focus:ring-1 focus:border-secondary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="gap-2 flex flex-col mt-6 mb-8">
            <label className="block text-sm font-semibold text-text-primary">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 border border-primary bg-white rounded-lg focus:outline-none focus:ring-1 focus:border-secondary text-text-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-text-secondary text-sm self-end ">
              Forgot password?
            </p>
          </div>
          {error && (
            <p className="text-error mb-4 mt-6 text-center text-sm">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-secondary text-white py-2 rounded-lg hover:bg-primary hover:border-primary transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
