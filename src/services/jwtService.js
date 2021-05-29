const jwt = require('jsonwwebtoken');
const secret = process.env.JWT_SECRET;
const expiry = Number(process.env.TOKEN_EXPIRY)


exports.createToken = (user) => {
    try {
let token = jwt.sign(
    {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        // role: newUser.role
    }, 
    secret,
    {expiresin: expiry}
), 
    return token
}catch (err)  {
    console.log(err)
   return null       
}

}



   exports.decodeToken = (token) => {
       try {
           let decodedToken = jwt.verify(token, secret);
           return decodedToken
       }catch (err) {
           console.log(error)
        return null
        }
   }                                        
                    
                