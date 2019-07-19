const User = require('../models/User');
const jwt = require('jsonwebtoken'); // generate signed token
const expressjwt = require('express-jwt'); // authorization check
const {errorHandler} = require('../helpers/dbError');

//Register User
exports.register = async (req, res) => {
    try{
        const user = new User(req.body);
        await user.save((err, user) => {
            if(err){
                return res.status(400).json({err: errorHandler(err)});
            }
            res.status(200).json({user})
        });

        user.salt=undefined;
        user.hash_password=undefined;
        
    }
    catch(err){
      console.error(err.message);
    }
};

//Login User
exports.login = (req, res) => {
  //find user based on email
  const {email, password} = req.body;
  User.findOne({email}, (err, user) => {
    if(err || !user){
        return res.status(400).json({
            error: 'That email does not exists.. Pls Register '
        });
    }
    //if user exists, make sure email and password match
    //create auth method in user model
    if(!user.authenticate(password)){
        return res.status(401).json({error: 'Email and password do not match'})
    }

    //generate a token
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
    //persist the token with 't' into cookie with expiry date
    res.cookie('t', token, {expire: new Date() + 9999})
    //return response with user to font-end client
    const {_id, name, email, role} = user;
    return res.json({token, user: {_id, email, name, role}});
  });
}


//Logout User
exports.logout = (req, res) => {
    res.clearCookie('t');
    res.json({message: "Logout Successful"});
}


//Protected Routes 
exports.authRoute = expressjwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
})

//Authorization for Users
exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    if(!user){
        return res.send(403).json({error: 'Access Denied'})
    };
    //console.log(req.auth);
    next();
};

//Authorization for Admin
exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
        return res.status(403).json({error: 'Admin only!! Access Denied'})
    }
    next();
}