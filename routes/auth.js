const express = require("express");

const { authCheck, adminCheck } = require("../middlewares/auth");
const { createOrUpdateUser, currentUser } = require("../controllers/auth");

const router = express.Router();

router.post("/v1/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/v1/current-user", authCheck, currentUser);
router.post("/v1/current-admin", authCheck, adminCheck, currentUser);

module.exports = router;
