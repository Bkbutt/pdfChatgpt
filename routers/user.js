const express= require('express');
const router = express.Router();
require('dotenv').config({path:'./.env'});
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const session = require('express-session');
const {signupWithEmail,login}=  require('../controllers/userController');
const { route } = require('./pdfRoutes');

router.post('/signupWithEmail',signupWithEmail);
router.post('/login',login);


router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res) => {
        // Redirect or respond with the generated JWT token
        res.json({ token: req.user });
    });


    //continue with facebook
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/auth/facebook/callback',
        passport.authenticate('facebook', { session: false }),
        (req, res) => {
            // Redirect or respond with the generated JWT token
            res.json({ token: req.user });
        });





module.exports= router;