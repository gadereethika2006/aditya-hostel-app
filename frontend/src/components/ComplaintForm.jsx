import { useState } from "react";

export default function ComplaintForm() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submitComplaint = async (e) => {
    e.preventDefault(); // 🔥 VERY IMPORTANT

    if (!message) {
      alert("Complaint message required");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Login again");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ message })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data);
        return;
      }

      alert("Complaint submitted ✅");
      setMessage("");
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitComplaint}>
      <h3>Raise a Complaint</h3>

      <textarea
        placeholder="Enter your complaint"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        style={{ width: "100%" }}
      />

      <br /><br />

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Complaint"}
      </button>
    </form>
  );
}
