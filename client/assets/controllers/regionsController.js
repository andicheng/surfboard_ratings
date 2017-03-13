app.controller('regionsController', ['$scope','usersFactory','tripsFactory', '$location','$routeParams', function($scope, usersFactory, tripsFactory, $location, $routeParams) {

   usersFactory.getUser(function(user){
      $scope.user = user;
   });
   var getTrips = function(){
   tripsFactory.getTrips(function(returned_data){
      $scope.trips = returned_data;
      var trips = $scope.trips
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
         var found = regions.some(function (regions) {
            return regions.region == region;
         });
         if (!found) {
            regions.push({region: region, count: count, averageRating: Math.round(sum/count*10)/10,averageactivitiesRating: Math.round(sumactivitiesrating/count*10)/10,averagesurfRating: Math.round(sumsurfrating/count*10)/10,averageamenitiesRating: Math.round(sumamenitiesrating/count*10)/10})
         }
      };
      var countries=[];
      var regions2=[]
      for(var y=0; y<$scope.trips.length; y++){
         var sum2=0;
         var sum2surfrating=0;
         var sum2amenitiesrating=0;
         var sum2activitiesrating=0;
         var count2=0;
         var region2 = $scope.trips[y].region;
         var country = $scope.trips[y].country;
         for(var z=y; z<$scope.trips.length; z++){
            if($scope.trips[z].country == country && $scope.trips[z].region == region2){
               sum2+=$scope.trips[z].rating;
               sum2surfrating+=$scope.trips[z].surfrating;
               sum2amenitiesrating+=$scope.trips[z].amenitiesrating;
               sum2activitiesrating+=$scope.trips[z].activitiesrating;
               count2++;
            }
         }
         var found2 = countries.some(function (countries, regions2) {
            return (countries.country2 == country && countries.region2 == region2);
         });
         if (!found2) {
            countries.push({region2: region2, country2: country, count: count2, averageRating: Math.round(sum2/count2*10)/10,averageactivitiesRating: Math.round(sum2activitiesrating/count2*10)/10,averagesurfRating: Math.round(sum2surfrating/count2*10)/10,averageamenitiesRating: Math.round(sum2amenitiesrating/count2*10)/10})
         }
      };
      // var countries=[];
      // for(var y=0; y<$scope.trips.length; y++){
      //    var sum2=0;
      //    var count2=0;
      //    var country = $scope.trips[y].country;
      //    for(var z=y; z<$scope.trips.length; z++){
      //       if($scope.trips[z].country == country){
      //          sum2+=$scope.trips[z].rating;
      //          count2++;
      //       }
      //    }
      //    var found2 = countries.some(function (countries) {
      //       return countries.country2 == country;
      //    });
      //    if (!found2) {
      //       countries.push({country2: country, count: count2, averageRating: Math.round(sum2/count2*10)/10})
      //    }
      // };
      $scope.countries = countries;
      $scope.regions = regions;
      $scope.url = $location.absUrl();
   })};
   getTrips();
   $scope.logout = function(){
      console.log("logout clicked");
      usersFactory.logout(function(data){
      });
      $location.url('/login')
   };
}]);
