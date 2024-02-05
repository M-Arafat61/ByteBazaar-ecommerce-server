const express = require("express");
const router = express.Router();
const { authCheck, adminCheck } = require("../middlewares/auth");
const { create, allList } = require("../controllers/product");

router.post("/v1/product", authCheck, adminCheck, create);
router.get("/v1/products/:count", allList);
module.exports = router;
