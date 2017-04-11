var mongoose = require('mongoose');
var users = require('./../controllers/users.js');
var articles = require('./../controllers/articles.js');
var surfboards = require('./../controllers/surfboards.js');

module.exports = function(app){
   // app.post('/users/username', users.username);
   app.post('/users/registration', users.register);
   app.post('/users/login', users.login);
   app.post('/users/adminlogin', users.adminlogin);
   app.post('/users/forgot', users.forgot);
   app.post('/contact', users.contact);
   app.post('/users/reset/:id', users.reset);
   app.post('/users/updateuser', users.updateuser);
   app.get('/currentUser', users.getCurrent);
   app.get('/surfboards', surfboards.index);
   app.get('/manufacturerSurfboards/:id', surfboards.manufacturerSurfboards);
   app.get('/nameSurfboards/:id', surfboards.nameSurfboards);
   app.get('/surfboardDescriptions/:id', surfboards.surfboardDescriptions);
   app.get('/typeSurfboards/:id', surfboards.typeSurfboards);
   app.get('/manufacturerNameSurfboards/:manufacturer/:name', surfboards.manufacturerNameSurfboards);
   app.get('/surfboard/:id', surfboards.surfboard);
   app.get('/userSurfboards/:id', surfboards.usersurfboards);
   app.get('/users', users.index);
   app.get('/typeDescriptions', surfboards.typeDescriptions);
   app.post('/reportcomments', surfboards.reportcomments);
   app.get('/articles', articles.articles);
   app.get('/getArticle/:id', articles.getArticle);
   app.use(userAuth);
   app.post('/newPost/:id', surfboards.newPost);
   app.post('/newComment/:id', surfboards.newComment);
   app.get('/logout', users.logout);
   app.delete('/users/:id', users.delete);
   app.post('/newsurfboard', surfboards.newsurfboard);
   app.post('/surfboardthumbsup', surfboards.surfboardthumbsup);
   app.post('/surfboardthumbsdown', surfboards.surfboardthumbsdown);
   app.post('/postthumbsup', surfboards.postthumbsup);
   app.post('/postthumbsdown', surfboards.postthumbsdown);
   app.post('/commentthumbsup', surfboards.commentthumbsup);
   app.post('/commentthumbsdown', surfboards.commentthumbsdown);
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
   app.post('/newSurfboardDescription', surfboards.newSurfboardDescription)
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
