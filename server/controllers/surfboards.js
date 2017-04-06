var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');
var Comment = mongoose.model('Comment');
var Surfboard = mongoose.model('Surfboard');
var Type = mongoose.model('Type');
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

console.log('surfboards controller');
module.exports = {
   index: function(req,res){
      Surfboard.find({}).populate('_user').populate({path:'posts',model:'Post',populate:{path:'_user',model:'User'}}).sort('-rating').exec(function(err, surfboards){
         if(err){
            console.log('loading error');
            return res.sendStatus('500');
         }else{
            console.log('successfully getting surfboards');
         }
         res.json(surfboards);
      })
   },
   nameSurfboards: function(req,res){
      Surfboard.find({name: req.params.id}).populate('_user').populate({path:'posts',model:'Post',populate:[{path:'_user',model:'User'},{path:'comments',model:'Comment',populate:{path:'_user',model:'User'}}]}).sort('-createdAt').exec(function(err, surfboards){
         if(err){
            console.log('name loading error');
            return res.sendStatus('500');
         }else{
            console.log('successfully getting name surfboards');
         }
         res.json(surfboards);
      })
   },
   manufacturerSurfboards: function(req,res){
      Surfboard.find({manufacturer: req.params.id}).populate('_user').populate({path:'posts',model:'Post',populate:[{path:'_user',model:'User'},{path:'comments',model:'Comment',populate:{path:'_user',model:'User'}}]}).sort('-createdAt').exec(function(err, surfboards){
         if(err){
            console.log('manufacturer loading error');
            return res.sendStatus('500');
         }else{
            console.log('successfully getting manufacturer surfboards');
         }
         res.json(surfboards);
      })
   },
   typeSurfboards: function(req,res){
      Surfboard.find({type: req.params.id}).populate('_user').populate({path:'posts',model:'Post',populate:[{path:'_user',model:'User'},{path:'comments',model:'Comment',populate:{path:'_user',model:'User'}}]}).sort('-createdAt').exec(function(err, surfboards){
         if(err){
            console.log('type loading error');
            return res.sendStatus('500');
         }else{
            console.log('successfully getting type surfboards');
         }
         res.json(surfboards);
      })
   },
   typeDescriptions: function(req,res){
      Type.find({}).exec(function(err, types){
         if(err){
            console.log('type description loading error');
            return res.sendStatus('500');
         }else{
            console.log('successfully getting type descriptions');
         }
         res.json(types);
      })
   },
   manufacturerNameSurfboards: function(req,res){
      Surfboard.find({manufacturer: req.params.manufacturer, name: req.params.name}).populate('_user').populate({path:'posts',model:'Post',populate:[{path:'_user',model:'User'},{path:'comments',model:'Comment',populate:{path:'_user',model:'User'}}]}).sort('-createdAt').exec(function(err, surfboards){
         if(err){
            console.log('type/manufacturer loading error');
            return res.sendStatus('500');
         }else{
            console.log('successfully getting type/manufacturer surfboards');
         }
         res.json(surfboards);
      })
   },
   surfboard: function(req,res){
      Surfboard.find({_id: req.params.id}).populate('_user').populate({path:'posts',model:'Post',populate:[{path:'_user',model:'User'},{path:'comments',model:'Comment',populate:{path:'_user',model:'User'}}]}).sort('-createdAt').exec(function(err, surfboard){
         if(err){
            console.log('surfboard loading error');
            return res.sendStatus('500');
         }else{
            console.log('successfully getting surfboard');
         }
         res.json(surfboard);
      })
   },
   usersurfboards: function(req,res){
      User.findOne({_id: req.params.id}).exec(function(err, user){
         if(err){
            console.log('loading error');
            return res.sendStatus('500');
         }else{
            Surfboard.find({'user._id': req.params.id}).populate({path:'posts',model:'Post',populate:[{path:'_user',model:'User'},{path:'comments',model:'Comment',populate:{path:'_user',model:'User'}}]}).sort('-createdAt').exec(function(err, surfboards){
               if(err){
                  console.log('loading error');
                  return res.sendStatus('500');
               }else{
                  console.log('successfully getting user surfboards');
               }
               console.log(surfboards);
               res.json(surfboards);
            })
         }
      })
   },
   newsurfboard: function(req,res){
      User.findOne({_id: req.session.user._id}, function(err, user){
         if(err){
            return res.sendStatus('500');
         }else if (!req.body.manufacturer && !req.body.manufacturer2){
            res.json({
               errors: {
                    message: 'Please enter a brand/manufacturer',
               },
               name: "Validation error"
            })
         }else if (!req.body.name && !req.body.name2){
            res.json({
               errors: {
                    message: 'Please enter a surfboard name',
               },
               name: "Validation error"
            })
         }else{
            console.log('***************', req.body)
            var surfboard = new Surfboard(req.body);
            if(req.body.manufacturer2){
               surfboard.manufacturer = req.body.manufacturer2;
            }else{
               surfboard.manufacturer = req.body.manufacturer.manufacturer;
            }
            if(req.body.name2){
               surfboard.name = req.body.name2;
            }else{
               surfboard.name = req.body.name.name;
            }
            surfboard.user = req.session.user;
            surfboard.markModified('surfboard.manufacturer');
            surfboard.markModified('surfboard.name');
            console.log(surfboard);
            surfboard.save(function(err){
               if(err){
                  console.log('surfboard loading error')
                  res.json(err)
               }else{
                  console.log("#####TEst saving new surfboard")
                  user.surfboards.push(surfboard);
                  user.save(function(err){
                     if(err){
                        console.log('user surfboard loading error');
                        res.sendStatus('500');
                     }else{
                        console.log('@@@@@@@@@@@@@ successfully added a new surfboard');
                        res.json(surfboard);
                        req.session.user = user;
                     }
                  })
               }
            })
         }
      })
   },
   newPost: function(req,res){
      User.findOne({_id: req.session.user._id}, function(err, user){
         if(err){
            return res.sendStatus('500');
         }else{
            Surfboard.findOne({_id: req.params.id}, function(err, surfboard){
               var post = new Post(req.body);
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
                           surfboard.posts.push(post)
                           surfboard.save(function(err){
                              if(err){
                                 console.log('post loading error');
                                 return res.sendStatus('500');
                              }else{
                                 console.log('successfully added a new post');
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
   newComment: function(req,res){
      console.log('***************', req.body)
      User.findOne({_id: req.session.user._id}, function(err, user){
         if(err){
            return res.sendStatus('500');
         }else{
            Post.findOne({_id: req.params.id}, function(err, post){
               var comment = new Comment(req.body);
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
                                 console.log('post/comment loading error');
                                 return res.sendStatus('500');
                              }else{
                                 console.log('successfully added a new comment');
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
   surfboardthumbsup: function(req, res){
      User.findOne({_id: req.session.user._id}, function(err, user){
         if(err){
            return res.sendStatus('500');
         }else{
            Surfboard.findOne({_id: req.body._id}, function(err, surfboard){
               if(err){
                  return res.sendStatus('500');
               }else{
                  if(surfboard.thumbsup.indexOf(user._id)>=0){
                     console.log('already liked');
                     res.json({
                        errors: {
                             message: 'Already liked',
                        },
                        name: "Validation error"
                     })
                  }else{
                     surfboard.thumbsup.push(user._id)
                     surfboard.save(function(err){
                        if(err){
                           console.log('surfboardthumbsup load error')
                           return res.sendStatus('500');
                        }else{
                           console.log('successfully added a surfboardthumbsup');
                           res.json(surfboard);
                           req.session.user = user;
                        }
                     })
                  }
               }
            })
         }
      })
   },
   surfboardthumbsdown: function(req, res){
      User.findOne({_id: req.session.user._id}, function(err, user){
         if(err){
            return res.sendStatus('500');
         }else{
            Surfboard.findOne({_id: req.body._id}, function(err, surfboard){
               if(err){
                  return res.sendStatus('500');
               }else{
                  if(surfboard.thumbsdown.indexOf(user._id)>=0){
                     console.log('already unliked');
                     res.json({
                        errors: {
                             message: 'Already unliked',
                        },
                        name: "Validation error"
                     })
                  }else{
                     surfboard.thumbsdown.push(user._id)
                     surfboard.save(function(err){
                        if(err){
                           console.log('surfboardthumbsdown load error')
                           return res.sendStatus('500');
                        }else{
                           console.log('successfully added a surfboardthumbsdown');
                           res.json(surfboard);
                           req.session.user = user;
                        }
                     })
                  }
               }
            })
         }
      })
   },
   postthumbsup: function(req, res){
      User.findOne({_id: req.session.user._id}, function(err, user){
         if(err){
            return res.sendStatus('500');
         }else{
            Post.findOne({_id: req.body._id}, function(err, post){
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
                           console.log('postthumbsup load error')
                           return res.sendStatus('500');
                        }else{
                           console.log('successfully added a postthumbsup');
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
   postthumbsdown: function(req, res){
      User.findOne({_id: req.session.user._id}, function(err, user){
         if(err){
            return res.sendStatus('500');
         }else{
            Post.findOne({_id: req.body._id}, function(err, post){
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
                           console.log('postthumbsdown load error')
                           return res.sendStatus('500');
                        }else{
                           console.log('successfully added a postthumbsdown');
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
   commentthumbsup: function(req, res){
      User.findOne({_id: req.session.user._id}, function(err, user){
         if(err){
            return res.sendStatus('500');
         }else{
            Comment.findOne({_id: req.body._id}, function(err, comment){
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
                           console.log('commentthumbsup load error')
                           return res.sendStatus('500');
                        }else{
                           console.log('successfully added a commentthumbsup');
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
   commentthumbsdown: function(req, res){
      User.findOne({_id: req.session.user._id}, function(err, user){
         if(err){
            return res.sendStatus('500');
         }else{
            Comment.findOne({_id: req.body._id}, function(err, comment){
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
                           console.log('commentthumbsdown load error')
                           return res.sendStatus('500');
                        }else{
                           console.log('successfully added a commentthumbsdown');
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
         text: "Report of Inappropriate Comment Sent" + '\n\n' + "Comment: " + '\n\n' + "Surfboard description: " + '\n'+ req.body.description + '\n\n' + "Post or Surfboard text: " + '\n' + req.body.text + '\n\n' + "Reason: "+req.body.report + '\n\n' + req.body._id
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
