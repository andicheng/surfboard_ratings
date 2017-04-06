var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var bcrypt = require('bcryptjs');
var SurfboardSchema = new mongoose.Schema({
   manufacturer: {
      type: String,
      required: true,
   },
   name: {
      type: String,
      required: true,
   },
   review: {
      type: String,
      required: true,
   },
   boardlength: {
      type: Number,
      required: true,
   },
   customdims:{
      type: String,
      required: false,
   },
   type: {
      type: String,
      required: true,
   },
   rating:{
      type: Number,
      min: 0,
      max: 10,
      required: true,
   },
   speedrating:{
      type: Number,
      min: 0,
      max: 10,
      required: true,
   },
   maneuverabilityrating:{
      type: Number,
      min: 0,
      max: 10,
      required: true,
   },
   paddlerating:{
      type: Number,
      min: 0,
      max: 10,
      required: true,
   },
   stabilityrating:{
      type: Number,
      min: 0,
      max: 10,
      required: true,
   },
   thumbsup: [{
      type: String,
      required: false,
      unique: true,
   }],
   thumbsdown: [{
      type: String,
      required: false,
      unique: true,
   }],
   posts: [{type: Schema.Types.ObjectId, ref: "Post"}],
   user: [{}],
}, {timestamps: true});

var Surfboard = mongoose.model('Surfboard', SurfboardSchema);
