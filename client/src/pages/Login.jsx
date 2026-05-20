import { useState } from "react";
import API from "../api";
import "../styles/auth.css";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", form);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      alert("Login success!");
      window.location.href = "/jobs";
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="authPage">

      <div className="authCard">

        <h1>Welcome Back</h1>
        <p>Login to continue</p>

        <form onSubmit={handleSubmit} className="authForm">

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button type="submit">Login</button>

        </form>

      </div>

    </div>
  );
}