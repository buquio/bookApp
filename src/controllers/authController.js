const User = require('../models/user');
const bcrypt = require('bcrypt.js')
const jwt = require('jsonwwebtoken');
const { json } = require('body-parser');
const { createToken } = require('../services/jwtService');
// const secret = "verySecureSECRET";
const secret = process.env.JWT_SECRET;
// const expiry = 3600
const expiry = Number(process.env.TOKEN_EXPIRY)




//register/sign in
// NOTE  //admin can only use given detail to sign in -see seeders folder

exports.registerNewUser = (req, res) => {  //fetch user details from req.body
    //check if user with the username exist already
    User.findOne({ username: req.body.username }, (err, existingUser) => {    //takes an obj & a callback fxn
        if(err) {
            return res.status(500),json({ err })
        }
        if(existingUser) {
            return res.status(400).json({ message: "a user with this username already exists" })
        }
        //else create a new user
        User.create(     //takes an obj & a callback fxn
            { 
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
        }, (err, newUser) => {
            if (err) {
            return res.status(500),json({ err })
            }
            //hash user's password
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    return res.status(500),json({ err })
                    }
                bcrypt.hash(password, salt, (err, hashedPassword) =>{
                    if (err) {
                        return res.status(500).json({ err }) 
                        }
                        // save pasword to db
                    newUser.password = hashedPassword;
                    newUser.save((err, savedUser) =>{
                        if(err) {
                            return res.status(500).json({ err }) 
                        }
                        //create token for user
                             jwt.sign(    //takes an obj, secret,{expiresin} & a callback fxn
                                    { //jwt encrypt all d ffg
                                    id: newUser._id,
                                    firstName: newUser.firstName,
                                    lastName: newUser.lastName,
                                    username: newUser.username,
                                    role: newUser.role
                                }, 
                                secret,
                                {expiresin: expiry}, 
                                (err, token) => {
                                    if (err) {
                                    return res.status(500).json({ message: "sorry we could not authenticate you, please login again" })
                                    } 
                                    //send token to user
                                    return res.status(200).json({ message: "user registration successful", token })
                            }
                        )
                    })
                })

            })
        } 
    )
})
}


exports.loginUser = (req, res) => {  //fetch user details from req.body
    //check if user with the username exist already
    User.findOne({ username: req.body.username }, (err, foundUser) => {    //takes an obj & a callback fxn
        if(err) {
            return res.status(500).json({ err })
        }
        if(!foundUser) {
            return res.status(400).json({ message: "incorrect username" })
        }
        //check if password is correct
        let match = bcrypt.compareSync(req.body.password, foundUser.password);
        if(!match) {
            return res.status(401).json({ message: "incorrect password" })
        }
        //else create token
        let token = createToken(foundUser);
                        if(!token){
                             return res.status(500).json({ message: "sorry we could not authenticate you, please login again" })
                        }
                         return res.status(200).json({ message: "user logged in", token})

        // jwt.sign(    //takes an obj, secret,{expiresin} & a callback fxn
        //     {
        //     id: foundUser._id,
        //     firstName: foundUser.firstName,
        //     lastName: foundUser.lastName,
        //     username: foundUser.username,
        //     role: foundUser.role
        // }, 
        // secret,
        // {expiresin: expiry}, 
        // (err, token) => {
        //     if (err) {
        //     return res.status(500).json({ err })
        //     }
        //      return res.status(200).json({ message: "user logged in", token})
        //     }
        //     )
        })

}