import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { api } from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { isAuthenticated } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-card">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Name
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            required
            value={form.password}
            onChange={handleChange}
          />
        </label>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
