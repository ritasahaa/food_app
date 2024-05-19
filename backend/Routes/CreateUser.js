// second step where a create functionality is introduced and user schema is imported------

const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret="In the login route, I've changed the password comparison to use bcrypt to compare the hashed password retrieved from the database with the plaintext password provided by the user. This ensures a secure comparison."

router.post("/createuser", [
   body('email', "incorrect email").isEmail(),
   body('name').isLength({ min: 5 }),
   body('password', 'incorrect password').isLength({ min: 5 })]
   , async (req, res) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      //   creating a salt in bcryptjs---
      const salt = await bcrypt.genSalt(10);
      let secPassword = await bcrypt.hash(req.body.password, salt)

      try {
         User.create({
            name: req.body.name,
            password: secPassword,  //calling the hhashing password
            email: req.body.email,
            location: req.body.location
         })
         res.json({ success: true })
      }
      catch (error) {
         console.log(error);
         res.status(500).json({ success: false, error: 'Server error' });
      }
   })

router.post("/loginuser", [
   body("email").isEmail(),
   body('password', 'incorrect password').isLength({ min: 5 })],

   async (req, res) => {
      let email = req.body.email;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      try {
         let userData = await User.findOne({ email });
         if (!userData) {
            return res.status(400).json({ errors: "Try logging  with correct credentials" });
         }

         const pwdCompare = await bcrypt.compare(req.body.password,userData.password);

         if (!pwdCompare) {
            return res.status(400).json({ errors: "Try logging  with correct credentials" });
         }

         // jwt token created----
         const data={
           user:{
             id:userData.id
           }
         }

         const authToken=jwt.sign(data,jwtSecret);

         return res.json({ success: true,authToken:authToken })
      }
      catch (error) {
         console.log(error);
         res.status(500).json({ success: false, error: 'Server error' });
      }
      console.log(userData);
   })

module.exports = router;