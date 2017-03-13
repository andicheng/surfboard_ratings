app.controller('countryController', ['$scope','usersFactory','tripsFactory', '$location','$routeParams', '$route', function($scope, usersFactory, tripsFactory, $location, $routeParams, $route) {

   usersFactory.getUser(function(user){
      $scope.user = user;
   });
   var getCountryTrips = function(){
   tripsFactory.getCountryTrips($routeParams.id, function(returned_data){
      $scope.trips = returned_data;
      var sum = 0
      var sumsurfrating=0;
      var sumamenitiesrating=0;
      var sumactivitiesrating=0;
      for(var i=0; i<$scope.trips.length; i++){
         sum += $scope.trips[i].rating;
         sumsurfrating += $scope.trips[i].surfrating;
         sumamenitiesrating += $scope.trips[i].amenitiesrating;
         sumactivitiesrating += $scope.trips[i].activitiesrating;
      }
      var averageRating = sum/$scope.trips.length;
      $scope.trips.count = $scope.trips.length;
      $scope.trips.averageRating = Math.round(averageRating*10)/10;
      $scope.trips.averagesurfRating = Math.round(sumsurfrating/$scope.trips.length*10)/10;
      $scope.trips.averageamenitiesRating = Math.round(sumamenitiesrating/$scope.trips.length*10)/10;
      $scope.trips.averageactivitiesRating = Math.round(sumactivitiesrating/$scope.trips.length*10)/10;
      $scope.url = $location.absUrl();
   })};
   getCountryTrips();
   $scope.logout = function(){
      usersFactory.logout(function(data){
      });
      $location.url('/login')
   }
   $scope.newPost = function(id, post){
      tripsFactory.newPost(id, post, function(data){
         if(data.data.errors){
            // $scope.errors = data.data.errors;
            alert(data.data.message);
         }else{
            $scope.post = {};
            getCountryTrips();
         }
      })
   }
   $scope.newComment = function(id, comment){
      tripsFactory.newComment(id, comment, function(data){
         if(data.data.errors){
            // $scope.errors = data.data.errors;
            alert(data.data.message);
         }else{
            $scope.comment = {};
            getCountryTrips();
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
         console.log('test')
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
            getCountryTrips();
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
            getCountryTrips();
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
            getCountryTrips();
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
            getCountryTrips();
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
            getCountryTrips();
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
            getCountryTrips();
         }
      }, function(err){
         console.log("Please try again later.", err);
      })
   }
   $scope.reply = false;
   $scope.reporttrip = false;
   $scope.reportpost = false;
   $scope.reportcomment = false;
   $scope.showreplies = false;
}]);
