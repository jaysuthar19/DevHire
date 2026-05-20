import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../styles/createJob.css";

export default function CreateJob() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
 
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/jobs", form, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert("Job created");
    navigate("/jobs");
  };

  return (
    <div className="createPage">

      <div className="createCard">

        <h1>Create Job 🚀</h1>

        <form onSubmit={handleSubmit}>

          <input name="title" placeholder="Title" onChange={handleChange} />
          <input name="company" placeholder="Company" onChange={handleChange} />
          <input name="location" placeholder="Location" onChange={handleChange} />
          <input name="salary" placeholder="Salary" onChange={handleChange} />

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />

          <button type="submit">Create Job</button>

        </form>

      </div>
    </div>
  );
}