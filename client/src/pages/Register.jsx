import { useState } from "react";
import API from "../api";
import "../styles/auth.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "developer",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);
      alert("User registered!");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="authPage">

      <div className="authCard">

        <h1>Create Account</h1>
        <p>Join DevHire today</p>

        <form onSubmit={handleSubmit} className="authForm">

          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="developer">Developer</option>
            <option value="recruiter">Recruiter</option>
          </select>

          <button type="submit">Create Account</button>

        </form>

      </div>

    </div>
  );
}