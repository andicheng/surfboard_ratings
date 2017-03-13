var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var AdminSchema = new mongoose.Schema({

   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 255,
   },
}, {timestamps: true});

function encryptPassword(password){
   if(password && password.length >6){
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
   }
   return '';
}

AdminSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var Admin = mongoose.model('Admin', AdminSchema);
