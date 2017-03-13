var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentSchema = new mongoose.Schema({
   text: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
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
   _user: {
      type: Schema.Types.ObjectId, ref: 'User'
   },
   _post: {
      type: Schema.Types.ObjectId, ref: 'Post'
   },
}, {timestamps: true});

var Comment = mongoose.model('Comment', CommentSchema);
