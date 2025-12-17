import express from "express";
import cors from "cors";
import { requireAuth } from "./middlewares/auth.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.send({ status: "Backend is running" });
});

app.get("/test/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.get("/me", requireAuth, (req, res) => {
  res.json({
    uid: req.user.uid,
    email: req.user.email || null,
    role: req.user.role || "Unassigned"
  });
});


export default app;

