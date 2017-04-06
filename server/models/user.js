var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var UserSchema = new mongoose.Schema({
   first_name: {
      type: String,
      required: true,
      trim: true,
   },
   last_name: {
      type: String,
      required: true,
      trim: true,
   },
   email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
   },
   username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 20,
   },
   password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 255,
      set: encryptPassword,
   },
   height: {
      type: Number,
      required: true,
   },
   surfingsince: {
      type: Date,
      required: true,
   },
   level: {
      type: String,
      required: false,
      default: 'Not Provided',
   },
   fitness: {
      type: String,
      required: false,
      default: 'Not Provided',
   },
   birthdate: {
      type: Date,
      required: false,
   },
   weight: {
      type: Number,
      required: true,
   },
   resetPasswordToken: String,
   resetPasswordExpires: Date,
   posts: [{type: Schema.Types.ObjectId, ref: "Post"}],
   comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
   surfboards: [{type: Schema.Types.ObjectId, ref: "Surfboard"}],
}, {timestamps: true});

function encryptPassword(password){
   if(password && password.length >6){
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
   }
   return '';
}

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('User', UserSchema);
