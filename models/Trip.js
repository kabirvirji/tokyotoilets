const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
  userEmail: String,
  toiletId: String,
  toiletTitle: String,
  distance: Number,
  timestamp: {
    type: Date,
    default: Date.now
  },
  review: {
    averageWaitTime: Number,
    tags: [String]
  }
});

module.exports = Trip = mongoose.model("trips", TripSchema);
