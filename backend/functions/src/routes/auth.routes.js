import { requireAuth } from "../middlewares/auth.middleware.js";

import express from "express";

const router = express.Router();

router.get("/me", requireAuth, (req, res) => {
    res.json({
        uid: req.user.uid,
        email: req.user.email || null,
        role: req.user.role || "Unassigned"
    });
});

export default router;