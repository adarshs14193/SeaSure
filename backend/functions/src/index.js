import express from "express";
import cors from "cors";
import axios from 'axios';
import FormData from 'form-data';
import { upload } from "./middlewares/upload.middleware.js"; // Import your middleware
import authRoutes from "./routes/auth.routes.js";
import catchRoutes from "./routes/catch.routes.js";
import consumerRoutes from "./routes/consumer.routes.js";

const app = express();
const PORT = 3002;

// GCP ML ENDPOINT
const GCP_ML_ENDPOINT = "http://35.200.179.245:8080/predict"; 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.send({ status: "Backend is running" });
});

/**
 * FIXED PREDICTION ROUTE
 * Uses upload.fields to handle multiple specific file keys
 */
app.post("/api/predict-freshness", upload.fields([
    { name: 'eye', maxCount: 1 }, 
    { name: 'gill', maxCount: 1 }
]), async (req, res) => {
    try {
        // 1. Check if both files were uploaded successfully
        if (!req.files || !req.files['eye'] || !req.files['gill']) {
            return res.status(400).json({ 
                message: "Missing files. Please upload both 'eye' and 'gill' images." 
            });
        }

        const eyeFile = req.files['eye'][0];
        const gillFile = req.files['gill'][0];

        // 2. Prepare multipart data for the external ML API
        const form = new FormData();
        
        // Critical: Append the buffer AND provide a filename/content-type
        form.append('eye', eyeFile.buffer, { 
            filename: eyeFile.originalname, 
            contentType: eyeFile.mimetype 
        }); 
        form.append('gill', gillFile.buffer, { 
            filename: gillFile.originalname, 
            contentType: gillFile.mimetype 
        });

        // 3. Forward the request to your GCP server
        const response = await axios.post(GCP_ML_ENDPOINT, form, {
            headers: { ...form.getHeaders() }, // Spread headers to include boundary
            timeout: 300000 
        });

        res.status(200).json({ 
            message: '✅ ML Prediction successful', 
            prediction: response.data 
        });

    } catch (err) {
        // Log detailed error from the ML API to debug 422 errors
        const errorDetail = err.response ? err.response.data : err.message;
        console.error("ML Error:", errorDetail);

        res.status(500).json({ 
            message: '⚠️ ML API Connection failed', 
            error: errorDetail 
        });
    }
});

// Mount other routes with consistent /api prefix
app.use("/api/auth", authRoutes);
app.use("/api/catch", catchRoutes);
app.use("/api/consumer", consumerRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server is officially humming on http://localhost:${PORT}`);
});

export default app;