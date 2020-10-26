// Users Route
const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');  // for signing our token
const keys = require('../../config/keys');  // to get our secretkey
const User = require('../../models/User');
const passport = require('passport');

// ! REQUIRED TO GET STRATEGY EXPORTED FROM PASSPORT.JS CONFIG FILE
require('../../config/passport')(passport);

// Test /api/users route
router.get("/test", (req, res) => res.json({ msg: "This is the USERS route!"}));

function validateRegisterInput(body) {
  const res = {
    errors: [],
    isValid: false
  }
  if (!body.handle || !body.password || !body.email) {
    // return res.status(400).json({ msg: "Missing fields" });
    res.errors.push("Missing required fields");
  } else if (body.password.length < 6) {
    res.errors.push("Password needs to be at least 6 characters")
  } else {
    res.isValid = true;
  }
  return res;
}

// Register
router.post('/register', (req, res) => {

  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Validates email uniqueness
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        // Throw 400 error if email exists
        return res.status(400).json({ email: "Email already registered"});
      } else {
        // Else create new user
        const newUser = new User({
          handle: req.body.handle,
          email: req.body.email,
          password: req.body.password
        })
        // Salt and digest password (hash x10)
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then( user => {
                const payload = { id: user.id, handle: user.handle };

                jwt.sign(
                  payload,
                  keys.secretOrKey,
                  { expiresIn: 3600 },
                  (err, token) => {
                    res.json({
                      success: true,
                      token: 'Bearer ' + token
                    });
                  }
                );
              })
              .catch(err => console.log(err));
          })
        })
      }
    })
})

// Login
router.post('/login', (req, res) => {
  // const email = req.body.email;
  // const password = req.body.password;
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then( user => {
      if (!user) {
        return res.status(404).json({ email: "This user does not exist" })
      } else {
        bcrypt.compare(req.body.password, user.password)
          .then( isMatch => {
            if (isMatch) {
              const payload = { 
                id: user.id, 
                handle: user.handle, 
                email: user.email };

              jwt.sign(
                payload,
                keys.secretOrKey,
                // Expires in 1h
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: 'Bearer ' + token
                  });
                }
              );
              // res.json({ msg: "Success!" });
            } else {
              return res.status(400).json({ password: "Incorrect password"});
            }
          })
      }
    })
})

// Auth Route
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  // res.json({ msg: "Success"});
  res.json({
    id: req.user.id,
    handle: req.user.handle,
    email: req.user.email
  })
})

module.exports = router;