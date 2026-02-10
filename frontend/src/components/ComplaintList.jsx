import { useEffect, useState } from "react";

export default function ComplaintList() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://aditya-hostel-app.onrender.com/api/complaints",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();
      setComplaints(data);
    };

    fetchComplaints();
  }, []);

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>📋 My Complaints</h3>

      {complaints.length === 0 && (
        <p>No complaints submitted yet</p>
      )}

      {complaints.map((c) => {
        const status = c.status.toLowerCase();

        return (
          <div
            key={c._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "12px",
              borderRadius: "8px",
              background: "#fafafa"
            }}
          >
            <p><b>Message:</b> {c.message}</p>

            <p>
              <b>Status:</b>{" "}
              <span
                style={{
                  color:
                    status === "pending"
                      ? "orange"
                      : status === "resolved"
                      ? "green"
                      : "red",
                  fontWeight: "bold"
                }}
              >
                {c.status}
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
}
