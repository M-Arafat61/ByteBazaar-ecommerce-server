const express = require("express");
const router = express.Router();
const { authCheck, adminCheck } = require("../middlewares/auth");
const {
  create,
  allList,
  remove,
  read,
  update,
  newAndBestList,
} = require("../controllers/product");

router.post("/v1/product", authCheck, adminCheck, create);
router.get("/v1/products/:count", allList);
router.delete("/v1/product/:slug", authCheck, adminCheck, remove);
router.get("/v1/product/:slug", read);
router.patch("/v1/product/:slug", authCheck, adminCheck, update);
router.post("/v1/products", newAndBestList);

module.exports = router;
