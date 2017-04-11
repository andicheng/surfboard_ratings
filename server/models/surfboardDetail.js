var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var bcrypt = require('bcryptjs');
var SurfboardDetailSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
}, {timestamps: true});

var SurfboardDetail = mongoose.model('SurfboardDetail', SurfboardDetailSchema);
