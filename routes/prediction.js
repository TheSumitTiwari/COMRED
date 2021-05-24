const router = require('express').Router();
const fetch = require('node-fetch');
const User = require('../models/User');
const Logs = require('../models/Logs');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
var passport = require("passport");
const path = require('path');

//handling heart disease request
router.post("/hp", function (req, res) {
    var URL = `${process.env.HEART_DIAGNOSIS_TUNNEL}api`
    console.log(req.body)
    var arr = [];
    var prediction;
    var name = req.body.name;
    var username = req.body.username;
    delete req.body.name;
    delete req.body.username;
    for (var key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            arr.push(req.body[key]);
        }
    }
    var arrString = arr.join(" ");
    
    console.log("arrString",arrString)
    // [20, 225.0, 150, 95, 28.58, 103]
    fetch(URL, {
        method: "post",
        body: JSON.stringify({
            "data": [
                arr
            ]
        }),
        headers: { "Content-Type": "application/json" },
    })
        .then((res) => res.json())
        .then((json) => {
            console.log(json.prediction)
            prediction = json.prediction[0]
        }).then(() => {

            console.log("body")
            console.log(arrString)
            console.log("body")
            var log = new Logs({
                username: req.user.username,
                name: name,
                type: 1,
                input: arrString,
                output: prediction
            })

            log.save(function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(result)
                }
            })

            return res.render('heartPrognosisResult', { title: "Your Prognosis Result", prediction: prediction , username : username});

        })



});




//handling misc disease logic
router.post("/md", function (req, res) {

    // var URL = `${process.env.MISC_DISEASE_PROGNOSIS_TUNNEL}api`
    // console.log(URL)
    // var name = req.body.name;
    // var arrString = req.body.symptoms.join(" ");
    // console.log("arrString",arrString)
    // fetch(URL, {
    //     method: "post",
    //     body: JSON.stringify({
    //         "data": [
    //             [arrString]
    //         ]
    //     }),
    //     headers: { "Content-Type": "application/json" },
    // })
    //     .then((res) => res.json())
    //     .then((json) => {
    //         console.log(json)
    //         prediction = json.prediction
    //     }).then(() => {


        var spawn = require("child_process").spawn;
        var arrString = req.body.symptoms.join(" ");
        var name = req.body.name;
        
        console.log(arrString)
        
        var process = spawn('python', ["./model_cdss.py", arrString]);
        
        process.stdout.on('data', function (data) {
            var log = new Logs({ 
                username: req.user.username,
                name:name,
                type: 2,
                input: arrString,
                output: data.toString()
            })

            log.save(function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(result)
                    return res.render('miscDiseaseResult', { title: "Your Diagnosis Result", prediction: data.toString(),username: req.user.username });
                }
            })
 
            
        }); 
                        
        // })

    // return;

});


//handling diabetes diagnosis request
router.post("/dd", function (req, res) {
    var URL = `${process.env.DIABETESE_DIAGNOSIS_TUNNEL}api`
    console.log(req.body)
    var arr = [];
    var prediction;
    var name = req.body.name;
    var username = req.body.username;
    delete req.body.name;
    delete req.body.username;
    for (var key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            arr.push(req.body[key]);
        }
    }
    var arrString = arr.join(" ");
    
    console.log("arrString",arrString)
    // [20, 225.0, 150, 95, 28.58, 103]
    fetch(URL, {
        method: "post",
        body: JSON.stringify({
            "data": [
                arr
            ]
        }),
        headers: { "Content-Type": "application/json" },
    })
        .then((res) => res.json())
        .then((json) => {
            console.log(json.prediction)
            prediction = json.prediction[0]
        }).then(() => {

            console.log("body")
            console.log(arrString)
            console.log("body")
            var log = new Logs({
                username: req.user.username,
                name: name,
                type: 3,
                input: arrString,
                output: prediction
            })

            log.save(function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(result)
                }
            })

            return res.render('diabetesDiagnosisResult', { title: "Your Diagnosis Result", prediction: prediction , username : username});

        })



});


module.exports = router;