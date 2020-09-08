const mongoose = require('mongoose');

const ToiletSchema = new mongoose.Schema({
  title: String,
  tags: [String], // baby, wheelchair, squat, urinal, electric, regular
  accuracy: Number,
  longitude: Number, 
  latitude: Number,
  average_wait_time: Number, // seconds
  submitter: String // Email of user who submitted toilet via Contribute
});

const Toilets = mongoose.model("Toilets", ToiletSchema);
module.exports = Toilets;
