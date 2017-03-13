app.controller('posttripController', ['$scope','usersFactory','tripsFactory', '$location','$routeParams', function($scope, usersFactory, tripsFactory,$location, $routeParams) {

   usersFactory.getUser(function(user){
      $scope.user = user;
   });
   var getTrips = function(){
   tripsFactory.getTrips(function(returned_data){
      $scope.trips = returned_data;
      var regions=[];
      for(var i=0; i<$scope.trips.length; i++){
         var sum=0;
         var count=0;
         var region = $scope.trips[i].region;
         for(var j=i; j<$scope.trips.length; j++){
            if($scope.trips[j].region == region){
               sum+=$scope.trips[j].rating;
               count++
            }
         }
         var found = regions.some(function (el) {
            return el.region == region;
         });
         if (!found) {
            regions.push({region: region, count: count, averageRating: Math.round(sum/count*10)/10})
         }
      }
      var countries=[];
      for(var i=0; i<$scope.trips.length; i++){
         var sum2=0;
         var count2=0;
         var country = $scope.trips[i].country;
         for(var j=i; j<$scope.trips.length; j++){
            if($scope.trips[j].country == country){
               sum2+=$scope.trips[j].rating;
               count2++;
            }
         }
         var found = countries.some(function (el) {
            return el.country == country;
         });
         if (!found) {
            countries.push({country: country, count: count2, averageRating: Math.round(sum2/count2*10)/10})
         }
      }
      var areas=[];
      for(var i=0; i<$scope.trips.length; i++){
         var sum3=0;
         var count3=0;
         var area = $scope.trips[i].area;
         for(var j=i; j<$scope.trips.length; j++){
            if($scope.trips[j].area == area){
               sum3+=$scope.trips[j].rating;
               count3++;
            }
         }
         var found = areas.some(function (el) {
            return el.area == area;
         });
         if (!found) {
            areas.push({area: area, count: count3, averageRating: Math.round(sum3/count3*10)/10})
         }
      }
      $scope.areas = areas;
      $scope.countries = countries;
      $scope.regions = regions;
      $scope.url = $location.absUrl();
   })};
   getTrips()
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
            if(data.data.errors){
               alert(data.data.errors.message);
            }else{
               $scope.myTrip = {};
               var id = data.data._user;
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
}]);
