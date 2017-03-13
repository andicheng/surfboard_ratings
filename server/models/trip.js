var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var bcrypt = require('bcryptjs');
var TripSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
      minlength: 4,
   },
   description: {
      type: String,
      minlength: 4,
      required: true,
   },
   rating:{
      type: Number,
      min: 0,
      max: 10,
      required: true,
   },
   surfrating:{
      type: Number,
      min: 0,
      max: 10,
      required: true,
   },
   amenitiesrating:{
      type: Number,
      min: 0,
      max: 10,
      required: true,
   },
   activitiesrating:{
      type: Number,
      min: 0,
      max: 10,
      required: true,
   },
   region: {
      type: String,
      required: true,
   },
   country: {
      type: String,
      required: true,
   },
   area: {
      type: String,
      required: false,
   },
   tripmonth: {
      type: String,
      required: true,
   },
   tripyear: {
      type: Number,
      min: 1990,
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
   _user: {type: Schema.Types.ObjectId, ref: "User"},
}, {timestamps: true});

var Trip = mongoose.model('Trip', TripSchema);
