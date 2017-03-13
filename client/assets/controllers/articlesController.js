app.controller('articlesController', ['$scope','usersFactory','tripsFactory', '$location','$routeParams', '$route', '$sce', function($scope, usersFactory, tripsFactory, $location, $routeParams, $route, $sce) {

   usersFactory.getUser(function(user){
      $scope.user = user;
   });
   var getArticles = function(){
      tripsFactory.getArticles(function(returned_data){
         if(returned_data.data.errors){
            // $scope.errors = data.data.errors;
            alert(returned_data.data.errors);
         }else{
            $scope.articles = returned_data.data;
         }
      })
   }
   getArticles();
   $scope.newArticle = function(){
      tripsFactory.newArticle($scope.article, function(data){
         if(data.data.errors){
            console.log('error saving article')
         }else{
            $scope.article = {};
            $location.url('/articles')
         }
      })
   }
   $scope.logout = function(){
      console.log("logout clicked");
      usersFactory.logout(function(data){
      });
      $location.url('/login')
   }
   $scope.newPost = function(id, post){
      tripsFactory.newPost(id, post, function(data){
         console.log(id, post)
         console.log(data)
         if(data.data.errors){
            // $scope.errors = data.data.errors;
            alert(data.data.message);
         }else{
            $scope.post = {};
            getAreaTrips();
         }
      })
   }
   $scope.newComment = function(id, comment){
      tripsFactory.newComment(id, comment, function(data){
         console.log(id, comment)
         if(data.data.errors){
            // $scope.errors = data.data.errors;
            alert(data.data.message);
         }else{
            $scope.comment = {};
            getAreaTrips();
         }
      })
   }
   $scope.reportcomments = function(comment, report){
      var req = Object.assign({}, comment, report);
      tripsFactory.reportcomments(req, function(data){
         if(data.data.errors){
            $scope.report = {};
            $scope.errors = data.data.errors;
            alert(data.data.errors.login.message);
            $route.reload();
         }else{
            $scope.report = {};
         }
      }, function(err){
         console.log("Please try again later.", err);
      })
   }
   $scope.testuser = function(){
      if(!$scope.user){
         alert("Please register or login to post comments")
      }else{
         console.log('Clicked')
      }
   }
   $scope.tripthumbsup = function(trip){
      tripsFactory.tripthumbsup(trip, function(data){
         if(data.data.errors){
            alert(data.data.errors.message);
            $route.reload();
         }else{
            console.log('successfully liked');
            getAreaTrips();
         }
      }, function(err){
         console.log("Please try again later.", err);
      })
   }
   $scope.tripthumbsdown = function(trip){
      tripsFactory.tripthumbsdown(trip, function(data){
         if(data.data.errors){
            alert(data.data.errors.message);
            $route.reload();
         }else{
            console.log('successfully unliked');
            getAreaTrips();
         }
      }, function(err){
         console.log("Please try again later.", err);
      })
   }
   $scope.postthumbsup = function(post){
      tripsFactory.postthumbsup(post, function(data){
         if(data.data.errors){
            alert(data.data.errors.message);
            $route.reload();
         }else{
            console.log('successfully liked');
            getAreaTrips();
         }
      }, function(err){
         console.log("Please try again later.", err);
      })
   }
   $scope.postthumbsdown = function(post){
      tripsFactory.postthumbsdown(post, function(data){
         if(data.data.errors){
            alert(data.data.errors.message);
            $route.reload();
         }else{
            console.log('successfully unliked');
            getAreaTrips();
         }
      }, function(err){
         console.log("Please try again later.", err);
      })
   }
   $scope.commentthumbsup = function(comment){
      tripsFactory.commentthumbsup(comment, function(data){
         if(data.data.errors){
            alert(data.data.errors.message);
            $route.reload();
         }else{
            console.log('successfully liked');
            getAreaTrips();
         }
      }, function(err){
         console.log("Please try again later.", err);
      })
   }
   $scope.commentthumbsdown = function(comment){
      tripsFactory.commentthumbsdown(comment, function(data){
         if(data.data.errors){
            alert(data.data.errors.message);
            $route.reload();
         }else{
            console.log('successfully unliked');
            getAreaTrips();
         }
      }, function(err){
         console.log("Please try again later.", err);
      })
   }
   $scope.reply = false;
   $scope.reporttrip = false;
   $scope.reportpost = false;
   $scope.reportcomment = false;
   $scope.article = {
      title: "Title Test",
      headline: "Title Heading",
      text: "<h2>Testing text</h2> \
      <p>This should be another paragraph</p> \
      <input type=submit value='Submit'>"
   }
   $scope.text = $sce.trustAsHtml($scope.article.text);
}]);
