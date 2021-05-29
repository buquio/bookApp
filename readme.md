# Book store application

## create folder structure e.g src folder
1. index.js
2. database
3. models -create schema
4. routes
5. controllers
6. middleware
7. views
8. tests
9. config
10. services
11. utilities
12. seeders//here you manually enter admin details inside your code(seeding) =created by default
13. .env

## 1. setup your server
install nodejs on your computer
npm init -y
npm i express
npm i dotenv
npm i jsonwebtoken
npm i bcrypt
npm install --save-dev nodemon


## 2. setup your database
install mongodb on your computer
npm i mongoose
run mongod server - mongod
run mongo for testing - mongo


## 3. model-schema
book:
    title
    author
    category
    purchaseCount
    imageurl
    description

user:
    firstname
    lastname
    password
    role    

## 4. routes
* user route -register/sign-in route & login route
* book route 
* owner/admin route



## 5.controllers
**user registersign-in controller -authorisation**
 -create a new user
 -Hash user's password
 -create a token for user
 -send token to the user

 **user login controller -authentication**
 -check a new user
 -compare user's password with stored hash
 -create a token 
 -send token to user
 -authenticate book routes(GET)
 -role-based authentication for admin/owner
 -seeding

 **user controller**
 -

 **owner/Admin controller**
 -create books
 -fetch books
 -update books
 -delete books
 -search for books

## 6. middleware
 -authentication 

 ////create
////read
//find({}) -all 
//find(query)
//find(id)
//find and update

QUESTION:
 Hi @seyiogunjuyigbe thank you for the bookstore app lessons in the authentication video(registration) you removed required from the password in the user model so users can be create after hashing the password  is there any other way we can do this by adding the required validator I understand that we can achieved this using the pre save middleware I just want to know if there is another way.

 ANSWER:
 seyiogunjuyigbe:butterfly:  10:02 AM
@chimJay I removed the required option from the password because I was using User.create({}) and did not want to delve into pre-save hooks at that time. The mongoose .create() method automatically calls the .save() function which triggers all schema validations. You can still retain the required option in the password field if you create your user like this:
Use new User()  instead of User.create()
const user = new User({
firstName: "John",
lastName: "Doe",
email :"johndoe@mail.com"
})
this will not trigger the required validator error. You can now hash the password, and calluser.save()when done;
leave the password as plain text when using User.create() and then use a pre-save  hook in your user model to hash the password like this:
userSchema.pre('save', function preSave(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);
      user.password = hash;
      next();
    });
  });
});