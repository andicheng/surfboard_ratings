app.controller('userController', ['$scope','usersFactory','surfboardsFactory', '$location','$routeParams', '$route', '$sce', function($scope, usersFactory, surfboardsFactory, $location, $routeParams, $route, $sce) {

   usersFactory.getUser(function(user){
      $scope.user = user;
   });
   var getAllSurfboardDescriptions = function(){
      surfboardsFactory.getAllSurfboardDescriptions(function(data){
         if(data.errors){
            console.log('error getting article')
         }else{
            console.log(data)
            $scope.surfboarddescrips = data;
            for(var i=0; i<$scope.surfboarddescrips.length; i++){
               $scope.surfboarddescrips[i].description = $sce.trustAsHtml($scope.surfboarddescrips[i].description);
            }
         }
      })
   };
   getAllSurfboardDescriptions();
   var getUserSurfboards = function(){
   surfboardsFactory.getUserSurfboards($routeParams.id, function(returned_data){
      // returned_data.boardlength = Math.floor(returned_data.boardlength/12)
      $scope.surfboards = returned_data;
      $scope.url = $location.absUrl();
      for(var i=0; i<$scope.surfboards.length; i++){
         $scope.surfboards[i].boardlength = Math.floor($scope.surfboards[i].boardlength/12)+"'"+($scope.surfboards[i].boardlength%12)+'"'
         $scope.surfboards[i].user[0].weight = $scope.surfboards[i].user[0].weight+" lbs or "+Math.round($scope.surfboards[i].user[0].weight/2.20462*10)/10+" kgs"
         $scope.surfboards[i].user[0].height = Math.floor($scope.surfboards[i].user[0].height/12)+"'"+($scope.surfboards[i].user[0].height%12)+'" or '+Math.round($scope.surfboards[i].user[0].height*2.54)+" cm"
         if(!$scope.surfboards[i].user[0].birthdate){
            $scope.surfboards[i].user[0].age = "Not Provided"
         }else{
         $scope.surfboards[i].user[0].age = Math.floor(Math.abs(new Date() - new Date($scope.surfboards[i].user[0].birthdate))/(1000 * 3600 * 24 * 365));
         }
      }
      // var sum = 0
      // for(var i=0; i<$scope.surfboards.length; i++){
      //    sum += $scope.surfboards[i].rating;
      // }
      // var averageRating = sum/$scope.surfboards.length;
      // $scope.surfboards.count = $scope.surfboards.length;
      // $scope.surfboards.region = $routeParams.id;
      // $scope.surfboards.averageRating = Math.round(averageRating*10)/10;
   })};
   getUserSurfboards();
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
            getUserSurfboards();
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
            getUserSurfboards();
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
            getUserSurfboards();
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
            getUserSurfboards();
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
            getUserSurfboards();
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
            getUserSurfboards();
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
            getUserSurfboards();
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
            getUserSurfboards();
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
