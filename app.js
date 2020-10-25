const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

// Set Heroku port and localhost port
const port = process.env.PORT || 5000;

// Basic GET route
app.get("/", (req, res) => res.send("A Whole New World!"));

// Have Express start socket and listen for connections on set port, w/ success msg
app.listen(port, () => console.log(`Server is running on port ${port}`));

