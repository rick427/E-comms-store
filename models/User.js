const mongoose = require('mongoose');
const crypto = require('crypto');
const uuid = require('uuid/v1');

const UserSchema = new mongoose.Schema({
   name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32
   },

   email: {
    type: String,
    trim: true,
    required: true,
    unique: 32
   },

   hash_password: {
    type: String,
    required: true
   },

   about: {
       type: String,
       trim: true
   },

   salt: String,

   role: {
       type: Number,
       default: 0
   },

   history: {
       type: Array,
       default: []
   }
}, {timestamps: true});


//Virtual Fields
UserSchema.virtual('password')

.set(function(password) {
    this._password = password
    this.salt = uuid()
    this.hash_password = this.encrypt(password)
})
.get(() => {
    return this._password;
})

UserSchema.methods = {
    authenticate: function(text){
      return this.encrypt(text) === this.hash_password;
    },

    encrypt: function(password) {
        if(!password) return "";

        try{
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        }
        catch(err){
            return "";
        }
    }
}

module.exports = mongoose.model('User', UserSchema);