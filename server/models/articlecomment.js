var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ArticleCommentSchema = new mongoose.Schema({
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
      type: Schema.Types.ObjectId, ref: 'ArticlePost'
   },
}, {timestamps: true});

var ArticleComment = mongoose.model('ArticleComment', ArticleCommentSchema);
