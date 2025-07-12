const User = require("../models/User");
const Skill = require("../models/Skill");
const Swap = require("../models/Swap");
const Message = require("../models/Message");
const Rating = require("../models/Rating");
const { Parser } = require("json2csv");

exports.rejectSkill = async (req, res) => {
  const skill = await Skill.findById(req.params.skillId);
  if (!skill) return res.status(404).json({ message: "Skill not found" });
  skill.status = "rejected";
  await skill.save();
  res.json({ message: "Skill rejected." });
};

exports.banUser = async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  user.isBanned = true;
  await user.save();
  res.json({ message: "User banned." });
};

exports.getSwaps = async (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};
  const swaps = await Swap.find(filter)
    .populate("sender", "name email")
    .populate("receiver", "name email");
  res.json(swaps);
};

exports.sendGlobalMessage = async (req, res) => {
  const { title, body } = req.body;
  const msg = await Message.create({ title, body });
  res.status(201).json({ message: "Broadcast sent.", msg });
};

exports.downloadReport = async (req, res) => {
  const { type } = req.params;
  let data;

  switch (type) {
    case "users":
      data = await User.find().select("name email badge completedSwaps avgRating");
      break;
    case "swaps":
      data = await Swap.find().select("-__v");
      break;
    case "feedback":
      data = await Rating.find()
        .populate("ratedUser", "name")
        .populate("rater", "name");
      break;
    default:
      return res.status(400).json({ message: "Invalid report type" });
  }

  const parser = new Parser();
  const csv = parser.parse(data);
  res.header("Content-Type", "text/csv");
  res.attachment(`${type}_report.csv`);
  res.send(csv);
};
