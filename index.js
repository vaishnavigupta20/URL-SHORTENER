const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url_router");
const URL = require("./models/url");

const app = express();
const port = 3001;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

// Routes
app.use("/url", urlRoute);
const cors = require("cors");
app.use(cors());

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, 
    { 
        $push : {
            visitHistory : {
                timestamp : Date.now(),
            }
        },
    }
);
res.redirect(entry.redirectURL);
});

// Start server
app.listen(port, () => console.log(`Server started at port: ${port}`));