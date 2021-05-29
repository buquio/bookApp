const jwt = require('jsonwwebtoken');
const secret = process.env.JWT_SECRET;
const { decodedToken } = require('../services/jwtService')


//1. check if user is authenticated
exports.authenticateUser = (req, res, next) => {
    //check if there is an authorisation token
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "authorization header required "})
    }
    //else
    let splittedHeader = req.headers.authorization.split(' ');
    console.log(splittedHeader)
    if(splittedHeader[0] !== "Bearer") {
        return res.status(401).json({ message: "authorization format is Bearer <token>" })
    }

    //decode token
    let token = splittedHeader[1];
let decodedToken = decodedToken(token)
if(!decodedToken) { 
            return res.status(401).json({ message: "user not found"})
        }else{
            req.user = decodedToken
            console.log(decodedToken)
        next() 
        }
    


    //decode token
    // let token = splittedHeader[1];
    // jwt.verify(token, secret, (err, decodedToken) => {
    //     if(err) return res.status(500).json({ err });
    //     if(!decodedToken) { //check if valid
    //         return res.status(401).json({ message: "invalid authorization token, please re-login"})
    //     }
    // //allow user to continue with request
    //     next() 
    // })


}

//2. check if admin is authenticated
exports.checkIfAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(401).json({ message: "this route is restricted to admin users"})
    }
    return next()
}