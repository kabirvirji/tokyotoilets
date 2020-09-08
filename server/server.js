const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

require('dotenv').config();
const toiletRouter = require('../routes/toiletRoutes');
const userRouter = require('../routes/userRoutes');
const tripRouter = require('../routes/tripRoutes');

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'database connection error:'));
db.once('open', () => { console.log("connected to database") });

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
)

app.use('/api/trips', tripRouter);
app.use('/api/users', userRouter);
app.use('/api', toiletRouter);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')));
    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
