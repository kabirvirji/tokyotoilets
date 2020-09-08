const User = require('../models/User');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.get('/logout', async (req, res) => {
  req.session.destroy(error => {
    res.redirect('/');
  });
});

router.get('/refresh', async (req, res) => {
  if (req.session.email) {
    User.findOne({ email: req.session.email })
      .then(user => {
        if (user) {
          res.status(200).send({
            name: user.name,
            email: user.email
          })
        } else {
          res.status(401);
        }
      })
      .catch(err => {
        res.status(500).send(err);
      })
  } else {
    res.status(401);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (email.length == 0 || password.length == 0) {
    res.status(400);
    return
  }

  User.findOne({ email: email })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            req.session.email = email;

            res.status(200).send(user);
          } else {
            res.status(401).send(result);
          }
        });
      } else {
        res.status(401);
      }
    })
    .catch(err => {
      res.status(401).send(err);
    })
});

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  if (email.length == 0 || password.length == 0) {
    res.status(400);
    return
  }

  if (password.length < 8) {
    res.status(400);
    return
  }

  User.findOne({ email: email })
    .then(user => {
      if (user) {
        res.status(409).send({ error: 'Unique email required.' })
      } else {
        const user = new User({ name, email, password });

        bcrypt.hash(password, 11, (err, hash) => {
          if (err) {
            res.status(500).send(err);
          }

          user.password = hash;
          user.save()
            .then(user => {
              req.session.email = email;

              res.status(200).send(user);
            })
            .catch(err => {
              res.status(400).send(err);
            })
        })
      }
    })
    .catch(() => {
      res.status(500);
    })
});

module.exports = router;
