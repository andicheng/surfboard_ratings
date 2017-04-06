var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var bcrypt = require('bcryptjs');
var TypeSchema = new mongoose.Schema({
   type: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
}, {timestamps: true});

var Type = mongoose.model('Type', TypeSchema);
