var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var bcrypt = require('bcryptjs');
var ArticleSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
      unique: true,
      index: true,
   },
   headline: {
      type: String,
      required: true,
   },
   text:{
      type: String,
      required: true,
   },
   author:{
      type: String,
      required: true,
   },
   keywords:{
      type: String,
      required: false,
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
   posts: [{type: Schema.Types.ObjectId, ref: "ArticlePost"}],
   _user: {type: Schema.Types.ObjectId, ref: "User"},
}, {timestamps: true});

var Article = mongoose.model('Article', ArticleSchema);
