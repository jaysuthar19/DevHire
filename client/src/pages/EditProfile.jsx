import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../styles/editProfile.css";
 
export default function EditProfile() {
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState(null);
  const [resume, setResume] = useState(null);

  const [experience, setExperience] = useState([
    { company: "", role: "", duration: "" }
  ]);

  const [education, setEducation] = useState([
    { college: "", degree: "", year: "" }
  ]);

  const [profile, setProfile] = useState({
    bio: "",
    skills: "",
    github: "",
    portfolio: ""
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await API.get("/user/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setProfile({
        bio: data.bio || "",
        skills: data.skills?.join(", ") || "",
        github: data.github || "",
        portfolio: data.portfolio || ""
      });

      if (data.experience?.length) setExperience(data.experience);
      if (data.education?.length) setEducation(data.education);
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("bio", profile.bio);
    formData.append("skills", profile.skills);
    formData.append("github", profile.github);
    formData.append("portfolio", profile.portfolio);
    formData.append("experience", JSON.stringify(experience));
    formData.append("education", JSON.stringify(education));

    if (resume) formData.append("resume", resume);
    if (avatar) formData.append("avatar", avatar);

    await API.put("/user/profile", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });

    alert("Profile Updated 🚀");
    navigate("/profile");
  };

  return (
    <div className="edit-container">

      <div className="edit-box">

        <h1>Edit Profile</h1>

        <form onSubmit={handleSubmit} className="edit-form">

          <label>Bio</label>
          <textarea name="bio" value={profile.bio} onChange={handleChange} />

          <label>Skills</label>
          <input name="skills" value={profile.skills} onChange={handleChange} />

          <label>Avatar</label>
          <input type="file" onChange={(e) => setAvatar(e.target.files[0])} />

          <label>GitHub</label>
          <input name="github" value={profile.github} onChange={handleChange} />

          <label>Portfolio</label>
          <input name="portfolio" value={profile.portfolio} onChange={handleChange} />

          <label>Resume</label>
          <input type="file" onChange={(e) => setResume(e.target.files[0])} />

          <button type="submit">Save Changes</button>

        </form>

      </div>
    </div>
  );
}