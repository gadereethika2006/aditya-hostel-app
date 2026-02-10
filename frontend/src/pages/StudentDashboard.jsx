import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ComplaintForm from "../components/ComplaintForm";
import ComplaintList from "../components/ComplaintList";
import Navbar from "../components/Navbar";

export default function StudentDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Navbar />

      <div style={{ padding: "40px" }}>
        <h2>Student Dashboard</h2>

        {/* Complaint submit */}
        <ComplaintForm />

        <hr style={{ margin: "30px 0" }} />

        {/* Complaint status list */}
        <ComplaintList />
      </div>
    </>
  );
}
