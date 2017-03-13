var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');
var Admin = mongoose.model('Admin');
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

console.log('users controller');
module.exports = {
   index: function(req,res){
      User.find({}, function(err, users){
         if(err){
            console.log('loading error');
            return res.sendStatus('500');
         }else{
            console.log('successfully getting users');
         }
         res.json(users);
      })
   },
   register: function(req,res){
      User.find({}, function(err, users){
         console.log(req.body)
         if(err){
            console.log('loading error');
            return res.sendStatus('500');
         }else{
            function emailexists(email) {
              return users.some(function(el) {
                return el.email === email;
              });
            }
            function usernameexists(username) {
              return users.some(function(el) {
                return el.username === username;
              });
            }
            if(emailexists(req.body.email)){
               res.json({
                  errors: {
                     message: "Email already registered",
                  },
                  name: "Validation error"
               });
            }else if(usernameexists(req.body.username)){
               res.json({
                  errors: {
                     message: "Username already in use",
                  },
                  name: "Validation error"
               });
            }else if(req.body.password.length < 8){
               res.json({
                  errors: {
                     message: "Password must be longer than 8 characters",
                  },
                  name: "Validation error"
               });
            }else{
               var user = new User(req.body);
               user.save(function(err, user){
                  if (err){
                       res.json(err);
                       console.log('Issues saving a new user')
                  }
                  else{
                     req.session.user={first_name: user.first_name,
                                       last_name: user.last_name,
                                       username: user.username,
                                       _id: user._id};
                     console.log('successfully added a new user')
                     res.status(200).send("session user established")
                  }
               })
            }
         }
      })
   },
   adminlogin: function(req,res){
      Admin.findOne({email: req.body.email}, function(err, admin){
         if(err){
            res.json(err);
         }else if(admin.password == req.body.password){
            User.findOne({email: req.body.email}, function(err, user){
               if(err){
                  res.json(err);
               }else{
                  req.session.admin = {
                     email: admin.email
                  };
                  req.session.user = {
                     first_name: user.first_name,
                     last_name: user.last_name,
                     username: user.username,
                     _id: user._id
                  };
                  res.send(admin.email);
               }
            });
         }else{
            res.json({
               errors: {
                  login: {
                     message: "email or password do not match",
                  }
               },
               name: "Validation error"
            });
         }
      })
   },
   login: function(req,res){
      User.findOne({email: req.body.email}, function(err, user){
         if(err){
            console.log('login errors')
            res.json({
               errors: {
                  login: {
                     message: "user name and/or password is invalid",
                     kind: "what didn't work",
                     path: "reference to the schema's name",
                     value: "cause of the initial error"
                  }
               },
               name: "Validation error"
            });
         }
         else if (!req.body.email || !req.body.password){
            res.json({
               errors: {
                  login: {
                     message: "must enter email and password"
                  }
               },
               name: "Validation error"
            });
         }
         else if (user && user.validPassword(req.body.password)){
            console.log('successfully logged in user');
            req.session.user = {
               first_name: user.first_name,
               last_name: user.last_name,
               username: user.username,
               _id: user._id
            };
            res.send(user);
         }
         else{
            res.json({
               errors: {
                  login: {
                     message: "user name and/or password is invalid",
                     kind: "what didn't work",
                     path: "reference to the schema's name",
                     value: "cause of the initial error"
                  }
               },
               name: "Validation error"
            });
         }
      })
   },
   forgot: function(req,res, next){
      async.waterfall([
          function(done) {
            crypto.randomBytes(20, function(err, buf) {
              var token = buf.toString('hex');
              done(err, token);
            });
          },
          function(token, done) {
            User.findOne({ email: req.body.email }, function(err, user) {
              if (!user) {
                 res.json({
                    errors: {
                       login: {
                          message: "No account with that email address exists.",
                       }
                    },
                    name: "Validation error"
                 });
              } else {
              user.resetPasswordToken = token;
              user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

              user.save(function(err) {
                done(err, token, user);
              });
              }
            });
          },
          function(token, user, done) {
            var smtpTransport = nodemailer.createTransport( {
              service: 'Gmail',
              auth: {
                user: 'andercheng@gmail.com',
                pass: 'Bigbolo1'
              }
            });
            var mailOptions = {
              to: user.email,
              from: 'passwordreset@demo.com',
              subject: 'Password Reset',
              text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/#/reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
               res.json({
                  errors: {
                     login: {
                       message: 'An e-mail has been sent to ' + user.email + ' with further instructions.',
                     }
                  },
                  name: "Validation error"
               });
              done(err, 'done');
            });
          }
        ], function(err) {
          if (err) return next(err);
          res.redirect('/#/forgot');
        });
   },
   contact: function(req, res){
      console.log('***************** Received contact **************')
      let transporter = nodemailer.createTransport({
         service: 'Gmail',
         auth: {
            user: 'andercheng@gmail.com',
            pass: 'Bigbolo1'
         }
      });
      let mailOptions = {
         from: '',
         to: 'andersonc@surfingjourneys.com',
         subject: 'SurfingJourneys.com Contact - '+ req.body.subject,
         text: req.body.personname + ' @ '+req.body.email+' wrote: '+ req.body.message,
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
                    message: 'Your message has been sent to SurfingJourneys.com.',
                  }
               },
            name: "Validation error"
         });
         }
      });
   },
   reset: function(req, res, next){
      async.waterfall([
       function(done) {
         User.findOne({resetPasswordToken: req.params.id, resetPasswordExpires: {$gt: Date.now()}}, function(err, user){
           if (!user) {
             res.json({
                errors: {
                   login: {
                     message: 'Password reset token is invalid or has expired.',
                   }
                },
                name: "Validation error"
             });
          } else {
           user.password = req.body.password;
           user.resetPasswordToken = undefined;
           user.resetPasswordExpires = undefined;
           console.log('******* new password set **********')
           user.save(function(err) {
            //  req.login(user, function(err) {
               done(err, user);
            //  });
           });
         }
         });
       },
       function(user, done) {
          var smtpTransport = nodemailer.createTransport( {
            service: 'Gmail',
            auth: {
              user: 'andercheng@gmail.com',
              pass: 'Bigbolo1'
            }
          });
         var mailOptions = {
           to: user.email,
           from: 'passwordreset@demo.com',
           subject: 'Your password has been changed',
           text: 'Hello,\n\n' +
             'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
         };
         smtpTransport.sendMail(mailOptions, function(err) {
            console.log('*********** Email sent **********')
            res.json({
               errors: {
                  login: {
                    message: 'Success! Your password has been changed and an email confirmation has been sent to '+user.email+'. Please login to continue.',
                  }
               },
               name: "Validation error"
            });
           done(err);
         });
       }
     ], function(err) {
       res.redirect('/');
     });
  },
   getCurrent: function(req,res){
      if(typeof req.session.user == 'undefined' || null == req.session.user){
         res.json();
      }else{
         User.findOne({_id: req.session.user._id}, function(err, user){
            if(err){
               console.log('issue getting session user');
               res.sendStatus('500');
            }else{
               var user = {
                  first_name: user.first_name,
                  last_name: user.last_name,
                  username: user.username,
                  _id: user._id
               };
               res.json(user);
            }
         })
      }
   },
   logout: function(req,res){
      req.session.user=null;
      req.session.admin=null;
      console.log("user logged out")
      res.status(200).send("session user logged out")
   },
   delete: function(req,res){
      User.remove({_id: req.params.id}, function(err){
         if(err){
            console.log('issues deleting a user')
         } else {
            console.log("successfully deleted a user!");
            res.sendStatus(200);
         }
      })
   },
   // getUser: function(req,res){
   //    User.findOne({_id: req.params.id}, function(err, user){
   //       if(err){
   //          console.log('loading error');
   //          return res.sendStatus('500');
   //       }else{
   //          console.log('successfully getting user');
   //          res.json(user);
   //       }
   //    })
   // },
   show: function(req,res){
      User.findOne({_id: req.params.id}, function(err, user){
         if(err){
            console.log('loading error');
            return res.sendStatus('500');
         }else{
            console.log('successfully getting user');
            res.json(user);
         }
      })
   }
}

// this.update = function(req,res){
//    console.log(req.params.id)
//    user.findOne({_id: req.params.id}, function(err, user){
//        user.first_name = req.body.first_name;
//        user.last_name = req.body.last_name;
//        user.birthdate = req.body.birthdate;
//        user.save(function(err){
//           if(err){
//              console.log('issues updating a user')
//           } else {
//              console.log("successfully updated a user!");
//              res.sendStatus(200);
//           }
//        })
//     })
// };
