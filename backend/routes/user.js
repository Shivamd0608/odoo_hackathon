const express = require("express");
const router = express.Router();
const {
  getMe,
  updateProfile,
  getUserById,
  addSkill,
  deleteSkill
} = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware");

router.get("/me", auth, getMe);
router.patch("/me", auth, updateProfile);
router.get("/:id", auth, getUserById);
router.post("/skills", auth, addSkill);
router.delete("/skills/:skillId", auth, deleteSkill);

module.exports = router;
