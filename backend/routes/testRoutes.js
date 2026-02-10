import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/test", authMiddleware, (req, res) => {
  res.json({
    message: "Token verified",
    user: req.user
  });
});

export default router;
