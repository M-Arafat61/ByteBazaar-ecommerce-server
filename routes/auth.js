const express = require("express");
const { createOrUpdate } = require("../controllers/auth");

const router = express.Router();

router.get("/create-or-update-user", createOrUpdate);

module.exports = router;
