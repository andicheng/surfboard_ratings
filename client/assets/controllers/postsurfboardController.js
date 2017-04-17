app.controller('postsurfboardController', ['$scope','usersFactory','surfboardsFactory', '$location','$routeParams', function($scope, usersFactory, surfboardsFactory,$location, $routeParams) {

   usersFactory.getUser(function(user){
      $scope.user = user;
   });
   var getSurfboards = function(){
   surfboardsFactory.getSurfboards(function(returned_data){
      $scope.surfboards = returned_data;
      // var regions=[];
      // for(var i=0; i<$scope.surfboards.length; i++){
      //    var sum=0;
      //    var count=0;
      //    var region = $scope.surfboards[i].region;
      //    for(var j=i; j<$scope.surfboards.length; j++){
      //       if($scope.surfboards[j].region == region){
      //          sum+=$scope.surfboards[j].rating;
      //          count++
      //       }
      //    }
      //    var found = regions.some(function (el) {
      //       return el.region == region;
      //    });
      //    if (!found) {
      //       regions.push({region: region, count: count, averageRating: Math.round(sum/count*10)/10})
      //    }
      // }
      // var countries=[];
      // for(var i=0; i<$scope.surfboards.length; i++){
      //    var sum2=0;
      //    var count2=0;
      //    var country = $scope.surfboards[i].country;
      //    for(var j=i; j<$scope.surfboards.length; j++){
      //       if($scope.surfboards[j].country == country){
      //          sum2+=$scope.surfboards[j].rating;
      //          count2++;
      //       }
      //    }
      //    var found = countries.some(function (el) {
      //       return el.country == country;
      //    });
      //    if (!found) {
      //       countries.push({country: country, count: count2, averageRating: Math.round(sum2/count2*10)/10})
      //    }
      // }
      // var areas=[];
      // for(var i=0; i<$scope.surfboards.length; i++){
      //    var sum3=0;
      //    var count3=0;
      //    var area = $scope.surfboards[i].area;
      //    for(var j=i; j<$scope.surfboards.length; j++){
      //       if($scope.surfboards[j].area == area){
      //          sum3+=$scope.surfboards[j].rating;
      //          count3++;
      //       }
      //    }
      //    var found = areas.some(function (el) {
      //       return el.area == area;
      //    });
      //    if (!found) {
      //       areas.push({area: area, count: count3, averageRating: Math.round(sum3/count3*10)/10})
      //    }
      // }
      // $scope.areas = areas;
      // $scope.countries = countries;
      // $scope.regions = regions;
      $scope.url = $location.absUrl();
   })};
   getSurfboards()
   $scope.logout = function(){
      console.log("logout clicked");
      usersFactory.logout(function(data){
      });
      $location.url('/login')
   }
   $scope.newSurfboard = function(){
      surfboardsFactory.newSurfboard($scope.mySurfboard, function(data){
         if(data.data.errors){
            alert(data.data.errors.message);
         }else{
            $scope.mySurfboard = {};
            var id = data.data.user[0]._id;
            $location.path('/user/'+id)
         }
      })
   }
   $scope.show = function(){
      usersFactory.show($routeParams.user, function(data){
         $scope.user = data;
      });
   }
}]);
