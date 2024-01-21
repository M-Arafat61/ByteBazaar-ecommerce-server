const express = require("express");
const { authCheck, adminCheck } = require("../middlewares/auth");
const {
  list,
  create,
  read,
  update,
  remove,
} = require("../controllers/category");
const router = express.Router();

router.post("/category", authCheck, adminCheck, create);
router.get("/categories", list);
router.get("/category/:slug", read);
router.put("/category/:slug", authCheck, adminCheck, update);
router.delete("/category/:slug", authCheck, adminCheck, remove);

module.exports = router;
