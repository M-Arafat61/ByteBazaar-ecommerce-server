const express = require("express");
const { authCheck, adminCheck } = require("../middlewares/auth");
const { list, create, read, update, remove } = require("../controllers/sub");
const router = express.Router();

router.post("/v1/sub", authCheck, adminCheck, create);
router.get("/v1/subs", list);
router.get("/v1/sub/:slug", read);
router.put("/v1/sub/:slug", authCheck, adminCheck, update);
router.delete("/v1/sub/:slug", authCheck, adminCheck, remove);

module.exports = router;
