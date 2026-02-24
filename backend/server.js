const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const dataRoutes = require("./routes/dataRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// 🔴 Prevent browser caching
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    next();
});

app.use("/api", dataRoutes);

app.use(express.static(path.join(__dirname, "../frontend")));

app.listen(5000, "0.0.0.0", () => {
    console.log("Server running on http://localhost:5000");
});