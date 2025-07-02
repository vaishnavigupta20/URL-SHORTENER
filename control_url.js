const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateShortUrl(req, res) {
    const body = req.body;

    // Debug log
    console.log("Request body:", body);

    const inputUrl = body.url || body.URL; // Accept both lowercase and uppercase

    if (!inputUrl) {
        return res.status(400).json({ error: "url is required" });
    }

    const shortId = shortid();

    await URL.create({
        shortId: shortId,
        redirectURL: inputUrl,
        visitHistory: [],
    });

    return res.json({ id: shortId });
}

module.exports = {
    handleGenerateShortUrl,
};