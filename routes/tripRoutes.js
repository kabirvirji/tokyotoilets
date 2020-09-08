const Trip = require('../models/Trip');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  if (!req.session.email) {
    return res.status(401);
  }

  const tripsForCurrentUser = await Trip
    .find({ userEmail: req.session.email })
    .sort({ timestamp: 'descending' })
  try {
    res.send(tripsForCurrentUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  if (!req.session.email) {
    return res.status(401);
  }

  const trip = new Trip({
    ...req.body,
    userEmail: req.session.email
  });

  trip.save()
    .then(trip => {
      res.send(trip);
    })
    .catch(error => {
      res.status(500).send(error);
    })
});

router.post('/review', async (req, res) => {
  const filter = { _id: req.body._id };
  const update = { review: req.body.review };

  Trip.findOneAndUpdate(filter, update)
    .then(trip => {
      res.send(trip);
    })
    .catch(error => {
      res.status(500).send(error);
    })
});

module.exports = router;
