import express from "express";
import Complaint from "../models/Complaint.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* ============================
   CREATE COMPLAINT (STUDENT)
   ============================ */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const complaint = await Complaint.create({
      userId: req.user.id,
      message: req.body.message
    });

    res.status(201).json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json("Error creating complaint");
  }
});

/* ============================
   ADMIN - VIEW ALL COMPLAINTS
   ============================ */
router.get("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json("Access denied");
    }

    const complaints = await Complaint.find()
      .populate("userId", "email role")
      .sort({ createdAt: -1 });

    res.json(complaints);
  } catch (err) {
    res.status(500).json("Error fetching complaints");
  }
});

/* ============================
   ADMIN - UPDATE COMPLAINT
   ============================ */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json("Access denied");
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json("Error updating complaint");
  }
});

/* ============================
   STUDENT - MY COMPLAINTS
   ============================ */
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const complaints = await Complaint.find({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    res.json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).json("Error fetching my complaints");
  }
});
const submitComplaint = async () => {
  await API.post("/complaints", {
    message: complaint
  });
  alert("Complaint submitted");
};

export default router;
