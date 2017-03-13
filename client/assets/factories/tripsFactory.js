app.factory('tripsFactory', ['$http','$location', function($http, $location) {
   var factory = {};
   factory.getTrips = function(callback){
      $http.get('/trips').then(function(returned_data){
         trips = returned_data.data;
         callback(trips);
      })
   };
   factory.getUser = function(callback){
      $http.get('/currentUser').then(function(returned_data){
         console.log(returned_data)
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
   factory.newTrip = function(trip, callback){
      $http.post('/newTrip', trip).then(function(res){
         callback(res);
      })
   };
   factory.getAreaTrips = function(area, callback){
      $http.get('/areaTrips/'+area).then(function(returned_data){
         trips = returned_data.data;
         callback(trips);
      })
   };
   factory.getCountryTrips = function(country, callback){
      $http.get('/countryTrips/'+country).then(function(returned_data){
         trips = returned_data.data;
         callback(trips);
      })
   };
   factory.getRegionTrips = function(region, callback){
      $http.get('/regionTrips/'+region).then(function(returned_data){
         trips = returned_data.data;
         callback(trips);
      })
   };
   factory.getregionCountryTrips = function(region, country, callback){
      $http.get('/regionCountryTrips/'+region+'/'+country).then(function(returned_data){
         trips = returned_data.data;
         callback(trips);
      })
   };
   factory.getTrip = function(trip, callback){
      $http.get('/trip/'+trip).then(function(returned_data){
         trip = returned_data.data;
         callback(trip);
      })
   };
   factory.getUserTrips = function(user, callback){
      $http.get('/userTrips/'+user).then(function(returned_data){
         trips = returned_data.data;
         callback(trips);
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
   factory.tripthumbsup = function(trip, callback){
      $http.post('/tripthumbsup', trip).then(function(res){
         callback(res);
      })
   };
   factory.tripthumbsdown = function(trip, callback){
      $http.post('/tripthumbsdown', trip).then(function(res){
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
