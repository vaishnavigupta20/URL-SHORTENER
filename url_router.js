const express = require("express");
const { handleGenerateShortUrl } = require("../controllers/control_url");

const router = express.Router();

router.post("/", handleGenerateShortUrl);

module.exports = router;