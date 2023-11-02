const express = require('express');
const app = express();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const session = require('express-session');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const port = process.env.PORT || 5500;
require('dotenv').config({path:'./.env'});
const connect = require('./db/conn');
connect();


// Passport configuration google
passport.use(new GoogleStrategy({
    clientID: process.env.YOUR_CLIENT_ID,
    clientSecret: process.env.YOUR_CLIENT_SECRET,
    callbackURL: 'http://localhost:5500/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Handle the user's profile data and generate JWT token here
    const user = { id: profile.id, name: profile.displayName };
    const token = jwt.sign(user,process.env.secretkey);
    done(null, token);
}));

//facebook configuration 
// Passport configuration
passport.use(new FacebookStrategy({
    clientID: process.env.YOUR_APP_ID,
    clientSecret: process.env.YOUR_APP_SECRET,
    callbackURL: 'http://localhost:5500/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'email']
}, (accessToken, refreshToken, profile, done) => {
    // Handle the user's Facebook profile data and generate JWT token here
    const user = { id: profile.id, name: profile.displayName, email: profile.emails[0].value };
    const token = jwt.sign(user, process.env.secretkey);
    done(null, token);
}));

app.use(session({ secret: process.env.secretkey, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const user = require('./routers/user');
app.use('/',user);


app.listen(port,()=>{
    console.log(`listening to the port ${port}`)
});
