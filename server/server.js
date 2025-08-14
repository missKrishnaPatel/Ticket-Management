import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectdB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import ticketRoutes from "./routes/ticketRoutes.js";



dotenv.config();
const app= express();
connectdB();



app.use(cors({
  origin: "http://localhost:3000", // Allow frontend origin
  credentials: true, // Allow cookies or auth headers if needed
}));
app.use(express.json());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));