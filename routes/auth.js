const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const { showSignUpForm, registerUser, showLoginForm, loginUser, showUserProfile, logOutUser } = require('../controllers/auth');
const { isLoggedIn } = require('../middleware');


// to show the form of sign-up
router.get('/register', showSignUpForm);


// to register(add) a user in the DB
router.post('/register', registerUser);


// to show the login form
router.get('/login', showLoginForm);


// to actually login via the DB
router.post('/login', 
    passport.authenticate('local', {
        failureRedirect: '/login',
        // failureMessage: true
        failureFlash: true
    }),
    loginUser
);


// to show the profile of current logged-in user
router.get('/user/profile', isLoggedIn, showUserProfile);


// to logout the session
router.get('/logout', logOutUser);


module.exports = router;