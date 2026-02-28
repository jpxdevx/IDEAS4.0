const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./backend/config/db");
const dataRoutes = require("./backend/routes/dataRoutes");

const sendEmail = require("./backend/utils/sendEmail.js");

require("./backend/scheduler.js");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    next();
});

app.use("/api", dataRoutes);

app.use(express.static(path.join(__dirname, "./frontend")));

app.listen(5000, "0.0.0.0", () => {
    console.log("Server running on http://localhost:5000");
});



app.post("/send-alert-email", async (req,res)=>{

const {email,pH,turbidity} = req.body;

await sendEmail(

email,

"⚠️ Water Quality Alert",

`Water Unsafe!

pH: ${pH}
Turbidity: ${turbidity}

Please check immediately.`

);

res.json({status:"Email Sent"});

});