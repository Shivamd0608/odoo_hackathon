function evaluateBadge({ completedSwaps, avgRating }) {
  if (completedSwaps >= 10 && avgRating >= 4.5) return "Expert";
  if (completedSwaps >= 5 && avgRating >= 4.0) return "Professional";
  if (completedSwaps >= 2) return "Starter";
  return "Beginner";
}

module.exports = evaluateBadge;
