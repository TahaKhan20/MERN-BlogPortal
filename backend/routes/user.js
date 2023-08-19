const express = require("express");
const User = require('../models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post('/signup',[
    body('name').trim().isLength({ min: 4 }).withMessage('Enter a valid name'),
    body('email').trim().isEmail().withMessage('Enter a valid email'),
    body('password').trim().isLength({ min: 5 }).withMessage('Password length must be at least 5'),
    body('interests').trim().isLength({ min: 2 }).withMessage('Enter valid interests')
], async (req,res) => {
    let success1 = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({success1, errors: errors.array() });
    }

    const { name, email, password, education, interests } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            success1 = false;
            return res.status(400).json({ success1, error: 'Email already exists. Please use a different email.' });
        }

        const user = await User.create({
            name,
            email,
            password,
            education,
            interests
        });
        success1 = true;
        res.json({success1});
    } catch (err) {
        res.json({ error: 'Enter valid credentials', message: err.message });
    }
});

router.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    let success = false;
    const email = req.body.email;
    const password = req.body.password;
    try{
        let user= await User.findOne({'email': email});
        if(!user){
            success = false;
            return res.status(400).json({success, error: "Email not found. Please try again or Create New Account"});
        }
        else{
            
        if(password != user.password)
        {
            success = false;
            return res.status(400).json({success, error: "Passwords don't match for this username"});
        
        }
        success = true;
        res.json({success});
    }
    }
    catch (error){
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;