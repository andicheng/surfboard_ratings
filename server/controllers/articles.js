var mongoose = require('mongoose');
var ArticlePost = mongoose.model('ArticlePost');
var User = mongoose.model('User');
var ArticleComment = mongoose.model('ArticleComment');
var Article = mongoose.model('Article');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

function response_additions(err, data) {
    if (err) {
        this.json({
            error: err
        });
    }
    this.json({
        data
    });
}

console.log('articles controller');
module.exports = {
   articles: function(req,res){
      Article.find({}).populate({path:'posts',model:'ArticlePost'}).exec(function(err, articles){
         if(err){
            console.log('articles loading error');
            return res.sendStatus('500');
         }else{
            console.log('successfully getting articles');
         }
         res.json(articles);
      })
   },
   newArticle: function(req, res){
      Article.update({title: req.body.title}, req.body, {upsert: true}, function(err, article){
         if(err){
            console.log('article loading error');
            res.json(err)
         }else{
            console.log('@@@@@@@@@@@@@ successfully added a new article');
            res.json(article);
         }
      })
   },
   getArticle: function(req,res){
      Article.find({title: req.params.id}).populate('_user').populate({path:'posts',model:'ArticlePost',populate:[{path:'_user',model:'User'},{path:'comments',model:'ArticleComment',populate:{path:'_user',model:'User'}}]}).sort('-createdAt').exec(function(err, article){
         if(err){
            console.log('error getting article');
            return res.sendStatus('500');
         }else{
            console.log('successfully getting article');
         }
         res.json(article);
      })
   },
   newArticlePost: function(req,res){
      User.findOne({_id: req.session.user._id}, function(err, user){
         if(err){
            return res.sendStatus('500');
         }else{
            Article.findOne({_id: req.params.id}, function(err, article){
               var post = new ArticlePost(req.body);
               post._user = user._id;
               post.save(function(err){
                  if(err){
                     console.log('post loading error')
                     res.json(err)
                  }else{
                     user.posts.push(post);
                     user.save(function(err){
                        if(err){
                           console.log('user/post loading error')
                           res.json(err)
                        }else{
                           article.posts.push(post)
                           article.save(function(err){
                              if(err){
                                 console.log('article post loading error');
                                 return res.sendStatus('500');
                              }else{
                                 console.log('successfully added a new article post');
                                 res.json(post);
                                 req.session.user = user;
                              }
                           })
                        }
                     })
                  }
               })
            })
         }
      })
   },
   newArticleComment: function(req,res){
      console.log('***************', req.body)
      User.findOne({_id: req.session.user._id}, function(err, user){
         if(err){
            return res.sendStatus('500');
         }else{
            ArticlePost.findOne({_id: req.params.id}, function(err, post){
               var comment = new ArticleComment(req.body);
               comment._user = user._id;
               comment.save(function(err){
                  if(err){
                     console.log('comment loading error')
                     res.json(err)
                  }else{
                     user.comments.push(comment);
                     user.save(function(err){
                        if(err){
                           console.log('user/comment loading error')
                           res.json(err)
                        }else{
                           post.comments.push(comment)
                           post.save(function(err){
                              if(err){
                                 console.log('article post/comment loading error');
                                 return res.sendStatus('500');
                              }else{
                                 console.log('successfully added a new article comment');
                                 res.json(comment);
                                 req.session.user = user;
                              }
                           })
                        }
                     })
                  }
               })
            })
         }
      })
   },
   articlethumbsup: function(req, res){
      User.findOne({_id: req.session.user._id}, function(err, user){
         if(err){
            return res.sendStatus('500');
         }else{
            Article.findOne({_id: req.body._id}, function(err, article){
               if(err){
                  return res.sendStatus('500');
               }else{
                  if(article.thumbsup.indexOf(user._id)>=0){
                     console.log('already liked');
                     res.json({
                        errors: {
                             message: 'Already liked',
                        },
                        name: "Validation error"
                     })
                  }else{
                     article.thumbsup.push(user._id)
                     article.save(function(err){
                        if(err){
                           console.log('article tripthumbsup load error')
                           return res.sendStatus('500');
                        }else{
                           console.log('successfully added an article tripthumbsup');
                           res.json(article);
                           req.session.user = user;
                        }
                     })
                  }
               }
            })
         }
      })
   },
   articlethumbsdown: function(req, res){
      User.findOne({_id: req.session.user._id}, function(err, user){
         if(err){
            return res.sendStatus('500');
         }else{
            Article.findOne({_id: req.body._id}, function(err, article){
               if(err){
                  return res.sendStatus('500');
               }else{
                  if(article.thumbsdown.indexOf(user._id)>=0){
                     console.log('already unliked');
                     res.json({
                        errors: {
                             message: 'Already unliked',
                        },
                        name: "Validation error"
                     })
                  }else{
                     article.thumbsdown.push(user._id)
                     article.save(function(err){
                        if(err){
                           console.log('article tripthumbsdown load error')
                           return res.sendStatus('500');
                        }else{
                           console.log('successfully added an article tripthumbsdown');
                           res.json(article);
                           req.session.user = user;
                        }
                     })
                  }
               }
            })
         }
      })
   },
   articlepostthumbsup: function(req, res){
      User.findOne({_id: req.session.user._id}, function(err, user){
         if(err){
            return res.sendStatus('500');
         }else{
            ArticlePost.findOne({_id: req.body._id}, function(err, post){
               if(err){
                  return res.sendStatus('500');
               }else{
                  if(post.thumbsup.indexOf(user._id)>=0){
                     console.log('already liked');
                     res.json({
                        errors: {
                             message: 'Already liked',
                        },
                        name: "Validation error"
                     })
                  }else{
                     post.thumbsup.push(user._id)
                     post.save(function(err){
                        if(err){
                           console.log('article postthumbsup load error')
                           return res.sendStatus('500');
                        }else{
                           console.log('successfully added an article postthumbsup');
                           res.json(post);
                           req.session.user = user;
                        }
                     })
                  }
               }
            })
         }
      })
   },
   articlepostthumbsdown: function(req, res){
      User.findOne({_id: req.session.user._id}, function(err, user){
         if(err){
            return res.sendStatus('500');
         }else{
            ArticlePost.findOne({_id: req.body._id}, function(err, post){
               if(err){
                  return res.sendStatus('500');
               }else{
                  if(post.thumbsdown.indexOf(user._id)>=0){
                     console.log('already unliked');
                     res.json({
                        errors: {
                             message: 'Already unliked',
                        },
                        name: "Validation error"
                     })
                  }else{
                     post.thumbsdown.push(user._id)
                     post.save(function(err){
                        if(err){
                           console.log('article postthumbsdown load error')
                           return res.sendStatus('500');
                        }else{
                           console.log('successfully added an article postthumbsdown');
                           res.json(post);
                           req.session.user = user;
                        }
                     })
                  }
               }
            })
         }
      })
   },
   articlecommentthumbsup: function(req, res){
      User.findOne({_id: req.session.user._id}, function(err, user){
         if(err){
            return res.sendStatus('500');
         }else{
            ArticleComment.findOne({_id: req.body._id}, function(err, comment){
               if(err){
                  return res.sendStatus('500');
               }else{
                  if(comment.thumbsup.indexOf(user._id)>=0){
                     console.log('already liked');
                     res.json({
                        errors: {
                             message: 'Already liked',
                        },
                        name: "Validation error"
                     })
                  }else{
                     comment.thumbsup.push(user._id)
                     comment.save(function(err){
                        if(err){
                           console.log('article commentthumbsup load error')
                           return res.sendStatus('500');
                        }else{
                           console.log('successfully added an article commentthumbsup');
                           res.json(comment);
                           req.session.user = user;
                        }
                     })
                  }
               }
            })
         }
      })
   },
   articlecommentthumbsdown: function(req, res){
      User.findOne({_id: req.session.user._id}, function(err, user){
         if(err){
            return res.sendStatus('500');
         }else{
            ArticleComment.findOne({_id: req.body._id}, function(err, comment){
               if(err){
                  return res.sendStatus('500');
               }else{
                  if(comment.thumbsdown.indexOf(user._id)>=0){
                     console.log('already unliked');
                     res.json({
                        errors: {
                             message: 'Already unliked',
                        },
                        name: "Validation error"
                     })
                  }else{
                     comment.thumbsdown.push(user._id)
                     comment.save(function(err){
                        if(err){
                           console.log('article commentthumbsdown load error')
                           return res.sendStatus('500');
                        }else{
                           console.log('successfully added an article commentthumbsdown');
                           res.json(comment);
                           req.session.user = user;
                        }
                     })
                  }
               }
            })
         }
      })
   },
   reportcomments: function(req, res){
      let transporter = nodemailer.createTransport({
         service: 'Gmail',
         auth: {
            user: 'andercheng@gmail.com',
            pass: 'Bigbolo1'
         }
      });
      let mailOptions = {
         from: req.body.email,
         to: 'andersonc@surfingjourneys.com',
         subject: 'SurfingJourneys.com Contact - Inappropriate Content',
         text: "Report of Inappropriate Comment Sent" + '\n\n' + "Comment: " + '\n\n' + "Article description: " + '\n'+ req.body.description + '\n\n' + "Post or Comment text: " + '\n' + req.body.text + '\n\n' + "Reason: "+req.body.report + '\n\n' + req.body._id
      };
      transporter.sendMail(mailOptions, function(err) {
         if(err){
            res.json({
               errors: {
                  login: {
                    message: 'Error sending email. Please try again later.',
                  }
               },
               name: "Validation error"
            })
         }else{
            res.json({
               errors: {
                  login: {
                    message: 'Your message has been sent to SurfingJourneys.com',
                  }
               },
            name: "Validation error"
         });
         }
      });
   },
}
