const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  exploreUsers,
  requestSwap,
  updateSwapStatus,
  markDelivered,
  confirmDelivery,
  getMySwaps,
} = require("../controllers/swapController");

router.get("/explore", auth, exploreUsers);
router.post("/request", auth, requestSwap);
router.patch("/:id/status", auth, updateSwapStatus);
router.patch("/:id/deliver", auth, markDelivered);
router.patch("/:id/confirm", auth, confirmDelivery);
router.get("/me", auth, getMySwaps);

module.exports = router;
