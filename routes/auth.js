const router = require('express').Router();
const fetch = require('node-fetch');
const User = require('../models/User');
const LoginLogs = require('../models/Login logs');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
var passport = require("passport");

//handle sign up logic
router.post("/register2", function (req, res) {

    console.log(req.body)

    var newUser = new User({
        username: req.body.username,
    });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render('registerUser', { title: "Register", "error": err.message });
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/");
        });
    });
});


//handling login logic
router.post("/login2", passport.authenticate("local",
    {
        failureRedirect: "/login",
        failureFlash: true,
    }), async function (req, res) {
        await fetch('http://geolocation-db.com/json/')
            .then(res => res.json())
            .then(json => {
                var loginLogs = new LoginLogs({
                    username: req.user.username,
                    ip: json.IPv4,
                    device: req.body.deviceInfo,
                    location: json.state + ", " + json.country_name
                })

                loginLogs.save(function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(result)

                        res.redirect("/");
                    }
                })

            })
    });

// logout route
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/");
});



module.exports = router;