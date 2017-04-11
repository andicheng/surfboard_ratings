app.controller('articleController', ['$scope','usersFactory','surfboardsFactory', '$location','$routeParams', '$route', '$sce', function($scope, usersFactory, surfboardsFactory, $location, $routeParams, $route, $sce) {

   usersFactory.getUser(function(user){
      $scope.user = user;
   });
   var getArticle = function(){
      surfboardsFactory.getArticle($routeParams.id, function(data){
         if(data.data.errors){
            console.log('error getting article')
         }else{
            $scope.article = data.data[0];
            $scope.text = $sce.trustAsHtml($scope.article.text);
         }
      })
   };
   getArticle();
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
   $scope.newSurfboardDescription = function(){
      surfboardsFactory.newSurfboardDescription($scope.surfboardDescription, function(data){
         if(data.errors){
            console.log('error saving new Surfboard Description')
         }else{
            $scope.surfboardDescription = {};
            $location.url('/dashboard')
         }
      })
   }
   $scope.logout = function(){
      console.log("logout clicked");
      usersFactory.logout(function(data){
      });
      $location.url('/login')
   }
   $scope.newArticlePost = function(id, post){
      surfboardsFactory.newArticlePost(id, post, function(data){
         console.log(id, post)
         console.log(data)
         if(data.data.errors){
            // $scope.errors = data.data.errors;
            alert(data.data.message);
         }else{
            $scope.post = {};
            getArticle();
         }
      })
   }
   $scope.newArticleComment = function(id, comment){
      surfboardsFactory.newArticleComment(id, comment, function(data){
         console.log(id, comment)
         if(data.data.errors){
            // $scope.errors = data.data.errors;
            alert(data.data.message);
         }else{
            $scope.comment = {};
            getArticle();
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
   $scope.articlethumbsup = function(article){
      surfboardsFactory.articlethumbsup(article, function(data){
         if(data.data.errors){
            alert(data.data.errors.message);
            $route.reload();
         }else{
            console.log('successfully liked');
            getArticle();
         }
      }, function(err){
         console.log("Please try again later.", err);
      })
   }
   $scope.articlethumbsdown = function(article){
      surfboardsFactory.articlethumbsdown(article, function(data){
         if(data.data.errors){
            alert(data.data.errors.message);
            $route.reload();
         }else{
            console.log('successfully unliked');
            getArticle();
         }
      }, function(err){
         console.log("Please try again later.", err);
      })
   }
   $scope.articlepostthumbsup = function(post){
      surfboardsFactory.articlepostthumbsup(post, function(data){
         if(data.data.errors){
            alert(data.data.errors.message);
            $route.reload();
         }else{
            console.log('successfully liked');
            getArticle();
         }
      }, function(err){
         console.log("Please try again later.", err);
      })
   }
   $scope.articlepostthumbsdown = function(post){
      surfboardsFactory.articlepostthumbsdown(post, function(data){
         if(data.data.errors){
            alert(data.data.errors.message);
            $route.reload();
         }else{
            console.log('successfully unliked');
            getArticle();
         }
      }, function(err){
         console.log("Please try again later.", err);
      })
   }
   $scope.articlecommentthumbsup = function(comment){
      surfboardsFactory.articlecommentthumbsup(comment, function(data){
         if(data.data.errors){
            alert(data.data.errors.message);
            $route.reload();
         }else{
            console.log('successfully liked');
            getArticle();
         }
      }, function(err){
         console.log("Please try again later.", err);
      })
   }
   $scope.articlecommentthumbsdown = function(comment){
      surfboardsFactory.articlecommentthumbsdown(comment, function(data){
         if(data.data.errors){
            alert(data.data.errors.message);
            $route.reload();
         }else{
            console.log('successfully unliked');
            getArticle();
         }
      }, function(err){
         console.log("Please try again later.", err);
      })
   }
   $scope.reply = false;
   $scope.reportsurfboard = false;
   $scope.reportpost = false;
   $scope.reportcomment = false;
   $scope.showreplies = false;
   // $scope.article = {
   //    title: "Title Test",
   //    headline: "Title Heading",
   //    text: "<h2>Testing text</h2> \
   //    <p>This should be another paragraph</p> \
   //    <input type=submit value='Submit'>"
   // }

}]);
