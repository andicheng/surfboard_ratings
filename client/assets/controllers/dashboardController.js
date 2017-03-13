app.controller('dashboardController', ['$scope','usersFactory','tripsFactory', '$location','$routeParams', '$route', function($scope, usersFactory, tripsFactory,$location, $routeParams, $route) {

   usersFactory.getUser(function(user){
      $scope.user = user;
   });
   var getTrips = function(){
   tripsFactory.getTrips(function(returned_data){
      $scope.trips = returned_data;
      var regions=[];
      for(var i=0; i<$scope.trips.length; i++){
         var sum=0;
         var sumsurfrating=0;
         var sumamenitiesrating=0;
         var sumactivitiesrating=0;
         var count=0;
         var region = $scope.trips[i].region;
         for(var j=i; j<$scope.trips.length; j++){
            if($scope.trips[j].region == region){
               sum+=$scope.trips[j].rating;
               sumsurfrating+=$scope.trips[j].surfrating;
               sumamenitiesrating+=$scope.trips[j].amenitiesrating;
               sumactivitiesrating+=$scope.trips[j].activitiesrating;
               count++
            }
         }
         var found = regions.some(function (el) {
            return el.region == region;
         });
         if (!found) {
            regions.push({region: region, count: count, averageRating: Math.round(sum/count*10)/10,averageactivitiesRating: Math.round(sumactivitiesrating/count*10)/10,averagesurfRating: Math.round(sumsurfrating/count*10)/10,averageamenitiesRating: Math.round(sumamenitiesrating/count*10)/10})
         }
      }
      var countries=[];
      for(var i=0; i<$scope.trips.length; i++){
         var sum2=0;
         var sum2surfrating=0;
         var sum2amenitiesrating=0;
         var sum2activitiesrating=0;
         var count2=0;
         var country = $scope.trips[i].country;
         for(var j=i; j<$scope.trips.length; j++){
            if($scope.trips[j].country == country){
               sum2+=$scope.trips[j].rating;
               sum2surfrating+=$scope.trips[j].surfrating;
               sum2amenitiesrating+=$scope.trips[j].amenitiesrating;
               sum2activitiesrating+=$scope.trips[j].activitiesrating;
               count2++;
            }
         }
         var found = countries.some(function (el) {
            return el.country == country;
         });
         if (!found) {
            countries.push({country: country, count: count2, averageRating: Math.round(sum2/count2*10)/10,averageactivitiesRating: Math.round(sum2activitiesrating/count2*10)/10,averagesurfRating: Math.round(sum2surfrating/count2*10)/10,averageamenitiesRating: Math.round(sum2amenitiesrating/count2*10)/10})
         }
      }
      var areas=[];
      for(var i=0; i<$scope.trips.length; i++){
         var sum3=0;
         var sum3surfrating=0;
         var sum3amenitiesrating=0;
         var sum3activitiesrating=0;
         var count3=0;
         var area = $scope.trips[i].area;
         for(var j=i; j<$scope.trips.length; j++){
            if($scope.trips[j].area == area){
               sum3+=$scope.trips[j].rating;
               sum3surfrating+=$scope.trips[j].surfrating;
               sum3amenitiesrating+=$scope.trips[j].amenitiesrating;
               sum3activitiesrating+=$scope.trips[j].activitiesrating;
               count3++;
            }
         }
         var found = areas.some(function (el) {
            return el.area == area;
         });
         if (!found) {
            areas.push({area: area, count: count3, averageRating: Math.round(sum3/count3*10)/10,averageactivitiesRating: Math.round(sum3activitiesrating/count3*10)/10,averagesurfRating: Math.round(sum3surfrating/count3*10)/10,averageamenitiesRating: Math.round(sum3amenitiesrating/count3*10)/10})
         }
      }
      $scope.areas = areas;
      $scope.countries = countries;
      $scope.regions = regions;
      $scope.url = $location.absUrl();
   })};
   getTrips();
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
   $scope.logout = function(){
      console.log("logout clicked");
      usersFactory.logout(function(data){
      });
      $location.url('/login')
   }
   $scope.newTrip = function(){
      var day = '01';
      var month = $scope.myTrip.tripmonth;
      var year = $scope.myTrip.tripyear;
      var date = day+' '+month+' '+year;
      var mydate = new Date(date);
      if(mydate <= new Date()){
         tripsFactory.newTrip($scope.myTrip, function(data){
            console.log($scope.myTrip);
            if(data.data.errors){
               alert(data.data.errors.message);
            }else{
               $scope.myTrip = {};
               var id = data.data._user;
               console.log(data);
               $location.path('/user/'+id)
            }
         })
      }else{
         alert('Trip date cannot be in the future')
      }
   }
   $scope.show = function(){
      usersFactory.show($routeParams.user, function(data){
         $scope.user = data;
      });
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
   $scope.tripthumbsup = function(trip){
      tripsFactory.tripthumbsup(trip, function(data){
         if(data.data.errors){
            alert(data.data.errors.message);
            $route.reload();
         }else{
            console.log('successfully liked');
            getTrips();
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
            getTrips();
         }
      }, function(err){
         console.log("Please try again later.", err);
      })
   }
   $scope.reporttrip = false;
}]);
