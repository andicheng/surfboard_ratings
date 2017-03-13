var mongoose = require('mongoose');
var users = require('./../controllers/users.js');
var articles = require('./../controllers/articles.js');
var trips = require('./../controllers/trips.js');

module.exports = function(app){
   // app.post('/users/username', users.username);
   app.post('/users/registration', users.register);
   app.post('/users/login', users.login);
   app.post('/users/adminlogin', users.adminlogin);
   app.post('/users/forgot', users.forgot);
   app.post('/contact', users.contact);
   app.post('/users/reset/:id', users.reset);
   app.get('/currentUser', users.getCurrent);
   app.get('/trips', trips.index);
   app.get('/areaTrips/:id', trips.areaTrips);
   app.get('/countryTrips/:id', trips.countryTrips);
   app.get('/regionTrips/:id', trips.regionTrips);
   app.get('/regionCountryTrips/:region/:country', trips.regionCountryTrips);
   app.get('/trip/:id', trips.trip);
   app.get('/userTrips/:id', trips.userTrips);
   app.get('/users', users.index);
   app.post('/reportcomments', trips.reportcomments);
   app.get('/articles', articles.articles);
   app.get('/getArticle/:id', articles.getArticle);
   app.use(userAuth);
   app.post('/newPost/:id', trips.newPost);
   app.post('/newComment/:id', trips.newComment);
   app.get('/logout', users.logout);
   app.delete('/users/:id', users.delete);
   app.post('/newTrip', trips.newTrip);
   app.post('/tripthumbsup', trips.tripthumbsup);
   app.post('/tripthumbsdown', trips.tripthumbsdown);
   app.post('/postthumbsup', trips.postthumbsup);
   app.post('/postthumbsdown', trips.postthumbsdown);
   app.post('/commentthumbsup', trips.commentthumbsup);
   app.post('/commentthumbsdown', trips.commentthumbsdown);
   app.post('/newArticlePost/:id', articles.newArticlePost);
   app.post('/newArticleComment/:id', articles.newArticleComment);
   app.post('/articlethumbsup', articles.articlethumbsup);
   app.post('/articlethumbsdown', articles.articlethumbsdown);
   app.post('/articlepostthumbsup', articles.articlepostthumbsup);
   app.post('/articlepostthumbsdown', articles.articlepostthumbsdown);
   app.post('/articlecommentthumbsup', articles.articlecommentthumbsup);
   app.post('/articlecommentthumbsdown', articles.articlecommentthumbsdown);
   app.use(adminAuth);
   app.post('/newArticle', articles.newArticle);
   // app.post('/newComment/:id', posts.newComment);
}

function userAuth(req,res,next){
	if (req.session.user){
		next();
	}else{
		res.sendStatus(401);
	}
}
function adminAuth(req,res,next){
	if (req.session.user && req.session.admin){
		next();
	}else{
		res.sendStatus(401);
	}
}
