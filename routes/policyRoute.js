const express = require("express");
const router = express.Router();
const policyController = require("../controller/policy.js");
const upload = require("../service/multer.js");

router.post("/policyInfo", upload.single("file"), policyController.policyInfo);
router.get("/policyInfo/:query", policyController.searchPolicyInfo);

module.exports = router;
