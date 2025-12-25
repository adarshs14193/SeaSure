import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import catchRoutes from "./routes/catch.routes.js";
import consumerRoutes from "./routes/consumer.routes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.send({ status: "Backend is running" });
});

app.use("/auth", authRoutes); // Auth routes
app.use("/catch", catchRoutes); // Catch routes
app.use("/consumer", consumerRoutes); // Consumer routes




export default app;

