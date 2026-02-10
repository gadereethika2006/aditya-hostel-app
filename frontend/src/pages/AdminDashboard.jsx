import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/dashboard.css";

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const res = await API.get("/complaints");
    setComplaints(res.data);
  };

  const updateStatus = async (id) => {
    await API.put(`/complaints/${id}`, { status: "Resolved" });
    fetchAll();
  };

  return (
    <div className="page">
      <h2 className="title">👨‍💼 Admin Dashboard</h2>

      {complaints.map((c) => (
        <div className="card" key={c._id}>
          <p><b>Complaint:</b> {c.message}</p>

          <span
            className={`badge ${
              c.status === "Resolved"
                ? "badge-resolved"
                : "badge-pending"
            }`}
          >
            {c.status}
          </span>

          <br /><br />

          <button
            className="btn btn-green"
            disabled={c.status === "Resolved"}
            onClick={() => updateStatus(c._id)}
          >
            Mark Resolved
          </button>
        </div>
      ))}
    </div>
  );
}
