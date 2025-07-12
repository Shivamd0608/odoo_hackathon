const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  giveRating,
  getUserRatings,
  getSwapRating
} = require("../controllers/ratingController");

router.post("/rate", auth, giveRating);
router.get("/user/:userId", getUserRatings);
router.get("/swap/:swapId", getSwapRating);

module.exports = router;
