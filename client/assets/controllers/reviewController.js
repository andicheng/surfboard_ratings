app.controller('surfboardController', ['$scope','usersFactory','surfboardsFactory', '$location','$routeParams', '$route', function($scope, usersFactory, surfboardsFactory, $location, $routeParams, $route) {

   usersFactory.getUser(function(user){
      $scope.user = user;
   });
   var getSurfboard = function(){
      surfboardsFactory.getSurfboard($routeParams.id, function(returned_data){
         $scope.surfboard = returned_data;
      })
   }
   getSurfboard();
   $scope.logout = function(){
      console.log("logout clicked");
      usersFactory.logout(function(data){
      });
      $location.url('/login')
   }
   $scope.newPost = function(id, post){
      surfboardsFactory.newPost(id, post, function(data){
         if(data.data.errors){
            // $scope.errors = data.data.errors;
            alert(data.data.message);
         }else{
            $scope.post = {};
            getSurfboard();
         }
      })
   }
   $scope.newComment = function(id, comment){
      surfboardsFactory.newComment(id, comment, function(data){
         if(data.data.errors){
            // $scope.errors = data.data.errors;
            alert(data.data.message);
         }else{
            $scope.comment = {};
            getSurfboard();
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
         console.log('test')
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
            getSurfboard();
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
            getSurfboard();
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
            getSurfboard();
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
            getSurfboard();
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
            getSurfboard();
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
            getSurfboard();
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
}]);
