const express = require("express");
const router = express.Router();

// router.get("/test", (req, res) => res.json({ msg: "This is the TWEETS route!" }));

const mongoose = require('mongoose');
const passport = require('passport');

const Tweet = require('../../models/Tweet');
const validateTweetInput = require('../../validation/tweets');

// Find Tweets
router.get('/', (req, res) => {
  Tweet.find()
    .sort({ date: -1 })
    .then((tweets) => res.json(tweets))
    .catch((err) => res.status(404).json({ notweetsfound: "No tweets found" }));
});

// Find User's Tweets
router.get('/user/:user_id', (req, res) => {
  Tweet.find({ user: req.params.user_id })
    .then((tweets) => res.json(tweets))
    .catch((err) => (
      res.status(404).json({ notweetsfound: "No tweets found from that user" })
    ));
});

// Find single tweet
router.get('/:id', (req, res) => {
  Tweet.findById(req.params.id)
    .then((tweet) => res.json(tweet))
    .catch((err) => (
      res.status(404).json({ notweetfound: "No tweet found with that ID" })
    ));
});

// Protected route to post tweets
router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTweetInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newTweet = new Tweet({
      text: req.body.text,
      user: req.user.id
    });

    newTweet.save().then((tweet) => res.json(tweet));
  });

module.exports = router;