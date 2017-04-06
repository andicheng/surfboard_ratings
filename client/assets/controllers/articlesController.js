app.controller('articlesController', ['$scope','usersFactory','surfboardsFactory', '$location','$routeParams', '$route', '$sce', function($scope, usersFactory, surfboardsFactory, $location, $routeParams, $route, $sce) {

   usersFactory.getUser(function(user){
      $scope.user = user;
   });
   var getArticles = function(){
      surfboardsFactory.getArticles(function(returned_data){
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
      surfboardsFactory.newArticle($scope.article, function(data){
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
      surfboardsFactory.newPost(id, post, function(data){
         console.log(id, post)
         console.log(data)
         if(data.data.errors){
            // $scope.errors = data.data.errors;
            alert(data.data.message);
         }else{
            $scope.post = {};
            getAreaSurfboards();
         }
      })
   }
   $scope.newComment = function(id, comment){
      surfboardsFactory.newComment(id, comment, function(data){
         console.log(id, comment)
         if(data.data.errors){
            // $scope.errors = data.data.errors;
            alert(data.data.message);
         }else{
            $scope.comment = {};
            getAreaSurfboards();
         }
      })
   }
   $scope.reportcomments = function(comment, report){
      var req = Object.assign({}, comment, report);
      surfboardsFactory.reportcomments(req, function(data){
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
   $scope.surfboardthumbsup = function(surfboard){
      surfboardsFactory.surfboardthumbsup(surfboard, function(data){
         if(data.data.errors){
            alert(data.data.errors.message);
            $route.reload();
         }else{
            console.log('successfully liked');
            getAreaSurfboards();
         }
      }, function(err){
         console.log("Please try again later.", err);
      })
   }
   $scope.surfboardthumbsdown = function(surfboard){
      surfboardsFactory.surfboardthumbsdown(surfboard, function(data){
         if(data.data.errors){
            alert(data.data.errors.message);
            $route.reload();
         }else{
            console.log('successfully unliked');
            getAreaSurfboards();
         }
      }, function(err){
         console.log("Please try again later.", err);
      })
   }
   $scope.postthumbsup = function(post){
      surfboardsFactory.postthumbsup(post, function(data){
         if(data.data.errors){
            alert(data.data.errors.message);
            $route.reload();
         }else{
            console.log('successfully liked');
            getAreaSurfboards();
         }
      }, function(err){
         console.log("Please try again later.", err);
      })
   }
   $scope.postthumbsdown = function(post){
      surfboardsFactory.postthumbsdown(post, function(data){
         if(data.data.errors){
            alert(data.data.errors.message);
            $route.reload();
         }else{
            console.log('successfully unliked');
            getAreaSurfboards();
         }
      }, function(err){
         console.log("Please try again later.", err);
      })
   }
   $scope.commentthumbsup = function(comment){
      surfboardsFactory.commentthumbsup(comment, function(data){
         if(data.data.errors){
            alert(data.data.errors.message);
            $route.reload();
         }else{
            console.log('successfully liked');
            getAreaSurfboards();
         }
      }, function(err){
         console.log("Please try again later.", err);
      })
   }
   $scope.commentthumbsdown = function(comment){
      surfboardsFactory.commentthumbsdown(comment, function(data){
         if(data.data.errors){
            alert(data.data.errors.message);
            $route.reload();
         }else{
            console.log('successfully unliked');
            getAreaSurfboards();
         }
      }, function(err){
         console.log("Please try again later.", err);
      })
   }
   $scope.reply = false;
   $scope.reportsurfboard = false;
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
