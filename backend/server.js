import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config();
connectDB();

const app = express();

/* ======================
   MIDDLEWARES
   ====================== */
app.use(cors());
app.use(express.json());

/* ======================
   ROUTES
   ====================== */
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

app.get("/api/test", authMiddleware, (req, res) => {
  res.json({
    message: "Token verified",
    user: req.user
  });
});

app.get("/", (req, res) => {
  res.send("Aditya Hostel Backend Running");
});

/* ======================
   SERVER
   ====================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
