

//setup mongoose
const mongoose = require('mongoose');
// const connectionString = "mongodb://localhost:27017/bookapp"
const connectionString = process.env.DB_URL


//create a function to connect to the database
module.exports = function () {
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (err) {
        console.log({err})
    } else {
        console.log("Database connected successfully!")
    }
})
} 



