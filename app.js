const path = require('path');
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}
// Express Framework
const express = require('express');
// Mongoose ODM
const mongoose = require('mongoose');
// Main App
const app = express();
// DB - URI reference to MongoDB Atlas cluster0
const db = require('./config/keys').mongoURI;
// Body Parser to parse JSON before sending to FE
const bodyParser = require('body-parser');
// Basic routes
const users = require('./routes/api/users');
const tweets = require('./routes/api/tweets');
// Passport
const passport = require('passport');

// Models
// const User = require("./models/User");

// Mongoose Connection to MongoDB Atlas
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

// Middleware for Body Parser
app.use(bodyParser.urlencoded({ extended: false })); // can repond to other apps like postman
app.use(bodyParser.json()); // want to respond to json

// Basic routes
// app.get("/", (req, res) => {
  // console.log(res);
  // debugger
  // const user = new User({
  //   handle: "test",
  //   email: "test@test.com",
  //   passwod: "password"
  // })
  // res.send("A Whole New World!");
// });
app.use(passport.initialize());
app.use("/api/users", users);
app.use("/api/tweets", tweets);
app.all("/secret", (req, res, next) => {
  console.log("Accessing secrets...");
  next();
})


// Set Heroku port and localhost port
const port = process.env.PORT || 5000;
// Have Express start socket and listen for connections on set port, w/ success msg
app.listen(port, () => console.log(`Server is running on port ${port}`));

