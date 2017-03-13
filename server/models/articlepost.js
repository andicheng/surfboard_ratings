var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ArticlePostSchema = new mongoose.Schema({
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
   comments: [{
      type: Schema.Types.ObjectId, ref: 'ArticleComment'
   }],
}, {timestamps: true});

var ArticlePost = mongoose.model('ArticlePost', ArticlePostSchema);
