'use strict'
module.exports = (db) => {
const express = require('express')
const router = express.Router()
const passport = require('passport')

router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: 'Invalid username or password.'})
);
return ['/', router];
}

