const User = require('../models/user');
const bcrypt = require('bcrypt.js')
let password = "admin123"


exports.seedAdmin = () => {
    //check if there is an admin account already
    User.findOne({ role: "admin"}, (err, admin) => {    //takes an obj & a callback fxn
        if(err) throw err
        if(admin) {
            return "admin account already exists"
        }
        //else create a new admin account
        //admin can only use the detaijs below to sign in
        User.create(     //takes an obj & a callback fxn
            { 
            firstName: "Book",
            lastName: "Goblin",
            username: "bookglobin",
            role: "admin"
        }, (err, user) => {
            if (err) throw err
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err
                bcrypt.hash(password, salt, (err, hash) =>{
                    if (err) throw err
                    user.password = hash;
                    user.save((err, savedUser) =>{
                        if(err) throw err
                        return "admin account created"
                    })
                })

            })
        } 
    )
})
}