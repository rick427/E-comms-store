const User = require('../models/User');

exports.userById = (req, res, next ,id) => {
    User.findById(id).exec((err, user) => {
       if(err || !user){
           return res.status(400).json({
               error: 'User not found'
           })
       }
       req.profile = user;
       next();
    })
};

exports.getUser = (req, res) => {
  const user = req.profile;
  user.hash_password = undefined;
  user.salt = undefined;
  res.json(user);
};

exports.updateUser = (req, res) => {
    User.findOneAndUpdate(
        {_id: req.profile._id}, 
        {$set: req.body}, 
        {new: true}, 
        (err, user) => {
          if(err) {
            return res.status(400).json({error: "Unauthorized!!.. You can't update this profile"});
          }
          user.hash_password = undefined;
          user.salt = undefined;
          res.json({'Updated profile': user});
    })
};
