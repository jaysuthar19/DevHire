import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Applicants from "./pages/Applicants";
import JobDetails from "./pages/JobDetails";
import Notifications from "./pages/Notifications";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import PublicProfile from "./pages/PublicProfile";
import EditProfile from "./pages/EditProfile";
import SavedJobs from "./pages/SavedJobs";
import Inbox from "./pages/Inbox";
import Chat from "./pages/Chat";
import Messages from "./pages/Messages";
import DeveloperDashboard from "./pages/DeveloperDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import MyJobs from "./pages/MyJobs";
import Register from "./pages/Register";
import CreateJob from "./pages/CreateJob";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-violet-500/10 blur-[140px] rounded-full pointer-events-none"></div>

      {/* NAVBAR */}
      <Navbar />

      {/* PAGE CONTAINER */}
      <main className="relative z-10 fade-in">

        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/jobs/:id"
            element={<JobDetails />}
          />

          <Route
            path="/inbox"
            element={<Inbox />}
          />

          <Route
            path="/user/:id"
            element={<PublicProfile />}
          />

          <Route
            path="/developer-dashboard"
            element={
              <DeveloperDashboard />
            }
          />

          <Route
            path="/recruiter-dashboard"
            element={
              <RecruiterDashboard />
            }
          />

          <Route
            path="/messages"
            element={<Messages />}
          />

          <Route
            path="/notifications"
            element={
              <Notifications />
            }
          />

          <Route
            path="/jobs"
            element={<Jobs />}
          />

          <Route
            path="/chat/:id"
            element={<Chat />}
          />

          <Route
            path="/create-job"
            element={<CreateJob />}
          />

          <Route
            path="/my-jobs"
            element={<MyJobs />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/saved-jobs"
            element={<SavedJobs />}
          />

          <Route
            path="/edit-profile"
            element={
              <EditProfile />
            }
          />

          <Route
            path="/applicants/:id"
            element={
              <Applicants />
            }
          />

          <Route
            path="/user/:id"
            element={
              <UserProfile />
            }
          />
        </Routes>
      </main>
    </div>
  );
}