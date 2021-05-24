const router = require('express').Router();
const fetch = require('node-fetch');
const Logs = require('../models/Logs');
const LoginLogs = require('../models/Login logs');
// const verifyToken = require('../middleware/verifyToken');
const isLoggedIn = require('../middleware/verifyToken');

router.get('/', (req, res) => {
    var username = "";
    if(req.user) username= req.user.username; 
    res.render('index', { title: "Home", username : username })
})

router.get('/register', (req, res) => {
    
    var username = "";
    if(req.user) username= req.user.username; 
    res.render('registerUser', { title: "Register" , username : username})
})

router.get('/login', (req, res) => {
    
    var username = "";
    if(req.user) username= req.user.username; 
    res.render('loginUser', { title: "Login", username : username })
})



router.get('/heartPrognosis', isLoggedIn, (req, res) => {
    
    var username = "";
    if(req.user) username= req.user.username; 
    res.render('heartPrognosis', { title: "Heart Prognosis", username : username })
})



router.get('/miscDiagnosis', isLoggedIn, (req, res) => {
    
    var username = "";
    if(req.user) username= req.user.username; 
    res.render('miscDisease', {
        title: "Misc. Diseases Diagnosis", username : username, symptoms: ["Itching", "Skin Rash", "Nodal Skin Eruptions", "Continuous Sneezing", "Shivering", "Chills", "Joint Pain", "Stomach Pain", "Acidity", "Ulcers On Tongue ", "Muscle Wasting ", "Vomiting", "Burning Micturition", "Spotting Urination", "Fatigue", "Weight Gain", "Anxiety", "Cold Hands and Feets", "Mood Swings", "Weight Loss", "Restlessness", "Lethargy", "Patches In Throat", "Irregular Sugar Level", "Cough", "High Fever", "Sunken Eyes", "Breathlessness", "Sweating", "Dehydration", "Indigestion", "Headache", "Yellowish Skin", "Dark Urine", "Nausea", "Loss of Appetite", "Pain Behind The Eyes", "Back Pain", "Constipation", "Abdominal Pain ", "Diarrhoea", "Mild Fever", "Yellow Urine", "Yellowing of Eyes", "Acute Liver Failure", "Fluid Overload", "Swelling of Stomach ", "Swelled Lymph Nodes ", "Malaise", "Blurred and Distorted Vision ", "Phlegm", "Throat Irritation", "Redness of Eyes", "Sinus Pressure", "Runny Nose", "Congestion", "Chest_pain", "Weakness in Limbs", "Fast Heart Rate", "Pain During Bowel Movements", "Pain in Anal Region", "Bloody Stool", "Irritation in Anus", "Neck Pain", "Dizziness", "Cramps", "Bruising", "Obesity", "Swollen Legs", "Swollen Blood Vessels", "Puffy Face and Eyes ", "Enlarged Thyroid", "Brittle Nails", "Swollen Extremeties", "Excessive Hunger", "Extra Marital Contacts", "Drying and Tingling Lips", "Slurred Speech", "Knee Pain", "Hip Joint Pain", "Muscle Weakness", "Stiff Neck", "Swelling Joints", "Movement Stiffness", "Spinning Movements", "Loss of Balance", "Unsteadiness", "Weakness of One Body Side", "Loss of Smell", "Bladder Discomfort", "Foul Smell of Urine", "Continuous Feel of Urine", "Passage of Gases", "Internal Itching", "Toxic Look (Typhos)", "Depression", "Irritability", "Muscle Pain", "Altered Sensorium", "Red Spots Over Body", "Belly Pain", "Abnormal Menstruation", "Dischromic Patches", "Watering From Eyes ", "Increased Appetite", "Polyuria", "Family History", "Mucoid Sputum", "Rusty Sputum", "Lack of Concentration", "Visual Disturbances", "Receiving Blood Transfusion", "Receiving Unsterile Injections", "Coma", "Stomach Bleeding", "Distention of Abdomen", "History of Alcohol Consumption", "Fluid Overload", "Blood in Sputum", "Prominent Veins on Calf", "Palpitations", "Painful Walking", "Pus Filled Pimples", "Blackheads", "Scurring", "Skin Peeling", "Silver Like Dusting", "Small Dents in Nails", "Inflammatory Nails", "Blister", "Red Sore Around Nose", "Yellow Crust Ooze"]
    })
})

router.get('/diabetesDiagnosis', isLoggedIn, (req, res) => {
    
    var username = "";
    if(req.user) username= req.user.username; 
    res.render('diabetesDiagnosis', { title: "Diabetes Diagnosis", username : username })
})

router.get('/logs', isLoggedIn, async (req, res) => {

    var username = "";
    if(req.user) username= req.user.username; 
    await Logs.find({ username: req.user.username }, async function (err, data) {
        console.log(">>>> " + data[1]);
        await LoginLogs.find({ username: req.user.username }, async function (err, loginLogs) {
            res.render('logs', { title: "Logs", data: data, username : username, loginLogs: loginLogs })

        });

    });

})


router.post("/pyModel", function (req, res) {

    // console.log(req.body.data)
	var spawn = require("child_process").spawn;

	var process  = spawn('python',["./hello.py",req.body.data]);

	process.stdout.on('data',function(data){
		res.json({data: data.toString()});
	});

});
 
module.exports = router;