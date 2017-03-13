var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');
var Comment = mongoose.model('Comment');
var Trip = mongoose.model('Trip');
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

console.log('trips controller');
module.exports = {
   index: function(req,res){
      Trip.find({}).populate('_user').populate({path:'posts',model:'Post',populate:{path:'_user',model:'User'}}).sort('-rating').exec(function(err, trips){
         if(err){
            console.log('loading error');
            return res.sendStatus('500');
         }else{
            console.log('successfully getting trips');
         }
         res.json(trips);
      })
   },
   areaTrips: function(req,res){
      Trip.find({area: req.params.id}).populate('_user').populate({path:'posts',model:'Post',populate:[{path:'_user',model:'User'},{path:'comments',model:'Comment',populate:{path:'_user',model:'User'}}]}).sort('-createdAt').exec(function(err, trips){
         if(err){
            console.log('area loading error');
            return res.sendStatus('500');
         }else{
            console.log('successfully getting area trips');
         }
         res.json(trips);
      })
   },
   countryTrips: function(req,res){
      Trip.find({country: req.params.id}).populate('_user').populate({path:'posts',model:'Post',populate:[{path:'_user',model:'User'},{path:'comments',model:'Comment',populate:{path:'_user',model:'User'}}]}).sort('-createdAt').exec(function(err, trips){
         if(err){
            console.log('country loading error');
            return res.sendStatus('500');
         }else{
            console.log('successfully getting country trips');
         }
         res.json(trips);
      })
   },
   regionTrips: function(req,res){
      Trip.find({region: req.params.id}).populate('_user').populate({path:'posts',model:'Post',populate:[{path:'_user',model:'User'},{path:'comments',model:'Comment',populate:{path:'_user',model:'User'}}]}).sort('-createdAt').exec(function(err, trips){
         if(err){
            console.log('region loading error');
            return res.sendStatus('500');
         }else{
            console.log('successfully getting region trips');
         }
         res.json(trips);
      })
   },
   regionCountryTrips: function(req,res){
      Trip.find({region: req.params.region, country: req.params.country}).populate('_user').populate({path:'posts',model:'Post',populate:[{path:'_user',model:'User'},{path:'comments',model:'Comment',populate:{path:'_user',model:'User'}}]}).sort('-createdAt').exec(function(err, trips){
         if(err){
            console.log('region/country loading error');
            return res.sendStatus('500');
         }else{
            console.log('successfully getting region/country trips');
         }
         res.json(trips);
      })
   },
   trip: function(req,res){
      Trip.find({_id: req.params.id}).populate('_user').populate({path:'posts',model:'Post',populate:[{path:'_user',model:'User'},{path:'comments',model:'Comment',populate:{path:'_user',model:'User'}}]}).sort('-createdAt').exec(function(err, trip){
         if(err){
            console.log('trip loading error');
            return res.sendStatus('500');
         }else{
            console.log('successfully getting trip');
         }
         res.json(trip);
      })
   },
   userTrips: function(req,res){
      User.findOne({_id: req.params.id}).exec(function(err, user){
         if(err){
            console.log('loading error');
            return res.sendStatus('500');
         }else{
            Trip.find({_user: user}).populate('_user').populate({path:'posts',model:'Post',populate:[{path:'_user',model:'User'},{path:'comments',model:'Comment',populate:{path:'_user',model:'User'}}]}).sort('-createdAt').exec(function(err, trips){
               if(err){
                  console.log('loading error');
                  return res.sendStatus('500');
               }else{
                  console.log('successfully getting user trips');
               }
               res.json(trips);
            })
         }
      })
   },
   newTrip: function(req,res){
      User.findOne({_id: req.session.user._id}, function(err, user){
         if(err){
            return res.sendStatus('500');
         }else if (!req.body.country2 && !req.body.country){
            res.json({
               errors: {
                    message: 'Please complete all required fields',
               },
               name: "Validation error"
            })
         }else{
            console.log('***************', req.body)
            var trip = new Trip(req.body);
            if(req.body.area2){
               trip.area = req.body.area2;
            }else if(req.body.area){
               trip.area = req.body.area.area;
            }else{
               trip.area = 'Area not specified'
            }
            if(req.body.country2){
               trip.country = req.body.country2;
            }else{
               trip.country = req.body.country.country;
            }
            trip._user = req.session.user._id;
            trip.markModified('trip.area');
            trip.markModified('trip.country');
            console.log(trip);
            trip.save(function(err){
               if(err){
                  console.log('trip loading error')
                  res.json(err)
               }else{
                  console.log("#####TEst saving new trip")
                  user.trips.push(trip);
                  user.save(function(err){
                     if(err){
                        console.log('user trip loading error');
                        res.sendStatus('500');
                     }else{
                        console.log('@@@@@@@@@@@@@ successfully added a new trip');
                        res.json(trip);
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
            Trip.findOne({_id: req.params.id}, function(err, trip){
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
                           trip.posts.push(post)
                           trip.save(function(err){
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
   tripthumbsup: function(req, res){
      User.findOne({_id: req.session.user._id}, function(err, user){
         if(err){
            return res.sendStatus('500');
         }else{
            Trip.findOne({_id: req.body._id}, function(err, trip){
               if(err){
                  return res.sendStatus('500');
               }else{
                  if(trip.thumbsup.indexOf(user._id)>=0){
                     console.log('already liked');
                     res.json({
                        errors: {
                             message: 'Already liked',
                        },
                        name: "Validation error"
                     })
                  }else{
                     trip.thumbsup.push(user._id)
                     trip.save(function(err){
                        if(err){
                           console.log('tripthumbsup load error')
                           return res.sendStatus('500');
                        }else{
                           console.log('successfully added a tripthumbsup');
                           res.json(trip);
                           req.session.user = user;
                        }
                     })
                  }
               }
            })
         }
      })
   },
   tripthumbsdown: function(req, res){
      User.findOne({_id: req.session.user._id}, function(err, user){
         if(err){
            return res.sendStatus('500');
         }else{
            Trip.findOne({_id: req.body._id}, function(err, trip){
               if(err){
                  return res.sendStatus('500');
               }else{
                  if(trip.thumbsdown.indexOf(user._id)>=0){
                     console.log('already unliked');
                     res.json({
                        errors: {
                             message: 'Already unliked',
                        },
                        name: "Validation error"
                     })
                  }else{
                     trip.thumbsdown.push(user._id)
                     trip.save(function(err){
                        if(err){
                           console.log('tripthumbsdown load error')
                           return res.sendStatus('500');
                        }else{
                           console.log('successfully added a tripthumbsdown');
                           res.json(trip);
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
         text: "Report of Inappropriate Comment Sent" + '\n\n' + "Comment: " + '\n\n' + "Trip description: " + '\n'+ req.body.description + '\n\n' + "Post or Trip text: " + '\n' + req.body.text + '\n\n' + "Reason: "+req.body.report + '\n\n' + req.body._id
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
