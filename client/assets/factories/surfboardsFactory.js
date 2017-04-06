app.factory('surfboardsFactory', ['$http','$location', function($http, $location) {
   var factory = {};
   factory.getSurfboards = function(callback){
      $http.get('/surfboards').then(function(returned_data){
         surfboards = returned_data.data;
         callback(surfboards);
      })
   };
   factory.getUser = function(callback){
      $http.get('/currentUser').then(function(returned_data){
         console.log(returned_data)
         callback(returned_data.data);
      })
   };
   factory.getTypeDescriptions = function(callback){
      $http.get('/typeDescriptions').then(function(returned_data){
         callback(returned_data.data);
      })
   };
   factory.contact = function(contact, callback, errback){
      $http.post('/contact', contact).then(function(res){
         console.log(contact)
         console.log(res)
         callback(res);
      })
   };
   factory.newSurfboard = function(surfboard, callback){
      $http.post('/newSurfboard', surfboard).then(function(res){
         callback(res);
      })
   };
   factory.getNameSurfboards = function(name, callback){
      $http.get('/nameSurfboards/'+name).then(function(returned_data){
         surfboards = returned_data.data;
         callback(surfboards);
      })
   };
   factory.getManufacturerSurfboards = function(manufacturer, callback){
      $http.get('/manufacturerSurfboards/'+manufacturer).then(function(returned_data){
         surfboards = returned_data.data;
         callback(surfboards);
      })
   };
   factory.getTypeSurfboards = function(type, callback){
      $http.get('/typeSurfboards/'+type).then(function(returned_data){
         surfboards = returned_data.data;
         callback(surfboards);
      })
   };
   factory.gettypeManufacturerSurfboards = function(type, manufacturer, callback){
      $http.get('/typeManufacturerSurfboards/'+type+'/'+manufacturer).then(function(returned_data){
         surfboards = returned_data.data;
         callback(surfboards);
      })
   };
   factory.getmanufacturerNameSurfboards = function(manufacturer, name, callback){
      $http.get('/manufacturerNameSurfboards/'+manufacturer+'/'+name).then(function(returned_data){
         surfboards = returned_data.data;
         callback(surfboards);
      })
   };
   factory.getSurfboard = function(surfboard, callback){
      $http.get('/surfboard/'+surfboard).then(function(returned_data){
         surfboard = returned_data.data;
         callback(surfboard);
      })
   };
   factory.getUserSurfboards = function(user, callback){
      $http.get('/userSurfboards/'+user).then(function(returned_data){
         surfboards = returned_data.data;
         callback(surfboards);
      })
   };
   factory.newPost = function(id, post, callback){
      $http.post('/newPost/'+id, post).then(function(res){
         callback(res);
      })
   };
   factory.newComment = function(id, comment, callback){
      $http.post('/newComment/'+id, comment).then(function(res){
         callback(res);
      })
   };
   factory.reportcomments = function(req, callback){
      $http.post('/reportcomments', req).then(function(res){
         callback(res);
      })
   };
   factory.logout = function(callback){
      $http.get('/logout').then(function(res){
         callback(res);
      })
   };
   factory.surfboardthumbsup = function(surfboard, callback){
      $http.post('/surfboardthumbsup', surfboard).then(function(res){
         callback(res);
      })
   };
   factory.surfboardthumbsdown = function(surfboard, callback){
      $http.post('/surfboardthumbsdown', surfboard).then(function(res){
         callback(res);
      })
   };
   factory.postthumbsup = function(post, callback){
      $http.post('/postthumbsup', post).then(function(res){
         callback(res);
      })
   };
   factory.postthumbsdown = function(post, callback){
      $http.post('/postthumbsdown', post).then(function(res){
         callback(res);
      })
   };
   factory.commentthumbsup = function(comment, callback){
      $http.post('/commentthumbsup', comment).then(function(res){
         callback(res);
      })
   };
   factory.commentthumbsdown = function(comment, callback){
      $http.post('/commentthumbsdown', comment).then(function(res){
         callback(res);
      })
   };
   factory.newArticle = function(article, callback){
      $http.post('/newArticle', article).then(function(res){
         callback(res);
      })
   };
   factory.getArticles = function(callback){
      $http.get('/articles').then(function(returned_data){
         articles = returned_data;
         callback(articles);
      })
   };
   factory.getArticle = function(article, callback){
      $http.get('/getArticle/'+article).then(function(returned_data){
         article = returned_data;
         callback(article);
      })
   };
   factory.newArticlePost = function(id, post, callback){
      $http.post('/newArticlePost/'+id, post).then(function(res){
         callback(res);
      })
   };
   factory.newArticleComment = function(id, comment, callback){
      $http.post('/newArticleComment/'+id, comment).then(function(res){
         callback(res);
      })
   };
   factory.articlethumbsup = function(article, callback){
      $http.post('/articlethumbsup', article).then(function(res){
         callback(res);
      })
   };
   factory.articlethumbsdown = function(article, callback){
      $http.post('/articlethumbsdown', article).then(function(res){
         callback(res);
      })
   };
   factory.articlepostthumbsup = function(post, callback){
      $http.post('/articlepostthumbsup', post).then(function(res){
         callback(res);
      })
   };
   factory.articlepostthumbsdown = function(post, callback){
      $http.post('/articlepostthumbsdown', post).then(function(res){
         callback(res);
      })
   };
   factory.articlecommentthumbsup = function(comment, callback){
      $http.post('/articlecommentthumbsup', comment).then(function(res){
         callback(res);
      })
   };
   factory.articlecommentthumbsdown = function(comment, callback){
      $http.post('/articlecommentthumbsdown', comment).then(function(res){
         callback(res);
      })
   };
   return factory;
}]);
