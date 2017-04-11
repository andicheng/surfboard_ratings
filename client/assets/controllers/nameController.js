app.controller('nameController', ['$scope','usersFactory','surfboardsFactory', '$location','$routeParams', '$route', '$sce', function($scope, usersFactory, surfboardsFactory, $location, $routeParams, $route, $sce) {

   usersFactory.getUser(function(user){
      $scope.user = user;
      $scope.reply = false;
      $scope.reportsurfboard = false;
      $scope.reportpost = false;
      $scope.reportcomment = false;
      // $scope.showreplies = false;
      $scope.url = $location.absUrl();
   });
   var getSurfboardDescriptions = function(){
      surfboardsFactory.getSurfboardDescriptions($routeParams.id, function(data){
         if(data.errors){
            console.log('error getting article')
         }else{
            $scope.surfboarddescrip = data[0];
            $scope.description = $sce.trustAsHtml($scope.surfboarddescrip.description);
         }
      })
   };
   getSurfboardDescriptions();
   var getNameSurfboards = function(){
      surfboardsFactory.getNameSurfboards($routeParams.id, function(returned_data){
         $scope.surfboards = returned_data;
         var sum=0;
         var sumspeedrating=0;
         var summaneuverabilityrating=0;
         var sumstabilityrating=0;
         var sumpaddlerating=0;
         for(var i=0; i<$scope.surfboards.length; i++){
            sum+=$scope.surfboards[i].rating;
            sumspeedrating+=$scope.surfboards[i].speedrating;
            summaneuverabilityrating+=$scope.surfboards[i].maneuverabilityrating;
            sumstabilityrating+=$scope.surfboards[i].stabilityrating;
            sumpaddlerating+=$scope.surfboards[i].paddlerating;
         }
         for(var i=0; i<$scope.surfboards.length; i++){
            $scope.surfboards[i].boardlength = Math.floor($scope.surfboards[i].boardlength/12)+"'"+($scope.surfboards[i].boardlength%12)+'"'
            $scope.surfboards[i].user[0].weight = $scope.surfboards[i].user[0].weight+" lbs or "+Math.round($scope.surfboards[i].user[0].weight/2.20462*10)/10+" kgs"
            $scope.surfboards[i].user[0].height = Math.floor($scope.surfboards[i].user[0].height/12)+"'"+($scope.surfboards[i].user[0].height%12)+'" or '+Math.round($scope.surfboards[i].user[0].height*2.54)+" cm"
            if(!$scope.surfboards[i].user[0].birthdate){
               $scope.surfboards[i].user[0].age = "Not Provided"
            }else{
            $scope.surfboards[i].user[0].age = Math.ceil(Math.abs(new Date() - new Date($scope.surfboards[i].user[0].birthdate))/(1000 * 3600 * 24 * 365));
            }
         }
         var averageRating = sum/$scope.surfboards.length;
         $scope.surfboards.count = $scope.surfboards.length;
         $scope.surfboards.averageRating = Math.round(averageRating*10)/10;
         $scope.surfboards.averagespeedRating = Math.round(sumspeedrating/$scope.surfboards.length*10)/10;
         $scope.surfboards.averagemaneuverabilityRating = Math.round(summaneuverabilityrating/$scope.surfboards.length*10)/10;
         $scope.surfboards.averagestabilityRating = Math.round(sumstabilityrating/$scope.surfboards.length*10)/10;
         $scope.surfboards.averagepaddleRating = Math.round(sumpaddlerating/$scope.surfboards.length*10)/10;
      })
   };
   getNameSurfboards();
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
            getNameSurfboards();
         }
      })
   }
   $scope.newComment = function(post, comment){
      var id = post._id
      surfboardsFactory.newComment(id, comment, function(data){
         if(data.data.errors){
            // $scope.errors = data.data.errors;
            alert(data.data.message);
         }else{
            $scope.comment = {};
            getNameSurfboards();
            post.showreplies = true;
            $scope.post = post;
         }
      })
   }
   // var expand = function(item){
   //    angular.forEach($scope.surfboards.posts, function (i) {
   //       console.log('testing')
   //       if (i === item) {
   //          i.showfull = true;
   //       } else {
   //          i.showfull = false;
   //       }
   //    });
   // }
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

      }
   }
   $scope.surfboardthumbsup = function(surfboard){
      surfboardsFactory.surfboardthumbsup(surfboard, function(data){
         if(data.data.errors){
            alert(data.data.errors.message);
            $route.reload();
         }else{
            console.log('successfully liked');
            getNameSurfboards();
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
            getNameSurfboards();
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
            getNameSurfboards();
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
            getNameSurfboards();
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
            getNameSurfboards();
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
            getNameSurfboards();
         }
      }, function(err){
         console.log("Please try again later.", err);
      })
   }
}]);
