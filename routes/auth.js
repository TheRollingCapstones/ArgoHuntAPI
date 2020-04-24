const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const {registrationValidation, loginValidation} = require("../models/validation");

router.post("/register", async(req, res)=>{
    //Validate
    const {error} = registrationValidation(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);

    //Check if exist
    const user = await User.findOne({ email: req.body.email });
    if(user) 
        return res.status(400).send("Already exists");
    
    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        birthDate: req.body.birthDate
    });
    try{
        const savedUser = await newUser.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});

router.post("/login", async(req, res)=>{
    //Validate
    const {error} = loginValidation(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
    
    //Check if exist
    const user = await User.findOne({ email: req.body.email });
    if(!user) 
        return res.status(400).send("Email or password is incorrect.");
    
    //Verify password
    const validPwd = await user.isValidPassword(req.body.password);
    if(!validPwd)
        return res.status(400).send("Email or password is incorrect.");
    
    //Create jwt
    const token = jwt.sign({_id: user.id}, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);

    //res.send("Logged in!");
});

module.exports = router;