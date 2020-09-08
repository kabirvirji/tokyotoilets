const toiletModel = require('../models/toilets');
const express = require('express');
const router = express.Router();

router.get('/allToilets', async (req, res) => {
  const toilets = await toiletModel.find({});
  try {
    res.send(toilets);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/saveToilet', async (req, res) => {
  const toilet = new toiletModel(req.body);
  try {
    await toilet.save();
    res.send(toilet);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
