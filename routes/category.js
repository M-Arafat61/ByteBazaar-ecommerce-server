const express = require("express");
const { authCheck, adminCheck } = require("../middlewares/auth");
const {
  list,
  create,
  read,
  update,
  remove,
  readSubs,
} = require("../controllers/category");
const router = express.Router();

router.post("/v1/category", authCheck, adminCheck, create);
router.get("/v1/categories", list);
router.get("/v1/category/:slug", read);
router.put("/v1/category/:slug", authCheck, adminCheck, update);
router.delete("/v1/category/:slug", authCheck, adminCheck, remove);
router.get("/v1/category/subs/:id", readSubs);

module.exports = router;
