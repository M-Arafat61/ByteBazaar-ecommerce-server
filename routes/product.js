const express = require("express");
const router = express.Router();
const { authCheck, adminCheck } = require("../middlewares/auth");
const { create, allList, remove, read } = require("../controllers/product");

router.post("/v1/product", authCheck, adminCheck, create);
router.get("/v1/products/:count", allList);
router.delete("/v1/product/:slug", authCheck, adminCheck, remove);
router.get("/v1/product/:slug", read);

module.exports = router;
