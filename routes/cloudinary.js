const express = require("express");
const { authCheck, adminCheck } = require("../middlewares/auth");
const { upload, remove } = require("../controllers/cloudinary");
const router = express.Router();

// router.post("/v1/uploadImage", upload);
router.post("/v1/uploadImage", upload);
router.delete("/v1/removeImage", authCheck, adminCheck, remove);

module.exports = router;
