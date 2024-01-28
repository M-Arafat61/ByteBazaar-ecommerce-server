const express = require("express");
const router = express.Router();
const { authCheck, adminCheck } = require("../middlewares/auth");
const { create } = require("../controllers/product");

router.post("/v1/product", authCheck, adminCheck, create);

module.exports = router;
