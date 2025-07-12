const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/adminMiddleware");
const {
  rejectSkill,
  banUser,
  getSwaps,
  sendGlobalMessage,
  downloadReport
} = require("../controllers/adminController");

router.use(auth, isAdmin);

router.patch("/skills/:skillId/reject", rejectSkill);
router.patch("/users/:userId/ban", banUser);
router.get("/swaps", getSwaps);
router.post("/message", sendGlobalMessage);
router.get("/report/:type", downloadReport);

module.exports = router;
 