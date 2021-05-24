var express = require('express');
var app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const mainRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const predictionRouter = require('./routes/prediction');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var favicon = require('serve-favicon');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require('./models/User');
const flash = require("connect-flash");
const bodyParser = require("body-parser");


dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('connected to db'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use(express.json());

// session for login
app.use(require("express-session")({
    secret: "Secret",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.use('/', mainRouter);

app.use('/api/user', authRouter);
app.use('/api/prediction', predictionRouter);

app.listen(PORT, function () {
    console.log(`server running on port ${PORT}`);
    console.log(`Open Link : http://localhost:${PORT}/`);
});

// bug : favicon not working yet
// app.use(favicon(__dirname + '/public/images/favicon.ico'));


